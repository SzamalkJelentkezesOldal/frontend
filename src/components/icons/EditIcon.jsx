function EditIcon({ size, className, onClick, fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      className={className}
      viewBox="0 -960 960 960"
      onClick={onClick}
      fill={fill}
    >
      <path d="M200-200h57l391-391-57-57-391 391zm-80 80v-170l528-527q12-11 26.5-17t30.5-6 31 6 26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120zm640-584-56-56zm-141 85-28-29 57 57z" />
    </svg>
  );
}

export default EditIcon;
