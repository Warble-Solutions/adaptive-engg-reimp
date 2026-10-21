import { COMPANY } from "./content";

export type Video = { id: string; title: string; published?: string };

/** Fallback list if the feed can't be reached at build time. */
const FALLBACK: Video[] = [
  { id: "DbhvDJYsfEA", title: "Weather Monitoring Systems by AEPL under PM-KUSUM" },
  { id: "w2avEUffxYM", title: "Udaan 2026 – Adaptive Engineering Pvt. Ltd. Annual Meet" },
  { id: "_n0cYUCRMYc", title: "PM KUSUM – ACDB Panel" },
];

function decode(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/**
 * Latest uploads from the public channel RSS feed (no API key needed).
 * Runs at build time – the list refreshes on every deploy.
 */
export async function getLatestVideos(limit = 6): Promise<Video[]> {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${COMPANY.youtubeChannelId}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const entries = xml.split("<entry>").slice(1);
    const videos = entries
      .map((e) => ({
        id: e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? "",
        title: decode(e.match(/<title>([^<]+)<\/title>/)?.[1] ?? ""),
        published: e.match(/<published>([^<]+)<\/published>/)?.[1],
      }))
      // exclude the About video (shown separately) and Shorts-style empty titles
      .filter((v) => v.id && v.title && v.id !== COMPANY.aboutVideoId);
    return videos.length ? videos.slice(0, limit) : FALLBACK;
  } catch (err) {
    console.warn("[youtube] using fallback list:", err);
    return FALLBACK;
  }
}
