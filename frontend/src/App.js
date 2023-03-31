import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import TakeNote from "./TakeNote";
import { Icon } from "@iconify/react";
import Search from "./Search";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  archiveShow,
  layoutStyle,
  changeSelectedTag,
  changeTheme,
  isRemember,
  logout,
} from "./store/noteSlice";
import Auth from "./Auth";
import Tags from "./Tags";

function App() {
  const [isOpen, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);
  const layout = useSelector((state) => state.layout);
  const theme = useSelector((state) => state.theme);
  const archive = useSelector((state) => state.archive);
  const tags = useSelector((state) => state.tags);
  const authToken = useSelector((state) => state.authToken);
  const user = useSelector((state) => state.user);
  const selectedTag = useSelector((state) => state.selectedTag);
  const dispatch = useDispatch();
  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty("--activeColor", theme ? "#3b3b3b" : "#ffffff");
    root?.style.setProperty("--activeFontColor", theme ? "#ffffff" : "#3b3b3b");
    root?.style.setProperty("--secondaryActiveColor", theme ? "#2b2b2b" : "#eeeeee");
  }, [theme]);
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      dispatch(isRemember());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="main">
      <header className="header">
        <Search />
        <TakeNote isOpen={isOpen} setOpen={setOpen} theme={theme} />
        <button className="takeNoteOpenMobile" onClick={()=> setOpen(!isOpen)}><Icon icon="material-symbols:add" width="28" height="28" /></button>
        <button
          className="options-menu-button"
          onClick={() => {
            setMenu(!menu);
          }}
        >
          <Icon icon="mdi:menu" width="28" height="28" />
        </button>

        <div className={`options ${menu ? "active" : ""}`}>
          <button
            className="options-button"
            onClick={() => dispatch(layoutStyle({ ...user, layout: !layout }))}
          >
            {!layout ? (
              <Icon icon="bi:grid" width="28" height="28" />
            ) : (
              <Icon icon="bi:view-stacked" width="24" height="24" />
            )}
          </button>

          <button
            className="options-button"
            onClick={() => dispatch(changeTheme({ ...user, theme: !theme }))}
          >
            <Icon icon="fluent:dark-theme-20-filled" width="28" height="28" />
          </button>

          <motion.button
            onClick={() => dispatch(archiveShow())}
            animate={{ filter: archive ? "invert(1)" : "invert(0)" }}
            className="options-button"
          >
            <Icon icon="bx:archive" width="28" height="28" />
          </motion.button>

          {authToken && (
            <button className="options-button" onClick={() => {dispatch(logout());setMenu(!menu)}}>
              <Icon icon="material-symbols:logout" width="28" height="28" />
            </button>
          )}
          <button className="options-button" onClick={() => setMenu(!menu)}>
            <Icon icon="mdi:hamburger-menu-back" rotate={2} width="28" height="28" />
          </button>
        </div>
      </header>

      <div className="header-tags">
        <ul className="header-tags-list">
          <li key="settings" className="header-tags-item">
            <button className="header-tags-item-button" onClick={() => setTagsOpen(!tagsOpen)}>
              <Icon icon="mdi:mixer-settings" width="18" height="18" />
            </button>
            {tagsOpen && (
              <>
                <motion.div
                  onClick={(e) => {
                    e.stopPropagation();
                    setTagsOpen(!tagsOpen);
                  }}
                  className="closeBg"
                ></motion.div>

                <Tags />
              </>
            )}
          </li>
          <li
            key="all"
            className={selectedTag === "all" ? "header-tags-item active" : "header-tags-item"}
          >
            <button
              className="header-tags-item-button"
              onClick={() => dispatch(changeSelectedTag("all"))}
            >
              all
            </button>
          </li>
          {tags.map((x) => (
            <li
              key={x}
              className={selectedTag === x ? "header-tags-item active" : "header-tags-item"}
            >
              <button
                className="header-tags-item-button"
                onClick={() => dispatch(changeSelectedTag(x))}
              >
                {x}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <Grid />

      {!authToken && <Auth />}
    </main>
  );
}

export default App;
