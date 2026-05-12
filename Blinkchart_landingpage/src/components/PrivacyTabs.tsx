import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LegalTabs = () => {
  const [activeTab, setActiveTab] = useState("terms");
  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    navigate("/");
  };

  return (
    <div className="legal-tabs">
      <button onClick={() => handleTabClick("terms")} className={activeTab === "terms" ? "active" : ""}>Terms of Service</button>
      <button onClick={() => handleTabClick("privacy")} className={activeTab === "privacy" ? "active" : ""}>Privacy Policy</button>
      <button onClick={() => handleTabClick("acceptable-use")} className={activeTab === "acceptable-use" ? "active" : ""}>Acceptable Use</button>
      <button onClick={() => handleTabClick("disclaimer")} className={activeTab === "disclaimer" ? "active" : ""}>Disclaimer</button>
    </div>
  );
};

export default LegalTabs;
