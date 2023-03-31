import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTag, updateNote } from "./store/noteSlice";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
function Tags({ item, setTag ,open}) {
  const [tagSearch, setTagSearch] = useState("");
  const tags = useSelector((state) => state.tags);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tags.filter((x) => x.includes(tagSearch)).length === 0) {
      dispatch(addTag({ ...user, tags: [...tags, tagSearch] }));
      setTagSearch("");
    }
  };
  const handleChecked = item
    ? (x) => {
        const values = {
          id: item.id,
          bgColor: item.bgColor,
          content: item.content,
          title: item.title,
          pin: item.pin,
          archive: item.archive,
          image: item.image,
        };
        const newTag = [...item.tag];
        item.tag.includes(x) ? newTag.splice(newTag.indexOf(x), 1) : newTag.push(x);
        console.log({ ...values, tag: newTag });
        setTag && setTag(newTag);
        dispatch(
          updateNote({
            ...values,
            tag: newTag,
          })
        );
      }
    : "";

  return (
    <motion.div
      className="tags"
      onClick={(e) => e.stopPropagation()}
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={{
        open: open ? open : {
          opacity: 1,
          bottom: "-170px",
          zIndex: 99,
        },
        collapsed: { opacity: 0, bottom: "0", zIndex: -99 },
      }}
    >
      <form onSubmit={handleSubmit} className="tags-form">
        <input
          type="text"
          className="tags-form-input"
          value={tagSearch}
          onChange={(e) => setTagSearch(e.target.value)}
        />
        <button className="tags-form-submit" type="submit">
          {tags.filter((x) => x.includes(tagSearch)).length === 0 ? <Icon icon="material-symbols:add" /> : <Icon icon="material-symbols:search-rounded" />}
        </button>
      </form>
      <ul className="tags-list">
        {tags
          .filter((x) => x.includes(tagSearch))
          .map((x) =>
            item ? (
              <li key={x} className="tags-list-item">
                <input
                  className="tags-list-item-input"
                  type="checkbox"
                  name={item.id + "-tags-" + x}
                  id={item.id + "-tags-" + x}
                  defaultChecked={item.tag.includes(x)}
                  value={x}
                  onChange={() => handleChecked(x)}
                />
                <label className="tags-list-item-label" htmlFor={item.id + "-tags-" + x}>
                  {x}
                </label>
              </li>
            ) : (
              <li key={x} className="tags-list-item">
                {x}{" "}
                <button
                className="tags-list-item-del"
                  onClick={() => {
                    const newTag = [...tags];
                    newTag.splice(newTag.indexOf(x), 1);
                    console.log(newTag);
                    dispatch(addTag({ ...user, tags: [...newTag] }));
                  }}
                >
                  <Icon icon="material-symbols:close" />
                </button>
              </li>
            )
          )}
      </ul>
    </motion.div>
  );
}

export default Tags;
