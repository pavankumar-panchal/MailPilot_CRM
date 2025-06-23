import React, { useState, useEffect, useRef } from "react";
import EmailsList from "./EmailsList";

const EmailVerification = () => {
  // Form state
  const [formData, setFormData] = useState({
    listName: "",
    fileName: "",
    csvFile: null,
  });

  // UI state
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({
    processed: 0,
    total: 0,
    percent: 0,
    stage: "domain",
  });
  const [showProgress, setShowProgress] = useState(false);

  // Lists state
  const [lists, setLists] = useState([]);
  const [listPagination, setListPagination] = useState({
    page: 1,
    rowsPerPage: 10,
    total: 0,
    search: "",
  });

  // Export state
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportType, setExportType] = useState("valid");
  const [selectedListIds, setSelectedListIds] = useState([]);

  // Details state
  const [expandedListId, setExpandedListId] = useState(null);

  const progressInterval = useRef(null);
  const searchTimeout = useRef();

  // Counts for different statuses
  const counts = {
    failed: lists.filter((list) => list.domain_status === 2).length,
    invalid: lists.reduce((sum, list) => sum + (list.invalid_count || 0), 0),
    valid: lists.reduce((sum, list) => sum + (list.valid_count || 0), 0),
    timeout: lists.filter(
      (list) =>
        list.validation_response?.toLowerCase().includes("timeout") ||
        list.validation_response?.toLowerCase().includes("failed to connect")
    ).length,
  };

  // Fetch lists with optimized query
  const fetchLists = async () => {
    try {
      const params = new URLSearchParams({
        page: listPagination.page,
        limit: listPagination.rowsPerPage,
        search: listPagination.search,
        minimal: "true",
      });

      const res = await fetch(
        `http://localhost/Verify_email/backend/includes/get_csv_list.php?${params}`
      );
      const data = await res.json();

      setLists(Array.isArray(data.data) ? data.data : []);
      setListPagination((prev) => ({ ...prev, total: data.total || 0 }));
    } catch (error) {
      setLists([]);
      setListPagination((prev) => ({ ...prev, total: 0 }));
      setStatus({ type: "error", message: "Failed to load lists" });
    }
  };

  useEffect(() => {
    fetchLists();
    // eslint-disable-next-line
  }, [listPagination.page, listPagination.rowsPerPage, listPagination.search]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, csvFile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!formData.csvFile || !formData.listName || !formData.fileName) {
      setStatus({ type: "error", message: "All fields are required" });
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("csv_file", formData.csvFile);
    formDataObj.append("list_name", formData.listName);
    formDataObj.append("file_name", formData.fileName);

    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost/Verify_email/backend/routes/api.php/api/upload",
        {
          method: "POST",
          body: formDataObj,
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        setStatus({
          type: "success",
          message: data.message || "Upload successful",
        });
        setShowProgress(true);
        startProgressTracking();
        setFormData({ listName: "", fileName: "", csvFile: null });
        fetchLists();
      } else {
        setStatus({ type: "error", message: data.message || "Upload failed" });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  // Enhanced retry failed function with batch support
  const handleRetryFailed = async (batchSize = 1000) => {
    const failedIds = lists
      .filter((list) => list.domain_status === 2 || list.domain_status === 0)
      .map((list) => list.id);

    if (failedIds.length === 0) {
      setStatus({ type: "warning", message: "No failed items to retry" });
      return;
    }

    setLoading(true);
    setStatus({
      type: "info",
      message: `Preparing to retry ${failedIds.length} failed items...`,
    });

    try {
      for (let i = 0; i < failedIds.length; i += batchSize) {
        const batch = failedIds.slice(i, i + batchSize);

        const response = await fetch(
          "http://localhost/Verify_email/backend/includes/retry_failed.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids: batch }),
          }
        );

        const data = await response.json();

        if (data.status !== "success") {
          throw new Error(data.message || "Batch retry failed");
        }

        setStatus({
          type: "info",
          message: `Processing batch ${
            Math.ceil(i / batchSize) + 1
          } of ${Math.ceil(failedIds.length / batchSize)}...`,
        });
      }

      setStatus({
        type: "success",
        message: `Successfully queued ${failedIds.length} items for retry`,
      });
      setShowProgress(true);
      startProgressTracking();
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Failed to retry items",
      });
    } finally {
      setLoading(false);
    }
  };

  // Enhanced export function with progress
  const exportEmails = async (type, listId = null) => {
    try {
      setLoading(true);
      setStatus({ type: "info", message: `Preparing ${type} emails export...` });

      const url = `http://localhost/Verify_email/backend/includes/get_results.php?export=${type}${
        listId ? `&csv_list_id=${listId}` : ""
      }&stream=true`;

      const res = await fetch(url);

      if (!res.ok) throw new Error("Export failed");

      const reader = res.body.getReader();
      const chunks = [];
      let receivedLength = 0;

      setStatus({ type: "info", message: `Downloading ${type} emails...` });

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        chunks.push(value);
        receivedLength += value.length;

        if (receivedLength % (1024 * 1024) === 0) {
          setStatus({
            type: "info",
            message: `Downloaded ${Math.round(
              receivedLength / (1024 * 1024)
            )}MB of ${type} emails...`,
          });
        }
      }

      const blob = new Blob(chunks);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${type}_emails_${new Date()
        .toISOString()
        .slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      setStatus({
        type: "success",
        message: `Exported ${type} emails successfully`,
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: `Export failed: ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const startProgressTracking = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);

    progressInterval.current = setInterval(async () => {
      try {
        const res = await fetch("/api/verify/progress");
        const data = await res.json();
        setProgress(data);

        fetchLists();

        if (data.total > 0 && data.processed >= data.total) {
          clearInterval(progressInterval.current);
          setTimeout(() => {
            setShowProgress(false);
            setStatus({ type: "success", message: "Verification completed!" });
            fetchLists();
          }, 1000);
        }
      } catch (error) {
        clearInterval(progressInterval.current);
        setShowProgress(false);
      }
    }, 2000);
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    let interval;
    if (showProgress) {
      interval = setInterval(() => {
        fetchLists();
      }, 2000);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [showProgress]);

  const StatusMessage = ({ status, onClose }) =>
    status && (
      <div
        className={`
        fixed top-6 left-1/2 transform -translate-x-1/2 z-50
        px-6 py-3 rounded-lg shadow-lg text-sm font-medium
        flex items-center gap-3
        transition-all duration-300
        backdrop-blur-sm min-w-[300px] max-w-[90vw]
        ${
          status.type === "error"
            ? "bg-red-100/90 border border-red-200 text-red-800"
            : status.type === "success"
            ? "bg-green-100/90 border border-green-200 text-green-800"
            : status.type === "warning"
            ? "bg-yellow-100/90 border border-yellow-200 text-yellow-800"
            : "bg-blue-100/90 border border-blue-200 text-blue-800"
        }
      `}
      >
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center ${
            status.type === "error"
              ? "bg-red-500"
              : status.type === "success"
              ? "bg-green-500"
              : status.type === "warning"
              ? "bg-yellow-500"
              : "bg-blue-500"
          }`}
        >
          {status.type === "error" ? "!" : status.type === "success" ? "✓" : "i"}
        </div>
        <span className="flex-1">{status.message}</span>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ×
        </button>
      </div>
    );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setListPagination((prev) => ({
        ...prev,
        search: value,
        page: 1,
      }));
    }, 400);
  };

  const openExportModal = (type) => {
    setExportType(type);
    setExportModalOpen(true);
    setSelectedListIds([]);
  };

  const handleListCheckbox = (listId) => {
    setSelectedListIds((prev) =>
      prev.includes(listId)
        ? prev.filter((id) => id !== listId)
        : [...prev, listId]
    );
  };

  const exportSelectedLists = async () => {
    if (selectedListIds.length === 0) {
      setStatus({ type: "error", message: "Select at least one list" });
      return;
    }
    try {
      setLoading(true);
      const url = `http://localhost/Verify_email/backend/includes/get_results.php?export=${exportType}&csv_list_ids=${selectedListIds.join(
        ","
      )}`;
      const res = await fetch(url);
      const blob = await res.blob();

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${exportType}_emails.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      setStatus({ type: "success", message: `Exported ${exportType} emails.` });
      setExportModalOpen(false);
    } catch (error) {
      setStatus({ type: "error", message: "Export failed" });
    } finally {
      setLoading(false);
    }
  };

  const statusBadgeColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800";
      case "running":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <StatusMessage status={status} onClose={() => setStatus(null)} />

      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6 mb-8">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-2 rounded-lg mr-4">
            <UploadIcon />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Upload Email List
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                List Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="listName"
                value={formData.listName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g. Marketing Leads Q3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="fileName"
                value={formData.fileName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g. leads_2023_q3.csv"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CSV File
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
              <div className="space-y-1 text-center">
                {formData.csvFile ? (
                  <div className="flex items-center justify-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-4">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-700">
                        {formData.csvFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(formData.csvFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          name="csvFile"
                          className="sr-only"
                          accept=".csv"
                          onChange={handleFileChange}
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">CSV files</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center disabled:opacity-70"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-2 -ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                  Upload & Verify
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Lists Section */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-lg mr-4">
              <ListIcon />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Email Lists</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search lists..."
                className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
                value={listPagination.search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-sm font-medium text-gray-700 mr-2">
              Bulk Actions:
            </h3>

            <button
              onClick={() => handleRetryFailed()}
              disabled={counts.failed === 0 || loading}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 flex items-center"
            >
              <RefreshIcon className="mr-2" />
              Retry Failed ({counts.failed})
            </button>

            <button
              onClick={() => openExportModal("valid")}
              disabled={counts.valid === 0 || loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center"
            >
              <DownloadIcon className="mr-2" />
              Export Valid ({counts.valid})
            </button>

            <button
              onClick={() => openExportModal("invalid")}
              disabled={counts.invalid === 0 || loading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center"
            >
              <DownloadIcon className="mr-2" />
              Export Invalid ({counts.invalid})
            </button>

            <button
              onClick={() => openExportModal("timeout")}
              disabled={counts.timeout === 0 || loading}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 flex items-center"
            >
              <DownloadIcon className="mr-2" />
              Export Timeout ({counts.timeout})
            </button>
          </div>
        </div>

        {/* Lists Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  List Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Emails
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valid/Invalid/Timeout
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lists.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    {listPagination.search
                      ? "No lists match your search criteria"
                      : "No lists found. Upload a CSV file to get started."}
                  </td>
                </tr>
              ) : (
                lists.map((list) => (
                  <tr key={list.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {list.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {list.list_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBadgeColor(
                          list.status
                        )}`}
                      >
                        {list.status?.charAt(0).toUpperCase() + list.status?.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {list.total_emails} total
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 font-medium">
                          {list.valid_count || 0} valid
                        </span>
                        <span className="text-gray-400">|</span>
                        <span className="text-red-600 font-medium">
                          {list.invalid_count || 0} invalid
                        </span>
                        <span className="text-gray-400">|</span>
                        <span className="text-yellow-600 font-medium">
                          {list.timeout_count || 0} timeout
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setExpandedListId(list.id)}
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <EyeIcon className="mr-1" />
                          View
                        </button>
                        <button
                          onClick={() => handleRetryFailed([list.id])}
                          disabled={list.domain_status !== 2 || loading}
                          className="text-yellow-600 hover:text-yellow-800 disabled:opacity-50 flex items-center"
                        >
                          <RefreshIcon className="mr-1" />
                          Retry
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {lists.length > 0 && (
          <div className="flex flex-col items-center justify-center mt-6 px-1 gap-2">
            <div className="text-sm text-gray-500 mb-2">
              Showing{" "}
              <span className="font-medium">
                {(listPagination.page - 1) * listPagination.rowsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(
                  listPagination.page * listPagination.rowsPerPage,
                  listPagination.total
                )}
              </span>{" "}
              of <span className="font-medium">{listPagination.total}</span>{" "}
              lists
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setListPagination((prev) => ({ ...prev, page: 1 }))
                }
                disabled={listPagination.page === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  setListPagination((prev) => ({
                    ...prev,
                    page: prev.page - 1,
                  }))
                }
                disabled={listPagination.page === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <span className="text-sm font-medium text-gray-700">
                Page {listPagination.page} of{" "}
                {Math.max(
                  1,
                  Math.ceil(listPagination.total / listPagination.rowsPerPage)
                )}
              </span>
              <button
                onClick={() =>
                  setListPagination((prev) => ({
                    ...prev,
                    page: Math.min(
                      Math.ceil(
                        listPagination.total / listPagination.rowsPerPage
                      ),
                      prev.page + 1
                    ),
                  }))
                }
                disabled={
                  listPagination.page >=
                  Math.ceil(listPagination.total / listPagination.rowsPerPage)
                }
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  setListPagination((prev) => ({
                    ...prev,
                    page: Math.ceil(
                      listPagination.total / listPagination.rowsPerPage
                    ),
                  }))
                }
                disabled={
                  listPagination.page >=
                  Math.ceil(listPagination.total / listPagination.rowsPerPage)
                }
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </button>
              <select
                value={listPagination.rowsPerPage}
                onChange={(e) =>
                  setListPagination((prev) => ({
                    ...prev,
                    rowsPerPage: Number(e.target.value),
                    page: 1,
                  }))
                }
                className="border p-2 rounded-lg text-sm bg-white focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                {[10, 25, 50, 100].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Progress Modal */}
      {showProgress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Processing Progress</h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Stage: {progress.stage}</span>
                <span>
                  {progress.processed} of {progress.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${progress.percent}%` }}
                ></div>
              </div>
            </div>
            <button
              onClick={() => {
                clearInterval(progressInterval.current);
                setShowProgress(false);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">
              Export{" "}
              {exportType.charAt(0).toUpperCase() + exportType.slice(1)} Emails
            </h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Select lists to export:
              </p>
              <div className="max-h-60 overflow-y-auto border rounded-lg">
                {lists.map((list) => (
                  <div key={list.id} className="p-2 border-b last:border-b-0">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedListIds.includes(list.id)}
                        onChange={() => handleListCheckbox(list.id)}
                        className="mr-2"
                      />
                      {list.list_name} (ID: {list.id})
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setExportModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={exportSelectedLists}
                disabled={selectedListIds.length === 0 || loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Exporting..." : "Export"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Emails List Overlay */}
      {expandedListId && (
        <EmailsList
          listId={expandedListId}
          onClose={() => setExpandedListId(null)}
        />
      )}
    </div>
  );
};

// Icon components
const UploadIcon = () => (
  <svg
    className="w-6 h-6 text-blue-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
    />
  </svg>
);

const ListIcon = () => (
  <svg
    className="w-6 h-6 text-blue-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    className="h-5 w-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
);

const RefreshIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const EyeIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

export default EmailVerification;
