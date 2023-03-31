import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import PaletteModal from "./PaletteModal";
import { Icon } from "@iconify/react";
import fitcontenxt from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "./store/noteSlice";
import OptionsButton from "./OptionsButton";
function TakeNote({ isOpen, setOpen }) {
  const [noteBgColor, setNoteBgColor] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  useEffect(() => {
    setNoteBgColor(theme ? "#2b2b2b" : "#eeeeee");
  }, [theme]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "inherit";
  }, [isOpen]);

  const ClearForms = () => {
    setContent("");
    setTitle("");
    setImage("");
    setNoteBgColor("var(--secondaryActiveColor)");
    setPaletteOpen(false);
    setOpen(false);
  };
  const handleFile = (e) => {
    setImage(e.target.files[0]);
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      setImage(e.target.result);
    };
  };
  const values = {
    bgColor:
      // eslint-disable-next-line eqeqeq
      noteBgColor == "#2b2b2b" || noteBgColor == "#eeeeee"
        ? "var(--secondaryActiveColor)"
        : noteBgColor,
    content: content,
    title: title,
    tag: ["all"],
    pin: false,
    time: Date.now(),
    archive: false,
    image: image,
  };
  const handleSubmit = async (values) => {
    console.log(values);
    if (content || image || title) {
      await dispatch(createNote(values));
    }
    ClearForms();
  };
  return (
    <motion.div className={`takeNote ${isOpen ? "mobileActive" : " "}`}>
      <motion.div
        className="createNote"
        initial={{ backgroundColor: noteBgColor }}
        onClick={() => setOpen(true)}
        animate={{
          height: isOpen ? "auto" : "50px",
          backgroundColor: noteBgColor,
        }}
      >
        <div className="createNote-container">
          <motion.input
            type="text"
            className="note-title"
            name="note-title"
            id="note-title"
            value={title}
            placeholder={isOpen ? "Title" : "Take Note..."}
            onChange={(e) => setTitle(e.target.value)}
            initial={{ backgroundColor: noteBgColor }}
            animate={{
              backgroundColor: noteBgColor,
            }}
          />
          {image && <img src={image} alt="" className="createNote-container-image" />}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.section
                key="content"
                className="openedArea"
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring" }}
              >
                <motion.textarea
                  className="note-area"
                  name="note-area"
                  id="note-area"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Take Note..."
                  onInput={fitcontenxt}
                  initial={{ backgroundColor: noteBgColor }}
                  animate={{
                    backgroundColor: noteBgColor,
                  }}
                ></motion.textarea>

                <div className="row">
                  <OptionsButton
                    handleClick={() => setPaletteOpen(!paletteOpen)}
                    icon={`bi:palette-fill`}
                  />
                  <label htmlFor="image" className="options-button">
                    <input
                      id="image"
                      name="image"
                      type="file"
                      onChange={handleFile}
                      style={{ display: "none" }}
                    />
                    <Icon icon="clarity:picture-solid" width="18" height="18" />
                  </label>
                  <OptionsButton
                    handleClick={(e) => {
                      e.stopPropagation();
                      handleSubmit({ ...values, archive: true });
                    }}
                    icon={`bx:archive-in`}
                  />
                  <motion.button
                    type="submit"
                    className="note-add-btn"
                    initial={{ backgroundColor: noteBgColor }}
                    animate={{ backgroundColor: noteBgColor }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubmit(values);
                    }}
                  >
                    Close
                  </motion.button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence initial={false}>
          {paletteOpen && (
            <PaletteModal
              noteBgColor={noteBgColor}
              setNoteBgColor={setNoteBgColor}
              open={{
                opacity: 1,
                bottom: window.innerWidth < 1024 ? "67px" : "-67px",
                zIndex: 1,
                backgroundColor: noteBgColor,
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default TakeNote;
