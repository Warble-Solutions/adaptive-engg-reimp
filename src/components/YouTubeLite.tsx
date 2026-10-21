"use client";

import { useState } from "react";
import Icon from "./Icon";
import s from "./YouTubeLite.module.css";

/** Lightweight YouTube embed – loads the heavy iframe only when clicked. */
export default function YouTubeLite({ id, title, className }: { id: string; title: string; className?: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className={`${s.wrap} ${className ?? ""}`}>
      {play ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button className={s.poster} onClick={() => setPlay(true)} aria-label={`Play video: ${title}`} id={`yt-${id}`}>
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
          <span className={s.play}>
            <Icon name="play" />
          </span>
        </button>
      )}
    </div>
  );
}
