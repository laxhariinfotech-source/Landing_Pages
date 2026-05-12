import { useEffect } from "react";
import HubSpotForm from "../components/HubSpotForm";
import { updatePageMetadata, pageMetadata } from "../utils/seoMetadata";

const JoinWaitlist = () => {
  useEffect(() => {
    updatePageMetadata(pageMetadata.waitlist);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "32px",
        paddingBottom: "48px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "#f9fafb",
      }}
    >
      <HubSpotForm />
    </div>
  );
};

export default JoinWaitlist;
