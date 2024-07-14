import React from "react";
import withAuth from "./withAuth";

const MaliciousUrl: React.FC = () => {
  return <div>This is the malicious URL page.</div>;
};

export default withAuth(MaliciousUrl);
