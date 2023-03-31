import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import GridItem from "./GridItem";
import EditGridItem from "./EditGridItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchNotes } from "./store/noteSlice";
import PinnedGrid from "./PinnedGrid";
import LoadingGrid from "./LoadingGrid";
export default function Grid() {
  const [selectedId, setSelectedId] = useState({});
  const authToken = useSelector((state) => state.authToken);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch,authToken]);
  const { notes, loading, layout, search, archive, selectedTag } = useSelector((state) => state);
  const filteredNotes = notes
    .filter(
      (x) =>
        x.title.toLocaleLowerCase().includes(search) ||
        x.content.toLocaleLowerCase().includes(search)
    )
    .filter((x) => x.archive === archive)
    .filter((x) => x.tag.includes(selectedTag))
    .filter((x) => x.pin === false);

  return (
    <div className="grid-container">
      <PinnedGrid setSelectedId={setSelectedId} />
      {loading ? (
        <LoadingGrid />
      ) : (
        <div className={layout ? "grid" : "grid list"}>
          <AnimatePresence>
            {filteredNotes.map((item) => (
              <GridItem key={item.id} item={item} setSelectedId={setSelectedId} />
            ))}
            {selectedId.id && (
              <EditGridItem selectedId={selectedId} setSelectedId={setSelectedId} />
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
