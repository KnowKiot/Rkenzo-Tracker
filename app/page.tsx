"use client";

import { useMemo, useState } from 'react';

const RATINGS = [
  { emoji: '🏆', label: 'Grail' },
  { emoji: '🌟', label: 'Classic' },
  { emoji: '⭐', label: 'Best Of' },
  { emoji: '✨', label: 'Special' },
  { emoji: '🥉', label: 'Wanted' },
  { emoji: '🗑️', label: 'Worst Of' },
  { emoji: '—', label: 'Unrated' },
];

export default function RkenzoTracker() {
  const [search, setSearch] = useState('');
  const [filterRating, setFilterRating] = useState('All');

  const songs = [
    // Momentary Bliss
     {
      title: 'Rick Owens',
      era: 'Momentary Bliss',
      status: 'Snippet',
      producer: 'Unknown',
      notes: 'Snippet uploaded the tiktok 9th May 2026',
      rating: '',
      filename: '—',
      link: 'https://www.youtube.com/watch?v=MFjM_NQvPC0',
    },

    {
      title: 'Chasing Paper',
      era: 'Momentary Bliss',
      status: 'Released',
      producer: 'Unknown',
      notes: 'Second song released in the Momentary Bliss rollout',
      rating: '',
      filename: '—',
      link: 'https://www.youtube.com/watch?v=MFjM_NQvPC0',
    },

    {
      title: 'EVISU JEANS',
      era: 'Momentary Bliss',
      status: 'Released',
      producer: 'coreyblazyinc',
      notes: 'Throwaway song to mark the rollout of Momentary Bliss',
      rating: '✨',
      filename: '—',
      link: 'https://www.youtube.com/watch?v=GCz7GZODsv4',
    },

    {
      title: 'Alone',
      era: 'Momentary Bliss',
      status: 'Snippet',
      producer: 'FinniX!Beats',
      notes: 'Instagram live preview song was instantly hailed as a grail part of the collection of songs Rkenzo made with Finnix Switerzland',
      rating: '🏆',
      filename: '?',
      link: '',
    },

    {
      title: 'MAKE IT COUNT! V2',
      era: 'Momentary Bliss',
      status: 'Released',
      producer: 'FinniX!Beats',
      notes: 'Part of the collection of songs Rkenzo made with Finnix Switerzland',
      rating: '✨',
      filename: '—',
      link: 'https://www.youtube.com/watch?v=jBivqZXolk8',
    },

    {
      title: 'MAKE IT COUNT! V1',
      era: 'Momentary Bliss',
      status: 'Scrapped',
      producer: 'FinniX!Beats',
      notes: 'Noticably has a different more spacelike beat. Part of the collection of songs Rkenzo made with Finnix Switerzland',
      rating: '🥉',
      filename: 'MAKE IT COUNT',
      link: '',
    },

    {
      title: 'OS2S Freestyle',
      era: 'OS2S: Extended Edition',
      status: 'Released',
      producer: 'Unknown',
      notes: 'Promotional song marking the release of his clothing brand OS2S. Music video features cameos from blancomadeit and FinniX!Beats',
      rating: '✨',
      filename: '—',
      link: 'https://www.youtube.com/watch?v=8FcIn74uNzk',
    },

    {
      title: 'Say So V2',
      era: 'OS2S: Extended Edition',
      status: 'Released',
      producer: 'Segway',
      notes: 'Revamped version of say so with a new 2nd verse, no Kadz feature and new bars for the first verse but same flow. Finally released on the OS2S: Extended Edition',
      rating: '⭐',
      filename: '—',
      link: 'https://www.youtube.com/watch?v=w9Y_v96F9ac',
    },

        {
      title: 'All Eyes On Me',
      era: 'OS2S: Extended Edition',
      status: 'Released',
      producer: 'coreyblazyy',
      notes: 'Kenz uses a sharper sound here and uses familiar flows from Rush This. Very good song to say the least',
      rating: '✨',
      filename: '',
      link: 'https://www.youtube.com/watch?v=kol3yTiwgQA',
    },

    {
      title: 'RUSH THIS! V3',
      era: 'OS2S: Extended Edition',
      status: 'Released',
      producer: 'Rkenzo',
      notes: 'The first officially released song produced by Rkenzo',
      rating: '⭐',
      filename: '—',
      link: 'https://www.youtube.com/watch?v=vPf7hVAEqTw',
    },

    {
      title: 'RUSH THIS! V2',
      era: 'OS2S: Extended Edition',
      status: 'Scrapped',
      producer: 'Rkenzo',
      notes: 'Unmixed version of the song',
      rating: '—',
      filename: 'rush this b4 mix.wav',
      link: '',
    },

    {
      title: 'Chose 1 Freestyle',
      era: 'OS2S: Extended Edition',
      status: 'Released',
      producer: 'RealRichMoney',
      notes: 'Rkenzo reuses some of his bars from Out Till, One Shot To Shine late and Say So V1 on this track and debuts a new sound experimenting with club sounds',
      rating: '—',
      filename: '',
      link: 'https://www.youtube.com/watch?v=evCgCR9aJsM',
    },

    {
      title: 'Lifestyle Lately V2 Feat. Tkandz',
      era: 'OS2S: Extended Edition',
      status: 'Released',
      producer: 'Rkenzo',
      notes: 'Version of lifestyle lately with Tkandz verse but the music video would be reshot in the UK',
      rating: '⭐',
      filename: '',
      link: 'https://www.youtube.com/watch?v=ZDuDBuFPsmk',
    },

    {
      title: 'Lifestyle Lately V1',
      era: 'OS2S',
      status: 'Scrapped',
      producer: 'Rkenzo',
      notes: 'Version of lifestyle lately without Tkandz verse and alternate music video shot in spain',
      rating: '—',
      filename: '—',
      link: '',
    },
// OS2S Era
    {
      title: 'Crossroads',
      era: 'OS2S',
      status: 'Released',
      producer: 'Unknown',
      notes: 'Released on the EP One Shot To Shine, kenz gives us more insight into his personal life and struggle',
      rating: '',
      filename: '—',
      link: 'https://www.youtube.com/watch?v=ZPkRZ9VNhho',
    },

    {
      title: 'Say So V1',
      era: 'OS2S',
      status: 'Vaulted',
      producer: 'Segway',
      notes: 'Full song is held, original version of Say So with a catchier first verse less lyrically powerful but the version fans like the most',
      rating: '🏆',
      filename: 'Say so with Kadz.wav',
      link: '',
    },

    {
      title: 'Say So V1',
      era: 'OS2S',
      status: 'Vaulted',
      producer: 'Segway',
      notes: 'Full song is held, original version of Say So with a catchier first verse less lyrically powerful but the version fans like the most',
      rating: '🏆',
      filename: 'Say so with kadz.wav',
      link: '',
    },


    {
      title: 'STYLE',
      era: 'OS2S',
      status: 'Unreleased',
      producer: 'Pierre Bourne',
      notes: 'Studio session made with Kadz using the beat of Cartis Goin Outta Style. Song was never finished',
      rating: '🥉',
      filename: 'KY OS.wav',
      link: '',
    },

    {
      title: 'Go With It',
      era: 'OS2S',
      status: 'Released',
      producer: 'Unknown',
      notes: 'Released on the EP One Shot To Shine, kenz experiments with a more emotional sound and bars and does a small call back to Never Giving Up',
      rating: '✨',
      filename: '—',
      link: 'https://www.youtube.com/watch?v=4UatIB9ZjoE',
    },

    {
      title: 'One Shot To Shine',
      era: 'OS2S',
      status: 'Released',
      producer: 'Unknown',
      notes: 'Intro and named after Rkenzos first studio EP One Shot To Shine',
      rating: '✨',
      filename: '',
      link: 'https://www.youtube.com/watch?v=_gmJXkfc7OY',
    },

    {
      title: 'CANT WAIT',
      era: 'OS2S',
      status: 'Released',
      producer: 'Unknown',
      notes: 'Released on the EP One Shot To Shine, kenz also sends some bars refercing his ex',
      rating: '',
      filename: '—',
      link: 'https://www.youtube.com/watch?v=yHUsIK3i2f0',
    },

    {
      title: 'Out Till Late',
      era: 'OS2S',
      status: 'Released',
      producer: 'Unknown',
      notes: 'Featuring Whizz, song was reportedly made in one take and is a fan favourite. One of his biggest songs to date',
      rating: '⭐',
      filename: '—',
      link: 'https://www.youtube.com/watch?v=mAywOdTLQHA',
    },

    {
      title: 'Papercuts',
      era: 'OS2S',
      status: 'Released',
      producer: 'ROB EVN',
      notes: 'Made the day after his girlfriend broke up with him and became an instant success which caught the attention of UK Artist Tkandz',
      rating: '🌟',
      filename: '—',
      link: 'https://www.youtube.com/watch?v=zCYRFU6Nwjk',
    },

// Young Kenz

    {
      title: 'Throwback',
      era: 'Young Kenz',
      status: 'Released',
      producer: 'Unknown',
      notes: 'The first officially released song with DXNTE',
      rating: '—',
      filename: '—',
      link: 'https://www.youtube.com/watch?v=L7-1jyaPnZw',
    },
    {
      title: 'DND',
      era: 'Young Kenz',
      status: 'Released',
      producer: 'sk3llybeats366',
      notes: 'Rkenzos first time going into melodic drill. Uses a deeper voice and is a community favourite',
      rating: '✨',
      filename: '—',
      link: 'https://www.youtube.com/watch?v=jHh38yfr5T0',
    },

    {
      title: 'Racks Up',
      era: 'Young Kenz',
      status: 'Released',
      producer: 'masonxbeats',
      notes: 'First appearance of the Young Kenz era with sharper flows and quicker deliveries',
      rating: '—',
      filename: '',
      link: 'https://www.youtube.com/watch?v=evCgCR9aJsM',
    },

    {
      title: 'ESCOBAR',
      era: 'Young Kenz',
      status: 'Released',
      producer: 'Unknown',
      notes: 'One of the weaker songs from this era',
      rating: '🗑️',
      filename: '',
      link: 'https://www.youtube.com/watch?v=a-fqXkWxQ_g',
    },


// Rkenzo Foundation
    {
      title: 'Never Giving Up',
      era: 'Rkenzo Foundation',
      status: 'Released',
      producer: 'Unknown',
      notes: 'Rkenzos first music video. He also seemed to have scrapped this wave rap sound marking the end of  the Rkenzo Foundation Era',
      rating: '✨',
      filename: '—',
      link: 'https://www.youtube.com/watch?v=Q7liMX64Duc',
    },

    {
      title: 'Through The Night',
      era: 'Rkenzo Foundation',
      status: 'Released',
      producer: 'AriaTheProducer & VVSMelody',
      notes: 'First official release from Rkenzo using his wave rap sound',
      rating: '—',
      filename: '—',
      link: 'https://www.youtube.com/watch?v=pG9jO_771mA',
    },

    {
      title: 'Fake Love',
      era: 'Rkenzo Foundation',
      status: 'Released',
      producer: 'Flang & obmus1c',
      notes: 'Old archive track',
      rating: '🗑️',
      filename: '—',
      link: 'https://www.youtube.com/watch?v=rcRGjfP1Mp8',
    },



  ];

  const stats = useMemo(() => ({
    total: songs.length,
    leaks: songs.filter((s) => s.status === 'Leak').length,
    snippets: songs.filter((s) => s.status === 'Snippet').length,
    released: songs.filter((s) => s.status === 'Released').length,
  }), []);

  const filteredSongs = useMemo(() => {
    return songs.filter((song) => {
      const matchesSearch = [song.title, song.era, song.status, song.notes, song.filename]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesRating = filterRating === 'All' || song.rating === filterRating;
      return matchesSearch && matchesRating;
    });
  }, [search, filterRating]);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-5xl font-bold tracking-tight mb-2">
            RKENZO TRACKER
          </h1>
          <p className="text-zinc-400 text-lg">
            Community archive for songs, snippets, leaks and unreleased material.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Total Songs</p>
            <h2 className="text-3xl font-bold mt-2">{stats.total}</h2>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Leaks</p>
            <h2 className="text-3xl font-bold mt-2">{stats.leaks}</h2>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Snippets</p>
            <h2 className="text-3xl font-bold mt-2">{stats.snippets}</h2>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Released</p>
            <h2 className="text-3xl font-bold mt-2">{stats.released}</h2>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-zinc-800 flex flex-wrap items-center gap-4 justify-between">
            <h2 className="text-2xl font-semibold">Song Tracker</h2>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-wrap gap-2">
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
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text-sm">
                  <th className="text-left p-5">Rating</th>
                  <th className="text-left p-5">Song</th>
                  <th className="text-left p-5">Era</th>
                  <th className="text-left p-5">Status</th>
                  <th className="text-left p-5">Producer</th>
                  <th className="text-left p-5">Filename</th>
                  <th className="text-left p-5">Notes</th>
                  <th className="text-left p-5">Link</th>
                </tr>
              </thead>
              <tbody>
                {filteredSongs.map((song, index) => (
                  <tr
                    key={index}
                    className="border-b border-zinc-800 hover:bg-zinc-800/50 transition"
                  >
                    <td className="p-5 text-2xl">
                      <span title={RATINGS.find((r) => r.emoji === song.rating)?.label || ''}>
                        {song.rating}
                      </span>
                    </td>
                    <td className="p-5 font-medium">{song.title}</td>
                    <td className="p-5 text-zinc-300">{song.era}</td>
                    <td className="p-5">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          song.status === 'Released'
                            ? 'bg-green-500/20 text-green-400'
                            : song.status === 'Snippet'
                            ? 'bg-yellow-500/20 text-yellow-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {song.status}
                      </span>
                    </td>
                    <td className="p-5 text-zinc-300">{song.producer}</td>
                    <td className="p-5 text-zinc-400 font-mono text-sm">{song.filename}</td>
                    <td className="p-5 text-zinc-400">{song.notes}</td>
                    <td className="p-5">
                      {song.link ? (
                        <a
                          href={song.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition text-sm"
                        >
                          Open ↗
                        </a>
                      ) : (
                        <span className="text-zinc-600 text-sm">—</span>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredSongs.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-10 text-center text-zinc-500">
                      No songs match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rating Legend */}
        <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
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
                <span
                  key={tag}
                  className="bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-xl text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Community Notes</h3>
            <p className="text-zinc-400 leading-relaxed">
              This tracker is inspired by community grail trackers and archives all known Rkenzo music, snippets and unreleased content.
            </p>
          </div>
        </div>

        <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-2xl font-semibold mb-4">Deploy This Publicly</h3>
          <div className="space-y-3 text-zinc-300 leading-relaxed">
            <p>1. Copy this project into a Next.js app.</p>
            <p>2. Upload it to GitHub.</p>
            <p>3. Connect the GitHub repo to Vercel.</p>
            <p>4. Your public tracker will instantly get a live URL.</p>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="bg-black border border-zinc-800 rounded-xl p-4">
              <h4 className="font-semibold mb-2">Frontend</h4>
              <p className="text-zinc-400 text-sm">Next.js + Tailwind CSS</p>
            </div>
            <div className="bg-black border border-zinc-800 rounded-xl p-4">
              <h4 className="font-semibold mb-2">Database</h4>
              <p className="text-zinc-400 text-sm">Supabase or Firebase</p>
            </div>
            <div className="bg-black border border-zinc-800 rounded-xl p-4">
              <h4 className="font-semibold mb-2">Hosting</h4>
              <p className="text-zinc-400 text-sm">Vercel deployment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}