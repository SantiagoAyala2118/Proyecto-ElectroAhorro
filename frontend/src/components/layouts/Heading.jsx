export const Heading = ({ highlight, heading }) => {
  return (
    <div className="w-fit mx-auto">
      <h2 className="text-5xl font-bold">
        <span className="text-lime-500">{highlight} </span>
        <span className="text-blue-950">{heading}</span>
      </h2>

      <div className="w-50 h-1 bg-lime-400 mt-3 ml-auto"></div>
    </div>
  );
};
