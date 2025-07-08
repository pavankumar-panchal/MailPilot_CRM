import React, { useEffect, useState } from "react";

const statusColors = {
  pending: "bg-yellow-500",
  running: "bg-blue-600",
  paused: "bg-gray-500",
  completed: "bg-green-600",
  failed: "bg-red-600",
};

const EmailSent = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // Fetch campaigns
  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/monitor/campaigns");
      const data = await res.json();
      setCampaigns(Array.isArray(data) ? data : []);
    } catch {
      setMessage({ type: "error", text: "Failed to load campaigns." });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCampaigns();
    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchCampaigns, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <i className="fas fa-chart-line mr-2 text-blue-600"></i>
        Campaign Monitor
      </h1>
      {message && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md flex items-start">
          <div className="ml-3">
            <p className="text-sm font-medium">{message.text}</p>
          </div>
          <div className="ml-auto pl-3">
            <button onClick={() => setMessage(null)} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emails</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : campaigns.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No campaigns found.
                  </td>
                </tr>
              ) : (
                campaigns.map((campaign) => {
                  const total = Math.max(campaign.total_emails || 0, 1);
                  const sent = Math.min(campaign.sent_emails || 0, total);
                  const progress = Math.round((sent / total) * 100);
                  const status = (campaign.campaign_status || "pending").toLowerCase();
                  return (
                    <tr key={campaign.campaign_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {campaign.campaign_id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {/* You can link to a details page if needed */}
                          {campaign.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`status-badge px-2 py-1 rounded text-xs font-semibold ${statusColors[status] || "bg-gray-400"
                            } text-white`}
                        >
                          {campaign.campaign_status || "Not started"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="progress-bar h-5 bg-gray-200 rounded">
                          <div
                            className="progress-fill bg-blue-600 h-5 rounded"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {progress}% ({campaign.sent_emails || 0}/{campaign.total_emails || 0})
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>Total: {campaign.total_emails || 0}</div>
                        <div>Pending: {campaign.pending_emails || 0}</div>
                        <div>Sent: {campaign.sent_emails || 0}</div>
                        <div>Failed: {campaign.failed_emails || 0}</div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmailSent;