import React from "react";

function LezartIcon({ size, fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || "24"}
      height={size || "24"}
      viewBox="0 -960 960 960"
      fill={fill || "#000"}
    >
      <path d="M268-240 42-466l57-56 170 170 56 56zm226 0L268-466l56-57 170 170 368-368 56 57zm0-226-57-56 198-198 57 56z" />
    </svg>
  );
}

export default LezartIcon;
