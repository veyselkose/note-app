import { Icon } from "@iconify/react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import fitcontenxt from "./utils";
import PaletteModal from "./PaletteModal";
import { useDispatch } from "react-redux";
import { deleteNote, updateNote } from "./store/noteSlice";
import Tags from "./Tags";
import OptionsButton, { OptionsEditButton } from "./OptionsButton";
import TagsBadge from "./TagsBadge";
export default function EditGridItem({ selectedId, setSelectedId }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [tagShow, setTagShow] = useState(false);
  const [noteBgColor, setNoteBgColor] = useState(selectedId.bgColor);
  const [content, setContent] = useState(selectedId.content);
  const [title, setTitle] = useState(selectedId.title);
  const [tag, setTag] = useState(selectedId.tag);
  const [pin, setPin] = useState(selectedId.pin);
  const [image, setImage] = useState(selectedId.image);
  const dispatch = useDispatch();
  const values = {
    id: selectedId.id,
    bgColor: noteBgColor,
    content: content,
    title: title,
    tag: tag,
    pin: pin,
    archive: selectedId.archive,
    image: image,
  };
  const handlePalleteOpen = (e) => {
    e.stopPropagation();
    setPaletteOpen(!paletteOpen);
  };
  const handleTagOpen = (e) => {
    e.stopPropagation();
    setTagShow(!tagShow);
  };
  const handleSubmit = () => {
    console.log(values);
    dispatch(updateNote(values));
    setSelectedId({});
  };
  const handleArchive = (e) => {
    e.stopPropagation();
    dispatch(
      updateNote({
        ...values,
        archive: !selectedId.archive,
      })
    );
    setSelectedId({});
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteNote({ id: selectedId.id }));
    setSelectedId({});
  };
  const handlePin = (e) => {
    e.stopPropagation();
    setPin(!pin);
  };
  const handleImage = (e) => {
    e.stopPropagation();
    setImage(e.target.files[0]);
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      setImage(e.target.result);
    };
  };
  return (
    <>
      <motion.div
        className="grid-item active"
        layoutId={selectedId.id}
        style={{ background: noteBgColor }}
      >
        <div className="scroll">
          <div className="title-row">
            <motion.input
              type="text"
              className="grid-item-title"
              name="grid-item-title"
              id="grid-item-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button className="grid-item-pin" style={{ opacity: "1" }} onClick={handlePin}>
              <Icon
                icon={`material-symbols:push-pin${pin ? "" : "-outline"}`}
                width="24"
                height="24"
              />
            </button>
          </div>
          {image && <img src={image} alt="" className="grid-item-image" />}
          {image && (
            <div className="grid-item-imgRemove-container">
              <button className="grid-item-imgRemove-container-btn" onClick={() => setImage("")}>
                <Icon icon="mdi:trash" width="24" height="24" />
              </button>
            </div>
          )}
          <motion.textarea
            onInput={fitcontenxt}
            className="grid-item-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoFocus={true}
            onFocus={fitcontenxt}
          />
          <TagsBadge tags={tag} />
        </div>
        <div className="item-row">
          <OptionsButton handleClick={handlePalleteOpen} icon="bi:palette-fill" />
          <label htmlFor="image" className="options-button">
            <input
              id="image"
              name="image"
              type="file"
              onChange={handleImage}
              style={{ display: "none" }}
            />
            <Icon icon="clarity:picture-solid" width="18" height="18" />
          </label>
          <OptionsButton handleClick={handleTagOpen} icon="mdi:tag-plus" />
          <OptionsButton handleClick={handleArchive} icon="bx:archive-in" />
          <OptionsButton handleClick={handleDelete} icon="ion:trash-sharp" />
          <OptionsEditButton handleClick={handleSubmit} text="Close" />
          <AnimatePresence initial={false}>
            {paletteOpen && (
              <PaletteModal
                noteBgColor={noteBgColor}
                setNoteBgColor={setNoteBgColor}
                open={{
                  opacity: 1,
                  bottom: "-67px",
                  zIndex: 1,
                  left: 0,
                  backgroundColor: noteBgColor,
                }}
              />
            )}
            {tagShow && (
              <Tags
                item={values}
                setTag={setTag}
                open={{
                  opacity: 1,
                  bottom: "50px",
                  zIndex: 99,
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <motion.div onClick={handleSubmit} className="fixedbg"></motion.div>
    </>
  );
}
