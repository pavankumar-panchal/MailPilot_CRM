import React, { useEffect, useState } from "react";

const API_CAMPAIGNS = "/backend/routes/api.php/api/campaigns-master";

const Master = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_CAMPAIGNS);
        const data = await res.json();
        setCampaigns(Array.isArray(data) ? data : []);
      } catch {
        setMessage({ type: "error", text: "Failed to load data." });
      }
      setLoading(false);
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 mt-12 max-w-7xl">
      <h1 className="text-3xl font-bold mb-4">Bulk Email Campaign Manager</h1>
      {message && (
        <div className="p-4 mb-6 rounded-md shadow-sm bg-red-100 text-red-800">
          {message.text}
        </div>
      )}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 max-w-6xl">
          {campaigns.map((campaign) => (
            <div key={campaign.campaign_id} className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {campaign.description}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{campaign.mail_subject}</p>
              {/* Add more campaign fields as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Master;