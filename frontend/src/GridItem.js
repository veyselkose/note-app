import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { deleteNote, updateNote } from "./store/noteSlice";
import Tags from "./Tags";
import TagsBadge from "./TagsBadge";
import OptionsButton, { OptionsEditButton } from "./OptionsButton";
export default function GridItem({ item, setSelectedId }) {
  const dispatch = useDispatch();
  const [tagShow, setTagShow] = useState(false);
  const values = {
    id: item.id,
    bgColor: item.bgColor,
    content: item.content,
    title: item.title,
    tag: item.tag,
    pin: item.pin,
    archive: item.archive,
    image: item.image,
  };
  const handlePin = (e) => {
    e.stopPropagation();
    dispatch(
      updateNote({
        ...values,
        pin: !item.pin,
      })
    );
  };
  const handleArchive = (e) => {
    e.stopPropagation();
    dispatch(
      updateNote({
        ...values,
        archive: !item.archive,
      })
    );
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteNote({ id: item.id }));
  };
  const handleTagOpen = (e) => {
    e.stopPropagation();
    setTagShow(!tagShow);
  };
  return (
    <motion.div
      className="grid-item"
      key={item.id}
      style={{ background: item.bgColor }}
      layoutId={item.id}
      onClick={() => setSelectedId(item)}
    >
      <div className="title-row">
        <motion.h2 className="grid-item-title">{item.title}</motion.h2>
        <button className="grid-item-pin" style={{ opacity: item.pin && "1" }} onClick={handlePin}>
          <Icon
            icon={`material-symbols:push-pin${item.pin ? "" : "-outline"}`}
            width="24"
            height="24"
          />
        </button>
      </div>
      {item.image && <img src={item.image} alt="" className="grid-item-image" />}

      <motion.p>{item.content}</motion.p>
      <TagsBadge tags={item.tag} />
      <div className="item-row">
        <OptionsButton
          handleClick={handleArchive}
          icon={`bx:archive-${item.archive ? "out" : "in"}`}
        />
        <OptionsButton handleClick={handleDelete} icon="ion:trash-sharp" />
        <OptionsButton handleClick={handleTagOpen} icon="mdi:tag-plus" />
        <OptionsEditButton handleClick={() => setSelectedId(item)} text="Edit" />
      </div>
      <AnimatePresence>
        {tagShow && (
          <>
            <motion.div
              onClick={(e) => {
                e.stopPropagation();
                setTagShow(!tagShow);
              }}
              className="closeBg"
            ></motion.div>
            <Tags item={item} />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
