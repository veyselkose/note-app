import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchNote } from "./store/noteSlice";

function Search() {
  const [value, setfirst] = useState("");
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setfirst(e.target.value);
    dispatch(searchNote(e.target.value))
  };
  return (
    <input
      type="search"
      name="search"
      id="search"
      value={value}
      onChange={handleChange}
      className="search-input"
      placeholder=" Search.."
    />
  );
}

export default Search;
