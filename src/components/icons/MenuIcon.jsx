function MenuIcon({ className, isOpen }) {
  return isOpen ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 -960 960 960"
      className={className}
      fill="white"
    >
      <path d="M120-240v-80h520v80zm664-40L584-480l200-200 56 56-144 144 144 144zM120-440v-80h400v80zm0-200v-80h520v80z" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 -960 960 960"
      className={className}
      fill="white"
    >
      <path d="M120-240v-80h720v80zm0-200v-80h720v80zm0-200v-80h720v80z" />
    </svg>
  );
}

export default MenuIcon;
