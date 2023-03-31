import React from "react";

function TagsBadge({tags}) {
  return (
    <div className="tags-badge">
      {tags
        .filter((x) => !x.includes("all"))
        .map((x) => (
          <div className="tags-badge-item" key={x}>
            {x}
          </div>
        ))}
    </div>
  );
}

export default TagsBadge;
