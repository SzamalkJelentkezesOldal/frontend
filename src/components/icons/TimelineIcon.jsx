function TimelineIcon({ size, fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 -960 960 960"
      fill={fill}
    >
      <path d="M200-640h560v-80H200zm0 0v-80zm0 560q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v227q-19-9-39-15t-41-9v-43H200v400h252q7 22 16.5 42T491-80zm520 40q-83 0-141.5-58.5T520-240t58.5-141.5T720-440t141.5 58.5T920-240 861.5-98.5 720-40m67-105 28-28-75-75v-112h-40v128z" />
    </svg>
  );
}

export default TimelineIcon;
