"use client";

import { useMemo, useRef, useState } from 'react';
import { ERAS, MUSIC_VIDEOS, RATINGS, SONGS, TRACKLISTS } from './data';
import type { Tracklist } from './data';

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
                  key={i}
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
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Music Videos Section
// ─────────────────────────────────────────────

function MusicVideosSection({ filterEra }: { filterEra: string }) {
  const videos = useMemo(
    () =>
      filterEra === 'All'
        ? MUSIC_VIDEOS
        : MUSIC_VIDEOS.filter((v) => v.era === filterEra),
    [filterEra],
  );

  if (videos.length === 0) return null;

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
              <div className="p-4 flex flex-col gap-1 flex-1">
                <p className="font-semibold text-white text-sm leading-tight">{mv.title}</p>
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

function TracklistCard({ tl }: { tl: Tracklist }) {
  const [open, setOpen] = useState(true);
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

        <div className="flex-1 p-6 flex flex-col justify-center gap-2">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-xl font-bold tracking-tight" style={{ color: accent }}>
                {tl.project}
              </h3>
              <span
                className="text-xs px-3 py-1 rounded-full font-semibold border flex-shrink-0"
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

          <div className="flex flex-wrap gap-4 text-xs" style={{ color: `${accent}99` }}>
            <span>{tl.tracks.length} tracks</span>
            <span>{confirmedCount} confirmed · {tl.tracks.length - confirmedCount} unconfirmed</span>
            {tl.updatedDate && <span>Updated {tl.updatedDate}</span>}
            {tl.source && <span>Source: {tl.source}</span>}
          </div>

          {tl.notes && (
            <p className="text-zinc-500 text-xs leading-relaxed mt-1">{tl.notes}</p>
          )}
        </div>
      </button>

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
          {tl.tracks
            .slice()
            .sort((a, b) => a.position - b.position)
            .map((track, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 px-6 py-4 hover:bg-white/5 transition-colors duration-150 ${
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
                  <span className={`font-medium text-sm ${track.confirmed ? 'text-white' : 'text-zinc-400'}`}>
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
                  <p className={track.confirmed ? 'text-zinc-400 text-xs mt-1 leading-relaxed' : 'text-zinc-500 text-xs mt-1 leading-relaxed'}>{track.notes}</p>
                )}
              </div>

              {/* Confirmed / unconfirmed pill */}
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium border flex-shrink-0"
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
        </div>
      </div>
    </div>
  );
}

function TracklistsSection({ filterEra }: { filterEra: string }) {
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
            <TracklistCard key={i} tl={tl} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  Root Component
// ─────────────────────────────────────────────

type StatusFilter = 'All' | 'Released' | 'Unreleased';

export default function RkenzoTracker() {
  const [search, setSearch]             = useState('');
  const [filterRating, setFilterRating] = useState('All');
  const [filterEra, setFilterEra]       = useState('All');
  const [filterStatus, setFilterStatus] = useState<StatusFilter>('All');
  const [activeTab, setActiveTab]       = useState<'songs' | 'videos' | 'tracklists'>('songs');

  // ── Stats ──
  const stats = useMemo(() => ({
    total:    SONGS.length,
    leaks:    SONGS.filter((s) => s.status === 'Leaked').length,
    snippets: SONGS.filter((s) => s.status === 'Snippet').length,
    released: SONGS.filter((s) => s.status === 'Released').length,
  }), []);

  const grails = useMemo(() => SONGS.filter((s) => s.rating === '🏆'), []);
  const lastUpdated = new Date().toLocaleDateString('en-GB', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

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
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold tracking-tight mb-2">RKENZO TRACKER</h1>
          <p className="text-zinc-400 text-lg">
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

        {/* ── Tab switcher ── */}
        <div className="flex gap-3 mb-6">
          <button className={tabCls(activeTab === 'songs')}      onClick={() => setActiveTab('songs')}>
            🎵 Songs
          </button>
          <button className={tabCls(activeTab === 'videos')}     onClick={() => setActiveTab('videos')}>
            🎬 Music Videos
          </button>
          <button className={tabCls(activeTab === 'tracklists')} onClick={() => setActiveTab('tracklists')}>
            📋 Tracklists
          </button>
        </div>

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
            <MusicVideosSection filterEra={filterEra} />
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
                    className={`px-3 py-1 rounded-xl text-sm border transition ${
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
                placeholder="Search songs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 outline-none focus:border-white transition w-52"
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
            <TracklistsSection filterEra={filterEra} />
          </>
        )}
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

        <div className="mt-8 text-right text-xs text-zinc-500">
          Last updated: {lastUpdated}
        </div>
      </div>
    </div>
  );
}