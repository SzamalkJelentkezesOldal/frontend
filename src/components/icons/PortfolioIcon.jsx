function PortfolioIcon({ size, fill }) {
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   width={size || 24}
    //   height={size || 24}
    //   viewBox="0 -960 960 960"
    //   fill={fill || "currentColor"}
    // >
    //   <path d="M440-280h320v-22q0-45-44-71.5T600-400t-116 26.5-44 71.5zm160-160q33 0 56.5-23.5T680-520t-23.5-56.5T600-600t-56.5 23.5T520-520t23.5 56.5T600-440M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160zm0-80h640v-400H447l-80-80H160zm0 0v-480z" />
    // </svg>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 -960 960 960"
      fill={fill || "currentColor"}
    >
      <path d="M160-240v-480 172-12zm0 80q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v131q-18-13-38-22.5T800-548v-92H447l-80-80H160v480h283q3 21 9.5 41t15.5 39zm400 0v-22q0-45 44-71.5T720-280t116 26.5 44 71.5v22zm160-160q-33 0-56.5-23.5T640-400t23.5-56.5T720-480t56.5 23.5T800-400t-23.5 56.5T720-320" />
    </svg>
  );
}

export default PortfolioIcon;
