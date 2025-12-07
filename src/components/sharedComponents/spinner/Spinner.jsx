import { CircularProgress } from "@mui/material";
import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <CircularProgress sx={{ color: "#ff7236" }} enableTrackSlot size={30} />
    </div>
  );
};

export default Spinner;
