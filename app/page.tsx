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

const ERAS = [
  {
    name: 'Momentary Bliss',
    image: '/images/MB.jpeg',
    description: 'Upcoming Album expected to release 2026, Momentary Bliss has fans anticipating the release of grails such as Alone Now and more production from FinniX!Beats. Album seems to experiment with different sounds',
  },
  {
    name: 'OS2S: Extended Edition',
    image: '/images/OS2S_Deluxe.webp',
    description: 'Extended edition of One Shot To Shine featuring 3 more songs (RUSH THIS!, Say So and Lifestyle Lately ft Tkandz) if you purchased the bundle from the OS2S website',
  },
  {
    name: 'One Shot To Shine',
    image: '/images/OS2S.png',
    description: 'Rkenzos debut EP which put him on the map. One Shot To Shine released 23 August 2024 contains multiple fan favourites such as Papercuts, Out Til late, One Shot To Shine and many more',
  },
  {
    name: 'Young Kenz',
    image: '/images/YK.png',
    description: 'Early releases under Young Kenz',
  },
  {
    name: 'Rkenzo Foundation',
    image: '/images/Foundation.png',
    description: 'The very beginning',
  },
];

const songs = [
  // Momentary Bliss
  {
    title: 'What Da Fack Freestyle',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'Unknown',
    notes: 'Throwaway freestyle to capitalise of his viral "what the fuck happened here mate" tiktok',
    rating: '',
    filename: '—',
    link: 'https://www.instagram.com/reel/DXco17oDKcb/',
  },
  {
    title: 'Kalakatta 2.0 Ft Rkenzo',
    era: 'Momentary Bliss',
    status: 'Released',
    producer: 'Carlo Bertone',
    notes: 'Feature Rkenzo done for artist "Charlie!" to broaden his sound and become a more versitile artist',
    rating: '',
    filename: '—',
    link: 'https://www.youtube.com/watch?v=9xhi5VvcJPM&list=RD9xhi5VvcJPM&start_radio=1',
  },
  {
    title: 'Blue Boys / Therapy Ft Tkandz',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'Unknown',
    notes: 'Snippet uploaded to Instagram on April 18th 2026 where both boys are wearing light blue drip and tkandz previews a verse. Probably will drop leading up to the release of Momentary Bliss',
    rating: '🥈',
    filename: '—',
    link: 'https://www.instagram.com/reel/DXR_71rjGq4/',
  },
  {
    title: 'Rick Owens',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'Unknown',
    notes: 'Snippet uploaded to TikTok 9th May 2026',
    rating: '',
    filename: '—',
    link: 'https://vt.tiktok.com/ZS97hTvbP/',
  },
  {
    title: 'WAGWAN Fresstyle',
    era: 'Momentary Bliss',
    status: 'Throwaway',
    producer: 'GUSTO & LukasBL.',
    notes: 'Throwaway snippet uploaded to instagram',
    rating: '',
    filename: '—',
    link: 'https://www.instagram.com/reel/DW2KQOKjLZF/',
  },
  {
    title: 'Unheard collaborations with blancomadeit',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'Unknown',
    notes: 'Blancomadeit and kenz have been spotted in the studio many times and supposedly have a song',
    rating: '',
    filename: '—',
    link: 'https://www.instagram.com/p/DXKu1-7jBx4/',
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
    title: 'Underground Sound song with FinniX!Beats',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'FinniX!Beats',
    notes: 'Rkenzo would hop on an underground esdeekid type beat produced by FinniX, the original snippet is not found',
    rating: '',
    filename: '',
    link: '',
  },
  {
    title: 'MAKE IT COUNT! V2',
    era: 'Momentary Bliss',
    status: 'Released',
    producer: 'FinniX!Beats',
    notes: 'Part of the collection of songs Rkenzo made with FinniX Switzerland',
    rating: '✨',
    filename: '—',
    link: 'https://www.youtube.com/watch?v=jBivqZXolk8',
  },
  {
    title: 'One Million Streams Freestyle',
    era: 'Momentary Bliss',
    status: 'Throwaway',
    producer: 'Unknown',
    notes: 'Freestyle rkenzo uploaded via instagram to celebrate getting a million steams on spotify',
    rating: '🥉',
    filename: '—',
    link: 'https://www.instagram.com/reel/DTYS9GKDCzV/',
  },
  {
    title: 'Alone',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'FinniX!Beats',
    notes: 'Instagram live preview. Instantly hailed as a grail — part of the collection of songs Rkenzo made with FinniX Switzerland',
    rating: '🏆',
    filename: '',
    link: '',
  },
  {
    title: 'MAKE IT COUNT! V1',
    era: 'Momentary Bliss',
    status: 'Scrapped',
    producer: 'FinniX!Beats',
    notes: 'Noticeably has a different more spacelike beat. Part of the collection of songs Rkenzo made with FinniX Switzerland',
    rating: '🥉',
    filename: 'MAKE IT COUNT.wav',
    link: '',
  },
  {
    title: 'White Girl Freestyle',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'Unknown',
    notes: 'Freestyle rkenzo uploaded via instagram',
    rating: '🥉',
    filename: '—',
    link: 'https://www.instagram.com/p/DQ4tlyXDBo3/',
  },
  {
    title: 'Need That Dough',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'coreyblazyy',
    notes: 'Freestyle rkenzo uploaded via instagram',
    rating: '🥉',
    filename: '—',
    link: 'https://www.instagram.com/reel/DQIIYMojNda/',
  },

  // OS2S: Extended Edition
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
    notes: 'Revamped version of Say So with a new 2nd verse, no Kadz feature and new bars for the first verse but same flow. Finally released on the OS2S: Extended Edition. Fun fact the song would of never came out if his Kadz didnt convice him to release it',
    rating: '⭐',
    filename: 'SAY SO.wav',
    link: 'https://www.youtube.com/watch?v=w9Y_v96F9ac',
  },
  {
    title: 'All Eyes On Me',
    era: 'OS2S: Extended Edition',
    status: 'Released',
    producer: 'coreyblazyy',
    notes: 'Kenz uses a sharper sound here and uses familiar flows from Rush This. Very good song to say the least',
    rating: '✨',
    filename: '—',
    link: 'https://www.youtube.com/watch?v=kol3yTiwgQA',
  },
  {
    title: 'RUSH THIS! V4',
    era: 'OS2S: Extended Edition',
    status: 'Released',
    producer: 'RealRichMoney & Rkenzo',
    notes: 'Production of the release song would change from corey and be entirely produced by Rkenzo and RealRichMoney',
    rating: '⭐',
    filename: '—',
    link: 'https://www.youtube.com/watch?v=vPf7hVAEqTw',
  },
  {
    title: 'RUSH THIS! V3',
    era: 'OS2S: Extended Edition',
    status: 'Leaked',
    producer: 'coreyblazyy',
    notes: 'Version of RUSH THIS with alternative production',
    rating: '✨',
    filename: '2. Rkenzo - RUSH THIS! Remix by @prodbycorey_.m4a',
    link: '',
  },
  {
    title: 'RUSH THIS! V2',
    era: 'OS2S: Extended Edition',
    status: 'Leaked',
    producer: 'coreyblazyy',
    notes: 'Version of RUSH THIS with a spacelike beat',
    rating: '✨',
    filename: 'Rkenzo - RUSH THIS! Remix by @prodbycorey_.m4a',
    link: '',
  },
  {
    title: 'RUSH THIS! V1',
    era: 'OS2S: Extended Edition',
    status: 'Scrapped',
    producer: 'coreyblazyy',
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
    notes: 'Rkenzo reuses some bars from Out Till Late, One Shot To Shine and Say So V1. Debuts a new sound experimenting with club sounds',
    rating: '—',
    filename: '—',
    link: 'https://www.youtube.com/watch?v=evCgCR9aJsM',
  },
  {
    title: 'Mr Imagination - Ambrosia Ft Rkenzo',
    era: 'OS2S: Extended Edition',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Rkenzo recorded on Mr Imaginations "Ambrosia" during his time in Ghana',
    rating: '🥉',
    filename: '—',
    link: '',
  },
  {
    title: 'Lifestyle Lately V2 Feat. Tkandz',
    era: 'OS2S: Extended Edition',
    status: 'Released',
    producer: 'Gore Ocean',
    notes: 'Version of Lifestyle Lately with Tkandz verse but the music video was reshot in the UK',
    rating: '⭐',
    filename: '—',
    link: 'https://www.youtube.com/watch?v=ZDuDBuFPsmk',
  },
  {
    title: 'Lifestyle Lately V1',
    era: 'OS2S: Extended Edition',
    status: 'Scrapped',
    producer: 'Gore Ocean',
    notes: 'Version of Lifestyle Lately without Tkandz verse and alternate music video shot in Spain',
    rating: '—',
    filename: '—',
    link: '',
  },
  {
    title: 'Mind On Cake',
    era: 'OS2S: Extended Edition',
    status: 'Leaked',
    producer: 'YiciBeats',
    notes: 'Featuring Tkandz was the song meant to release instead of Lifestyle Lately but was scrapped last minute, the version that leaked is a demo. Leaked by rkenzo in 2025 on his soundcloud account OS2S Vault',
    rating: '✨',
    filename: '—',
    link: 'https://soundcloud.com/one-shot-2-shine-vault/mind-on-cake-feat-tkandz?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
  },

  // One Shot To Shine
  {
    title: 'Crossroads',
    era: 'One Shot To Shine',
    status: 'Released',
    producer: 'Unknown',
    notes: 'Released on the EP One Shot To Shine. Kenz gives more insight into his personal life and struggle',
    rating: '',
    filename: '—',
    link: 'https://www.youtube.com/watch?v=ZPkRZ9VNhho',
  },
  {
    title: 'Say So V1',
    era: 'One Shot To Shine',
    status: 'Vaulted',
    producer: 'Segway',
    notes: 'Original version of Say So containing an open verse for Tkandz which Kadz would later record on. Rkenzo comes with a catchier first verse — less lyrically powerful but the version fans like the most',
    rating: '🏆',
    filename: 'Say so with Kadz.wav',
    link: '',
  },
  {
    title: 'STYLE',
    era: 'One Shot To Shine',
    status: 'Unreleased',
    producer: 'Pierre Bourne',
    notes: "Studio session made with Kadz using the beat of Carti's Goin Outta Style. Song was never finished",
    rating: '🥉',
    filename: 'KY OS.wav',
    link: '',
  },
  {
    title: 'Go With It',
    era: 'One Shot To Shine',
    status: 'Released',
    producer: 'YiciBeats',
    notes: 'Released on the EP One Shot To Shine. Kenz experiments with a more emotional sound and does a small callback to Never Giving Up',
    rating: '✨',
    filename: '—',
    link: 'https://www.youtube.com/watch?v=4UatIB9ZjoE',
  },
  {
    title: 'One Shot To Shine',
    era: 'One Shot To Shine',
    status: 'Released',
    producer: 'Unknown',
    notes: "Intro and namesake of Rkenzo's first studio EP One Shot To Shine",
    rating: '✨',
    filename: '—',
    link: 'https://www.youtube.com/watch?v=_gmJXkfc7OY',
  },
  {
    title: 'CANT WAIT',
    era: 'One Shot To Shine',
    status: 'Released',
    producer: 'Unknown',
    notes: 'Released on the EP One Shot To Shine. Kenz sends some bars referencing his ex',
    rating: '',
    filename: '—',
    link: 'https://www.youtube.com/watch?v=yHUsIK3i2f0',
  },
  {
    title: 'Out Till Late',
    era: 'One Shot To Shine',
    status: 'Released',
    producer: 'Unknown',
    notes: 'Featuring Whizz. Reportedly made in one take and is a fan favourite. One of his biggest songs to date',
    rating: '⭐',
    filename: '—',
    link: 'https://www.youtube.com/watch?v=mAywOdTLQHA',
  },
  {
    title: 'Papercuts',
    era: 'One Shot To Shine',
    status: 'Released',
    producer: 'ROB EVN',
    notes: 'Made the day after his girlfriend broke up with him. Became an instant success which caught the attention of UK artist Tkandz',
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
    notes: "Rkenzo's first time going into melodic drill. Uses a deeper voice and is a community favourite",
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
    filename: '—',
    link: 'https://www.youtube.com/watch?v=evCgCR9aJsM',
  },
  {
    title: 'ESCOBAR',
    era: 'Young Kenz',
    status: 'Released',
    producer: 'Unknown',
    notes: 'One of the weaker songs from this era',
    rating: '🗑️',
    filename: '—',
    link: 'https://www.youtube.com/watch?v=a-fqXkWxQ_g',
  },

  // Rkenzo Foundation
  {
    title: 'Never Giving Up',
    era: 'Rkenzo Foundation',
    status: 'Released',
    producer: 'Unknown',
    notes: "Rkenzo's first music video. He seemed to scrap this wave rap sound, marking the end of the Rkenzo Foundation Era",
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

export default function RkenzoTracker() {
  const [search, setSearch] = useState('');
  const [filterRating, setFilterRating] = useState('All');
  const [filterEra, setFilterEra] = useState('All');
  // All eras open by default — tracks which ones the user has manually closed
  const [collapsedEras, setCollapsedEras] = useState<Set<string>>(new Set());

  const toggleEra = (eraName: string) => {
    setCollapsedEras((prev) => {
      const next = new Set(prev);
      if (next.has(eraName)) {
        next.delete(eraName);
      } else {
        next.add(eraName);
      }
      return next;
    });
  };

  const stats = useMemo(() => ({
    total: songs.length,
    leaks: songs.filter((s) => s.status === 'Leaked').length,
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
      const matchesEra = filterEra === 'All' || song.era === filterEra;
      return matchesSearch && matchesRating && matchesEra;
    });
  }, [search, filterRating, filterEra]);

  const groupedByEra = useMemo(() => {
    return ERAS.map((era) => ({
      ...era,
      songs: filteredSongs.filter((s) => s.era === era.name),
    })).filter((era) => era.songs.length > 0);
  }, [filteredSongs]);

  const statusColor = (status: string) => {
    switch (status) {
      case 'Released':   return 'bg-green-500/20 text-green-400';
      case 'Snippet':    return 'bg-yellow-500/20 text-yellow-300';
      case 'Vaulted':    return 'bg-purple-500/20 text-purple-300';
      case 'Scrapped':   return 'bg-orange-500/20 text-orange-300';
      case 'Leaked':     return 'bg-blue-500/20 text-blue-300';
      case 'Throwaway':  return 'bg-zinc-500/20 text-zinc-400';
      default:           return 'bg-red-500/20 text-red-300';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold tracking-tight mb-2">RKENZO TRACKER</h1>
          <p className="text-zinc-400 text-lg">
            Community archive for songs, snippets, leaks and unreleased material.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Songs', value: stats.total },
            { label: 'Leaks', value: stats.leaks },
            { label: 'Snippets', value: stats.snippets },
            { label: 'Released', value: stats.released },
          ].map((stat) => (
            <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <p className="text-zinc-400 text-sm">{stat.label}</p>
              <h2 className="text-3xl font-bold mt-2">{stat.value}</h2>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-4 flex flex-wrap items-center gap-3 justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-zinc-500 text-xs uppercase tracking-wider mr-1">Rating</span>
            <button
              onClick={() => setFilterRating('All')}
              className={`px-3 py-1 rounded-xl text-sm border transition ${
                filterRating === 'All' ? 'bg-white text-black border-white' : 'bg-zinc-800 border-zinc-700 hover:border-white'
              }`}
            >
              All
            </button>
            {RATINGS.filter((r) => r.emoji !== '—').map((r) => (
              <button
                key={r.emoji}
                onClick={() => setFilterRating(filterRating === r.emoji ? 'All' : r.emoji)}
                className={`px-3 py-1 rounded-xl text-sm border transition ${
                  filterRating === r.emoji ? 'bg-white text-black border-white' : 'bg-zinc-800 border-zinc-700 hover:border-white'
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

        {/* Era Filter */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-8 flex flex-wrap items-center gap-3">
          <span className="text-zinc-500 text-xs uppercase tracking-wider mr-1">Era</span>
          <button
            onClick={() => setFilterEra('All')}
            className={`px-3 py-1 rounded-xl text-sm border transition ${
              filterEra === 'All' ? 'bg-white text-black border-white' : 'bg-zinc-800 border-zinc-700 hover:border-white'
            }`}
          >
            All Eras
          </button>
          {ERAS.map((era) => (
            <button
              key={era.name}
              onClick={() => setFilterEra(filterEra === era.name ? 'All' : era.name)}
              className={`px-3 py-1 rounded-xl text-sm border transition ${
                filterEra === era.name ? 'bg-white text-black border-white' : 'bg-zinc-800 border-zinc-700 hover:border-white'
              }`}
            >
              {era.name}
            </button>
          ))}
        </div>

        {/* Era Sections */}
        <div className="space-y-6">
          {groupedByEra.map((era) => {
            const isCollapsed = collapsedEras.has(era.name);
            return (
              <div key={era.name} className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">

                {/* Era Banner — click to collapse/expand */}
                <button
                  onClick={() => toggleEra(era.name)}
                  className="w-full text-left flex items-stretch min-h-[120px] hover:bg-zinc-800/30 transition"
                >
                  {/* Era Image */}
                  <div className="w-40 flex-shrink-0 bg-zinc-800 flex items-center justify-center overflow-hidden">
                    {era.image ? (
                      <img src={era.image} alt={era.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-1 text-zinc-600 text-center px-2">
                        <span className="text-3xl">🖼️</span>
                        <span className="text-xs">Add image</span>
                      </div>
                    )}
                  </div>

                  {/* Era Info */}
                  <div className="flex-1 p-6 flex flex-col justify-center border-l border-zinc-800">
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="text-2xl font-bold tracking-tight">{era.name}</h2>
                      <span className="text-zinc-500 text-xl mr-2 flex-shrink-0">
                        {isCollapsed ? '▸' : '▾'}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-sm mt-1">{era.description}</p>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-zinc-500">
                      <span>{era.songs.length} song{era.songs.length !== 1 ? 's' : ''}</span>
                      <span>{era.songs.filter((s) => s.status === 'Released').length} released</span>
                      <span>{era.songs.filter((s) => s.status === 'Snippet').length} snippets</span>
                      <span>{era.songs.filter((s) => s.status === 'Leaked').length} leaks</span>
                      <span>{era.songs.filter((s) => ['Unreleased', 'Vaulted', 'Scrapped'].includes(s.status)).length} unreleased</span>
                    </div>
                  </div>
                </button>

                {/* Songs Table — hidden when collapsed */}
                {!isCollapsed && (
                  <div className="overflow-x-auto border-t border-zinc-800">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-zinc-800 text-zinc-500 text-xs uppercase tracking-wider">
                          <th className="text-left px-5 py-3">Rating</th>
                          <th className="text-left px-5 py-3">Song</th>
                          <th className="text-left px-5 py-3">Status</th>
                          <th className="text-left px-5 py-3">Producer</th>
                          <th className="text-left px-5 py-3">Filename</th>
                          <th className="text-left px-5 py-3">Notes</th>
                          <th className="text-left px-5 py-3">Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        {era.songs.map((song, index) => (
                          <tr
                            key={index}
                            className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50 transition"
                          >
                            <td className="px-5 py-4 text-xl">
                              <span title={RATINGS.find((r) => r.emoji === song.rating)?.label || 'Unrated'}>
                                {song.rating || '—'}
                              </span>
                            </td>
                            <td className="px-5 py-4 font-medium">{song.title}</td>
                            <td className="px-5 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(song.status)}`}>
                                {song.status}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-zinc-300 text-sm">{song.producer}</td>
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
                )}
              </div>
            );
          })}

          {groupedByEra.length === 0 && (
            <div className="text-center text-zinc-500 py-20">
              No songs match your search.
            </div>
          )}
        </div>

        {/* Rating Legend */}
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
              This tracker is inspired by community grail trackers and archives all known Rkenzo music, snippets and unreleased content.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}