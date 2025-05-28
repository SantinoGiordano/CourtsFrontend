import React, { useEffect, useState } from "react";

const AccountToast = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="toast">
      <div
        className={`alert bg-blue-500 text-white rounded-lg shadow-lg transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ minHeight: "60px", minWidth: "250px", maxWidth: "350px" }}
      >
        <span className="text-lg font-semibold">Account Created!</span>
      </div>
    </div>
  );
};

export default AccountToast;
