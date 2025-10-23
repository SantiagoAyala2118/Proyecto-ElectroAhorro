export function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-gradient-to-b from-lima-700 to-lima-400 text-black px-8 py-3 rounded-lg md:text-lg text-md hover:scale-105 hover:from-lima-800 transition-all duration-300 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

