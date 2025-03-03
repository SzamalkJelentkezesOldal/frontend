function DokumentumokIcon({ size, fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 -960 960 960"
      fill={fill}
    >
      <path d="M320-280h320v-22q0-45-44-71.5T480-400t-116 26.5-44 71.5zm160-160q33 0 56.5-23.5T560-520t-23.5-56.5T480-600t-56.5 23.5T400-520t23.5 56.5T480-440M160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120zm0-80h640v-480H638l-73-80H395l-73 80H160zm320-240" />
    </svg>
  );
}

export default DokumentumokIcon;
