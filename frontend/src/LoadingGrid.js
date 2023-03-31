import { AnimatePresence } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import SkeletonLoading from "./SkeletonLoading";

function LoadingGrid() {
  const { layout } = useSelector((state) => state);
  return (
    <div className={layout ? "grid" : "grid list"}>
      <AnimatePresence>
        {Array(20)
          .fill()
          .map(() => (
            <SkeletonLoading key={Math.random()} />
          ))}
      </AnimatePresence>
    </div>
  );
}

export default LoadingGrid;
