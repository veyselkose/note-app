import { AnimatePresence } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import GridItem from "./GridItem";

function PinnedGrid({ setSelectedId }) {
  const { notes, layout } = useSelector((state) => state);
  return (
    <div className={layout ? "grid" : "grid list"}>
      <AnimatePresence>
        {notes
          .filter((x) => x.pin === true)
          .map((x) => (
            <GridItem key={x.id} item={x} setSelectedId={setSelectedId} />
          ))}
      </AnimatePresence>
    </div>
  );
}

export default PinnedGrid;
