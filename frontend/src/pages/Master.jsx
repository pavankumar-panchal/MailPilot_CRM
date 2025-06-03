import React, { useEffect, useState } from "react";

const statusColors = {
  pending: "bg-yellow-500",
  running: "bg-blue-600",
  paused: "bg-gray-500",
  completed: "bg-green-600",
  failed: "bg-red-600",
};

const Master = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [smtps, setSmtps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [distDraft, setDistDraft] = useState({}); // { [campaignId]: [{smtp_id, percentage}] }

  // Fetch campaigns and SMTPs
  const fetchAll = async () => {
    setLoading(true);
    try {
      const [camps, smtpList] = await Promise.all([
        fetch("/api/master/campaigns").then((r) => r.json()),
        fetch("/api/master/smtps").then((r) => r.json()),
      ]);
      setCampaigns(Array.isArray(camps) ? camps : []);
      setSmtps(Array.isArray(smtpList) ? smtpList : []);
    } catch {
      setMessage({ type: "error", text: "Failed to load data." });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Status message auto-hide
  useEffect(() => {
    if (message && message.type === "success") {
      const t = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(t);
    }
  }, [message]);

  // Toggle campaign details
  const toggleDetails = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    // On open, set draft to current distribution
    if (!expanded[id]) {
      const camp = campaigns.find((c) => c.campaign_id === id);
      setDistDraft((draft) => ({
        ...draft,
        [id]: camp?.current_distributions?.map((d) => ({
          smtp_id: d.smtp_id,
          percentage: d.percentage,
        })) || [],
      }));
    }
  };

  // Handle campaign actions (start, pause, retry, auto-distribute)
  const handleAction = async (campaign_id, action) => {
    setLoading(true);
    try {
      const res = await fetch("/api/master/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaign_id, action }),
      });
      const data = await res.json();
      setMessage({
        type: data.success ? "success" : "error",
        text: data.message || (data.success ? "Action successful!" : "Action failed."),
      });
      fetchAll();
    } catch {
      setMessage({ type: "error", text: "Action failed." });
    }
    setLoading(false);
  };

  // Handle distribution change
  const handleDistChange = (cid, idx, field, value) => {
    setDistDraft((draft) => {
      const arr = [...(draft[cid] || [])];
      arr[idx] = { ...arr[idx], [field]: value };
      return { ...draft, [cid]: arr };
    });
  };

  // Add SMTP row
  const handleAddDist = (cid) => {
    setDistDraft((draft) => ({
      ...draft,
      [cid]: [
        ...(draft[cid] || []),
        { smtp_id: smtps[0]?.id || "", percentage: 0 },
      ],
    }));
  };

  // Remove SMTP row
  const handleRemoveDist = (cid, idx) => {
    setDistDraft((draft) => {
      const arr = [...(draft[cid] || [])];
      arr.splice(idx, 1);
      return { ...draft, [cid]: arr };
    });
  };

  // Save distribution draft
  const handleSaveDist = async (cid) => {
    // Validate total percentage
    const total = (distDraft[cid] || []).reduce(
      (sum, d) => sum + parseFloat(d.percentage || 0),
      0
    );
    if (total > 100) {
      setMessage({
        type: "error",
        text: `Total distribution cannot exceed 100% (Current: ${total.toFixed(1)}%)`,
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/master/distribute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaign_id: cid, distribution: distDraft[cid] }),
      });
      const data = await res.json();
      setMessage({
        type: data.success ? "success" : "error",
        text: data.message || (data.success ? "Distribution saved!" : "Save failed."),
      });
      // Update campaigns data optimistically
      setCampaigns((prev) =>
        prev.map((camp) =>
          camp.campaign_id === cid
            ? { ...camp, current_distributions: distDraft[cid] }
            : camp
        )
      );
    } catch {
      setMessage({ type: "error", text: "Save failed." });
    }
    setLoading(false);
  };

  // Helper: get SMTP by id
  const getSmtp = (id) => smtps.find((s) => s.id === id);

  // Helper: get email count for a distribution
  const getEmailCount = (valid_emails, percentage) =>
    Math.floor((valid_emails * percentage) / 100);

  return (
    <div className="container mx-auto px-4 py-8 mt-12 max-w-7xl">
      <h1 className="text-3xl font-bold mb-4">Bulk Email Campaign Manager</h1>
      {message && (
        <div
          className={`p-4 mb-6 rounded-md shadow-sm flex items-start border-l-4 ${
            message.type === "success"
              ? "bg-green-100 border-green-500 text-green-800"
              : message.type === "error"
              ? "bg-red-100 border-red-500 text-red-800"
              : "bg-blue-100 border-blue-500 text-blue-800"
          }`}
        >
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

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 max-w-6xl">
          {campaigns.map((campaign) => (
            <div
              key={campaign.campaign_id}
              className="bg-white rounded-xl shadow-md overflow-hidden campaign-card"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">
                      {campaign.description}
                    </h2>
                    <p className="text-sm text-gray-600 mb-2">
                      {campaign.mail_subject}
                    </p>
                    <div className="flex items-center space-x-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                        <i className="fas fa-envelope mr-1"></i>
                        {campaign.valid_emails?.toLocaleString()} Emails
                      </span>
                      {campaign.remaining_percentage > 0 ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                          <i className="fas fa-clock mr-1"></i>
                          {campaign.remaining_percentage}% Remaining
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                          <i className="fas fa-check-circle mr-1"></i>
                          Fully Allocated
                        </span>
                      )}
                      <span
                        className={`status-badge px-2 py-1 rounded text-xs font-semibold ${
                          statusColors[
                            (campaign.campaign_status || "pending").toLowerCase()
                          ] || "bg-gray-400"
                        } text-white`}
                      >
                        {campaign.campaign_status || "Not started"}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <button
                      onClick={() => toggleDetails(campaign.campaign_id)}
                      className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded-lg"
                    >
                      <i
                        className={`fas ${
                          expanded[campaign.campaign_id]
                            ? "fa-chevron-up"
                            : "fa-chevron-down"
                        } text-sm`}
                      ></i>
                    </button>
                    <button
                      onClick={() =>
                        handleAction(campaign.campaign_id, "auto_distribute")
                      }
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <i className="fas fa-magic mr-1"></i> Auto-Distribute
                    </button>
                    {campaign.campaign_status === "running" ? (
                      <button
                        onClick={() =>
                          handleAction(campaign.campaign_id, "pause_campaign")
                        }
                        className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-medium"
                      >
                        <i className="fas fa-pause mr-1"></i> Pause
                      </button>
                    ) : campaign.campaign_status === "completed" ? (
                      <span className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg text-sm font-medium">
                        <i className="fas fa-check-circle mr-1"></i> Completed
                      </span>
                    ) : (
                      <button
                        onClick={() =>
                          handleAction(campaign.campaign_id, "start_campaign")
                        }
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium"
                      >
                        <i className="fas fa-play mr-1"></i> Start
                      </button>
                    )}
                    {campaign.failed_emails > 0 &&
                      campaign.campaign_status !== "completed" && (
                        <button
                          onClick={() =>
                            handleAction(campaign.campaign_id, "retry_failed")
                          }
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                        >
                          <i className="fas fa-redo mr-1"></i> Retry Failed
                        </button>
                      )}
                  </div>
                </div>

                {/* Distribution Editor */}
                {expanded[campaign.campaign_id] && (
                  <div className="mt-6">
                    <div className="font-semibold mb-2">Distribution</div>
                    {(distDraft[campaign.campaign_id] || []).map((dist, idx) => {
                      const smtp = getSmtp(dist.smtp_id) || {};
                      const emailCount = getEmailCount(
                        campaign.valid_emails,
                        dist.percentage
                      );
                      const dailyLimit = smtp.daily_limit || 0;
                      const hourlyLimit = smtp.hourly_limit || 0;
                      let warn = "";
                      if (emailCount > dailyLimit) {
                        warn = "Exceeds daily limit";
                      } else if (emailCount > hourlyLimit * 24) {
                        warn = "Review hourly limit";
                      }
                      return (
                        <div
                          key={idx}
                          className="distribution-row flex items-center space-x-4 p-3 bg-gray-50 rounded-lg mb-2"
                        >
                          <select
                            value={dist.smtp_id}
                            onChange={(e) =>
                              handleDistChange(
                                campaign.campaign_id,
                                idx,
                                "smtp_id",
                                e.target.value
                              )
                            }
                            className="flex-1 min-w-0 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select SMTP</option>
                            {smtps.map((smtp) => (
                              <option key={smtp.id} value={smtp.id}>
                                {smtp.name} ({smtp.daily_limit}/day)
                              </option>
                            ))}
                          </select>
                          <div className="relative w-32">
                            <input
                              type="number"
                              min="1"
                              max={100}
                              step="0.1"
                              value={dist.percentage}
                              onChange={(e) =>
                                handleDistChange(
                                  campaign.campaign_id,
                                  idx,
                                  "percentage",
                                  e.target.value
                                )
                              }
                              className="text-sm border border-gray-300 rounded-lg px-3 py-2 pr-8 w-full focus:ring-blue-500 focus:border-blue-500"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                              %
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`email-count text-xs font-medium px-2.5 py-0.5 rounded-full ${
                                warn === "Exceeds daily limit"
                                  ? "bg-red-100 text-red-800"
                                  : warn === "Review hourly limit"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-200 text-gray-800"
                              }`}
                            >
                              ~{emailCount.toLocaleString()} emails{" "}
                              {warn === "Exceeds daily limit" && (
                                <i className="fas fa-exclamation-triangle ml-1"></i>
                              )}
                              {warn === "Review hourly limit" && (
                                <i className="fas fa-exclamation-circle ml-1"></i>
                              )}
                              {warn && (
                                <span className="ml-1">{warn}</span>
                              )}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveDist(campaign.campaign_id, idx)
                              }
                              className="remove-distribution text-red-500 hover:text-red-700 px-2"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => handleAddDist(campaign.campaign_id)}
                      className="mt-2 px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all duration-200"
                    >
                      <i className="fas fa-plus mr-1"></i> Add SMTP Server
                    </button>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-600">
                        {campaign.remaining_percentage > 0 ? (
                          <>
                            <i className="fas fa-info-circle text-blue-500 mr-1"></i>
                            {campaign.remaining_percentage}% remaining to allocate
                          </>
                        ) : (
                          <></>
                        )}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSaveDist(campaign.campaign_id)}
                        className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium"
                      >
                        <i className="fas fa-save mr-1"></i> Save Distribution
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Master;