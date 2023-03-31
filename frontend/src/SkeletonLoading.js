import React from "react";
import Skeleton from "react-loading-skeleton"; // importing the skeleton component
import "react-loading-skeleton/dist/skeleton.css"; // importing the css for the animation

export default function SkeletonLoading() {
  return (
    <div className="noteSkeleton">
      <Skeleton
        className=""
        baseColor="var(--activeColor)"
        highlightColor="var(--secondaryActiveColor)"
      />
      <Skeleton
        className=""
        baseColor="var(--activeColor)"
        highlightColor="var(--secondaryActiveColor)"
      />
      <Skeleton
        className="loadingBtn"
        baseColor="var(--activeColor)"
        highlightColor="var(--secondaryActiveColor)"
      />
    </div>
  );
}
