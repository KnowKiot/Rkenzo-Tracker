"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { ERAS, MUSIC_VIDEOS, RATINGS, SONGS, TRACKLISTS, TRACKER_UPDATES } from './data';
import type { TrackEntry, Tracklist, TrackerUpdateItem } from './data';

// ─────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────

const eraAccent = (eraName: string) =>
  ERAS.find((e) => e.name === eraName)?.accent ?? '#71717a';

const statusColor = (status: string) => {
  switch (status) {
    case 'Released':  return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'Snippet':   return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    case 'Vaulted':   return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    case 'Scrapped':  return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    case 'Leaked':    return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    case 'Throwaway': return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
    default:          return 'bg-red-500/20 text-red-300 border-red-500/30';
  }
};

const RELEASED_STATUSES = ['Released'];
const PREVIEWED_STATUSES = ['Snippet', 'Leaked'];
const isUnreleased = (status: string) => !RELEASED_STATUSES.includes(status) && !PREVIEWED_STATUSES.includes(status);

const ERA_YEAR: Record<string, number> = {
  'Momentary Bliss': 2026,
  'OS2S: Extended Edition': 2025,
  'One Shot To Shine': 2024,
  'Young Kenz': 2023,
  'Rkenzo Foundation': 2022,
};

const parseReleaseTimestamp = (dateString?: string) => {
  if (!dateString) return 0;
  const timestamp = Date.parse(dateString);
  if (!Number.isNaN(timestamp)) return timestamp;
  const year = Number(dateString.slice(0, 4));
  if (!Number.isNaN(year) && year > 0) {
    return new Date(year, 11, 31).getTime();
  }
  return 0;
};

const getRatingLabel = (emoji: string) => RATINGS.find((r) => r.emoji === emoji)?.label ?? 'Unrated';
const getRatingDescription = (emoji: string) => RATINGS.find((r) => r.emoji === emoji)?.description ?? 'No description available.';
const getRatingTooltip = (emoji: string) => {
  const label = getRatingLabel(emoji);
  const description = getRatingDescription(emoji);
  return `${label} — ${description}`;
};

// ─────────────────────────────────────────────
//  Animated Era Panel
// ─────────────────────────────────────────────

function EraPanel({
  era,
  songs,
}: {
  era: (typeof ERAS)[number];
  songs: typeof SONGS;
}) {
  const [open, setOpen] = useState(true);
  const bodyRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="rounded-3xl overflow-hidden shadow-2xl border"
      style={{ borderColor: `${era.accent}40`, background: '#18181b' }}
    >
      {/* ── Banner ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left flex items-stretch min-h-[96px] sm:min-h-[120px] transition-all duration-200 hover:brightness-110 focus:outline-none"
        style={{ background: era.accentBg }}
        aria-expanded={open}
      >
        {/* Accent bar */}
        <div
          className="w-1.5 flex-shrink-0 transition-all duration-300"
          style={{ background: era.accent }}
        />

        {/* Era image */}
        <div className="w-24 sm:w-40 flex-shrink-0 flex items-center justify-center overflow-hidden bg-zinc-800">
          {era.image ? (
            <img src={era.image} alt={era.name} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center gap-1 text-zinc-600 text-center px-2">
              <span className="text-3xl">🖼️</span>
              <span className="text-xs">No image</span>
            </div>
          )}
        </div>

        {/* Era info */}
        <div
          className="flex-1 p-4 sm:p-6 flex flex-col justify-center border-l"
          style={{ borderColor: `${era.accent}30` }}
        >
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: era.accent }}>
              {era.name}
            </h2>
            <span
              className="text-zinc-400 text-lg mr-2 flex-shrink-0 transition-transform duration-300"
              style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', display: 'inline-block' }}
            >
              ▾
            </span>
          </div>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 leading-relaxed break-words">{era.description}</p>
          <div className="flex flex-wrap gap-2 sm:gap-4 mt-3 text-xs sm:text-sm" style={{ color: `${era.accent}99` }}>
            <span>{songs.length} song{songs.length !== 1 ? 's' : ''}</span>
            <span>{songs.filter((s) => s.status === 'Released').length} released</span>
            <span>{songs.filter((s) => s.status === 'Snippet').length} snippets</span>
            <span>{songs.filter((s) => s.status === 'Leaked').length} leaks</span>
            <span>
              {songs.filter((s) => ['Unreleased', 'Vaulted', 'Scrapped'].includes(s.status)).length} unreleased
            </span>
          </div>
        </div>
      </button>

      {/* ── Animated body ── */}
      <div
        ref={bodyRef}
        className="overflow-hidden"
        style={{
          maxHeight: open ? '9999px' : '0px',
          opacity: open ? 1 : 0,
          transition: open
            ? 'max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease 0.05s'
            : 'max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease',
        }}
      >
        <div style={{ borderTop: `1px solid ${era.accent}25` }}>
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className="text-zinc-500 text-xs uppercase tracking-wider"
                  style={{ borderBottom: `1px solid ${era.accent}20` }}
                >
                  {['Rating', 'Song', 'Status', 'Producer', 'Filename', 'Notes', 'Link'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {songs.map((song, i) => (
                  <tr
                    key={i}
                    className="hover:bg-white/5 transition-colors duration-150"
                    style={{ borderBottom: `1px solid ${era.accent}15` }}
                  >
                    <td className="px-5 py-4 text-xl">
                      <span title={getRatingTooltip(song.rating || '—')}>{song.rating || '—'}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-medium text-white">{song.title}</span>
                      {song.altNames && song.altNames.length > 0 && (
                        <p className="text-zinc-500 text-xs mt-1">
                          {song.altNames.join(', ')}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColor(song.status)}`}
                      >
                        {song.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-zinc-300 text-sm whitespace-nowrap">{song.producer}</td>
                    <td className="px-5 py-4 text-zinc-400 font-mono text-xs break-all">{song.filename || '—'}</td>
                    <td className="px-5 py-4 text-zinc-400 text-sm max-w-xs break-words">{song.notes}</td>
                    <td className="px-5 py-4">
                      {song.links && song.links.length > 0 ? (
                        <div className="flex flex-col gap-1">
                          {song.links.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition text-sm whitespace-nowrap block"
                            >
                              Link {linkIndex + 1} ↗
                            </a>
                          ))}
                        </div>
                      ) : (
                        <span className="text-zinc-600 text-sm">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden divide-y divide-zinc-800/70">
            {songs.map((song, i) => (
              <div key={i} className="px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg">{song.rating || '—'}</span>
                      <span className="font-medium text-white break-words">{song.title}</span>
                    </div>
                    {song.altNames && song.altNames.length > 0 && (
                      <p className="text-zinc-500 text-xs mt-1 break-words">{song.altNames.join(', ')}</p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColor(song.status)}`}>
                        {song.status}
                      </span>
                      {song.producer ? <span className="text-zinc-400 text-xs">by {song.producer}</span> : null}
                    </div>
                    {song.filename ? (
                      <p className="mt-2 text-[11px] font-mono text-zinc-500 break-all">{song.filename}</p>
                    ) : null}
                    {song.notes ? (
                      <p className="mt-2 text-sm text-zinc-400 leading-relaxed break-words">{song.notes}</p>
                    ) : null}
                  </div>
                </div>
                {song.links && song.links.length > 0 ? (
                  <div className="mt-3 flex flex-col gap-1">
                    {song.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition text-sm"
                      >
                        Link {linkIndex + 1} ↗
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Music Videos Section
// ─────────────────────────────────────────────

function RecentSection({ filterStatus, onChangeStatus }: { filterStatus: StatusFilter; onChangeStatus: (status: StatusFilter) => void }) {
  const recentItems = useMemo(() => {
    const songIndexByTitle = new Map(SONGS.map((song, index) => [song.title.toLowerCase(), index]));
    const eraSongIndexes = SONGS.reduce<Record<string, number[]>>((acc, song, index) => {
      if (!acc[song.era]) acc[song.era] = [];
      acc[song.era].push(index);
      return acc;
    }, {});

    const songs = SONGS.map((song, index) => ({
      kind: 'song' as const,
      title: song.title,
      era: song.era,
      status: song.status,
      rating: song.rating || '—',
      creator: song.producer,
      links: song.links,
      releaseDate: song.releaseDate,
      releaseTimestamp: parseReleaseTimestamp(song.releaseDate),
      sortRank: index,
    }));

    const videos = MUSIC_VIDEOS.map((mv) => {
      const lowerTitle = mv.title.toLowerCase();
      const exactSongIndex = songIndexByTitle.get(lowerTitle);
      const partialSongIndex = [...songIndexByTitle.entries()].find(([title]) => lowerTitle.includes(title) || title.includes(lowerTitle))?.[1];
      const sameEraIndexes = eraSongIndexes[mv.era] ?? [];
      const baseRank = exactSongIndex ?? partialSongIndex ?? (sameEraIndexes.length ? Math.max(...sameEraIndexes) : SONGS.length);
      return {
        kind: 'video' as const,
        title: mv.title,
        era: mv.era,
        status: mv.status,
        rating: mv.rating || '—',
        creator: mv.director || 'Video',
        links: mv.youtubeId ? [`https://www.youtube.com/watch?v=${mv.youtubeId}`] : [],
        releaseDate: mv.releaseDate,
        releaseTimestamp: parseReleaseTimestamp(mv.releaseDate),
        sortRank: baseRank + 0.5,
      };
    });

    return [...songs, ...videos]
      .sort((a, b) => {
        const aHasDate = Boolean(a.releaseTimestamp);
        const bHasDate = Boolean(b.releaseTimestamp);

        if (aHasDate && !bHasDate) return -1;
        if (!aHasDate && bHasDate) return 1;
        if (aHasDate && bHasDate) {
          return b.releaseTimestamp - a.releaseTimestamp;
        }

        return a.sortRank - b.sortRank;
      })
      .filter((item) => {
        if (filterStatus === 'All') return true;
        return filterStatus === 'Released'
          ? item.status === 'Released'
          : item.status !== 'Released';
      });
  }, [filterStatus]);

  return (
    <div className="mb-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🕒</span>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Recent</h2>
            <p className="text-zinc-500 text-sm">— latest songs and music videos in current order</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-zinc-500 text-xs uppercase tracking-wider">Status</span>
          {(['All', 'Released', 'Unreleased'] as StatusFilter[]).map((status) => (
            <button
              key={status}
              onClick={() => onChangeStatus(status)}
              className={`px-3 py-1 rounded-xl text-sm border transition ${
                filterStatus === status
                  ? status === 'Released'
                    ? 'bg-green-500 text-black border-green-500'
                    : status === 'Unreleased'
                    ? 'bg-red-500/80 text-white border-red-500'
                    : 'bg-white text-black border-white'
                  : 'bg-zinc-800 border-zinc-700 hover:border-white'
              }`}
            >
              {status === 'Released' ? '✅ Released' : status === 'Unreleased' ? '🔒 Unreleased' : 'All'}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-zinc-800 bg-zinc-950/40">
        <table className="w-full">
          <thead>
            <tr className="text-zinc-500 text-xs uppercase tracking-wider" style={{ borderBottom: '1px solid rgba(148,163,184,0.15)' }}>
              {['Rating', 'Song', 'Era', 'Status', 'Producer', 'Link'].map((h) => (
                <th key={h} className="text-left px-5 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentItems.map((item, i) => (
              <tr key={`${item.kind}-${i}`} className="hover:bg-white/5 transition-colors duration-150" style={{ borderBottom: '1px solid rgba(148,163,184,0.08)' }}>
                <td className="px-5 py-4 text-lg">
                  <span title={getRatingTooltip(item.rating)}>{item.rating}</span>
                </td>
                <td className="px-5 py-4 font-medium text-white whitespace-nowrap">{item.title}</td>
                <td className="px-5 py-4 text-zinc-300 text-sm whitespace-nowrap">{item.era}</td>
                <td className="px-5 py-4 text-zinc-300 text-sm whitespace-nowrap capitalize">{item.kind}</td>
                <td className="px-5 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-zinc-300 text-sm whitespace-nowrap">{item.creator}</td>
                <td className="px-5 py-4">
                  {item.links && item.links.length > 0 ? (
                    <div className="flex flex-col gap-1">
                      {item.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition text-sm whitespace-nowrap block"
                        >
                          Link {linkIndex + 1} ↗
                        </a>
                      ))}
                    </div>
                  ) : (
                    <span className="text-zinc-600 text-sm">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MusicVideosSection({ filterEra, filterRating }: { filterEra: string; filterRating: string }) {
  const videos = useMemo(
    () =>
      MUSIC_VIDEOS.filter((mv) => {
        const matchesEra = filterEra === 'All' || mv.era === filterEra;
        const normalizedRating = mv.rating || '—';
        const matchesRating = filterRating === 'All' || normalizedRating === filterRating;
        return matchesEra && matchesRating;
      }),
    [filterEra, filterRating],
  );

  if (videos.length === 0) {
    return <div className="text-center text-zinc-500 py-20">No music videos match your filters.</div>;
  }

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">🎬</span>
        <h2 className="text-2xl font-bold tracking-tight">Music Videos</h2>
        <span className="text-zinc-500 text-sm ml-1">— official visuals archive</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((mv, i) => {
          const accent = eraAccent(mv.era);
          const thumb = `https://img.youtube.com/vi/${mv.youtubeId}/hqdefault.jpg`;
          const ytUrl = `https://www.youtube.com/watch?v=${mv.youtubeId}`;

          return (
            <a
              key={i}
              href={ytUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl overflow-hidden border transition-all duration-200 hover:scale-[1.02] hover:shadow-xl flex flex-col"
              style={{ borderColor: `${accent}35`, background: '#1c1c1e' }}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden aspect-video bg-zinc-800">
                <img
                  src={thumb}
                  alt={mv.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-black text-xl font-bold"
                    style={{ background: accent }}
                  >
                    ▶
                  </div>
                </div>
                {/* Era pill */}
                <div
                  className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: `${accent}25`, color: accent, border: `1px solid ${accent}40` }}
                >
                  {mv.era}
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-white text-sm leading-tight">{mv.title}</p>
                  <span
                    className="text-xl font-semibold"
                    style={{ color: accent }}
                    title={RATINGS.find((r) => r.emoji === (mv.rating || '—'))?.label ?? 'Unrated'}
                  >
                    {mv.rating || '—'}
                  </span>
                </div>
                {mv.releaseDate && (
                  <p className="text-xs" style={{ color: `${accent}99` }}>
                    {mv.releaseDate}
                    {mv.director ? ` · Dir. ${mv.director}` : ''}
                  </p>
                )}
                {mv.notes && (
                  <p className="text-zinc-500 text-xs leading-relaxed mt-1">{mv.notes}</p>
                )}
              </div>

              {/* Bottom accent bar */}
              <div className="h-0.5 w-full" style={{ background: accent }} />
            </a>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Tracklists Tab
// ─────────────────────────────────────────────

function TracklistCard({ tl, expandedTracklist }: { tl: Tracklist; expandedTracklist?: string | null }) {
  const [open, setOpen] = useState(() => !expandedTracklist || expandedTracklist === tl.project);
  const [previewOpen, setPreviewOpen] = useState(false);
  const accent = eraAccent(tl.era);
  const isConfirmed = tl.status === 'Confirmed';
  const statusLabel =
    tl.status === 'Confirmed'
      ? '✅ Confirmed'
      : tl.status === 'Rumoured'
      ? '🔮 Rumoured'
      : '🗑️ Scrapped';
  const statusStyle =
    tl.status === 'Confirmed'
      ? { background: 'rgba(34,197,94,0.15)', color: '#4ade80', borderColor: 'rgba(34,197,94,0.35)' }
      : tl.status === 'Rumoured'
      ? { background: 'rgba(234,179,8,0.15)', color: '#fde047', borderColor: 'rgba(234,179,8,0.35)' }
      : { background: 'rgba(248,113,113,0.15)', color: '#f87171', borderColor: 'rgba(248,113,113,0.35)' };
  const confirmedCount = tl.tracks.filter((t) => t.confirmed).length;

  useEffect(() => {
    if (expandedTracklist) {
      setOpen(expandedTracklist === tl.project);
    }
  }, [expandedTracklist, tl.project]);

  return (
    <div
      className="rounded-3xl overflow-hidden border shadow-2xl"
      style={{ borderColor: `${accent}40`, background: '#18181b' }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left flex items-stretch min-h-[100px] transition-all duration-200 hover:brightness-110 focus:outline-none"
        style={{ background: `${accent}08` }}
      >
        {/* Accent bar */}
        <div className="w-1.5 flex-shrink-0" style={{ background: accent }} />

        <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center gap-2">
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <h3 className="text-lg sm:text-xl font-bold tracking-tight" style={{ color: accent }}>
                {tl.project}
              </h3>
              <span
                className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full font-semibold border flex-shrink-0"
                style={statusStyle}
              >
                {statusLabel}
              </span>
            </div>
            <span
              className="text-zinc-400 text-lg mr-2 flex-shrink-0 transition-transform duration-300"
              style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', display: 'inline-block' }}
            >
              ▾
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
            {tl.image && (
              <div
                onClick={(event) => {
                  event.stopPropagation();
                  setPreviewOpen(true);
                }}
                role="button"
                tabIndex={0}
                aria-label={`Open ${tl.project} cover art preview`}
                className="mt-1 flex-shrink-0 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 p-2 cursor-pointer transition hover:border-white"
              >
                <img src={tl.image} alt={`${tl.project} cover`} className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl object-cover" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 sm:gap-4 text-[11px] sm:text-xs" style={{ color: `${accent}99` }}>
                <span>{tl.tracks.length} tracks</span>
                <span>{confirmedCount} confirmed · {tl.tracks.length - confirmedCount} unconfirmed</span>
                {tl.updatedDate && <span>Updated {tl.updatedDate}</span>}
                {tl.source && <span>Source: {tl.source}</span>}
              </div>

              {tl.notes && (
                <p className="text-zinc-500 text-xs leading-relaxed mt-1 break-words">{tl.notes}</p>
              )}
            </div>
          </div>
        </div>
      </button>

      {previewOpen && tl.image && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] overflow-hidden rounded-3xl bg-zinc-950"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={tl.image}
              alt={`${tl.project} cover art enlarged`}
              className="h-full w-full max-h-[90vh] max-w-[90vw] object-contain"
            />
            <button
              type="button"
              onClick={() => setPreviewOpen(false)}
              className="absolute top-3 right-3 rounded-full bg-black/70 px-3 py-2 text-sm text-white transition hover:bg-black"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Animated track list */}
      <div
        className="overflow-hidden"
        style={{
          maxHeight: open ? '9999px' : '0px',
          opacity: open ? 1 : 0,
          transition: open
            ? 'max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease 0.05s'
            : 'max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease',
        }}
      >
        <div style={{ borderTop: `1px solid ${accent}25` }}>
          {(() => {
            const mainTracks = tl.tracks.filter((t) => !t.isBonusTrack);
            const bonusTracks = tl.tracks.filter((t) => t.isBonusTrack);
            const sortedMain = mainTracks.slice().sort((a, b) => a.position - b.position);
            const sortedBonus = bonusTracks.slice().sort((a, b) => a.position - b.position);

            return (
              <>
                {/* Main tracks */}
                {sortedMain.map((track, i) => (
                  <div key={`main-${i}`}>
                    <div
                      className={`flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4 px-4 py-3 sm:px-6 sm:py-4 hover:bg-white/5 transition-colors duration-150 ${
                        track.confirmed ? 'text-white' : 'text-zinc-400'
                      }`}
                      style={{ borderBottom: `1px solid ${accent}15` }}
                    >
                    {/* Track number */}
                    <span
                      className="text-sm font-mono w-6 flex-shrink-0 mt-0.5"
                      style={{ color: `${accent}60` }}
                    >
                      {String(track.position).padStart(2, '0')}
                    </span>

                    {/* Title + features */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-medium text-sm break-words ${track.confirmed ? 'text-white' : 'text-zinc-400'}`}>
                          {track.title}
                        </span>
                        {track.features && (
                          <span className={track.confirmed ? 'text-zinc-400 text-xs' : 'text-zinc-500 text-xs'}>{track.features}</span>
                        )}
                        {track.producer && (
                          <span className={track.confirmed ? 'text-zinc-400 text-xs' : 'text-zinc-500 text-xs'}>prod. {track.producer}</span>
                        )}
                      </div>
                      {track.notes && (
                        <p className={track.confirmed ? 'text-zinc-400 text-xs mt-1 leading-relaxed break-words' : 'text-zinc-500 text-xs mt-1 leading-relaxed break-words'}>{track.notes}</p>
                      )}
                    </div>

                    {/* Confirmed / unconfirmed pill */}
                    <span
                      className="text-[11px] sm:text-xs px-2 py-0.5 rounded-full font-medium border flex-shrink-0 self-start"
                      style={
                        track.confirmed
                          ? { background: 'rgba(34,197,94,0.12)', color: '#4ade80', borderColor: 'rgba(34,197,94,0.3)' }
                          : { background: 'rgba(113,113,122,0.15)', color: '#71717a', borderColor: 'rgba(113,113,122,0.3)' }
                      }
                    >
                      {track.confirmed ? 'Confirmed' : 'Unconfirmed'}
                    </span>
                  </div>

                </div>
                ))}

                {/* Bonus Tracks Header */}
                {bonusTracks.length > 0 && (
                  <div
                    className="px-6 py-3 font-semibold text-sm flex items-center gap-2"
                    style={{ background: `${accent}08`, color: accent, borderBottom: `1px solid ${accent}25`, borderTop: `1px solid ${accent}15` }}
                  >
                    <span>💫</span>
                    <span>Bonus Tracks</span>
                  </div>
                )}

                {/* Bonus tracks */}
                {sortedBonus.map((track, i) => (
                  <div
                    key={`bonus-${i}`}
                    className={`flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4 px-4 py-3 sm:px-6 sm:py-4 hover:bg-white/5 transition-colors duration-150 ${
                      track.confirmed ? 'text-white' : 'text-zinc-400'
                    }`}
                    style={{ borderBottom: `1px solid ${accent}15` }}
                  >
                    {/* Track number */}
                    <span
                      className="text-sm font-mono w-6 flex-shrink-0 mt-0.5"
                      style={{ color: `${accent}60` }}
                    >
                      {String(track.position).padStart(2, '0')}
                    </span>

                    {/* Title + features */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-medium text-sm break-words ${track.confirmed ? 'text-white' : 'text-zinc-400'}`}>
                          {track.title}
                        </span>
                        {track.features && (
                          <span className={track.confirmed ? 'text-zinc-400 text-xs' : 'text-zinc-500 text-xs'}>{track.features}</span>
                        )}
                        {track.producer && (
                          <span className={track.confirmed ? 'text-zinc-400 text-xs' : 'text-zinc-500 text-xs'}>prod. {track.producer}</span>
                        )}
                      </div>
                      {track.notes && (
                        <p className={track.confirmed ? 'text-zinc-400 text-xs mt-1 leading-relaxed break-words' : 'text-zinc-500 text-xs mt-1 leading-relaxed break-words'}>{track.notes}</p>
                      )}
                    </div>

                    {/* Confirmed / unconfirmed pill */}
                    <span
                      className="text-[11px] sm:text-xs px-2 py-0.5 rounded-full font-medium border flex-shrink-0 self-start"
                      style={
                        track.confirmed
                          ? { background: 'rgba(34,197,94,0.12)', color: '#4ade80', borderColor: 'rgba(34,197,94,0.3)' }
                          : { background: 'rgba(113,113,122,0.15)', color: '#71717a', borderColor: 'rgba(113,113,122,0.3)' }
                      }
                    >
                      {track.confirmed ? 'Confirmed' : 'Unconfirmed'}
                    </span>
                  </div>
                ))}
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

function InfoDumpSection() {
  const entries = useMemo(
    () =>
      SONGS.flatMap((song) =>
        (song.infoDump ?? []).map((entry, index) => ({
          era: song.era,
          title: song.title,
          status: song.status,
          entry,
          index,
        })),
      ),
    [],
  );

  return (
    <div className="space-y-4">
      {entries.length === 0 ? (
        <div className="text-center text-zinc-500 py-20">No song info dumps yet.</div>
      ) : (
        entries.map(({ era, title, status, entry, index }) => {
          const accent = eraAccent(era);
          return (
            <div
              key={`${title}-${index}`}
              className="rounded-3xl overflow-hidden border"
              style={{ borderColor: `${accent}40`, background: '#18181b' }}
            >
              <div className="p-5 sm:p-6 border-b" style={{ borderColor: `${accent}25`, background: `${accent}0d` }}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-2xl">🧠</span>
                  <h2 className="text-2xl font-bold tracking-tight" style={{ color: accent }}>
                    {title}
                  </h2>
                  <span className="text-xs px-2.5 py-1 rounded-full border" style={{ color: accent, borderColor: `${accent}60`, background: `${accent}18` }}>
                    {era}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColor(status)}`}>
                    {status}
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500 mb-2">{entry.title}</p>
                <p className="text-sm text-zinc-300 leading-relaxed">{entry.detail}</p>
                {entry.link ? (
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 underline underline-offset-2"
                  >
                    Open link ↗
                  </a>
                ) : null}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

function TracklistsSection({ filterEra, selectedTracklist }: { filterEra: string; selectedTracklist: string | null }) {
  const [filterStatus, setFilterStatus] = useState<StatusFilter>('All');

  const filtered = useMemo(
    () =>
      TRACKLISTS.filter((tl) => {
        const matchesEra = filterEra === 'All' || tl.era === filterEra;
        const matchesStatus =
          filterStatus === 'All'
            ? true
            : filterStatus === 'Released'
            ? tl.status === 'Confirmed'
            : ['Rumoured', 'Scrapped'].includes(tl.status);
        return matchesEra && matchesStatus;
      }),
    [filterEra, filterStatus],
  );

  return (
    <div>
      {/* Status filter */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6 flex flex-wrap items-center gap-3">
        <span className="text-zinc-500 text-xs uppercase tracking-wider mr-1">Status</span>
        {(['All', 'Released', 'Unreleased'] as StatusFilter[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1 rounded-xl text-sm border transition ${
              filterStatus === s
                ? s === 'Released'
                  ? 'bg-green-500 text-black border-green-500'
                  : s === 'Unreleased'
                  ? 'bg-red-500/80 text-white border-red-500'
                  : 'bg-white text-black border-white'
                : 'bg-zinc-800 border-zinc-700 hover:border-white'
            }`}
          >
            {s === 'Released' ? '✅ Released' : s === 'Unreleased' ? '🔒 Unreleased' : 'All'}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-zinc-500 py-20">No tracklists match your filters.</div>
      ) : (
        <div className="space-y-6">
          {filtered.map((tl, i) => (
            <TracklistCard key={i} tl={tl} expandedTracklist={selectedTracklist} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  Root Component
// ─────────────────────────────────────────────

type StatusFilter = 'All' | 'Released' | 'Previewed' | 'Unreleased';

type TrackerUpdate = TrackerUpdateItem & {
  accent: string;
  tracklistProject?: string;
};

const formatUpdateDate = (value: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return 'Recently updated';
  return parsed.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const buildTrackerUpdates = (): TrackerUpdate[] => {
  const updates: TrackerUpdate[] = [
    ...TRACKER_UPDATES.map((item) => ({
      ...item,
      accent: eraAccent(item.era ?? ''),
    })),
    ...SONGS.filter((song) => song.releaseDate).map((song) => ({
      title: song.title,
      type: 'Song update',
      detail: song.notes,
      date: song.releaseDate as string,
      accent: eraAccent(song.era),
      link: song.links?.[0],
    })),
    ...MUSIC_VIDEOS.filter((video) => video.releaseDate).map((video) => ({
      title: video.title,
      type: 'Video update',
      detail: video.notes ?? `Added to the archive for ${video.era}.`,
      date: video.releaseDate as string,
      accent: eraAccent(video.era),
      link: `https://www.youtube.com/watch?v=${video.youtubeId}`,
    })),
    ...TRACKLISTS.filter((tracklist) => tracklist.updatedDate).map((tracklist) => ({
      title: tracklist.project,
      type: 'Tracklist update',
      detail: tracklist.notes ?? `Updated with ${tracklist.tracks.length} tracked entries.`,
      date: tracklist.updatedDate as string,
      accent: eraAccent(tracklist.era),
      tracklistProject: tracklist.project,
    })),
  ];

  updates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return updates.slice(0, 6);
};

export default function RkenzoTracker() {
  const [search, setSearch]                 = useState('');
  const [filterRating, setFilterRating]     = useState('All');
  const [filterVideoRating, setFilterVideoRating] = useState('All');
  const [filterEra, setFilterEra]           = useState('All');
  const [filterStatus, setFilterStatus]     = useState<StatusFilter>('All');
  const [filterRecentStatus, setFilterRecentStatus] = useState<StatusFilter>('All');
  const [activeTab, setActiveTab]           = useState<'songs' | 'recent' | 'videos' | 'tracklists' | 'info'>('songs');
  const [showUpdates, setShowUpdates]       = useState(true);
  const [selectedTracklist, setSelectedTracklist] = useState<string | null>(null);
  const [activeRatingKeyTooltip, setActiveRatingKeyTooltip] = useState<string | null>(null);

  // ── Stats ──
  const stats = useMemo(() => ({
    total:    SONGS.length,
    leaks:    SONGS.filter((s) => s.status === 'Leaked').length,
    snippets: SONGS.filter((s) => s.status === 'Snippet').length,
    released: SONGS.filter((s) => s.status === 'Released').length,
  }), []);

  const grails = useMemo(() => SONGS.filter((s) => s.rating === '🏆'), []);
  const trackerUpdates = useMemo(() => buildTrackerUpdates(), []);
  const lastUpdated = new Date().toLocaleDateString('en-GB', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // ── Filtered songs ──
  const filteredSongs = useMemo(() => {
    return SONGS.filter((song) => {
      const searchText = [
        song.title,
        song.era,
        song.status,
        song.producer,
        song.notes,
        song.filename,
        ...(song.altNames ?? []),
      ]
        .join(' ')
        .toLowerCase();
      const matchesSearch = searchText.includes(search.toLowerCase());
      const matchesRating = filterRating === 'All' || song.rating === filterRating;
      const matchesEra    = filterEra === 'All' || song.era === filterEra;
      const matchesStatus =
        filterStatus === 'All'
          ? true
          : filterStatus === 'Released'
          ? song.status === 'Released'
          : filterStatus === 'Previewed'
          ? PREVIEWED_STATUSES.includes(song.status)
          : song.status !== 'Released';
      return matchesSearch && matchesRating && matchesEra && matchesStatus;
    });
  }, [search, filterRating, filterEra, filterStatus]);

  const groupedByEra = useMemo(
    () =>
      ERAS.map((era) => ({
        ...era,
        songs: filteredSongs.filter((s) => s.era === era.name),
      })).filter((era) => era.songs.length > 0),
    [filteredSongs],
  );

  // ── Tab pill helper ──
  const tabCls = (active: boolean) =>
    `px-5 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
      active
        ? 'bg-white text-black border-white'
        : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-zinc-400'
    }`;

  return (
    <div
      className="min-h-screen text-white p-4 sm:p-8 font-sans"
      style={{ background: 'linear-gradient(to bottom, #0a0a0a, #0c0c0c)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-2">RKENZO TRACKER</h1>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            Community archive for songs, snippets, leaks and unreleased material. Powered by Kiot
          </p>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Songs', value: stats.total },
            { label: 'Leaks',       value: stats.leaks },
            { label: 'Snippets',    value: stats.snippets },
            { label: 'Released',    value: stats.released },
          ].map((stat) => (
            <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <p className="text-zinc-400 text-sm">{stat.label}</p>
              <h2 className="text-3xl font-bold mt-2">{stat.value}</h2>
            </div>
          ))}
        </div>

        {/* ── Grails Spotlight ── */}
        <div
          className="mb-8 rounded-2xl overflow-hidden border border-yellow-500/30"
          style={{ background: 'rgba(234,179,8,0.05)' }}
        >
          <div className="px-6 py-4 border-b border-yellow-500/20">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-2xl">🏆</span>
              <h2 className="text-xl font-bold text-yellow-300 grails-spotlight-title">
                Grails Spotlight
              </h2>
            </div>
            <p className="mt-2 text-yellow-200 text-sm grails-spotlight-subtitle">
              Golden spotlight on the most wanted unreleased tracks.
            </p>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {grails.map((song, i) => {
              const accent = eraAccent(song.era);
              return (
                <div
                  key={i}
                  className="rounded-xl p-4 border flex flex-col gap-2 transform transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
                  style={{ borderColor: `${accent}40`, background: `${accent}0d` }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-white leading-tight">{song.title}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium mt-0.5"
                      style={{ color: accent, background: `${accent}20` }}
                    >
                      {song.era}
                    </span>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full w-fit font-medium border ${statusColor(song.status)}`}
                  >
                    {song.status}
                  </span>
                  <p className="text-zinc-400 text-xs leading-relaxed">{song.notes}</p>
                  <div className="mt-auto flex flex-col gap-2">
                    {song.altNames && song.altNames.length > 0 ? (
                      <div className="text-zinc-400 text-[11px] uppercase tracking-[0.14em] leading-snug">
                        {song.altNames.map((name, nameIndex) => (
                          <span key={nameIndex} className="block">
                            {name}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    {song.links && song.links.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {song.links.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 text-xs underline underline-offset-2"
                          >
                            Link {linkIndex + 1} ↗
                          </a>
                        ))}
                      </div>
                    ) : (
                      <span className="text-zinc-600 text-xs">No link available</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Tab switcher ── */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
          <button className={tabCls(activeTab === 'songs')}      onClick={() => setActiveTab('songs')}>
            🎵 Songs
          </button>
          <button className={tabCls(activeTab === 'recent')}     onClick={() => setActiveTab('recent')}>
            🕒 Recent
          </button>
          <button className={tabCls(activeTab === 'videos')}     onClick={() => setActiveTab('videos')}>
            🎬 Music Videos
          </button>
          <button className={tabCls(activeTab === 'tracklists')} onClick={() => setActiveTab('tracklists')}>
            📋 Tracklists
          </button>
          <button className={tabCls(activeTab === 'info')} onClick={() => setActiveTab('info')}>
            🎞️ Extras
          </button>
        </div>

        {/* ── Recent Tab ── */}
        {activeTab === 'recent' && (
          <RecentSection filterStatus={filterRecentStatus} onChangeStatus={setFilterRecentStatus} />
        )}

        {/* ── Music Videos Tab ── */}
        {activeTab === 'videos' && (
          <>
            {/* Era filter for videos */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6 flex flex-wrap items-center gap-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider mr-1">Era</span>
              <button
                onClick={() => setFilterEra('All')}
                className={`px-3 py-1 rounded-xl text-sm border transition ${
                  filterEra === 'All'
                    ? 'bg-white text-black border-white'
                    : 'bg-zinc-800 border-zinc-700 hover:border-white'
                }`}
              >
                All Eras
              </button>
              {ERAS.map((era) => (
                <button
                  key={era.name}
                  onClick={() => setFilterEra(filterEra === era.name ? 'All' : era.name)}
                  className="px-3 py-1 rounded-xl text-sm border transition"
                  style={
                    filterEra === era.name
                      ? { background: era.accent, color: '#000', borderColor: era.accent }
                      : { background: 'transparent', color: era.accent, borderColor: `${era.accent}60` }
                  }
                >
                  {era.name}
                </button>
              ))}
            </div>

            {/* Rating filter for videos */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6 flex flex-wrap items-center gap-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider mr-1">Rating</span>
              <button
                onClick={() => setFilterVideoRating('All')}
                className={`px-3 py-1 rounded-xl text-sm border transition ${
                  filterVideoRating === 'All'
                    ? 'bg-white text-black border-white'
                    : 'bg-zinc-800 border-zinc-700 hover:border-white'
                }`}
              >
                All
              </button>
              {RATINGS.filter((r) => r.emoji !== '—').map((r) => (
                <button
                  key={r.emoji}
                  onClick={() => setFilterVideoRating(filterVideoRating === r.emoji ? 'All' : r.emoji)}
                  title={r.label}
                  className={`group relative px-3 py-1 rounded-xl text-sm border transition ${
                    filterVideoRating === r.emoji
                      ? 'bg-white text-black border-white'
                      : 'bg-zinc-800 border-zinc-700 hover:border-white'
                  }`}
                >
                  <span>{r.emoji} {r.label}</span>
                  <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:block whitespace-nowrap rounded-lg bg-zinc-950 border border-zinc-700 px-2.5 py-1 text-[11px] text-zinc-100 shadow-2xl z-20">
                    {r.label}
                  </span>
                </button>
              ))}
            </div>

            <MusicVideosSection filterEra={filterEra} filterRating={filterVideoRating} />
          </>
        )}

        {/* ── Songs Tab ── */}
        {activeTab === 'songs' && (
          <>
            {/* Rating + search */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-4 flex flex-wrap items-center gap-3 justify-between">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-zinc-500 text-xs uppercase tracking-wider mr-1">Rating</span>
                <button
                  onClick={() => setFilterRating('All')}
                  className={`px-3 py-1 rounded-xl text-sm border transition ${
                    filterRating === 'All'
                      ? 'bg-white text-black border-white'
                      : 'bg-zinc-800 border-zinc-700 hover:border-white'
                  }`}
                >
                  All
                </button>
                {RATINGS.filter((r) => r.emoji !== '—').map((r) => (
                  <button
                    key={r.emoji}
                    onClick={() => setFilterRating(filterRating === r.emoji ? 'All' : r.emoji)}
                    title={r.label}
                    className={`group relative px-3 py-1 rounded-xl text-sm border transition ${
                      filterRating === r.emoji
                        ? 'bg-white text-black border-white'
                        : 'bg-zinc-800 border-zinc-700 hover:border-white'
                    }`}
                  >
                    <span>{r.emoji} {r.label}</span>
                    <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:block whitespace-nowrap rounded-lg bg-zinc-950 border border-zinc-700 px-2.5 py-1 text-[11px] text-zinc-100 shadow-2xl z-20">
                      {r.label}
                    </span>
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Search songs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 outline-none focus:border-white transition w-full sm:w-52"
              />
            </div>

            {/* Era + Status filter */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {/* Era */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-zinc-500 text-xs uppercase tracking-wider mr-1">Era</span>
                <button
                  onClick={() => setFilterEra('All')}
                  className={`px-3 py-1 rounded-xl text-sm border transition ${
                    filterEra === 'All'
                      ? 'bg-white text-black border-white'
                      : 'bg-zinc-800 border-zinc-700 hover:border-white'
                  }`}
                >
                  All Eras
                </button>
                {ERAS.map((era) => (
                  <button
                    key={era.name}
                    onClick={() => setFilterEra(filterEra === era.name ? 'All' : era.name)}
                    className="px-3 py-1 rounded-xl text-sm border transition"
                    style={
                      filterEra === era.name
                        ? { background: era.accent, color: '#000', borderColor: era.accent }
                        : { background: 'transparent', color: era.accent, borderColor: `${era.accent}60` }
                    }
                  >
                    {era.name}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-zinc-700 hidden md:block" />

              {/* Status */}
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 text-xs uppercase tracking-wider mr-1">Status</span>
                {(['All', 'Released', 'Previewed', 'Unreleased'] as StatusFilter[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-3 py-1 rounded-xl text-sm border transition ${
                      filterStatus === s
                        ? s === 'Released'
                          ? 'bg-green-500 text-black border-green-500'
                          : s === 'Unreleased'
                          ? 'bg-red-500/80 text-white border-red-500'
                          : s === 'Previewed'
                          ? 'bg-yellow-400 text-black border-yellow-400'
                          : 'bg-white text-black border-white'
                        : 'bg-zinc-800 border-zinc-700 hover:border-white'
                    }`}
                  >
                    {s === 'Released' ? '✅ Released' : s === 'Unreleased' ? '🔒 Unreleased' : s === 'Previewed' ? '👀 Previewed' : 'All'}
                  </button>
                ))}
              </div>
            </div>

            {/* Era sections */}
            <div className="space-y-6">
              {groupedByEra.map((era) => (
                <EraPanel key={era.name} era={era} songs={era.songs} />
              ))}

              {groupedByEra.length === 0 && (
                <div className="text-center text-zinc-500 py-20">No songs match your filters.</div>
              )}
            </div>
          </>
        )}

        {/* ── Info Dump Tab ── */}
        {activeTab === 'info' && <InfoDumpSection />}

        {/* ── Tracklists Tab ── */}
        {activeTab === 'tracklists' && (
          <>
            {/* Era filter */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6 flex flex-wrap items-center gap-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider mr-1">Era</span>
              <button
                onClick={() => setFilterEra('All')}
                className={`px-3 py-1 rounded-xl text-sm border transition ${
                  filterEra === 'All'
                    ? 'bg-white text-black border-white'
                    : 'bg-zinc-800 border-zinc-700 hover:border-white'
                }`}
              >
                All Eras
              </button>
              {ERAS.map((era) => (
                <button
                  key={era.name}
                  onClick={() => setFilterEra(filterEra === era.name ? 'All' : era.name)}
                  className="px-3 py-1 rounded-xl text-sm border transition"
                  style={
                    filterEra === era.name
                      ? { background: era.accent, color: '#000', borderColor: era.accent }
                      : { background: 'transparent', color: era.accent, borderColor: `${era.accent}60` }
                  }
                >
                  {era.name}
                </button>
              ))}
            </div>
            <TracklistsSection filterEra={filterEra} selectedTracklist={selectedTracklist} />
          </>
        )}
        <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Rating Key</h3>
          <div className="flex flex-wrap gap-4">
            {RATINGS.map((r) => {
              const tooltipVisible = activeRatingKeyTooltip === r.emoji;
              return (
                <button
                  key={r.emoji}
                  type="button"
                  onMouseEnter={() => setActiveRatingKeyTooltip(r.emoji)}
                  onMouseLeave={() => setActiveRatingKeyTooltip(null)}
                  onClick={() => setActiveRatingKeyTooltip((current) => (current === r.emoji ? null : r.emoji))}
                  className="relative flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-xl border border-zinc-700 hover:border-white transition"
                >
                  <span className="text-xl">{r.emoji}</span>
                  <span className="text-sm text-zinc-300">{r.label}</span>
                  {tooltipVisible ? (
                    <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap rounded-lg bg-zinc-950 border border-zinc-700 px-3 py-2 text-[11px] text-zinc-100 shadow-2xl z-20">
                      {r.label} — {r.description}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Tracker Categories</h3>
            <div className="flex flex-wrap gap-3">
              {['Leaks', 'Snippets', 'Features', 'Vaulted', 'HQ', 'Lost Media'].map((tag) => (
                <span key={tag} className="bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-xl text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Community Notes</h3>
            <p className="text-zinc-400 leading-relaxed">
              This tracker is inspired by community grail trackers and archives all known Rkenzo music,
              snippets and unreleased content.
            </p>
          </div>
        </div>

        <div className="mt-8 text-right text-xs text-zinc-500">
          Last updated: {lastUpdated}
        </div>
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setShowUpdates((value) => !value);
        }}
        className="fixed bottom-5 right-5 z-40 rounded-full border border-cyan-400/40 bg-zinc-900/95 px-4 py-3 text-sm font-semibold text-cyan-200 shadow-2xl backdrop-blur transition hover:scale-105"
      >
        🆕 Updates
      </button>

      {showUpdates && (
        <div
          className="update-modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-8 backdrop-blur-sm"
          onClick={() => setShowUpdates(false)}
        >
          <div
            className="update-modal-card w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Latest tracker updates</p>
                <h3 className="mt-2 text-2xl font-bold text-white">What’s new</h3>
                <p className="mt-2 text-sm text-zinc-400">Recent songs, videos, and tracklist changes from the archive.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowUpdates(false)}
                className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 transition hover:border-zinc-400 hover:text-white"
                aria-label="Close updates"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 max-h-[55vh] space-y-3 overflow-y-auto pr-2">
              {trackerUpdates.length > 0 ? (
                trackerUpdates.map((item, index) => (
                  <div key={`${item.title}-${index}`} className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-xs font-medium uppercase tracking-[0.24em]" style={{ color: item.accent }}>
                          {item.type}
                        </p>
                      </div>
                      <span className="text-xs text-zinc-400">{formatUpdateDate(item.date)}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.detail}</p>
                            {(item.type === 'Song update' || item.type === 'Video update') && item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex text-sm font-medium text-cyan-300 underline underline-offset-2 transition hover:text-cyan-200"
                      >
                        Open source ↗
                      </a>
                    ) : null}
                    {item.type === 'Tracklist update' && item.tracklistProject ? (
                      <button
                        type="button"
                        onClick={() => {
                          setShowUpdates(false);
                          setActiveTab('tracklists');
                          setSelectedTracklist(item.tracklistProject ?? null);
                        }}
                        className="mt-3 inline-flex text-sm font-medium text-emerald-300 underline underline-offset-2 transition hover:text-emerald-200"
                      >
                        GO TO PAGE ↗
                      </button>
                    ) : null}
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 text-sm text-zinc-400">
                  No updates available right now.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}