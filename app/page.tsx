"use client";

import { useMemo, useState } from 'react';

export default function RkenzoTracker() {
  const [search, setSearch] = useState('');
  const songs = [
    {
      title: 'Throwback',
      era: '2023 Era',
      status: 'Released',
      producer: 'Unknown',
      notes: 'Official release',
    },
    {
      title: 'DND',
      era: '2023 Era',
      status: 'Released',
      producer: 'Unknown',
      notes: 'Durk & Drake inspired',
    },
    {
      title: 'Never Giving Up',
      era: 'Recent',
      status: 'Released',
      producer: 'Unknown',
      notes: 'Streaming platforms',
    },
    {
      title: '4AM',
      era: 'Late Night Era',
      status: 'Snippet',
      producer: 'Unknown',
      notes: 'Instagram live preview',
    },
    {
      title: 'No Hook',
      era: 'Vaulted',
      status: 'Unreleased',
      producer: '—',
      notes: 'Previewed once and deleted',
    },
    {
      title: 'Pain Freestyle',
      era: '2024 Era',
      status: 'Snippet',
      producer: 'Unknown',
      notes: 'TikTok snippet circulating',
    },
    {
      title: 'Take Risks',
      era: '2024 Era',
      status: 'Released',
      producer: 'Unknown',
      notes: 'YouTube release',
    },
    {
      title: 'Fake Love',
      era: 'Early Era',
      status: 'Archived',
      producer: '—',
      notes: 'Old archive track',
    },
    {
      title: 'Drillers & Trappers',
      era: 'Street Era',
      status: 'Snippet',
      producer: 'Unknown',
      notes: 'Low quality live recording',
    },
    {
      title: 'Lost Files',
      era: 'Vaulted',
      status: 'Lost',
      producer: '—',
      notes: 'Mentioned by fans, never surfaced',
    },
    {
      title: 'City Lights',
      era: 'Melodic Era',
      status: 'Unreleased',
      producer: 'Unknown',
      notes: 'Private preview circulating online',
    },
    {
      title: 'Unknown Snippet',
      era: 'Vaulted',
      status: 'Snippet',
      producer: '—',
      notes: 'Low quality live preview',
    },
  ];

  // Fix 1: Compute stats dynamically instead of hardcoding them
  const stats = useMemo(() => ({
    total: songs.length,
    leaks: songs.filter((s) => s.status === 'Leak').length,
    snippets: songs.filter((s) => s.status === 'Snippet').length,
    released: songs.filter((s) => s.status === 'Released').length,
  }), []);

  const filteredSongs = useMemo(() => {
    return songs.filter((song) =>
      [song.title, song.era, song.status, song.notes]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      {/* Fix 2: All content inside a single max-w-6xl wrapper */}
      <div className="max-w-6xl mx-auto">
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
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Song Tracker</h2>

            <input
              type="text"
              placeholder="Search songs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 outline-none focus:border-white transition w-64"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text-sm">
                  <th className="text-left p-5">Song</th>
                  <th className="text-left p-5">Era</th>
                  <th className="text-left p-5">Status</th>
                  <th className="text-left p-5">Producer</th>
                  <th className="text-left p-5">Notes</th>
                </tr>
              </thead>

              <tbody>
                {filteredSongs.map((song, index) => (
                  <tr
                    key={index}
                    className="border-b border-zinc-800 hover:bg-zinc-800/50 transition"
                  >
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
                    <td className="p-5 text-zinc-400">{song.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
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

        <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
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
  ); // Fix 3: was ): instead of );
}