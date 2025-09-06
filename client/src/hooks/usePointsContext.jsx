import { useContext } from "react";
import { PointsContext } from "../context/PointsContext";

export const usePointsContext = () => {
  const context = useContext(PointsContext);

  if (!context) {
    throw new Error(
      "usePointsContext must be used inside a PointsContextProvider"
    );
  }

  return context;
};
