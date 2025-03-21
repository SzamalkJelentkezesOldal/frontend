function MoreIcon({ size, fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || "24"}
      height={size || "24"}
      viewBox="0 -960 960 960"
      fill={fill}
    >
      <path d="M240-400q-33 0-56.5-23.5T160-480t23.5-56.5T240-560t56.5 23.5T320-480t-23.5 56.5T240-400m240 0q-33 0-56.5-23.5T400-480t23.5-56.5T480-560t56.5 23.5T560-480t-23.5 56.5T480-400m240 0q-33 0-56.5-23.5T640-480t23.5-56.5T720-560t56.5 23.5T800-480t-23.5 56.5T720-400" />
    </svg>
  );
}

export default MoreIcon;
