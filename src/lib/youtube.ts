import { COMPANY } from "./content";

export type Video = { id: string; title: string; published?: string };

/** Fallback list if all live feeds are unreachable (e.g. offline build). */
const FALLBACK: Video[] = [
  { id: "RqS3zQKKTRQ", title: "Day 3 at REI 2026!" },
  { id: "yH9WnZnG5ds", title: "Day 2 at REI 2026!" },
  { id: "pw_O7U96jX4", title: "Day 1 at REI 2026! ☀️⚡" },
  { id: "DbhvDJYsfEA", title: "Weather Monitoring Systems by AEPL under PM-KUSUM" },
  { id: "w2avEUffxYM", title: "Udaan 2026 – Adaptive Engineering Pvt. Ltd. Annual Meet" },
  { id: "_n0cYUCRMYc", title: "PM KUSUM - ACDB Panel" },
  { id: "O83IwNp57dE", title: "PM KUSUM - HT Panel" },
  { id: "x2dDBAXRuTc", title: "PM KUSUM - Reportwiz" },
];

const BROWSER_HEADERS: Record<string, string> = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "application/atom+xml,application/xml,text/xml,text/html;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

function decode(s: string) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function parseAtomFeed(xml: string): Video[] {
  const entries = xml.split("<entry>").slice(1);
  return entries
    .map((e) => ({
      id: e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1]?.trim() ?? "",
      title: decode(e.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? ""),
      published: e.match(/<published>([^<]+)<\/published>/)?.[1]?.trim(),
    }))
    .filter((v) => v.id && v.title && v.id !== COMPANY.aboutVideoId);
}

function parseYtInitialData(html: string): Video[] {
  const m = html.match(/var ytInitialData\s*=\s*(\{[\s\S]*?\});\s*<\/script>/);
  if (!m) return [];
  try {
    const data = JSON.parse(m[1]);
    const out: Video[] = [];
    const seen = new Set<string>();

    const walk = (node: unknown) => {
      if (!node || typeof node !== "object") return;
      if (Array.isArray(node)) {
        for (const item of node) walk(item);
        return;
      }
      const obj = node as Record<string, any>;
      if (obj.videoRenderer?.videoId) {
        const vr = obj.videoRenderer;
        const id = String(vr.videoId);
        const title =
          vr.title?.runs?.map((r: any) => r.text).join("") ||
          vr.title?.simpleText ||
          "";
        if (id && title && id !== COMPANY.aboutVideoId && !seen.has(id)) {
          seen.add(id);
          out.push({ id, title: title.trim() });
        }
      }
      if (obj.shortsLockupViewModel) {
        const s = obj.shortsLockupViewModel;
        const id = s.onTap?.innertubeCommand?.reelWatchEndpoint?.videoId;
        const rawTitle: string =
          s.overlayMetadata?.primaryText?.content ||
          (typeof s.accessibilityText === "string"
            ? s.accessibilityText.replace(/,\s*\d[\d,.\sKMB]*\s*views?\s*-?\s*play Short$/i, "")
            : "") ||
          "";
        if (id && rawTitle && id !== COMPANY.aboutVideoId && !seen.has(id)) {
          seen.add(id);
          out.push({ id: String(id), title: rawTitle.trim() });
        }
      }
      for (const k of Object.keys(obj)) {
        walk(obj[k]);
      }
    };

    walk(data);
    return out;
  } catch {
    return [];
  }
}

async function fetchVideosFromFeedUrl(url: string): Promise<Video[]> {
  const res = await fetch(url, {
    headers: BROWSER_HEADERS,
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const xml = await res.text();
  return parseAtomFeed(xml);
}

async function fetchVideosFromRss2Json(rssUrl: string): Promise<Video[]> {
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
  const res = await fetch(apiUrl, {
    headers: BROWSER_HEADERS,
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for rss2json`);
  const data = await res.json();
  if (!Array.isArray(data?.items)) return [];
  return data.items
    .map((item: any) => {
      const guid: string = item.guid || item.link || "";
      const id =
        guid.match(/yt:video:([a-zA-Z0-9_-]{11})/)?.[1] ||
        guid.match(/[?&]v=([a-zA-Z0-9_-]{11})/)?.[1] ||
        guid.match(/\/shorts\/([a-zA-Z0-9_-]{11})/)?.[1] ||
        "";
      const title = decode(String(item.title ?? ""));
      return { id, title, published: item.pubDate };
    })
    .filter((v: Video) => v.id && v.title && v.id !== COMPANY.aboutVideoId);
}

async function fetchVideosFromChannelPages(): Promise<Video[]> {
  const base = COMPANY.socials.youtube.replace(/\/+$/, "");
  const [shortsRes, videosRes] = await Promise.allSettled([
    fetch(`${base}/shorts`, {
      headers: BROWSER_HEADERS,
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    }),
    fetch(`${base}/videos`, {
      headers: BROWSER_HEADERS,
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    }),
  ]);
  const combined: Video[] = [];
  const seen = new Set<string>();
  for (const r of [shortsRes, videosRes]) {
    if (r.status === "fulfilled" && r.value.ok) {
      const html = await r.value.text();
      for (const v of parseYtInitialData(html)) {
        if (!seen.has(v.id)) {
          seen.add(v.id);
          combined.push(v);
        }
      }
    }
  }
  return combined;
}

/**
 * Latest uploads from AEPL's public YouTube channel (no API key needed).
 * Tries the channel Atom feed, Uploads playlist Atom feed, rss2json mirror,
 * and channel page ytInitialData before falling back to the static list.
 */
export async function getLatestVideos(limit = 6): Promise<Video[]> {
  const channelFeedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${COMPANY.youtubeChannelId}`;
  const uploadsPlaylistId = `UU${COMPANY.youtubeChannelId.replace(/^UC/, "")}`;
  const playlistFeedUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${uploadsPlaylistId}`;

  const strategies: Array<() => Promise<Video[]>> = [
    () => fetchVideosFromFeedUrl(channelFeedUrl),
    () => fetchVideosFromFeedUrl(playlistFeedUrl),
    () => fetchVideosFromRss2Json(channelFeedUrl),
    () => fetchVideosFromChannelPages(),
  ];

  for (const runStrategy of strategies) {
    try {
      const videos = await runStrategy();
      if (videos.length > 0) {
        const seen = new Set(videos.map((v) => v.id));
        const merged = [...videos, ...FALLBACK.filter((v) => !seen.has(v.id))];
        return merged.slice(0, limit);
      }
    } catch {
      // Try next strategy in chain
    }
  }

  return FALLBACK.slice(0, limit);
}
