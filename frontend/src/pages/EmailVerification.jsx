import React, { useState, useEffect, useRef } from "react";

const CIRCUMFERENCE = 471;

const EmailVerification = () => {
  // Form state
  const [listName, setListName] = useState("");
  const [fileName, setFileName] = useState("");
  const [csvFile, setCsvFile] = useState(null);

  // UI state
  const [status, setStatus] = useState(null);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState({
    processed: 0,
    total: 0,
    percent: 0,
    stage: "domain",
  });
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);

  // Table state
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const progressInterval = useRef(null);

  // Fetch emails on mount and when page, rowsPerPage, or search changes
  useEffect(() => {
    fetchEmails();
    // eslint-disable-next-line
  }, [page, rowsPerPage, search]);

  // Fetch emails with pagination and search
  const fetchEmails = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: rowsPerPage,
        search,
      });
      const res = await fetch(
        `http://localhost/Verify_email/backend/includes/get_results.php?${params.toString()}`
      );
      const data = await res.json();
      if (data && Array.isArray(data.data)) {
        setEmails(data.data);
        setTotal(data.total || 0);
      } else {
        setEmails([]);
        setTotal(0);
      }
    } catch (e) {
      setStatus({ type: "error", message: "Error fetching emails" });
    } finally {
      setLoading(false);
    }
  };

  // Check for existing progress
  const checkExistingProgress = async () => {
    try {
      const res = await fetch("/api/verify/progress");
      const data = await res.json();
      if (data.total > 0 && data.processed < data.total) {
        setShowProgress(true);
        setProgress(data);
        startProgressTracking();
      }
    } catch {}
  };

  // Start polling progress
  const startProgressTracking = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    progressInterval.current = setInterval(async () => {
      try {
        const res = await fetch("/api/verify/progress");
        const data = await res.json();
        setProgress(data);
        if (data.total > 0 && data.processed >= data.total) {
          clearInterval(progressInterval.current);
          setTimeout(() => {
            setShowProgress(false);
            setStatus({
              type: "success",
              message: "Verification completed successfully!",
            });
            fetchEmails();
          }, 1000);
        }
      } catch {
        clearInterval(progressInterval.current);
        setShowProgress(false);
        setStatus({
          type: "error",
          message: "Error checking verification progress",
        });
      }
    }, 2000);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!csvFile || !listName || !fileName) {
      setStatus({ type: "error", message: "All fields are required." });
      return;
    }

    const formData = new FormData();
    formData.append("csv_file", csvFile);
    formData.append("list_name", listName);
    formData.append("file_name", fileName);

    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost/Verify_email/backend/routes/api.php/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.status === "success") {
        setStatus({
          type: "success",
          message: data.message || "Upload successful. Verification started.",
        });
        setShowProgress(true);
        startProgressTracking();
      } else {
        setStatus({ type: "error", message: data.message || "Upload failed." });
      }
    } catch (err) {
      setStatus({ type: "error", message: "Network error." });
    } finally {
      setLoading(false);
    }
  };

  // Export emails
  const exportEmails = async (type) => {
    try {
      const res = await fetch(
        `http://localhost/Verify_email/backend/includes/get_results.php?export=${type}`
      );
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}_emails.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      setStatus({ type: "error", message: `Error exporting ${type} emails` });
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this email?")) return;
    try {
      const res = await fetch(
        "http://localhost/Verify_email/backend/includes/get_results.php",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `id=${id}`,
        }
      );
      const data = await res.json();
      if (data.success) {
        setEmails((prev) => prev.filter((row) => row.id !== id));
        setStatus({ type: "success", message: "Email deleted." });
        setTotal((prev) => prev - 1);
      } else {
        setStatus({ type: "error", message: data.message || "Delete failed." });
      }
    } catch {
      setStatus({ type: "error", message: "Delete failed." });
    }
  };

  // Progress circle
  const percent =
    progress.percent ??
    (progress.total > 0
      ? Math.round((progress.processed / progress.total) * 100)
      : 0);
  const offset = CIRCUMFERENCE - (CIRCUMFERENCE * percent) / 100;

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 4000); // 4 seconds
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));

  return (
    <div className="main-content mt-18 w-full max-w-7xl mx-auto">
      {/* Progress Overlay */}
      {showProgress && (
        <div className="progress-overlay fixed top-0 left-0 right-0 bottom-0 bg-gray-200 bg-opacity-50 flex flex-col items-center justify-center z-50 backdrop-blur">
          <div className="circle-loader relative w-44 h-44 mb-4">
            <svg
              width="180"
              height="180"
              className="absolute"
              style={{ transform: "rotate(-90deg)" }}
            >
              <circle
                className="circle-bg"
                cx="90"
                cy="90"
                r="75"
                stroke="#e6e6e6"
                strokeWidth="10"
                fill="none"
              />
              <circle
                className="circle-progress"
                cx="90"
                cy="90"
                r="75"
                stroke="#3b82f6"
                strokeWidth="10"
                fill="none"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.5s ease" }}
              />
            </svg>
            <div className="loader-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-gray-800">
              {percent}%
            </div>
          </div>
          <div className="progress-label text-lg font-medium text-gray-700">
            {progress.stage === "smtp"
              ? "Verifying SMTP..."
              : "Verifying Domains..."}
          </div>
        </div>
      )}

      {/* Status Message */}
      {status && (
        <div
          className={`
            fixed top-6 left-1/2 transform -translate-x-1/2 z-50
            px-6 py-3 rounded shadow-lg text-base font-medium
            transition-all duration-300
            ${
              status.type === "error"
                ? "bg-red-600 text-white"
                : "bg-green-600 text-white"
            }
          `}
          style={{ minWidth: 250, maxWidth: 400 }}
        >
          {status.message}
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg mb-6 border border-gray-100">
        <form
          className="w-full"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-blue-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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
              <p className="text-sm text-gray-500 mt-1">
                Upload your CSV file to verify email addresses
              </p>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* List Name Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 flex items-center">
                  <svg
                    className="h-4 w-4 mr-1 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  List Name
                </label>
                <input
                  type="text"
                  name="list_name"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="e.g. csv_list_2025"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                />
              </div>
              {/* File Name Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 flex items-center">
                  <svg
                    className="h-4 w-4 mr-1 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  File Name
                </label>
                <input
                  type="text"
                  name="file_name"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="e.g. csv_file_2025"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <svg
                  className="h-4 w-4 mr-1 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                CSV File
              </label>
              <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition">
                <div className="text-center text-sm">
                  <svg
                    className="mx-auto h-8 w-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <label className="cursor-pointer text-blue-600 hover:text-blue-500 font-medium">
                    Upload a file
                    <input
                      name="csv_file"
                      type="file"
                      className="sr-only"
                      required
                      accept=".csv"
                      onChange={(e) => setCsvFile(e.target.files[0])}
                    />
                  </label>
                  <p className="text-xs text-gray-500">or drag and drop.</p>
                  <p className="mt-2 text-sm text-gray-600">
                    {csvFile ? `Selected file: ${csvFile.name}` : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  />
                </svg>
                {loading ? (
                  <>
                    <span>Uploading...</span>
                    <svg
                      className="animate-spin h-4 w-4 ml-2 text-white"
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
                  </>
                ) : (
                  <span>Upload & Process</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-700">
              <i className="fas fa-list mr-2"></i>Verified Emails
            </h3>
            <p className="text-sm text-gray-500">
              {loading
                ? "Loading..."
                : `Showing ${total} result${total !== 1 ? "s" : ""}`}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="Search emails, domains..."
                className="pl-10 border border-gray-300 p-2 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => exportEmails("valid")}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition flex items-center"
              >
                <i className="fas fa-file-export mr-2"></i>Export Valid
              </button>
              <button
                onClick={() => exportEmails("invalid")}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center"
              >
                <i className="fas fa-file-export mr-2"></i>Export Invalid
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                sp_account
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                sp_domain
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Verified
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Validation Response
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {emails.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-8">
                  <i className="fas fa-inbox text-4xl text-gray-300 mb-2"></i>
                  <h4 className="text-lg font-medium text-gray-500">
                    No emails found
                  </h4>
                  <p className="text-gray-400">
                    Upload a CSV file to get started
                  </p>
                </td>
              </tr>
            )}
            {emails.map((email, idx) => (
              <tr key={email.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {email.id || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {email.raw_emailid || email.email || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {email.sp_account || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {email.sp_domain || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <span
                    className={`status-badge inline-block px-3 py-1 rounded-full font-semibold text-xs min-w-[80px] 
            ${
              email.domain_verified == 1 || email.domain_verified === true
                ? "bg-green-100 text-green-800 "
                : "bg-orange-100 text-orange-800"
            }
          `}
                  >
                    {email.domain_verified == 1 ||
                    email.domain_verified === true
                      ? "Verified"
                      : "Not Verified"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <span
                    className={`status-badge inline-block px-3 py-1 rounded-full font-semibold text-xs min-w-[80px] 
            ${
              email.domain_status == 1
                ? "bg-blue-100 text-blue-800"
                : "bg-orange-100 text-orange-800"
            }
          `}
                  >
                    {email.domain_status == 1 ? "Correct" : "Wrong"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="relative group">
                    {truncateText(email.validation_response || "N/A", 20)}
                    {email.validation_response && (
                      <span className="absolute left-1/2 z-10 -translate-x-1/2 mt-2 w-max max-w-xs bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                        {email.validation_response}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <button
                    onClick={() => handleDelete(email.id)}
                    className="text-red-600 hover:text-red-900 mr-3 relative group"
                    title="Delete this email"
                  >
                    <i className="fas fa-trash-alt"></i>
                    <span className="absolute left-1/2 z-10 -translate-x-1/2 mt-2 w-max max-w-xs bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                      Delete this email
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-md">
        <div className="text-sm text-gray-500">
          Showing <span>{total === 0 ? 0 : (page - 1) * rowsPerPage + 1}</span>{" "}
          to{" "}
          <span>{total === 0 ? 0 : Math.min(page * rowsPerPage, total)}</span>{" "}
          of <span>{total}</span> entries
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="pagination-btn bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            <i className="fas fa-angle-double-left"></i>
          </button>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="pagination-btn bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            <i className="fas fa-angle-left"></i>
          </button>
          <div className="flex items-center gap-1">
            <span className="text-sm">Page</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={page}
              onChange={(e) => setPage(Number(e.target.value))}
              className="border p-1 w-12 text-center rounded-md text-sm"
            />
            <span className="text-sm text-gray-500">of {totalPages}</span>
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="pagination-btn bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            <i className="fas fa-angle-right"></i>
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="pagination-btn bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            <i className="fas fa-angle-double-right"></i>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="border p-1 rounded-md text-sm"
          >
            {[10, 25, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

// Truncate text utility function
function truncateText(text, maxLength) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export default EmailVerification;
