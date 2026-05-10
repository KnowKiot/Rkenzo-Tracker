"use client";

import { useMemo, useRef, useState } from 'react';
import { ERAS, MUSIC_VIDEOS, RATINGS, SONGS } from './data';

// Re-export types for convenience
type MusicVideo = (typeof MUSIC_VIDEOS)[number];

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
const isUnreleased = (status: string) => !RELEASED_STATUSES.includes(status);

// ─────────────────────────────────────────────
//  Animated Era Panel
// ─────────────────────────────────────────────

function EraPanel({
  era,
  songs,
  videos,
  contentFilter,
}: {
  era: (typeof ERAS)[number];
  songs: typeof SONGS;
  videos: MusicVideo[];
  contentFilter: ContentFilter;
}) {
  const [open, setOpen] = useState(true);
  const bodyRef = useRef<HTMLDivElement>(null);
  const videosScrollRef = useRef<HTMLDivElement>(null);

  // Combined count info
  const totalSongs = songs.length;
  const totalVideos = videos.length;
  const releasedSongs = songs.filter((s) => s.status === 'Released').length;

  // Scroll videos
  const scrollVideos = (direction: 'left' | 'right') => {
    if (videosScrollRef.current) {
      const scrollAmount = 400; // Width of card (350px) + gap (4px*2)
      if (direction === 'left') {
        videosScrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        videosScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      className="rounded-3xl overflow-hidden shadow-2xl border"
      style={{ borderColor: `${era.accent}40`, background: '#18181b' }}
    >
      {/* ── Banner ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left flex items-stretch min-h-[120px] transition-all duration-200 hover:brightness-110 focus:outline-none"
        style={{ background: era.accentBg }}
        aria-expanded={open}
      >
        {/* Accent bar */}
        <div
          className="w-1.5 flex-shrink-0 transition-all duration-300"
          style={{ background: era.accent }}
        />

        {/* Era image */}
        <div className="w-40 flex-shrink-0 flex items-center justify-center overflow-hidden bg-zinc-800">
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
          className="flex-1 p-6 flex flex-col justify-center border-l"
          style={{ borderColor: `${era.accent}30` }}
        >
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: era.accent }}>
              {era.name}
            </h2>
            <span
              className="text-zinc-400 text-lg mr-2 flex-shrink-0 transition-transform duration-300"
              style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', display: 'inline-block' }}
            >
              ▾
            </span>
          </div>
          <p className="text-zinc-400 text-sm mt-1">{era.description}</p>
          <div className="flex flex-wrap gap-4 mt-3 text-sm" style={{ color: `${era.accent}99` }}>
            <span>{totalSongs} song{totalSongs !== 1 ? 's' : ''}</span>
            <span>{releasedSongs} released</span>
            <span>{songs.filter((s) => s.status === 'Snippet').length} snippets</span>
            <span>{songs.filter((s) => s.status === 'Leaked').length} leaks</span>
            <span>
              {songs.filter((s) => ['Unreleased', 'Vaulted', 'Scrapped'].includes(s.status)).length} unreleased
            </span>
            {totalVideos > 0 && <span>• {totalVideos} music video{totalVideos !== 1 ? 's' : ''}</span>}
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
        {/* Songs Table */}
        {songs.length > 0 && (contentFilter === 'All' || contentFilter === 'Songs') && (
          <>
            <div
              className="overflow-x-auto"
              style={{ borderTop: `1px solid ${era.accent}25` }}
            >
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
                      key={`song-${i}`}
                      className="hover:bg-white/5 transition-colors duration-150"
                      style={{ borderBottom: `1px solid ${era.accent}15` }}
                    >
                      <td className="px-5 py-4 text-xl">
                        <span title={RATINGS.find((r) => r.emoji === song.rating)?.label ?? 'Unrated'}>
                          {song.rating || '—'}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-medium text-white whitespace-nowrap">{song.title}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColor(song.status)}`}
                        >
                          {song.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-zinc-300 text-sm whitespace-nowrap">{song.producer}</td>
                      <td className="px-5 py-4 text-zinc-400 font-mono text-xs">{song.filename || '—'}</td>
                      <td className="px-5 py-4 text-zinc-400 text-sm max-w-xs">{song.notes}</td>
                      <td className="px-5 py-4">
                        {song.link ? (
                          <a
                            href={song.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition text-sm whitespace-nowrap"
                          >
                            Open ↗
                          </a>
                        ) : (
                          <span className="text-zinc-600 text-sm">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Music Videos Grid */}
        {videos.length > 0 && (contentFilter === 'All' || contentFilter === 'Videos') && (
          <div
            className="p-6 border-t"
            style={{ borderColor: `${era.accent}25` }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span>🎬</span>
                <span>Music Videos</span>
              </h3>
              <div className="flex gap-1 md:gap-2">
                <button
                  onClick={() => scrollVideos('left')}
                  className="px-2 md:px-3 py-1 md:py-2 rounded-lg transition-colors text-xs md:text-sm"
                  style={{ background: `${era.accent}20`, color: era.accent, border: `1px solid ${era.accent}40` }}
                  aria-label="Scroll videos left"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => scrollVideos('right')}
                  className="px-2 md:px-3 py-1 md:py-2 rounded-lg transition-colors text-xs md:text-sm"
                  style={{ background: `${era.accent}20`, color: era.accent, border: `1px solid ${era.accent}40` }}
                  aria-label="Scroll videos right"
                >
                  Next →
                </button>
              </div>
            </div>
            <div
              ref={videosScrollRef}
              className="flex gap-3 md:gap-4 overflow-x-auto pb-2 scroll-smooth"
              style={{
                scrollBehavior: 'smooth',
                scrollbarWidth: 'thin',
              }}
            >
              {videos.map((mv, i) => {
                const thumb = `https://img.youtube.com/vi/${mv.youtubeId}/hqdefault.jpg`;
                const ytUrl = `https://www.youtube.com/watch?v=${mv.youtubeId}`;

                return (
                  <a
                    key={`video-${i}`}
                    href={ytUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-2xl overflow-hidden border transition-all duration-200 hover:scale-[1.02] hover:shadow-xl flex flex-col flex-shrink-0"
                    style={{ borderColor: `${era.accent}35`, background: '#1c1c1e', width: 'clamp(280px, 90vw, 350px)' }}
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
                          style={{ background: era.accent }}
                        >
                          ▶
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 flex flex-col gap-2 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-white text-sm leading-tight flex-1">{mv.title}</p>
                        <span className="text-xl flex-shrink-0">
                          {mv.rating || '—'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColor(mv.status)}`}
                        >
                          {mv.status}
                        </span>
                      </div>
                      {mv.releaseDate && (
                        <p className="text-xs" style={{ color: `${era.accent}99` }}>
                          {mv.releaseDate}
                          {mv.director ? ` · Dir. ${mv.director}` : ''}
                        </p>
                      )}
                      {mv.notes && (
                        <p className="text-zinc-500 text-xs leading-relaxed mt-1">{mv.notes}</p>
                      )}
                    </div>

                    {/* Bottom accent bar */}
                    <div className="h-0.5 w-full" style={{ background: era.accent }} />
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Root Component
// ─────────────────────────────────────────────

type StatusFilter = 'All' | 'Released' | 'Unreleased';
type ContentFilter = 'All' | 'Songs' | 'Videos';

export default function RkenzoTracker() {
  const [search, setSearch]               = useState('');
  const [filterRating, setFilterRating]   = useState('All');
  const [filterEra, setFilterEra]         = useState('All');
  const [filterStatus, setFilterStatus]   = useState<StatusFilter>('All');
  const [filterContent, setFilterContent] = useState<ContentFilter>('All');

  // ── Stats ──
  const stats = useMemo(() => ({
    total:    SONGS.length,
    leaks:    SONGS.filter((s) => s.status === 'Leaked').length,
    snippets: SONGS.filter((s) => s.status === 'Snippet').length,
    released: SONGS.filter((s) => s.status === 'Released').length,
  }), []);

  const grails = useMemo(() => SONGS.filter((s) => s.rating === '🏆'), []);

  // ── Filtered songs ──
  const filteredSongs = useMemo(() => {
    return SONGS.filter((song) => {
      const matchesSearch = [song.title, song.era, song.status, song.notes, song.filename]
        .join(' ').toLowerCase().includes(search.toLowerCase());
      const matchesRating = filterRating === 'All' || song.rating === filterRating;
      const matchesEra    = filterEra === 'All' || song.era === filterEra;
      const matchesStatus =
        filterStatus === 'All'
          ? true
          : filterStatus === 'Released'
          ? song.status === 'Released'
          : isUnreleased(song.status);
      return matchesSearch && matchesRating && matchesEra && matchesStatus;
    });
  }, [search, filterRating, filterEra, filterStatus]);

  // ── Filtered videos ──
  const filteredVideos = useMemo(() => {
    return MUSIC_VIDEOS.filter((video) => {
      const matchesSearch = [video.title, video.era, video.status, video.notes || '']
        .join(' ').toLowerCase().includes(search.toLowerCase());
      const matchesRating = filterRating === 'All' || video.rating === filterRating;
      const matchesEra    = filterEra === 'All' || video.era === filterEra;
      const matchesStatus =
        filterStatus === 'All'
          ? true
          : filterStatus === 'Released'
          ? video.status === 'Released'
          : video.status !== 'Released';
      return matchesSearch && matchesRating && matchesEra && matchesStatus;
    });
  }, [search, filterRating, filterEra, filterStatus]);

  const groupedByEra = useMemo(
    () =>
      ERAS.map((era) => ({
        ...era,
        songs: filteredSongs.filter((s) => s.era === era.name),
        videos: filteredVideos.filter((v) => v.era === era.name),
      })).filter((era) => era.songs.length > 0 || era.videos.length > 0),
    [filteredSongs, filteredVideos],
  );

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2">RKENZO TRACKER</h1>
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg">
            Community archive for songs, snippets, leaks and unreleased material.
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
          <div className="px-6 py-4 border-b border-yellow-500/20 flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <h2 className="text-xl font-bold text-yellow-300">Grails Spotlight</h2>
            <span className="text-yellow-700 text-sm ml-1">— most wanted unreleased material</span>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {grails.map((song, i) => {
              const accent = eraAccent(song.era);
              return (
                <div
                  key={i}
                  className="rounded-xl p-4 border flex flex-col gap-2"
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
                  {song.link ? (
                    <a
                      href={song.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-xs underline underline-offset-2 mt-auto"
                    >
                      Open ↗
                    </a>
                  ) : (
                    <span className="text-zinc-600 text-xs mt-auto">No link available</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Rating + search ── */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 md:p-5 mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-1 md:gap-2 items-center overflow-x-auto pb-2">
            <span className="text-zinc-500 text-xs uppercase tracking-wider mr-2 flex-shrink-0">Rating</span>
            <button
              onClick={() => setFilterRating('All')}
              className={`px-3 py-1 rounded-xl text-xs md:text-sm border transition whitespace-nowrap ${
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
                className={`px-3 py-1 rounded-xl text-xs md:text-sm border transition whitespace-nowrap ${
                  filterRating === r.emoji
                    ? 'bg-white text-black border-white'
                    : 'bg-zinc-800 border-zinc-700 hover:border-white'
                }`}
              >
                {r.emoji} {r.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search songs & videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 md:px-4 py-2 outline-none focus:border-white transition w-full md:w-52 text-sm md:text-base"
          />
        </div>

        {/* ── Era + Status filter ── */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 md:p-5 mb-8 flex flex-col gap-4 md:gap-0 md:flex-wrap md:items-center md:gap-x-6 md:gap-y-3">
          {/* Era */}
          <div className="flex flex-wrap gap-1 md:gap-2 items-center overflow-x-auto pb-2">
            <span className="text-zinc-500 text-xs uppercase tracking-wider mr-2 flex-shrink-0">Era</span>
            <button
              onClick={() => setFilterEra('All')}
              className={`px-3 py-1 rounded-xl text-xs md:text-sm border transition whitespace-nowrap ${
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
                className="px-3 py-1 rounded-xl text-xs md:text-sm border transition whitespace-nowrap"
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
          <div className="h-6 w-px bg-zinc-700 hidden lg:block" />

          {/* Status */}
          <div className="flex flex-wrap gap-1 md:gap-2 items-center overflow-x-auto pb-2">
            <span className="text-zinc-500 text-xs uppercase tracking-wider mr-2 flex-shrink-0">Status</span>
            {(['All', 'Released', 'Unreleased'] as StatusFilter[]).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1 rounded-xl text-xs md:text-sm border transition whitespace-nowrap ${
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
        </div>

        {/* ── Content Type Filter ── */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 md:p-5 mb-8 flex flex-wrap gap-2 items-center">
          <span className="text-zinc-500 text-xs uppercase tracking-wider mr-1 flex-shrink-0">Content</span>
          {(['All', 'Songs', 'Videos'] as ContentFilter[]).map((c) => (
            <button
              key={c}
              onClick={() => setFilterContent(c)}
              className={`px-3 py-1 rounded-xl text-xs md:text-sm border transition whitespace-nowrap ${
                filterContent === c
                  ? 'bg-white text-black border-white'
                  : 'bg-zinc-800 border-zinc-700 hover:border-white'
              }`}
            >
              {c === 'Songs' ? '🎵 Songs' : c === 'Videos' ? '🎬 Videos' : 'All'}
            </button>
          ))}
        </div>

        {/* ── Era sections with songs & videos ── */}
        <div className="space-y-6">
          {groupedByEra.map((era) => (
            <EraPanel key={era.name} era={era} songs={era.songs} videos={era.videos} contentFilter={filterContent} />
          ))}

          {groupedByEra.length === 0 && (
            <div className="text-center text-zinc-500 py-20">No songs or videos match your filters.</div>
          )}
        </div>

        {/* ── Rating Legend ── */}
        <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Rating Key</h3>
          <div className="flex flex-wrap gap-4">
            {RATINGS.map((r) => (
              <div key={r.emoji} className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-xl">
                <span className="text-xl">{r.emoji}</span>
                <span className="text-sm text-zinc-300">{r.label}</span>
              </div>
            ))}
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

      </div>
    </div>
  );
}