function RejectIcon({ size, fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || "24"}
      height={size || "24"}
      viewBox="0 -960 960 960"
      fill={fill}
    >
      <path d="M330-120 120-330v-300l210-210h300l210 210v300L630-120zm36-190 114-114 114 114 56-56-114-114 114-114-56-56-114 114-114-114-56 56 114 114-114 114zm-2 110h232l164-164v-232L596-760H364L200-596v232zm116-280" />
    </svg>
  );
}

export default RejectIcon;
