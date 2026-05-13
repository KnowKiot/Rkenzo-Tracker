// ─────────────────────────────────────────────
//  RKENZO TRACKER — Data Store
//  Edit this file to add / update songs, eras,
//  ratings, and music videos.
// ─────────────────────────────────────────────

export const RATINGS = [
  { emoji: '🏆', label: 'Grail' },
  { emoji: '🌟', label: 'Classic' },
  { emoji: '⭐', label: 'Best Of' },
  { emoji: '✨', label: 'Special' },
  { emoji: '🥇', label: 'Most Wanted' },
  { emoji: '🥈', label: '2nd Best' },
  { emoji: '🥉', label: 'Wanted' },
  { emoji: '🗑️', label: 'Worst Of' },
  { emoji: '—', label: 'Unrated' },
] as const;

export type RatingEmoji = (typeof RATINGS)[number]['emoji'] | '';

export type SongStatus =
  | 'Released'
  | 'Snippet'
  | 'Vaulted'
  | 'Scrapped'
  | 'Leaked'
  | 'Throwaway'
  | 'Rumoured'
  | 'Confirmed'
  | 'Unreleased';

export interface Song {
  title: string;
  era: string;
  status: SongStatus;
  producer: string;
  notes: string;
  rating: RatingEmoji;
  filename: string;
  link: string;
}

export interface Era {
  name: string;
  image: string;
  description: string;
  accent: string;
  accentBg: string;
}

export type VideoStatus = 'Released' | 'Unreleased' | 'Scrapped';

export interface MusicVideo {
  title: string;
  era: string;
  youtubeId: string; // just the video ID, e.g. "dQw4w9WgXcQ"
  status: VideoStatus;
  rating: RatingEmoji;
  director?: string;
  releaseDate?: string;
  notes?: string;
}

// ─── ERAS ────────────────────────────────────

export const ERAS: Era[] = [
  {
    name: 'Momentary Bliss',
    image: '/images/MB.jpeg',
    description:
      'Upcoming Album expected to release 2026, Momentary Bliss has fans anticipating the release of grails such as Alone Now and more production from FinniX!Beats. Album seems to experiment with different sounds',
    accent: '#60ecff',
    accentBg: 'rgba(96,236,255,0.06)',
  },
  {
    name: 'OS2S: Extended Edition',
    image: '/images/OS2S_Deluxe.webp',
    description:
      'Extended edition of One Shot To Shine featuring 3 more songs (RUSH THIS!, Say So and Lifestyle Lately ft Tkandz) if you purchased the bundle from the OS2S website',
    accent: '#ff9129',
    accentBg: 'rgba(255,145,41,0.06)',
  },
  {
    name: 'One Shot To Shine',
    image: '/images/OS2S.png',
    description:
      'Rkenzos debut EP which put him on the map. One Shot To Shine released 23 August 2024 contains multiple fan favourites such as Papercuts, Out Til late, One Shot To Shine and many more',
    accent: '#ffd900',
    accentBg: 'rgba(255,217,0,0.06)',
  },
  {
    name: 'Young Kenz',
    image: '/images/YK.png',
    description:
      'Early releases under Young Kenz, during this era kenz experimented heavily with drill tapping into melodic and other styles of drill marking his end of wave rap',
    accent: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.06)',
  },
  {
    name: 'Rkenzo Foundation',
    image: '/images/Foundation.png',
    description:
      'The first releases of his songs under the name "Rkenzo". During this era he focused more on the wave rap sound and only released 3 songs before he transitioned his sound into drill',
    accent: '#f87171',
    accentBg: 'rgba(248,113,113,0.06)',
  },
];

// ─── SONGS ───────────────────────────────────

export const SONGS: Song[] = [
  // ── Momentary Bliss ──────────────────────────
  {
    title: 'What Da Fack Freestyle',
    era: 'Momentary Bliss',
    status: 'Throwaway',
    producer: 'Unknown',
    notes: 'Throwaway freestyle to capitalise of his viral "what the fuck happened here mate" tiktok',
    rating: '',
    filename: '—',
    link: 'https://www.instagram.com/reel/DXco17oDKcb/',
  },
  {
    title: 'Charlie! - Kalakatta 2.0 Ft Rkenzo',
    era: 'Momentary Bliss',
    status: 'Released',
    producer: 'Carlo Bertone',
    notes: 'Feature Rkenzo done for artist "Charlie!" to broaden his sound and become a more versitile artist',
    rating: '',
    filename: '—',
    link: 'https://www.youtube.com/watch?v=9xhi5VvcJPM&list=RD9xhi5VvcJPM&start_radio=1',
  },
  {
    title: 'Milan Ft Tkandz',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'Unknown',
    notes:
      'Snippet uploaded to Instagram on April 18th 2026 where both boys are wearing light blue drip and tkandz previews a verse. Probably will drop leading up to the release of Momentary Bliss',
    rating: '🥇',
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
    notes: 'Throwaway snippet uploaded to instagram. Song samples Central Cee’s WAGWAN instrumental song probably was made to capitalise on the popularity of the WAGWAN and never intended for release',
    rating: '',
    filename: '—',
    link: 'https://www.instagram.com/reel/DW2KQOKjLZF/',
  },
  {
    title: 'Unheard collaborations with blancomadeit',
    era: 'Momentary Bliss',
    status: 'Rumoured',
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
    notes: 'Second song released in the Momentary Bliss rollout likely another throwaway song',
    rating: '🗑️',
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
    title: 'Show me your love',
    era: 'Momentary Bliss',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Song considered for Momentary Bliss tracklist',
    rating: '',
    filename: '',
    link: '',
  },
  {
    title: 'Fallin in',
    era: 'Momentary Bliss',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Song considered for Momentary Bliss tracklist',
    rating: '',
    filename: '',
    link: '',
  },
  {
    title: 'Tracy Beaker',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'Unknown',
    notes: 'Freestyle previewed to tiktok via rkenzo, using a never before seen flow and a catchy hook. Song is speculated to be on Momentary Bliss and is highly anticipated by fans as it would be unfortunate for it to be a throwaway',
    rating: '🥈',
    filename: '',
    link: 'https://www.tiktok.com/@rkenzo.1/video/7609352871368248598?_r=1&_t=ZS-96Ky1x4NLt2',
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
    notes:
      'Instagram live preview. Instantly hailed as a grail — part of the collection of songs Rkenzo made with FinniX Switzerland',
    rating: '🏆',
    filename: '',
    link: 'https://imgur.gg/f/EgxCX5j',
  },
  {
    title: 'MAKE IT COUNT! V1',
    era: 'Momentary Bliss',
    status: 'Scrapped',
    producer: 'FinniX!Beats',
    notes:
      'Noticeably has a different more spacelike beat. Part of the collection of songs Rkenzo made with FinniX Switzerland',
    rating: '🥉',
    filename: 'MAKE IT COUNT.wav',
    link: '',
  },
  {
    title: 'Fan Girl Freestyle',
    era: 'Momentary Bliss',
    status: 'Throwaway',
    producer: 'Unknown',
    notes: 'Freestyle rkenzo uploaded via instagram',
    rating: '🥈',
    filename: '—',
    link: 'https://www.instagram.com/p/DQ4tlyXDBo3/',
  },
  {
    title: 'On Go',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'coreyblazyy',
    notes: 'Freestyle rkenzo uploaded via instagram',
    rating: '🥉',
    filename: '—',
    link: 'https://www.instagram.com/reel/DQIIYMojNda/',
  },

  // ── OS2S: Extended Edition ───────────────────
  {
    title: 'OS2S Freestyle',
    era: 'OS2S: Extended Edition',
    status: 'Released',
    producer: 'Unknown',
    notes:
      'Promotional song marking the release of his clothing brand OS2S. Music video features cameos from blancomadeit and FinniX!Beats',
    rating: '✨',
    filename: '—',
    link: 'https://www.youtube.com/watch?v=8FcIn74uNzk',
  },
  {
    title: 'Say So V2',
    era: 'OS2S: Extended Edition',
    status: 'Released',
    producer: 'Segway',
    notes:
      'Revamped version of Say So with a new 2nd verse, no Kadz feature and new bars for the first verse but same flow. Finally released on the OS2S: Extended Edition. Fun fact the song would of never came out if his Kadz didnt convice him to release it',
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
    link: 'LINK REQUIRED',
  },
  {
    title: 'RUSH THIS! V2',
    era: 'OS2S: Extended Edition',
    status: 'Snippet',
    producer: 'coreyblazyy',
    notes: 'Version of RUSH THIS with a spacelike beat',
    rating: '🥈',
    filename: 'Rkenzo - RUSH THIS! Remix by @prodbycorey_.m4a',
    link: 'https://imgur.gg/f/YsaasWo',
  },
  {
    title: 'RUSH THIS! V1',
    era: 'OS2S: Extended Edition',
    status: 'Scrapped',
    producer: 'seigmon',
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
    notes:
      'Rkenzo reuses some bars from Out Till Late, One Shot To Shine and Say So V1. Debuts a new sound experimenting with club sounds',
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
    title: 'Unheard collaborations with Mr Imagination',
    era: 'OS2S: Extended Edition',
    status: 'Rumoured',
    producer: 'Unknown',
    notes: 'Rkenzo and Mr Imagination were recording together in Ghana and have likely made songs after Ambrosia',
    rating: '🥉',
    filename: '—',
    link: '',
  },
  {
    title: 'Peso',
    era: 'OS2S: Extended Edition',
    status: 'Scrapped',
    producer: 'Unknown',
    notes: 'Experimental drill song Rkenzo recorded after coming back from spain and shooting Lifetstyle Lately V1 music video. Sone never surfaced but fans anticipate it, song uses bars from Say So',
    rating: '🥉',
    filename: 'sexy drill 3.wav',
    link: 'https://vt.tiktok.com/ZSxJRKWEw/',
  },
  {
    title: 'Lifestyle Lately V2 Feat. Tkandz',
    era: 'OS2S: Extended Edition',
    status: 'Released',
    producer: 'Gore Ocean',
    notes: 'Version of Lifestyle Lately with Tkandz verse but the music video was reshot in the UK',
    rating: '⭐',
    filename: 'Lifestyle Lately Ft Tkandz (X).wav',
    link: 'https://www.youtube.com/watch?v=ZDuDBuFPsmk',
  },
  {
    title: 'Lifestyle Lately V1',
    era: 'OS2S: Extended Edition',
    status: 'Scrapped',
    producer: 'Gore Ocean',
    notes: 'Version of Lifestyle Lately without Tkandz verse and alternate music video shot in Spain',
    rating: '—',
    filename: 'Lifestyle Lately (X).wav',
    link: '',
  },
  {
    title: 'Mind On Cake',
    era: 'OS2S: Extended Edition',
    status: 'Leaked',
    producer: 'YiciBeats',
    notes:
      'Featuring Tkandz was the song meant to release instead of Lifestyle Lately but was scrapped last minute, the version that leaked is a demo. Leaked by rkenzo in 2025 on his soundcloud account OS2S Vault',
    rating: '✨',
    filename: '—',
    link: 'https://soundcloud.com/one-shot-2-shine-vault/mind-on-cake-feat-tkandz?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
  },
  {
    title: 'DJ AG Freestyle',
    era: 'OS2S: Extended Edition',
    status: 'Throwaway',
    producer: 'Unknown',
    notes:
      'Freestyle rkenzo previewed with south london DJ AG, recorded on ig live',
    rating: '🥉',
    filename: '—',
    link: 'https://www.instagram.com/p/DCkD3JFOXxD/',
  },
  {
    title: 'Go Mode',
    era: 'OS2S: Extended Edition',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Song made in OS2S: Extended Edition Era but never saw the light of day',
    rating: '',
    filename: '',
    link: '',
  },
  {
    title: 'Mental Ft Tkandz & Rkenzo',
    era: 'OS2S: Extended Edition',
    status: 'Released',
    producer: 'Unknown',
    notes:
      'Australian artist song featuring both Tkandz and Rkenzo. song was sent to rkenzo around october/november 2024 and Rkenzo gives a fresh new flow aligning with the OS2S theme reuses his famous han solo bar and sees Tkandz deliver a american flow verse. Song was taken down by Tkandz label for unknown reasons',
    rating: '✨',
    filename: '—',
    link: 'Unavailable due to copyright claims',
  },
  {
    title: 'Too Fast',
    era: 'OS2S: Extended Edition',
    status: 'Vaulted',
    producer: 'Unknown',
    notes:
      'Collaborative song Rkenzo made with one of his collegues from his university course, Rkenzo experiments with a new sound and reuses some bars but the melodic delivery from both artists in a catchy manner, fans anticipate it to release on Momentary Bliss but doesnt seem likely as the feature was never cleared from the other artist',
    rating: '🏆',
    filename: '—',
    link: '',
  },
  // ── One Shot To Shine ────────────────────────
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
    status: 'Leaked',
    producer: 'Segway',
    notes:
      'Original version of Say So containing an open verse for Tkandz which Kadz would later record on. Rkenzo comes with a catchier first verse — less lyrically powerful but the version fans like the most',
    rating: '🏆',
    filename: 'Say so with Kadz.wav',
    link: 'https://imgur.gg/f/bgZEljF',
  },
  {
    title: 'STYLE',
    era: 'One Shot To Shine',
    status: 'Leaked',
    producer: 'Pierre Bourne',
    notes: "Studio session made with Kadz using the beat of Carti's Goin Outta Style. Song was never finished",
    rating: '🥉',
    filename: 'KY OS.wav',
    link: 'https://imgur.gg/f/vhzirEF',
  },
  {
    title: 'Go With It',
    era: 'One Shot To Shine',
    status: 'Released',
    producer: 'YiciBeats',
    notes:
      'Released on the EP One Shot To Shine. Kenz experiments with a more emotional sound and does a small callback to Never Giving Up',
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
    notes:
      'Made the day after his girlfriend broke up with him. Became an instant success which caught the attention of UK artist Tkandz',
    rating: '🌟',
    filename: 'Rkenzo - PaperCuts.wav',
    link: 'https://www.youtube.com/watch?v=zCYRFU6Nwjk',
  },

  // ── Young Kenz ───────────────────────────────
  {
    title: 'JOEY CLIPSTAR FREESTYLE',
    era: 'Young Kenz',
    status: 'Released',
    producer: 'Ayp',
    notes:
      'Last song rkenzo released during the young kenz era marking his transition into One Shot To Shine. He very famously said "I was stressed on my last fiver" in this song and reflects upon his personal growth and aspirations',
    rating: '✨',
    filename: '—',
    link: 'https://www.youtube.com/watch?v=8HbGLCi-BCE&list=RD8HbGLCi-BCE&start_radio=1',
  },

  {
    title: "Let's Get It",
    era: 'Young Kenz',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Unreleased song made during the Young Kenz era which he shared to Mr Imagination. This song never released but the people who have heard it consider it as the best song from this era',
    rating: '🥇',
    filename: '',
    link: '',
  },

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
    rating: '⭐',
    filename: '—',
    link: 'https://www.youtube.com/watch?v=jHh38yfr5T0',
  },
  
  {
    title: 'Rolling',
    era: 'Young Kenz',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Demo Rkenzo made with Kadz in his room but was never finished into an actual song.',
    rating: '🥉',
    filename: '',
    link: '',
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

  // ── Rkenzo Foundation ────────────────────────
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
    notes: 'Second song he released under the Rkenzo Foundation Era. Song is still using wave rap sound but has faster tempo and quicker flows however the song would be one of his weakest songs from this era and the producer tagged spammed over the song wouldnt help its case',
    rating: '🗑️',
    filename: '—',
    link: 'https://www.youtube.com/watch?v=rcRGjfP1Mp8',
  },
];

// ─── MUSIC VIDEOS ────────────────────────────
// youtubeId = the part after "watch?v=" in the URL
// For unreleased/scrapped videos with no YouTube ID, use youtubeId: ''

export const MUSIC_VIDEOS: MusicVideo[] = [
  // ── Momentary Bliss ──
  {
    title: 'EVISU JEANS (Live Performance)',
    era: 'Momentary Bliss',
    youtubeId: 'HrTWu-lV6DQ',
    status: 'Released',
    rating: '✨',
    releaseDate: '2026',
    notes: 'Live performance of EVISU JEANS and is much better than the actual music video showcasing a more energentic kenz and a better visuals overall',
  },

  {
    title: 'EVISU JEANS',
    era: 'Momentary Bliss',
    youtubeId: 'GCz7GZODsv4',
    status: 'Released',
    rating: '',
    releaseDate: '2026',
    notes: 'Marks the rollout of Momentary Bliss. Shot at tower bridge some cool scenes but overall felt rushed to push the roll out of Momentary Bliss forward',
  },
  {
    title: 'Chasing Paper',
    era: 'Momentary Bliss',
    youtubeId: 'MFjM_NQvPC0',
    status: 'Released',
    rating: '',
    releaseDate: '2026',
    notes: 'Second Momentary Bliss rollout drop — likely a throwaway',
  },
  {
    title: 'MAKE IT COUNT! V2',
    era: 'Momentary Bliss',
    youtubeId: 'jBivqZXolk8',
    status: 'Released',
    rating: '⭐',
    releaseDate: '2025',
    notes: 'FinniX!Beats collab. Visual shot with the Swiss camp',
  },

  // ── OS2S: Extended Edition ──
  {
    title: 'Say So V2',
    era: 'OS2S: Extended Edition',
    youtubeId: 'w9Y_v96F9ac',
    status: 'Released',
    rating: '✨',
    releaseDate: '2025',
    notes: 'Official music video for the revamped Say So reportedly meant to be shot in France but was ultimately shot in the UK',
  },
  {
    title: 'OS2S Freestyle',
    era: 'OS2S: Extended Edition',
    youtubeId: '8FcIn74uNzk',
    status: 'Released',
    rating: '⭐',
    releaseDate: '2024',
    notes: 'Promo for the OS2S clothing drop — cameos from blancomadeit & FinniX!Beats',
  },
  {
    title: 'Lifestyle Lately V2 Ft. Tkandz',
    era: 'OS2S: Extended Edition',
    youtubeId: 'ZDuDBuFPsmk',
    status: 'Released',
    rating: '⭐',
    releaseDate: '2024',
    notes: 'UK reshot version featuring Tkandz marking their first public collaboration',
  },
  {
    title: 'Lifestyle Lately V1',
    era: 'OS2S: Extended Edition',
    youtubeId: '',
    status: 'Scrapped',
    rating: '🏆',
    releaseDate: '2024',
    notes: 'Rkenzo would post to tiktok showcasing lifestyle lately V1 in spain supposedly for a music video but never released due to a crazy story rkenzo hasnt touch in depth of but claims a madness happened. Replaced by the UK reshot version with Tkandz',
  },
  {
    title: 'RUSH THIS! V4 (Lyric Video)',
    era: 'OS2S: Extended Edition',
    youtubeId: 'vPf7hVAEqTw',
    status: 'Released',
    rating: '',
    releaseDate: '2024',
    notes: 'Official lyric video with RealRichMoney production. Shame there is no proper MV for this one',
  },

  // ── One Shot To Shine ──
  {
    title: 'Papercuts',
    era: 'One Shot To Shine',
    youtubeId: 'zCYRFU6Nwjk',
    status: 'Released',
    rating: '🌟',
    releaseDate: '2024',
    notes: 'Breakout visual — shot in the ends, raw and authentic',
  },
  {
    title: 'CANT WAIT',
    era: 'One Shot To Shine',
    youtubeId: 'yHUsIK3i2f0',
    status: 'Released',
    rating: '',
    releaseDate: '2024',
    notes: 'Apparently this music video was shot for free — only the second proper MV from the OS2S era',
  },

  // ── Young Kenz ──
  {
    title: 'DND',
    era: 'Young Kenz',
    youtubeId: 'jHh38yfr5T0',
    status: 'Released',
    rating: '⭐',
    releaseDate: '2023',
    notes: "First music video of the Young Kenz era. Melodic drill, deeper voice, noticeably higher production quality",
  },
  {
    title: 'JOEY CLIPSTAR FREESTYLE',
    era: 'Young Kenz',
    youtubeId: '8HbGLCi-BCE',
    status: 'Released',
    rating: '',
    releaseDate: '2023',
    notes: '"I was stressed on my last fiver" — cult favourite, marks the end of the Young Kenz era',
  },

  // ── Rkenzo Foundation ──
  {
    title: 'Never Giving Up',
    era: 'Rkenzo Foundation',
    youtubeId: 'Q7liMX64Duc',
    status: 'Released',
    rating: '✨',
    releaseDate: '2022',
    notes: "Debut music video. Wave rap era — he scrapped this sound straight after",
  },
];