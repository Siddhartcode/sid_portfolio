"use client";

import { useEffect, useState } from "react";

interface Track {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export default function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await fetch("/api/now-playing");
        const data = await res.json();
        setTrack(data);
      } catch (error) {
        console.error("Failed to fetch track:", error);
      }
    };

    fetchTrack(); // first call on load

    const interval = setInterval(fetchTrack, 5000); // refresh every 10s

    return () => clearInterval(interval);
  }, []);

  if (!track) return null;

  if (!track.isPlaying) {
    return ;
  }

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      
      <p className="italic">Listening to <a href={track.songUrl} className="hover:text-blue-400 -200 cursor-pointer underline-offset-2 " target="_blank">{track.title}</a> from {track.artist}</p>
    </div>
  );
}
