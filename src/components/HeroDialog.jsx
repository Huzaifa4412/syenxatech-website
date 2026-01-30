"use client";

import React from "react";
import { HeroVideoDialog } from "./ui/hero-video-dialog";

const HeroDialog = () => {
  return (
    <>
     <div className="w-full h-full flex items-center justify-center">
      <iframe width="900" height="600" src="https://www.youtube.com/embed/sqfogWpfa8M?si=xdullKRD1rlQxwwc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
     </div>
    </>
  );
};

export default HeroDialog;
