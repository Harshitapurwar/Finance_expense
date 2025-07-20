// pages/ReceiptScanPage.js

import React, { useState } from "react";
import ReceiptScanner from "../components/GeminiUpload";
// import DashboardHeader from "./SideHeader";

function ReceiptScanPage() {
  const [data, setData] = useState(null);

  const handleScanComplete = (result) => {
    console.log("Scanned result:", result);
    setData(result);
  };

  return (
    <div>
      {/* <DashboardHeader /> */}
      <h2>AI Receipt Scanner</h2>
      <ReceiptScanner onScanComplete={handleScanComplete} />
      {data && (
        <div>
          <h3>Scanned Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ReceiptScanPage;
