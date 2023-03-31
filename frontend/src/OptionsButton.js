import { Icon } from "@iconify/react";

function OptionsButton({ handleClick, icon }) {
  return (
    <button className="options-button" onClick={handleClick}>
      <Icon icon={icon} width="18" height="18" />
    </button>
  );
}

export function OptionsEditButton({ handleClick, text }) {
  return (
    <button className="options-edit-btn" onClick={handleClick}>
      {text}
    </button>
  );
}

export default OptionsButton;

export function OptionsImageButton({handleFile,icon}) {
  return (
    <label htmlFor="image" className="options-button">
      <input
        id="image"
        name="image"
        type="file"
        onChange={handleFile}
        style={{ display: "none" }}
      />
      <Icon icon={icon} width="18" height="18" />
    </label>
  );
}
