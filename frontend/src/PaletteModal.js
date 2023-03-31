import { motion } from "framer-motion";

export default function PaletteModal({ noteBgColor, setNoteBgColor,open }) {
  return (
    <motion.div
      className="palette-modal"
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={{
        open: open,
        collapsed: { opacity: 0, bottom: 0, zIndex: -1 },
      }}
      
    >
      <input
        type="radio"
        name="color"
        value="var(--secondaryActiveColor)"
        id="default"
        checked={noteBgColor === "var(--secondaryActiveColor)"}
        onChange={(e) => setNoteBgColor(e.target.value)}
      />
       <label htmlFor="default"></label>
      <input
        type="radio"
        name="color"
        value="rgba(232, 65, 24,1.0)"
        id="red"
        checked={noteBgColor === "rgba(232, 65, 24,1.0)"}
        onChange={(e) => setNoteBgColor(e.target.value)}
      />
      <label htmlFor="red"></label>
      <input
        type="radio"
        name="color"
        value="rgba(68, 189, 50,1.0)"
        id="green"
        checked={noteBgColor === "rgba(68, 189, 50,1.0)"}
        onChange={(e) => setNoteBgColor(e.target.value)}
      />
      <label htmlFor="green"></label>
      <input
        type="radio"
        name="color"
        value="rgba(0, 151, 230,1.0)"
        id="blue"
        checked={noteBgColor === "rgba(0, 151, 230,1.0)"}
        onChange={(e) => setNoteBgColor(e.target.value)}
      />
      <label htmlFor="blue"></label>
      <input
        type="radio"
        name="color"
        value="rgba(140, 122, 230,1.0)"
        id="purple"
        checked={noteBgColor === "rgba(140, 122, 230,1.0)"}
        onChange={(e) => setNoteBgColor(e.target.value)}
      />
      <label htmlFor="purple"></label>
      <input
        type="radio"
        name="color"
        value="rgba(225, 177, 44,1.0)"
        id="yellow"
        checked={noteBgColor === "rgba(225, 177, 44,1.0)"}
        onChange={(e) => setNoteBgColor(e.target.value)}
      />
      <label htmlFor="yellow"></label>
    </motion.div>
  );
}
