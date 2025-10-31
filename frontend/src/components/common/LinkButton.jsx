export const LinkButton = ({ onNavigate, location }) => {
  return (
    <>
      <div>
        <li>
          <a
            onClick={onNavigate()}
            className="cursor-pointer font-semibold tracking-wider text-lime-400 hover:text-white"
          >
            {location}
          </a>
        </li>
      </div>
    </>
  );
};
