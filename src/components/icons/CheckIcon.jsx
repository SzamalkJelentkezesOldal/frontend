function CheckIcon({ className, size, fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || "24"}
      height={size || "24"}
      className={className}
      viewBox="0 -960 960 960"
      fill={fill}
    >
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57z" />
    </svg>
  );
}

export default CheckIcon;
