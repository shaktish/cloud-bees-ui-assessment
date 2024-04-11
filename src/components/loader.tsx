import CircularProgress from "@mui/material/CircularProgress";

const Loader = ({ size = 40, thickness = 4 }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress size={size} thickness={thickness} />
    </div>
  );
};

export default Loader;
