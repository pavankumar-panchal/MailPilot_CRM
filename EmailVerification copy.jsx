import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

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
  const [childPagination, setChildPagination] = useState({
    page: 1,
    rowsPerPage: 100,
    total: 0,
  });
  const [expandedListId, setExpandedListId] = useState(null);
  const [listEmails, setListEmails] = useState([]);

  // Export state
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportType, setExportType] = useState("valid");
  const [selectedListIds, setSelectedListIds] = useState([]);

  const progressInterval = useRef(null);
  const searchTimeout = useRef();
  const navigate = useNavigate();

  // Fetch lists (make it reusable)
  const fetchLists = async () => {
    try {
      const params = new URLSearchParams({
        page: listPagination.page,
        limit: listPagination.rowsPerPage,
        search: listPagination.search,
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

  // Fetch emails for a specific list (make it reusable)
  const fetchListEmails = async (listId, page = 1, rowsPerPage = 100) => {
    try {
      const params = new URLSearchParams({
        csv_list_id: listId,
        page,
        limit: rowsPerPage,
      });
      const res = await fetch(
        `http://localhost/Verify_email/backend/routes/api.php/api/results?${params}`
      );
      const data = await res.json();

      if (Array.isArray(data.data)) {
        setListEmails(data.data);
        setChildPagination((prev) => ({
          ...prev,
          total: data.total || 0,
          page,
          rowsPerPage,
        }));
      } else {
        setListEmails([]);
        setChildPagination((prev) => ({
          ...prev,
          total: 0,
          page,
          rowsPerPage,
        }));
      }
    } catch (error) {
      setListEmails([]);
      setChildPagination((prev) => ({
        ...prev,
        total: 0,
        page,
        rowsPerPage,
      }));
      setStatus({ type: "error", message: "Failed to load list emails" });
    }
  };

  // Fetch lists on mount and when pagination/search changes
  useEffect(() => {
    fetchLists();
    // eslint-disable-next-line
  }, [listPagination.page, listPagination.rowsPerPage, listPagination.search]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, csvFile: e.target.files[0] }));
  };

  // Handle form submission
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

        // Fetch lists again immediately after upload
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

  // Export emails
  const exportEmails = async (type, listId = null) => {
    try {
      const url = `http://localhost/Verify_email/backend/includes/get_results.php?export=${type}${
        listId ? `&csv_list_id=${listId}` : ""
      }`;

      const res = await fetch(url);
      const blob = await res.blob();

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${type}_emails.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      setStatus({ type: "success", message: `Exporting ${type} emails...` });
    } catch (error) {
      setStatus({ type: "error", message: `Failed to export ${type} emails` });
    }
  };

  // Toggle list expansion
  const toggleListExpansion = async (list) => {
    if (expandedListId === list.id) {
      setExpandedListId(null);
    } else {
      setExpandedListId(list.id);
      setChildPagination({ page: 1, rowsPerPage: 100, total: 0 });
      await fetchListEmails(list.id, 1, 100);
    }
  };

  // Start progress tracking and refresh lists dynamically
  const startProgressTracking = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);

    progressInterval.current = setInterval(async () => {
      try {
        const res = await fetch("/api/verify/progress");
        const data = await res.json();
        setProgress(data);

        // Always refresh lists while progress is running
        fetchLists();

        if (data.total > 0 && data.processed >= data.total) {
          clearInterval(progressInterval.current);
          setTimeout(() => {
            setShowProgress(false);
            setStatus({ type: "success", message: "Verification completed!" });
            fetchLists(); // Final refresh after completion
            if (expandedListId) fetchListEmails(expandedListId); // Refresh emails if expanded
          }, 1000);
        }
      } catch (error) {
        clearInterval(progressInterval.current);
        setShowProgress(false);
      }
    }, 2000);
  };

  // Auto-hide status message
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // When progress is shown, poll for lists as well
  useEffect(() => {
    let interval;
    if (showProgress) {
      interval = setInterval(() => {
        fetchLists();
        if (expandedListId) fetchListEmails(expandedListId);
      }, 2000);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [showProgress, expandedListId]);

  // Calculate valid/invalid counts
  const validCount = listEmails.filter((e) => e.domain_verified === 1).length;
  const invalidCount = listEmails.filter((e) => e.domain_verified === 0).length;

  // Status message component
  const StatusMessage = ({ status, onClose }) =>
    status && (
      <div
        className={`
        fixed top-6 left-1/2 transform -translate-x-1/2 z-50
        px-6 py-3 rounded-xl shadow text-base font-semibold
        flex items-center gap-3
        transition-all duration-300
        backdrop-blur-md
        ${
          status.type === "error"
            ? "bg-red-200/60 border border-red-400 text-red-800"
            : "bg-green-200/60 border border-green-400 text-green-800"
        }
      `}
        style={{
          minWidth: 250,
          maxWidth: 400,
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.23)",
          background:
            status.type === "error"
              ? "rgba(255, 0, 0, 0.29)"
              : "rgba(0, 200, 83, 0.29)",
          borderRadius: "16px",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
        role="alert"
      >
        <i
          className={`fas text-lg ${
            status.type === "error"
              ? "fa-exclamation-circle text-red-500"
              : "fa-check-circle text-green-500"
          }`}
        ></i>
        <span className="flex-1">{status.message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    );

  // Progress indicator component
  // const ProgressIndicator = () => (
  //   showProgress && (
  //     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
  //       <div className="bg-white p-8 rounded-lg shadow text-center w-full max-w-md">
  //         <div className="w-full bg-gray-200 rounded-full h-6 mb-4 overflow-hidden">
  //           <div
  //             className="bg-blue-500 h-6 transition-all duration-500"
  //             style={{ width: `${progress.percent}%` }}
  //           ></div>
  //         </div>
  //         <div className="text-gray-700 font-semibold text-base">
  //           Processing... {progress.processed} / {progress.total} emails
  //         </div>
  //       </div>
  //     </div>
  //   )
  // );

  // Open export modal
  const openExportModal = (type) => {
    setExportType(type);
    setExportModalOpen(true);
    setSelectedListIds([]);
  };

  // Handle checkbox change
  const handleListCheckbox = (listId) => {
    setSelectedListIds((prev) =>
      prev.includes(listId)
        ? prev.filter((id) => id !== listId)
        : [...prev, listId]
    );
  };

  // Export selected lists
  const exportSelectedLists = async () => {
    if (selectedListIds.length === 0) {
      setStatus({ type: "error", message: "Select at least one list" });
      return;
    }
    try {
      // You may need to adjust the backend API to accept multiple IDs
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
    }
  };

  // Handle search input change with debounce
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

  const handleView = (listId) => {
    window.open(`/table-data/${listId}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-12 max-w-7xl">
      <StatusMessage status={status} onClose={() => setStatus(null)} />

      {/* Export Modal */}
      {exportModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "rgba(0, 0, 0, 0.65)",
            transition: "background 0.3s",
          }}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative border border-gray-200"
            style={{
              boxShadow: "0 8px 32px 0 rgba(0,0,0,0.12)",
            }}
          >
            <button
              className="absolute top-3 right-3 text-gray-700 hover:text-black"
              onClick={() => setExportModalOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              Select Lists to Export (
              {exportType.charAt(0).toUpperCase() + exportType.slice(1)} Emails)
            </h3>
            {/* Make table scrollable if more than 10 records */}
            <div
              className="border rounded bg-white"
              style={{
                maxHeight: lists.length > 10 ? 400 : "auto",
                overflowY: lists.length > 10 ? "auto" : "visible",
                minHeight: 0,
              }}
            >
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                      ID
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                      List Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                      Status
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                      Emails
                    </th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700 uppercase">
                      <label className="inline-flex items-center cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={
                            selectedListIds.length === lists.length &&
                            lists.length > 0
                          }
                          onChange={() => {
                            if (selectedListIds.length === lists.length) {
                              setSelectedListIds([]);
                            } else {
                              setSelectedListIds(lists.map((l) => l.id));
                            }
                          }}
                          aria-label="Select all"
                          className="mr-2 accent-blue-600"
                        />
                        <span className="ml-1 cursor-pointer">Select</span>
                      </label>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {lists.map((list) => (
                    <tr key={list.id}>
                      <td className="px-4 py-2 text-gray-900">{list.id}</td>
                      <td className="px-4 py-2 text-gray-900">
                        {list.list_name}
                      </td>
                      <td className="px-4 py-2 text-gray-900">{list.status}</td>
                      <td className="px-4 py-2 text-gray-900">
                        {list.total_emails}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={selectedListIds.includes(list.id)}
                          onChange={() => handleListCheckbox(list.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-6 gap-3">
              <button
                className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={exportSelectedLists}
              >
                Export Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow p-6 mb-8 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <svg
            className="w-6 h-6 text-blue-500 mr-2"
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
          Upload Email List
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                List Name
              </label>
              <input
                type="text"
                name="listName"
                value={formData.listName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. csv_list_2025"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                File Name
              </label>
              <input
                type="text"
                name="fileName"
                value={formData.fileName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. csv_file_2025"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CSV File
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-400 transition">
              <div className="text-center">
                {formData.csvFile ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="h-12 w-12 text-green-500"
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
                    <div className="ml-4 text-left">
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
                    <div className="mt-2 flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
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
                    <p className="text-xs text-gray-500">CSV files only</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition flex items-center"
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
                    className="w-5 h-5 mr-2"
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
                  Upload & Process
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Lists Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-gray-800">Email Lists</h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
              </div>
              <input
                type="text"
                placeholder="Search lists, emails, etc..."
                className="pl-10 w-full border border-gray-300 rounded-md py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
                value={listPagination.search}
                onChange={handleSearchChange}
              />
            </div>

            {/* Replace Export buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => openExportModal("valid")}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-2"
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
                Export Valid
              </button>
              <button
                onClick={() => openExportModal("invalid")}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-2"
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
                Export Invalid
              </button>
            </div>
          </div>
        </div>

        {/* Lists Table */}
        <div className="overflow-x-auto">
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
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lists.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No lists found. Upload a CSV file to get started.
                  </td>
                </tr>
              ) : (
                lists.map((list) => (
                  <React.Fragment key={list.id}>
                    <tr className="hover:bg-blue-50 transition">
                      <td className="px-6 py-4">{list.id}</td>
                      <td className="px-6 py-4">{list.list_name}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            list.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : list.status === "running"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {list.status.charAt(0).toUpperCase() +
                            list.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {list.total_emails} total
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleListExpansion(list)}
                          className="text-blue-600 hover:underline flex items-center gap-1 font-medium focus:outline-none"
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                          }}
                          tabIndex={0}
                        >
                          {expandedListId === list.id ? (
                            <>
                              <i className="fas fa-chevron-up text-xs"></i> Hide
                            </>
                          ) : (
                            <>
                              <i className="fas fa-chevron-down text-xs"></i>{" "}
                              View
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleView(list.id)} className="text-blue-600 hover:underline">
                          View
                        </button>
                      </td>
                    </tr>
                    {expandedListId === list.id && (
                      <tr>
                        <td colSpan={6} className="bg-gray-50 px-6 py-4">
                          <div className="mb-2 text-sm text-gray-700 flex gap-6">
                            <span>
                              <span className="font-semibold">Valid:</span>{" "}
                              <span className="text-green-600 font-bold">
                                {typeof list.valid_count === "number"
                                  ? list.valid_count
                                  : 0}
                              </span>
                            </span>
                            <span>
                              <span className="font-semibold">Invalid:</span>{" "}
                              <span className="text-red-600 font-bold">
                                {typeof list.invalid_count === "number"
                                  ? list.invalid_count
                                  : 0}
                              </span>
                            </span>
                          </div>
                          <div className="overflow-x-auto max-h-[60vh] rounded-lg border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-blue-50 sticky top-0 z-10">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider border-b border-gray-200">
                                    ID
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider border-b border-gray-200">
                                    Email
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider border-b border-gray-200">
                                    sp_account
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider border-b border-gray-200">
                                    sp_domain
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider border-b border-gray-200">
                                    Verified
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider border-b border-gray-200">
                                    Status
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider border-b border-gray-200">
                                    Validation Response
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-100">
                                {listEmails.length === 0 ? (
                                  <tr>
                                    <td
                                      colSpan={7}
                                      className="text-center py-8 text-gray-400"
                                    >
                                      No emails found
                                    </td>
                                  </tr>
                                ) : (
                                  listEmails.map((email, idx) => (
                                    <EmailRow
                                      key={email.id}
                                      email={email}
                                      idx={idx}
                                    />
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                          {/* Child Table Pagination - place here */}
                          {childPagination.total >
                            childPagination.rowsPerPage && (
                            <div className="flex items-center gap-2 justify-center mt-4">
                              <button
                                onClick={() => {
                                  fetchListEmails(
                                    expandedListId,
                                    1,
                                    childPagination.rowsPerPage
                                  );
                                }}
                                disabled={childPagination.page === 1}
                              >
                                <i className="fas fa-angle-double-left"></i>
                              </button>
                              <button
                                onClick={() => {
                                  fetchListEmails(
                                    expandedListId,
                                    childPagination.page - 1,
                                    childPagination.rowsPerPage
                                  );
                                }}
                                disabled={childPagination.page === 1}
                              >
                                <i className="fas fa-angle-left"></i>
                              </button>
                              <span>
                                Page {childPagination.page} of{" "}
                                {Math.max(
                                  1,
                                  Math.ceil(
                                    childPagination.total /
                                      childPagination.rowsPerPage
                                  )
                                )}
                              </span>
                              <button
                                onClick={() => {
                                  fetchListEmails(
                                    expandedListId,
                                    childPagination.page + 1,
                                    childPagination.rowsPerPage
                                  );
                                }}
                                disabled={
                                  childPagination.page >=
                                  Math.ceil(
                                    childPagination.total /
                                      childPagination.rowsPerPage
                                  )
                                }
                              >
                                <i className="fas fa-angle-right"></i>
                              </button>
                              <button
                                onClick={() => {
                                  fetchListEmails(
                                    expandedListId,
                                    Math.ceil(
                                      childPagination.total /
                                        childPagination.rowsPerPage
                                    ),
                                    childPagination.rowsPerPage
                                  );
                                }}
                                disabled={
                                  childPagination.page >=
                                  Math.ceil(
                                    childPagination.total /
                                      childPagination.rowsPerPage
                                  )
                                }
                              >
                                <i className="fas fa-angle-double-right"></i>
                              </button>
                              <select
                                value={childPagination.rowsPerPage}
                                onChange={(e) => {
                                  fetchListEmails(
                                    expandedListId,
                                    1,
                                    Number(e.target.value)
                                  );
                                }}
                              >
                                {[100, 200, 500].map((n) => (
                                  <option key={n} value={n}>
                                    {n}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {lists.length > 0 && (
          <div className="flex flex-col px-1 items-center mt-6">
            <div className="text-sm text-gray-500 mb-2">
              Showing{" "}
              {(listPagination.page - 1) * listPagination.rowsPerPage + 1} to{" "}
              {Math.min(
                listPagination.page * listPagination.rowsPerPage,
                listPagination.total
              )}{" "}
              of {listPagination.total} lists
            </div>
            <div className="flex items-center gap-2 justify-center mt-4">
              <button
                onClick={() =>
                  setListPagination((prev) => ({ ...prev, page: 1 }))
                }
                disabled={listPagination.page === 1}
                className="bg-white text-gray-700 px-3 py-1 rounded-md hover:bg-blue-100 disabled:opacity-50 border"
              >
                <i className="fas fa-angle-double-left"></i>
              </button>
              <button
                onClick={() =>
                  setListPagination((prev) => ({
                    ...prev,
                    page: prev.page - 1,
                  }))
                }
                disabled={listPagination.page === 1}
                className="bg-white text-gray-700 px-3 py-1 rounded-md hover:bg-blue-100 disabled:opacity-50 border"
              >
                <i className="fas fa-angle-left"></i>
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
                className="bg-white text-gray-700 px-3 py-1 rounded-md hover:bg-blue-100 disabled:opacity-50 border"
              >
                <i className="fas fa-angle-right"></i>
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
                className="bg-white text-gray-700 px-4 py-1 rounded-md hover:bg-blue-100 disabled:opacity-50 border"
              >
                <i className="fas fa-angle-double-right"></i>
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
                className="border p-1 rounded-md text-sm bg-white"
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

      {/* Child Table Pagination */}
      {/* {childPagination.total > childPagination.rowsPerPage && (
        <div className="flex items-center gap-2 justify-center mt-4">
          <button
            onClick={() => {
              fetchListEmails(expandedListId, 1, childPagination.rowsPerPage);
            }}
            disabled={childPagination.page === 1}
          >
            <i className="fas fa-angle-double-left"></i>
          </button>
          <button
            onClick={() => {
              fetchListEmails(
                expandedListId,
                childPagination.page - 1,
                childPagination.rowsPerPage
              );
            }}
            disabled={childPagination.page === 1}
          >
            <i className="fas fa-angle-left"></i>
          </button>
          <span>
            Page {childPagination.page} of{" "}
            {Math.max(
              1,
              Math.ceil(childPagination.total / childPagination.rowsPerPage)
            )}
          </span>
          <button
            onClick={() => {
              fetchListEmails(
                expandedListId,
                childPagination.page + 1,
                childPagination.rowsPerPage
              );
            }}
            disabled={
              childPagination.page >=
              Math.ceil(childPagination.total / childPagination.rowsPerPage)
            }
          >
            <i className="fas fa-angle-right"></i>
          </button>
          <button
            onClick={() => {
              fetchListEmails(
                expandedListId,
                Math.ceil(childPagination.total / childPagination.rowsPerPage),
                childPagination.rowsPerPage
              );
            }}
            disabled={
              childPagination.page >=
              Math.ceil(childPagination.total / childPagination.rowsPerPage)
            }
          >
            <i className="fas fa-angle-double-right"></i>
          </button>
          <select
            value={childPagination.rowsPerPage}
            onChange={(e) => {
              fetchListEmails(expandedListId, 1, Number(e.target.value));
            }}
          >
            {[100, 200].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      )} */}
    </div>
  );
};

const EmailRow = React.memo(({ email, idx }) => (
  <tr
    key={email.id}
    className={
      idx % 2 === 0 ? "bg-gray-50 hover:bg-blue-50" : "hover:bg-blue-50"
    }
  >
    <td className="px-3 py-1 text-xs text-gray-600">{email.id}</td>
    <td className="px-3 py-1 text-xs font-bold text-gray-800">
      {email.raw_emailid || email.email || "N/A"}
    </td>
    <td className="px-3 py-1 text-xs text-gray-600">{email.sp_account}</td>
    <td className="px-3 py-1 text-xs text-gray-600">{email.sp_domain}</td>
    <td className="px-3 py-1">
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          email.domain_verified == 1
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {email.domain_verified == 1 ? "Verified" : "Not Verified"}
      </span>
    </td>
    <td className="px-3 py-1">
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          email.domain_status == 1
            ? "bg-blue-100 text-blue-700"
            : "bg-orange-100 text-orange-700"
        }`}
      >
        {email.domain_status == 1 ? "Correct" : "Wrong"}
      </span>
    </td>
    <td className="px-3 py-1 text-xs text-gray-600">
      {email.validation_response?.length > 40
        ? email.validation_response.slice(0, 40) + "..."
        : email.validation_response || "N/A"}
    </td>
  </tr>
));

export default EmailVerification;
