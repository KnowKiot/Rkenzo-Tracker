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
  links?: string[];
  altNames?: string[];
  releaseDate?: string;
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

export type TracklistStatus = 'Confirmed' | 'Rumoured' | 'Scrapped' | 'Unreleased' | 'Released';
 
export interface TrackEntry {
  position: number;
  title: string;
  confirmed: boolean;   // is this specific track confirmed, or just rumoured?
  features?: string;    // e.g. "ft. Tkandz"
  producer?: string;
  notes?: string;
  isBonusTrack?: boolean; // marks track as a bonus/deluxe version track
}
 
export interface Tracklist {
  project: string;      // album / EP / mixtape name
  era: string;
  status: TracklistStatus;
  source?: string;      // where the tracklist came from, e.g. "rkenzo instagram live"
  updatedDate?: string; // when this tracklist was last updated
  notes?: string;       // general notes about the project
  tracks: TrackEntry[];
}

// ─── ERAS ────────────────────────────────────

export const ERAS: Era[] = [
  {
    name: 'Momentary Bliss',
    image: '/images/MB.jpeg',
    description:
      "Momentary Bliss era marks the start of Kenz' music from 2026 leading up to the release of his upcoming EP expected to release 2026, Momentary Bliss has fans anticipating the release of grails such as Alone Now and more production from FinniX!Beats. Project seems to experiment with different sounds and has a spacey-like theme. Fans believe this will be his biggest project yet",
    accent: '#60ecff',
    accentBg: 'rgba(96,236,255,0.06)',
  },
  {
    name: 'OS2S: Extended Edition',
    image: '/images/OS2S_Deluxe.webp',
    description:
      'Extended edition of One Shot To Shine featuring 3 more songs (RUSH THIS!, Say So and Lifestyle Lately ft Tkandz) if you purchased the bundle from the OS2S website. This era mainly consist of songs made after OS2S and before Momentary Bliss. 2024 - 2025',
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
      'From 2023 Rkenzo would switch his style completely and transition into the "Young Kenz" era. Early releases under Young Kenz consisnt of experiments with drill, tapping into melodic and other styles of drill marking his end of wave rap',
    accent: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.06)',
  },
  {
    name: 'Rkenzo Foundation',
    image: '/images/Foundation.png',
    description:
      'Kick started in 2022 this era holds the first releases of his songs under the name "Rkenzo". During this era he focused more on the wave rap sound and only released 3 songs before he transitioned his sound into drill',
    accent: '#f87171',
    accentBg: 'rgba(248,113,113,0.06)',
  },
];

// ─── SONGS ───────────────────────────────────

export const SONGS: Song[] = [
  // ── Momentary Bliss ──────────────────────────

  {
    title: "Spanish Guitar",
    era: 'Momentary Bliss',
    status: 'Scrapped',
    producer: 'Unknown',
    notes: 'Seen on momentary bliss tracklist. Not much is known about this song but since it hasnt appeared elsewhere it is likely scrapped',
    rating: '',
    filename: '',
    links: [''],
  },

  {
    title: "Ridin' Slow",
    era: 'Momentary Bliss',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Calm song where Kenz uses a talking? Flow. In this track he uses bars that can be seen on No Time/Money Fast and he also raps about tracks he’s made such as Papercuts, DND and Out Till Late ',
    rating: '',
    filename: '',
    links: [''],
  },

  {
    title: 'Ride With The Crew',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'Sagemon',
    notes: "Experimental song with a starry like instrumental similar to playboi carti's OMERTA & Pink Diamonds. Song is expected to release on Momentary Bliss",
    rating: '🏆',
    filename: 'RWTC.wav',
    links: ['https://imgur.gg/f/HxxKboZ', 'https://imgur.gg/f/YGmbPXM'],
    altNames: ['RWTC', 'Ride With Da Crew'],
  },

  {
    title: 'Stretham Hill',
    era: 'Momentary Bliss',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Emotional song similar to crossroads where kenz expresses his life growing up in South London, Stretham and talks about the things he has experiences and witenesses and how it motivates him to do better',
    rating: '🥈',
    filename: 'stretham hill where i reside.wav',
    links: [],
    altNames: ['Stretham Hill Where I Reside', 'Stretham Hill (Where I Reside)'],
  },

  {
    title: 'Flexin',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'Unknown',
    notes: 'Similar flow and beat as REALIST! Song is not finished ',
    rating: '',
    filename: 'flexin - 14/04/2026, 01.18.wav',
    links: ['https://imgur.gg/f/SzhfuIM'],
  },


  {
    title: 'REALIST!',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'Sagemon',
    notes: 'Chill back song uses a bouncy beat similar to Out tha way. Kenz delivers solid bars on this song and it could possibly release on Momentary Bliss as bonus track make the main cut potentially',
    rating: '🥉',
    filename: 'REALIST.wav',
    links: ['https://imgur.gg/f/MZhg0LX'],
    altNames: ['REALIST', 'Realist'],
  },

  {
    title: 'TOO LATE',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'Unknown',
    notes: 'Unfinished song / Demo with a new flow debut. Good song with a wavy beat',
    rating: '🥉',
    filename: 'TOO LATE.wav',
    links: ['https://imgur.gg/f/Malom2P'],
    altNames: ['Run it up', "New Bae"],
  },

  {
    title: 'FINER THINGS',
    era: 'Momentary Bliss',
    status: 'Unreleased',
    producer: 'blancomadeit & Segway',
    notes: 'Song blanco and kenz made together which is an upbeat song with some really catchy hooks. This song is good according to the people who have heard it',
    rating: '🥉',
    filename: 'SO - FINER THINGS.mp3',
    links: [],
  },

  {
    title: 'Never Over',
    era: 'Momentary Bliss',
    status: 'Throwaway',
    producer: '',
    notes: 'Melodic emotional song made during the momentary bliss era. Song isn’t mixed however it is finished so may release on MB as a bonus track as it doesn’t fit the sound',
    rating: '',
    filename: '?',
    links: [],
  },

  {
    title: 'BUSY',
    era: 'Momentary Bliss',
    status: 'Throwaway',
    producer: 'YiciBeats & Dak',
    notes: 'Throwaway song that probably wont make Momentary Bliss. Currently song only has a one verse and no chorus',
    rating: '',
    filename: 'BUSY! 2.wav',
    links: [],
  },

  {
    title: 'Black Cat - Capital P Ft Rkenzo',
    era: 'Momentary Bliss',
    status: 'Unreleased',
    producer: 'Black Cat',
    notes: 'Feature Rkenzo gave to Black Cat for free during the Momentary Bliss era',
    rating: '',
    filename: 'PPP.wav',
    links: [],
  },

  {
    title: 'Lane Swtich',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'Sogimura',
    notes: 'Spotted on the momentary tracklist as the intro so the song will probably make the album. Rkenzo experiments with a different sound and delivers a very good flow. Song has a 8-BIT vibe to it ',
    rating: '🥈',
    filename: 'Lane Switch.wav',
    links: ['https://imgur.gg/f/uXp1sCx'],
  },

  {
    title: 'V Day',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: '',
    notes: 'Made during momentary bliss song has a NBA Youngboy type boy song is a demo isn’t finished but sounds pretty decent uses bars from Flexin too',
    rating: '',
    filename: 'vvdddyyy.wav',
    links: ['https://imgur.gg/f/Fb5qVdr'],
    altNames: ['FaceTime', 'WID ME'],
  },

  {
    title: 'WAKE UP',
    era: 'Momentary Bliss',
    status: 'Unreleased',
    producer: 'Sogimura',
    notes: 'Unreleased experimental song, same producer as Rick owens kenz tries a new style with some familar flows and delievers a really solid song. This song will probably be considered for Momentary Bliss',
    rating: '🥉',
    filename: 'WAKE UP @@@.wav',
    links: [],
  },

  {
    title: 'Moonwalking',
    era: 'Momentary Bliss',
    status: 'Unreleased',
    producer: 'FinniXBeats',
    notes: 'Unreleased song created in the Momentary Bliss era, produced by FinniX so could be a banger',
    rating: '',
    filename: 'Moonwalking demo.wav',
    links: [],
  },

  {
    title: 'Beat It Freestyle',
    era: 'Momentary Bliss',
    status: 'Throwaway',
    producer: 'FinniXBeats',
    notes: 'Unreleased song created in the Momentary Bliss era, created during the resurgence of Micheal Jackson due to the MICHEAL movie. (He probably watched the movie and was feeling a lil mike)',
    rating: '',
    filename: 'beeet it.wav',
    links: [],
  },
  
  {
    title: 'GO NOW',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'Unknown',
    notes: 'Unreleased song created in the Momentary Bliss era, song could potentially be saved for the EP release. Seen on old Momentary Bliss as "I WANNA ROCK"',
    rating: '🥉',
    filename: 'GO NIW.wav',
    links: ['https://imgur.gg/f/5Lluv1r'],
    altNames: ['I WANNA ROCK', "Go Now"]
  },

  {
    title: 'Popular Artist X Rkenzo',
    era: 'Momentary Bliss',
    status: 'Rumoured',
    producer: 'Unknown',
    notes: 'Rkenzo claims to have a feature with a big artist but is not revealing who it is. Apparently this artist will make Momentary Bliss if Tkandz does not clear his verse on Milan',
    rating: '🥉',
    filename: '?',
    links: [],
  },

  {
    title: 'Accelerate',
    era: 'Momentary Bliss',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Unfinished song created in the Momentary Bliss era, song could potentially be saved for the EP release',
    rating: '',
    filename: 'Accelerate.wav',
    links: [],
  },


  {
    title: 'Winning It Now',
    era: 'Momentary Bliss',
    status: 'Unreleased',
    producer: 'FinniX!Beats',
    notes: 'Unreleased song created in the Momentary Bliss era, song could potentially be saved for the EP release. Demo where Rkenzo experiments with new flows and a darker and more mysterious beat ',
    rating: '',
    filename: 'winning it now - 17_02_2026, 02.04 2.wav',
    links: [],
  },

  {
    title: 'Rick Owens',
    era: 'Momentary Bliss',
    status: 'Released',
    producer: 'Sogimura',
    notes: 'Snippet uploaded to TikTok 9th May 2026. Song samples "prolly my spookiest beat" and believed to also sample "FIELD TRIP" by Ye but this is all speculation. Released 23rd May 2026 as track 1 for Momentary Bliss"',
    rating: '⭐',
    filename: "Rick Owen’s mix.wav",
    links: ['https://open.spotify.com/album/4GsqZMSH0Vay1LnL1KmNwt?si=HN3UreP5T5-HMFIh6ETOHQ'],
  },

  {
    title: 'BABYGIRL',
    era: 'Momentary Bliss',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Unreleased love / girl type song he made 22/05/2026',
    rating: '',
    filename: 'BABYGIRL.wav',
    links: [],
  },

  {
    title: 'What Da Fack Freestyle',
    era: 'Momentary Bliss',
    status: 'Throwaway',
    producer: 'Unknown',
    notes: 'Throwaway freestyle to capitalise of his viral "what the fuck happened here mate" tiktok',
    rating: '',
    filename: '—',
    links: ['https://www.instagram.com/reel/DXco17oDKcb/'],
  },
  {
    title: 'Charlie! - Kalakatta 2.0 Ft Rkenzo',
    era: 'Momentary Bliss',
    status: 'Released',
    producer: 'Carlo Bertone',
    notes: 'Feature Rkenzo done for artist "Charlie!" to broaden his sound and become a more versitile artist',
    rating: '',
    filename: '—',
    links: ['https://www.youtube.com/watch?v=9xhi5VvcJPM&list=RD9xhi5VvcJPM&start_radio=1'],
  },
  {
    title: 'Milan Ft Tkandz',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'blancomadeit',
    notes:
      'Snippet uploaded to Instagram on April 18th 2026 where both boys are wearing light blue drip and tkandz previews a verse. Probably will drop leading up to the release of Momentary Bliss',
    rating: '🥇',
    filename: 'Milan [Rkenzo x Tkandz].MPEG',
    links: ['https://www.instagram.com/reel/DXR_71rjGq4/'],
    altNames: ["RECIPE", "BLUE BOYS"]
  },

  {
    title: 'WAGWAN Fresstyle',
    era: 'Momentary Bliss',
    status: 'Throwaway',
    producer: 'GUSTO & LukasBL.',
    notes: 'Throwaway snippet uploaded to instagram. Song samples Central Cee’s WAGWAN instrumental song probably was made to capitalise on the popularity of the WAGWAN and never intended for release',
    rating: '',
    filename: '—',
    links: ['https://www.instagram.com/reel/DW2KQOKjLZF/'],
  },

  {
    title: "Focus",
    era: 'Momentary Bliss',
    status: 'Unreleased',
    producer: 'loopgod',
    notes: 'Kenz delivers a good verse the vocal artist from NEVER is also present on the track as background vocals. He also says 2025 even though he recorded this in 2026',
    rating: '',
    filename: 'Focus - 17/04/2026,  22.04.wav',
    links: [''],
  },

  {
    title: 'Unheard collaborations with blancomadeit',
    era: 'Momentary Bliss',
    status: 'Rumoured',
    producer: 'Unknown',
    notes: 'Blancomadeit and kenz have been spotted in the studio many times and supposedly have a song',
    rating: '',
    filename: '—',
    links: ['https://www.instagram.com/p/DXKu1-7jBx4/'],
  },
  {
    title: 'Chasing Paper',
    era: 'Momentary Bliss',
    status: 'Released',
    producer: 'Unknown',
    notes: 'Second song released in the Momentary Bliss rollout likely another throwaway song. Kenz also claimed he made this song in under 10 seconds',
    rating: '🗑️',
    filename: '—',
    links: ['https://www.youtube.com/watch?v=MFjM_NQvPC0'],
  },
  {
    title: 'EVISU JEANS',
    era: 'Momentary Bliss',
    status: 'Released',
    producer: 'coreyblazyinc',
    notes: 'Throwaway song to mark the rollout of Momentary Bliss',
    rating: '✨',
    filename: 'Rkenzo EVISU JEANS FINAL MIX.wav',
    links: ['https://www.youtube.com/watch?v=GCz7GZODsv4'],
    releaseDate: '2026-05-01',
  },
  {
    title: 'Young Slash - SHOW ME U LOVE Ft Rkenzo',
    era: 'Momentary Bliss',
    status: 'Released',
    producer: 'FinniXBeats',
    notes: 'Feature rkenzo gave to rapper "Young Slash". Apparently FinniX asked Rkenzo to lay down a verse which resulted in the feature',
    rating: '',
    filename: '',
    links: ['https://open.spotify.com/track/3IltiEP4f9xZrjlfFJPGEH'],
    releaseDate: '2026-05-01',
  },
  {
    title: 'Never',
    era: 'Momentary Bliss',
    status: 'Unreleased',
    producer: 'OB',
    notes: "Kenz go backs to his melodic drill roots and has a powerful background vocalist on a drill/trap beat song sounds really wavy. Song could be on the Momentary Bliss EP. It is quite experimetnal taking elements from Dave's Raindance Rkenzo collabs with a female artist to deliver power melodies accompanied with hard hitting bars.",
    rating: '🥉',
    filename: 'Fallin In Love.wav',
    links: [],
    altNames: ['Fallin In', 'Fallin', 'Never Fallin In Love'],
  },

  {
    title: 'Blancomadeit - In My Feels Ft Rkenzo',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'blancomadeit',
    notes: "Freestyle previewed to tiktok via rkenzo, using a never before seen flow and a catchy hook. Was thought to be a solo Rkenzo song until it was revealed that it was actually Blanco's song and kenz has a verse on it. Song could still release on Momentary Bliss if blanco gives it to kenz or if blanco scraps the release",
    rating: '🥈',
    filename: '',
    links: ['https://www.tiktok.com/@rkenzo.1/video/7609352871368248598?_r=1&_t=ZS-96Ky1x4NLt2'],
    altNames: ['Tracey Beaker', 'Kelhani'],
  },

  {
    title: "Can't Stay The Night",
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'Ayo Sweddy',
    notes: 'Rkenzo would hop on an underground esdeekid type beat produced by Ayo Sweddy (same guy who produced Out Till Late), the original snippet is not found, Rkenzo actually recoreded on this song and the beat sounds like LV Sandalds',
    rating: '🥉',
    filename: '',
    links: ['https://imgur.gg/f/9JqJJJR'],
    altNames: ['HISTORY', 'CSTN'],
  },
  
  {
    title: 'MAKE IT COUNT! V2',
    era: 'Momentary Bliss',
    status: 'Released',
    producer: 'FinniX!Beats',
    notes: 'Part of the collection of songs Rkenzo made with FinniX Switzerland',
    rating: '✨',
    filename: '—',
    links: ['https://www.youtube.com/watch?v=jBivqZXolk8'],
  },

  {
    title: 'One Million Streams Freestyle',
    era: 'Momentary Bliss',
    status: 'Throwaway',
    producer: 'Unknown',
    notes: 'Freestyle rkenzo uploaded via instagram to celebrate getting a million steams on spotify',
    rating: '',
    filename: '—',
    links: ['https://www.instagram.com/reel/DTYS9GKDCzV/'],
  },

  {
    title: 'ALONE NOW',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'FinniX!Beats',
    notes:
      'Instagram live preview. Instantly hailed as a grail — part of the collection of songs Rkenzo made with FinniX Switzerland. Reportedly this song is on its 5th version and kenz plans to change studio to finish it for a fresher sound and new creative environment. It is highly liked that this grail will drop as the outro for Momentary Bliss',
    rating: '🏆',
    filename: 'ALONE NOW.wav',
    links: ['https://imgur.gg/f/EgxCX5j'],
    altNames: ['Alone', 'Alone Now'],
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
    links: ['https://imgur.gg/f/YsaasWo'],
  },

  {
    title: '5AMDiaries - Blank Street V2 Ft Rkenzo',
    era: 'Momentary Bliss',
    status: 'Snippet',
    producer: 'jacksonhormer',
    notes: '5AMDiares gave Rkenzo the song for him to drop a verse but he never released the song for unknown reasons.',
    rating: '',
    filename: 'Blank Street V2!.wav',
    links: ['https://imgur.gg/f/hgyaGfH'],
  },

  {
    title: 'Fan Girl Freestyle',
    era: 'Momentary Bliss',
    status: 'Throwaway',
    producer: 'Unknown',
    notes: 'Freestyle rkenzo uploaded via instagram',
    rating: '🥉',
    filename: '—',
    links: ['https://www.instagram.com/p/DQ4tlyXDBo3/'],
  },


  // ── OS2S: Extended Edition ───────────────────

  {
    title: 'Nails & Toes',
    era: 'OS2S: Extended Edition',
    status: 'Snippet',
    producer: 'ROB EVN',
    notes:
      "Uses a similar style flow as Say So and is a very smooth, chill and vibey typa track. Fans hope this song gets leaked one day",
    rating: '🥈',
    filename: 'Nails and toes.wav',
    links: ['https://imgur.gg/f/6Bxc5XG'],
    altNames: ['Nails N Toes', 'Nails and Toes', 'Say So 2', 'Legless', 'Impressive'],
  },

  {
    title: 'Run Away',
    era: 'OS2S: Extended Edition',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Song made in OS2S: Extended Edition Era but never saw the light of day. Seen as a bonus track on a Momentary Bliss tracklist',
    rating: '🥉',
    filename: '',
    links: [],
  },

  {
    title: 'All In',
    era: 'OS2S: Extended Edition',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Song made during the OS2S: Extended Edition era but never released for unknown reasons. Song is probably made to build more flows',
    rating: '',
    filename: 'all in - 14_12_2025, 15.15',
    links: [],
  },

  {
    title: 'You Know',
    era: 'OS2S: Extended Edition',
    status: 'Unreleased',
    producer: 'loopgod',
    notes:
      'Melodic song where Rkenzo experiments with new vocals adding punchy flows and a catchy hook. Kenz has said that this song could potentially make the tracklist for Momentary Bliss',
    rating: '🥇',
    filename: 'You Know.Wav',
    links: [],
  },

  {
    title: 'Rkenzo X ManassehWOD X ?',
    era: 'OS2S: Extended Edition',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Cypher is approached with a more grime esc sound, this would show the first time Rkenzo and Manasseh would collaborate and the first time Kenz rapped on a grime beat to public knowledge. All around good bars and intriging lyrics',
    rating: '',
    filename: 'ManassehWOD x Rkenzo 1.wav',
    links: [],
  },

  {
    title: 'CANT STOP',
    era: 'OS2S: Extended Edition',
    status: 'Unreleased',
    producer: '',
    notes:
      'Song made during the OS2S: Extended Edition era but never released for unknown reasons. Song is speculated to be a throwaway but fans who have heard it consider it as one of his best songs',
    rating: '🥉',
    filename: 'CANT STOP.wav',
    links: [],
  },

  {
    title: 'OS2S Freestyle',
    era: 'OS2S: Extended Edition',
    status: 'Released',
    producer: 'GLIDEZ',
    notes:
      'Promotional song marking the release of his clothing brand OS2S. Music video features cameos from blancomadeit and FinniX!Beats',
    rating: '✨',
    filename: '—',
    links: ['https://www.youtube.com/watch?v=8FcIn74uNzk'],
  },
  {
    title: 'Say So V2',
    era: 'OS2S: Extended Edition',
    status: 'Released',
    producer: 'Segway',
    notes:
      'Revamped version of Say So with a new 2nd verse, no Kadz feature and new bars for the first verse but same flow. Finally released on the OS2S: Extended Edition. Fun fact the song would of never came out if his Kadz didnt convice him to release it',
    rating: '⭐',
    filename: 'Rkenzo - Say So (MSTR 4).wav',
    links: ['https://www.youtube.com/watch?v=w9Y_v96F9ac'],
  },

  {
    title: 'All Eyes On Me',
    era: 'OS2S: Extended Edition',
    status: 'Released',
    producer: 'coreyblazyy',
    notes: 'Kenz uses a sharper sound here and uses familiar flows from Rush This. Very good song to say the least',
    rating: '✨',
    filename: '—',
    links: ['https://www.youtube.com/watch?v=kol3yTiwgQA'],
  },
  {
    title: 'RUSH THIS! V4',
    era: 'OS2S: Extended Edition',
    status: 'Released',
    producer: 'RealRichMoney & Rkenzo',
    notes: 'Production of the release song would change from corey and be entirely produced by Rkenzo and RealRichMoney',
    rating: '🌟',
    filename: '—',
    links: ['https://www.youtube.com/watch?v=vPf7hVAEqTw'],
  },
  {
    title: 'RUSH THIS! V3',
    era: 'OS2S: Extended Edition',
    status: 'Leaked',
    producer: 'coreyblazyy',
    notes: 'Version of RUSH THIS with alternative production',
    rating: '✨',
    filename: '2. Rkenzo - RUSH THIS! Remix by @prodbycorey_.m4a',
    links: ['https://imgur.gg/f/6qWbMe6'],
  },
  {
    title: 'RUSH THIS! V2',
    era: 'OS2S: Extended Edition',
    status: 'Snippet',
    producer: 'coreyblazyy',
    notes: 'Version of RUSH THIS with a spacelike beat',
    rating: '⭐',
    filename: 'Rkenzo - RUSH THIS! Remix by @prodbycorey_.m4a',
    links: ['https://imgur.gg/f/Byi92XL'],
  },
  {
    title: 'RUSH THIS! V1',
    era: 'OS2S: Extended Edition',
    status: 'Scrapped',
    producer: 'seigmon',
    notes: 'Unmixed version of the song',
    rating: '—',
    filename: 'rush this b4 mix.wav',
    links: [],
  },

  {
    title: 'NO TIME = MONEY FAST',
    era: 'OS2S: Extended Edition',
    status: 'Snippet',
    producer: 'Unknown',
    notes:
      'Song Rkenzo and Whiz made together in the studio. Fans call this song Out Till Late 2. the alternate filename is WasteNoTimefeatRkenzo.AAC',
    rating: '🥈',
    filename: 'Whiz x Kenz - 21:04:2025, 03.29.wav',
    links: ['https://imgur.gg/f/E8ffWVR'],
    altNames: ["NTMF",'No Time', 'Money Fast', 'Out Till Late 2'],
  },

  {
    title: 'On Go',
    era: 'OS2S: Extended Edition',
    status: 'Snippet',
    producer: 'coreyblazyy',
    notes: 'Freestyle rkenzo uploaded via instagram. Song is reportedly not a throwaway and has a 2nd verse. Rkenzo is contemplating on finishing it and putting it on Momentary Bliss',
    rating: '🥉',
    filename: 'SOUL BEAT FREESTYLE.wav',
    links: ['https://www.instagram.com/reel/DQIIYMojNda/'],
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
    links: ['https://www.youtube.com/watch?v=evCgCR9aJsM'],
  },
  
  {
    title: 'Get It V1',
    era: 'OS2S: Extended Edition',
    status: 'Vaulted',
    producer: '',
    notes:
      'Great song Rkenzo deliveres a new flow and drops some very hard bars. Fans hope this song gets leaked one day as people who have heard it consider it one of his best songs',
    rating: '🥉',
    filename: 'Get it V1.wav',
    links: [],
  },

  {
    title: 'Too Fast V2',
    era: 'OS2S: Extended Edition',
    status: 'Vaulted',
    producer: '',
    notes:
      'Version of TOO FAST with a different beat/mix. Not as good as the first version',
    rating: '',
    filename: 'TOO FAST mix.m4a',
    links: [],
  },

  {
    title: 'Let it go',
    era: 'OS2S: Extended Edition',
    status: 'Vaulted',
    producer: '',
    notes:
      "Recorded with the microphone backwards and probably won’t release. Made in the studio in Ghana OS2S:D another melodic wavy song that didn’t make the cut due to the bonus track being heavily hit focused",
    rating: '',
    filename: 'let ir go.wav',
    links: [],
  },

  {
    title: 'Mr Imagination - Ambrosia Ft Rkenzo',
    era: 'OS2S: Extended Edition',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Rkenzo recorded on Mr Imaginations "Ambrosia" during his time in Ghana',
    rating: '🥉',
    filename: '—',
    links: [],
  },

  {
    title: 'Mr Imagination - Disassemble Ft Rkenzo',
    era: 'OS2S: Extended Edition',
    status: 'Snippet',
    producer: 'Unknown',
    notes: 'Part of the collections of songs Rkenzo hopped on whilst in Ghana with Mr Imagination',
    rating: '',
    filename: '—',
    links: ['https://imgur.gg/f/QqUgXW3'],
  },

  {
    title: 'Mr Imagination - Tinkerbell ft Rkenzo',
    era: 'OS2S: Extended Edition',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Speculated to be part of the collections of songs rkenzo hopped on with Mr Imagination in Ghana',
    rating: '',
    filename: 'Mr Imagination - Tinkerbell ft Rkenzo - 12_08_2025, 17.55 1.mp3',
    links: [],
  },

  {
    title: 'Unheard collaborations with Mr Imagination',
    era: 'OS2S: Extended Edition',
    status: 'Rumoured',
    producer: 'Unknown',
    notes: 'Rkenzo and Mr Imagination were recording together in Ghana and have likely made songs after Ambrosia',
    rating: '',
    filename: '—',
    links: [],
  },
  
  {
    title: 'Peso',
    era: 'OS2S: Extended Edition',
    status: 'Scrapped',
    producer: 'Unknown',
    notes: 'Experimental drill song Rkenzo recorded after coming back from spain and shooting Lifetstyle Lately V1 music video. Sone never surfaced but fans anticipate it, song uses bars from Say So',
    rating: '🥉',
    filename: 'sexy drill 3.wav',
    links: ['https://vt.tiktok.com/ZSxJRKWEw/'],
    altNames: ['Feugo', 'Sexy Drill 3', "Say So 2"],
  },
  {
    title: 'Lifestyle Lately V2 Feat. Tkandz',
    era: 'OS2S: Extended Edition',
    status: 'Released',
    producer: 'Gore Ocean',
    notes: 'Version of Lifestyle Lately with Tkandz verse but the music video was reshot in the UK',
    rating: '⭐',
    filename: 'Lifestyle Lately Ft Tkandz (X).wav',
    links: ['https://www.youtube.com/watch?v=ZDuDBuFPsmk'],
  },
  {
    title: 'Lifestyle Lately V1',
    era: 'OS2S: Extended Edition',
    status: 'Scrapped',
    producer: 'Gore Ocean',
    notes: 'Version of Lifestyle Lately without Tkandz verse and alternate music video shot in Spain',
    rating: '—',
    filename: 'Lifestyle Lately (X).wav',
    links: [],
  },

  {
    title: 'XYLEM - Waste My Time Ft Rkenzo',
    era: 'OS2S: Extended Edition',
    status: 'Unreleased',
    producer: 'Unknown',
    notes:
      'Song made during the OS2S: Extended Edition era but never released for unknown reasons. Song is speculated to be a finished song and was considered to be sent for mixing',
    rating: '🥈',
    filename: 'WASTE MY TIME X RKENZO.wav',
    links: [],
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
    links: ['https://soundcloud.com/one-shot-2-shine-vault/mind-on-cake-feat-tkandz?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'],
  },
  {
    title: 'DJ AG Freestyle',
    era: 'OS2S: Extended Edition',
    status: 'Throwaway',
    producer: 'Unknown',
    notes:
      'Freestyle rkenzo previewed with south london DJ AG, recorded on ig live',
    rating: '✨',
    filename: '—',
    links: ['https://www.instagram.com/p/DCkD3JFOXxD/'],
  },
  
  {
    title: 'On My Mind',
    era: 'OS2S: Extended Edition',
    status: 'Throwaway',
    producer: 'Unknown',
    notes:
      'Song made during the OS2S: Extended Edition era but never released for unknown reasons. Song is speculated to be a throwaway',
    rating: '',
    filename: 'On My Mind! First Draft.wav',
    links: [],
  },

  {
    title: 'Take A Toke',
    era: 'OS2S: Extended Edition',
    status: 'Snippet',
    producer: 'Unknown',
    notes:
      'Song made during the OS2S: Extended Edition era uses a new flow and the snippet of the song sounds pretty good. its a shame this song wont release but could potentially be released on the OS2S anniversay',
    rating: '🥉',
    filename: 'take a toke - 13_06_2025, 21.31 1.wav',
    links: ['https://imgur.gg/f/ZVPzejr'],
  },

  {
    title: 'Get This Paper',
    era: 'OS2S: Extended Edition',
    status: 'Throwaway',
    producer: 'Unknown',
    notes:
      'Experimental song with a undertale sounding beat song probably wont see the light of day',
    rating: '',
    filename: 'get this paper.wav',
    links: [],
  },

  {
    title: 'Rolling Wid It Up',
    era: 'OS2S: Extended Edition',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Song made in OS2S: Extended Edition Era but never saw the light of day. This song is apparently quite good from those who have heard it',
    rating: '🥉',
    filename: 'Rolling wid it Up to.wav',
    links: [],
  },

  {
    title: 'STYLE',
    era: 'OS2S: Extended Edition',
    status: 'Leaked',
    producer: 'Ethereal',
    notes: "Studio session made with Kadz using the beat of Carti's Goin Outta Style. Song was never finished",
    rating: '🥉',
    filename: 'KY OS.wav',
    links: ['https://imgur.gg/f/vhzirEF'],
  },

  {
    title: 'Go Mode',
    era: 'OS2S: Extended Edition',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Song made in OS2S: Extended Edition Era but never saw the light of day',
    rating: '',
    filename: '',
    links: [],
  },

  {
    title: 'Black Cat - Mental Ft Tkandz & Rkenzo',
    era: 'OS2S: Extended Edition',
    status: 'Released',
    producer: 'Black Cat',
    notes:
      'Australian artist song featuring both Tkandz and Rkenzo. song was sent to rkenzo around october/november 2024 and Rkenzo gives a fresh new flow aligning with the OS2S theme reuses his famous han solo bar and sees Tkandz deliver a american flow verse. Song was taken down by Tkandz label for unknown reasons',
    rating: '✨',
    filename: '—',
    links: ['https://music.apple.com/us/song/mental-feat-tkandz-rkenzo-remix/1779561820'],
  },
  
  {
    title: 'Too Fast V1',
    era: 'OS2S: Extended Edition',
    status: 'Vaulted',
    producer: '',
    notes:
      'Collaborative song Rkenzo made with one of his collegues from his university course, Rkenzo experiments with a new sound and reuses some bars but the melodic delivery from both artists in a catchy manner, fans anticipate it to release on Momentary Bliss but doesnt seem likely as the feature was never cleared from the other artist. Apparently he lost this version of the song but it is recoverable',
    rating: '🏆',
    filename: 'TOO FAST.mp3',
    links: [],
  },

  // ── One Shot To Shine ────────────────────────
  {
    title: 'Crossroads',
    era: 'One Shot To Shine',
    status: 'Released',
    producer: 'Unknown',
    notes: 'Released on the EP One Shot To Shine. Kenz gives more insight into his personal life and struggle. Crossroads was never entended to be the outro it was actually the 2nd song until Kenz changed it',
    rating: '✨',
    filename: '_Crossroads (Final Mix).wav',
    links: ['https://www.youtube.com/watch?v=ZPkRZ9VNhho'],
  },

  {
    title: 'Say So V1',
    era: 'One Shot To Shine',
    status: 'Leaked',
    producer: 'Segway',
    notes:
      'Original version of Say So containing an open verse for Tkandz which Kadz would later record on. Rkenzo comes with a catchier first verse — less lyrically powerful but the version fans like the most',
    rating: '⭐',
    filename: 'Say so with Kadz.wav',
    links: ['https://imgur.gg/f/bgZEljF'],
  },

  {
    title: 'Foden',
    era: 'One Shot To Shine',
    status: 'Throwaway',
    producer: 'Unknown',
    notes: "Demo recordee in the OS2S era, this song was meant to be finished and could of potentially been on the EP but Kenz forgot about the song",
    rating: '',
    filename: 'foden.wav',
    links: [],
  },  

  {
    title: 'BACK CHAT',
    era: 'One Shot To Shine',
    status: 'Throwaway',
    producer: 'Unknown',
    notes: "Scrapped and made as a throwaway. The bars were instead used for Say So V1",
    rating: '',
    filename: 'BACK CHAT NEW - 05_04_2025, 21.05 6.wav',
    links: [],
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
    links: ['https://www.youtube.com/watch?v=4UatIB9ZjoE'],
  },

  {
    title: 'Mainstream',
    era: 'One Shot To Shine',
    status: 'Scrapped',
    producer: 'Unknown',
    notes: "Made in the same session as Go With it was considered for OS2S but due to the songs singing nature Kenz deemed it wasn't suitable for the EP and scrapped it",
    rating: '',
    filename: '',
    links: [],
  },

  {
    title: 'Let You Know',
    era: 'One Shot To Shine',
    status: 'Scrapped',
    producer: 'YiciBeats',
    notes: "Melodic singing type song made during OS2S era however due to how different it sounds from the rest of the songs on the EP it never made the Final Cut",
    rating: '',
    filename: 'Let you know.wav ',
    links: [],
  },

  {
    title: 'Succeed',
    era: 'One Shot To Shine',
    status: 'Scrapped',
    producer: 'Unknown',
    notes: "Kenz called it a skip",
    rating: '🗑️',
    filename: 'Succeed - 28_11_2024, 23.12 5',
    links: [],
  },

  {
    title: 'Get it Up',
    era: 'One Shot To Shine',
    status: 'Scrapped',
    producer: 'YiciBeats',
    notes: "Song made during the OS2S era but never released",
    rating: '',
    filename: 'get it up - 26_06_2024, 22.31 1',
    links: [],
  }, 
  
  {
    title: 'One Shot 2 Shine',
    era: 'One Shot To Shine',
    status: 'Released',
    producer: 'Unknown',
    notes: "Intro and namesake of Rkenzo's first studio EP One Shot 2 Shine",
    rating: '⭐',
    filename: '—',
    links: ['https://www.youtube.com/watch?v=_gmJXkfc7OY'],
  },

  {
    title: "RJ - Hyena ft Rkenzo",
    era: 'One Shot To Shine',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Feature Rkenzo did for RJ very good delievery from both artists',
    rating: '🥉',
    filename: '—',
    links: [],
  },

  {
    title: 'CANT WAIT',
    era: 'One Shot To Shine',
    status: 'Released',
    producer: 'Unknown',
    notes: 'Released on the EP One Shot To Shine. Kenz sends some bars referencing his ex',
    rating: '',
    filename: '—',
    links: ['https://www.youtube.com/watch?v=yHUsIK3i2f0'],
  },

  {
    title: '4 DA NIGHT',
    era: 'One Shot To Shine',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: "Song made during the O2S2 Era but never released for unknown reasons",
    rating: '',
    filename: '4 da nite.wav',
    links: [],
  },

  {
    title: "Swervin'",
    era: 'One Shot To Shine',
    status: 'Unreleased',
    producer: 'Spancy Beatz',
    notes: "Samples some SpongeBob sfx ",
    rating: '',
    filename: 'swervin - 28_02_2025, 23.53',
    links: [],
  },

  {
    title: 'Out Till Late V2',
    era: 'One Shot To Shine',
    status: 'Released',
    producer: 'Ayo Sweddy',
    notes: 'Featuring Whizz. Reportedly made in one take and is a fan favourite. One of his biggest songs to date. Rkenzo reportedly changed his verse after whizz left the studio and provided a more lyric 2nd verse probably due to how whizz was flowing on this track 😭',
    rating: '🌟',
    filename: 'Rkenzo - Urus (Mix & Master)',
    links: ['https://www.youtube.com/watch?v=mAywOdTLQHA'],
  },

  {
    title: 'Fuck The World',
    era: 'One Shot To Shine',
    status: 'Scrapped',
    producer: 'Unknown',
    notes: 'Spotted on the original tracklist for OS2S as the outro but for unknown reasons was changed to crossroads.',
    rating: '',
    filename: '—',
    links: [],
  },

  {
    title: "Keep Goin'",
    era: 'One Shot To Shine',
    status: 'Scrapped',
    producer: 'Unknown',
    notes: 'Appeared as the intro on the original tracklist for OS2S but was changed for the song One Shot 2 Shine. Song will most likely never release it had crazy potential though hopefully it can me mixed and put on OS2S anniversary',
    rating: '🥉',
    filename: '—',
    links: [],
  },

  {
    title: 'Papercuts',
    era: 'One Shot To Shine',
    status: 'Released',
    producer: 'ROB EVN',
    notes:
      'Made the day after he broke up with his girlfriend. Became an instant success which caught the attention of UK artist Tkandz',
    rating: '🌟',
    filename: 'Rkenzo - PaperCuts.wav',
    links: ['https://www.youtube.com/watch?v=zCYRFU6Nwjk'],
  },

  {
    title: "Mercy",
    era: 'One Shot To Shine',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Song was made during the same session as papercuts but sounds entirely different from the song.',
    rating: '',
    filename: '—',
    links: [],
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
    links: ['https://www.youtube.com/watch?v=8HbGLCi-BCE&list=RD8HbGLCi-BCE&start_radio=1'],
  },

  {
    title: "Let's Get It",
    era: 'Young Kenz',
    status: 'Snippet',
    producer: 'ZEL',
    notes: 'Unreleased song made during the Young Kenz era which he shared to Mr Imagination. This song never released but the people who have heard it consider it as the best song from this era',
    rating: '🥇',
    filename: "Let's Get It.mp3",
    links: ['https://imgur.gg/f/e1zbCzl'],
    altNames: ['LGI', 'Ay come lets get it']
  },

  {
    title: 'DXNTE X Rkenzo - Throwback',
    era: 'Young Kenz',
    status: 'Released',
    producer: 'Unknown',
    notes: 'The first officially released song with DXNTE. This was one of his biggest songs during his era',
    rating: '—',
    filename: 'WAV DXNTE x Rkenzo Throwback Final.wav',
    links: ['https://www.youtube.com/watch?v=L7-1jyaPnZw'],
  },
  {
    title: 'DND',
    era: 'Young Kenz',
    status: 'Released',
    producer: 'sk3llybeats366',
    notes: "Rkenzo's first time going into melodic drill. Uses a deeper voice and is a community favourite",
    rating: '⭐',
    filename: '—',
    links: ['https://www.youtube.com/watch?v=jHh38yfr5T0'],
  },
  
  {
    title: 'Make A Way',
    era: 'Young Kenz',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Early signs of kenz experimenting with more melodic flows and singing vocals, during the Young Kenz era.',
    rating: '🥉',
    filename: 'make a aewq ew.wav',
    links: [],
  },
  
  {
    title: 'Racks',
    era: 'Young Kenz',
    status: 'Throwaway',
    producer: 'Unknown',
    notes: 'Not much is known about this song. It is apparently a throwaway song and the mix for this song came back terrible according to Kenz',
    rating: '—',
    filename: 'Racks.mp3',
    links: [],
  },

  {
    title: 'Rolling',
    era: 'Young Kenz',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Demo Rkenzo made with Kadz in his room but was never finished into an actual song.',
    rating: '🥈',
    filename: '',
    links: [],
    altNames: ["Rollin'"],
  },

  {
    title: 'Roll The Dice',
    era: 'Young Kenz',
    status: 'Unreleased',
    producer: 'Unknown',
    notes: 'Song recoreded during the Young Kenz era was never planned for a release. Kenz used flows from this song / these sessions to develop his sound in the Young Kenz era',
    rating: '',
    filename: 'roll the dice.mp3',
    links: [],
  },


  {
    title: 'Racks Up',
    era: 'Young Kenz',
    status: 'Released',
    producer: 'masonxbeats',
    notes: 'First appearance of the Young Kenz era with sharper flows and quicker deliveries',
    rating: '—',
    filename: '—',
    links: ['https://www.youtube.com/watch?v=evCgCR9aJsM'],
  },

  {
    title: 'ESCOBAR',
    era: 'Young Kenz',
    status: 'Released',
    producer: 'Unknown',
    notes: 'One of the weaker songs from this era',
    rating: '🗑️',
    filename: '—',
    links: ['https://www.youtube.com/watch?v=a-fqXkWxQ_g'],
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
    links: ['https://www.youtube.com/watch?v=Q7liMX64Duc'],
  },
  {
    title: 'Through The Night',
    era: 'Rkenzo Foundation',
    status: 'Released',
    producer: 'AriaTheProducer & VVSMelody',
    notes: 'First official release from Rkenzo using his wave rap sound',
    rating: '—',
    filename: 'Through The Night.m4a',
    links: ['https://www.youtube.com/watch?v=pG9jO_771mA'],
  },
  {
    title: 'Fake Love',
    era: 'Rkenzo Foundation',
    status: 'Released',
    producer: 'Flang & obmus1c',
    notes: 'Second song he released under the Rkenzo Foundation Era. Song is still using wave rap sound but has faster tempo and quicker flows however the song would be one of his weakest songs from this era and the producer tagged spammed over the song wouldnt help its case',
    rating: '🗑️',
    filename: '—',
    links: ['https://www.youtube.com/watch?v=rcRGjfP1Mp8'],
  },
];

// ─── MUSIC VIDEOS ────────────────────────────
// youtubeId = the part after "watch?v=" in the URL
// For unreleased/scrapped videos with no YouTube ID, use youtubeId: ''

export const MUSIC_VIDEOS: MusicVideo[] = [
  // ── Momentary Bliss ──

  {
    title: 'RICK OWENS',
    era: 'Momentary Bliss',
    youtubeId: '1Iexup64D6o',
    status: 'Released',
    rating: '🌟',
    releaseDate: '2026-06-20',
    notes: "Official music video for RICK OWENS. Shot in the UK at POP BRIXTON, the day of Rkenzo's POP UP. Song features cameos from Tkandz, Blancomadeit and Mr Imagination. Video noticably has much better visuals than previous videos for momentary bliss and most other eras. Rkenzo also stated that he wants RICK OWNES music video to be the standard for the quality of videos he puts out going forwards.",
  },

  {
    title: 'EVISU JEANS (Live Performance)',
    era: 'Momentary Bliss',
    youtubeId: 'HrTWu-lV6DQ',
    status: 'Released',
    rating: '✨',
    releaseDate: '2026-05-15',
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

// ─── TRACKLISTS ──────────────────────────────
export const TRACKLISTS: Tracklist[] = [

    {
    project: 'Momentary Bliss V4',
    era: 'Momentary Bliss',
    status: 'Confirmed',
    source: "Screenshot found on Kenz' phone",
    updatedDate: 'June 2026',
    notes: 'Shows a more complete tracklist of 9 songs so could potentially be the final tracklist for Momentary Bliss',
    tracks: [
      {
        position: 3,
        title: 'GO NOW!',
        confirmed: true,
        producer: 'Sogimura',
        notes: 'Renamed version of I WANNA ROCK',

      },

      {
        position: 1,
        title: 'RICK OWENS',
        confirmed: true,
        producer: 'Sogimura',
        notes: 'This song is 100% making the cut confirmed by Rkenzo himself',
      },
      
      {
        position: 2,
        title: 'MILAN',
        confirmed: true,
        features: 'ft. Tkandz',
        producer: 'blancomadeit',
        notes: 'Snippeted April 2026 — likely a lead single or album cut given the full verse preview. Rkenzo said if Tkandz label doesnt clear his feature then he will replace this song with another highly anticipated artist feature',
      },

      {
        position: 8,
        title: 'WAKE UP',
        confirmed: true,
        producer: 'Sogimura',
        notes: 'Unreleased experimental song, same producer as Rick owens kenz tries a new style with some familar flows and delievers a really solid song. This song will probably be considered for Momentary Bliss',
        isBonusTrack: true
      },

      {
        position: 5,
        title: 'NO TIME = MONEY FAST',
        confirmed: true,
        features: 'ft. Whizz',
        producer: '?',
        notes: 'Song is seen on the tracklist as "WHIZ SONG" but it is probably this song as they do not have any other songs recorded close to 2026',
      },
      
      {
        position: 4,
        title: 'FALLING',
        confirmed: true,
        producer: '?',
        notes: "This song is Never / Fallin In / Fallin In Love ",
      },

      {
        position: 6,
        title: 'ALONE NOW',
        confirmed: true,
        producer: 'FinniX!Beats',
        notes: 'Instantly hailed as a grail after the instagram live preview. Fans are desperate for this one',
      },
      
      {
        position: 7,
        title: 'RIDE WITH THE CREW',
        confirmed: true,
        producer: 'Sagemon',
        notes: 'After kadz reminded him that this song exists Kenz would reconsider adding RWTC to the EP but as a bonus track as he felt like it didnt fit the main sound of the EP',
        isBonusTrack: true,
      },

      {
        position: 9,
        title: 'EVISU JEANS',
        confirmed: true,
        producer: 'Sogimura',
        notes: 'After kadz convinced him he reconsidered putting this song on the EP in some form so is likely the reason to why its a bonus track and not on the main tracklist',
        isBonusTrack: true,
      },

    ],
  },

  {
    project: 'Momentary Bliss V3',
    era: 'Momentary Bliss',
    status: 'Rumoured',
    source: "Seen in Kenz' room on a sheet of paper he wrote down 8 tracks for the first installment of Momentary Bliss",
    updatedDate: 'June 2026',
    notes: 'This tracklist is just a first draft some of the songs are vaguly named so some of the songs are a guesses based of snippets we already have',
    tracks: [
      {
        position: 1,
        title: 'Lane Switch',
        confirmed: true,
        producer: 'Sogimura',
        notes: 'Spotted on the momentary tracklist as the intro so the song will probably make the album. Rkenzo experiments with a different sound and delivers a very good flow. Song has a 8-BIT vibe to it ',
      },

      {
        position: 2,
        title: 'Rick Owens',
        confirmed: true,
        producer: 'Sogimura',
        notes: 'This song is 100% making the cut confirmed by Rkenzo himself',
      },
      
      {
        position: 5,
        title: 'Milan',
        confirmed: true,
        features: 'ft. Tkandz',
        producer: 'blancomadeit',
        notes: 'Snippeted April 2026 — likely a lead single or album cut given the full verse preview. Rkenzo said if Tkandz label doesnt clear his feature then he will replace this song with another highly anticipated artist feature',
      },

      {
        position: 6,
        title: 'WAKE UP',
        confirmed: true,
        producer: 'Sogimura',
        notes: 'Unreleased experimental song, same producer as Rick owens kenz tries a new style with some familar flows and delievers a really solid song. This song will probably be considered for Momentary Bliss',

      },

      {
        position: 4,
        title: 'NO TIME = MONEY FAST',
        confirmed: false,
        features: 'ft. Whizz',
        producer: '?',
        notes: 'Song is seen on the tracklist as "WHIZ SONG" but it is probably this song as they do not have any other songs recorded close to 2026',
      },
      
      {
        position: 3,
        title: 'Never',
        confirmed: true,
        producer: '?',
        notes: "Never is revealed to be fallin in ",
      },

      {
        position: 7,
        title: 'Alone',
        confirmed: true,
        producer: 'FinniX!Beats',
        notes: 'Instantly hailed as a grail after the instagram live preview. Fans are desperate for this one',
      },
      
      {
        position: 8,
        title: '(?) - Rkenzo X LJ',
        confirmed: true,
        producer: 'blancomadeit',
        notes: 'Seen on the version 1 tracklist with noticable gap from the other tracks making it a potential bonus track',
        isBonusTrack: true,
      },

    ],
  },

  {
    project: 'Momentary Bliss V2',
    era: 'Momentary Bliss',
    status: 'Confirmed',
    source: "Seen as a screenshot on Rkenzo's phone on notes app ",
    updatedDate: 'May 2026',
    notes: 'This tracklist is a second draft of momentary bliss. This version would be very different from V1 as it doesnt feature evisu jeans, is a longer tracklist and has a bonus track',
    tracks: [

      {
        position: 1,
        title: 'Rick Owens',
        confirmed: true,
        producer: 'Sogimura',
        notes: 'This song is 100% making the cut confirmed by Rkenzo himself',
      },
      
      {
        position: 2,
        title: 'Milan',
        confirmed: true,
        features: 'ft. Tkandz',
        producer: 'blancomadeit',
        notes: 'Snippeted April 2026 — likely a lead single or album cut given the full verse preview. Rkenzo said if Tkandz label doesnt clear his feature then he will replace this song with another highly anticipated artist feature',
      },

      {
        position: 3,
        title: 'I WANNA ROCK',
        confirmed: true,
        producer: 'Sogimura',
        notes: 'This songs name was changed to GO NOW',

      },

      {
        position: 4,
        title: 'NO TIME = MONEY FAST',
        confirmed: false,
        features: 'ft. Whizz',
        producer: '?',
        notes: 'Song is seen on the tracklist as "WHIZ SONG" but it is probably this song as they do not have any other songs recorded close to 2026',
      },
      
      {
        position: 5,
        title: 'Fallin In',
        confirmed: true,
        producer: '?',
        notes: "Original name for the song 'Never' ",
      },

      {
        position: 7,
        title: 'Alone',
        confirmed: true,
        producer: 'FinniX!Beats',
        notes: 'Instantly hailed as a grail after the instagram live preview. Fans are desperate for this one',
      },
      
      {
        position: 6,
        title: 'Spanish Guitar',
        confirmed: true,
        producer: '?',
        notes: 'Unheard song seen on the momentary bliss V2 tracklist.',
        isBonusTrack: false,
      },

      {
        position: 8,
        title: 'Run Away',
        confirmed: true,
        producer: '?',
        notes: 'Seen on the momentary bliss V2 tracklist with noticable gap from other tracks making it potentially a bonus track or could be the start of a potentialy new tracklist draft. Spotted as 01 behind it',
        isBonusTrack: true,
      },

    ],
  },

  {
    project: 'Momentary Bliss V1',
    era: 'Momentary Bliss',
    status: 'Rumoured',
    source: "Screenshot on Rkenzo's phone on notes app ",
    updatedDate: 'May 2026',
    notes: "track 1 can't be seen on the screenshot for this TL but from a tiktok it was revealed that RICK OWENS was originally intended to be track 1 for Momentary Bliss. No bonus tracks are seen on this version",
    tracks: [

      {
        position: 1,
        title: 'RICK OWENS',
        confirmed: true,
        producer: 'Sogimura',
        notes: 'Can be dervived from a tiktok post claiming that rick ownes was the intro for momentary bliss at this time.',
      },
      
      {
        position: 4,
        title: 'Milan',
        confirmed: true,
        features: 'ft. Tkandz',
        producer: 'blancomadeit',
        notes: 'Seen on the screen as Rkenzo x Tkandz so can assume that this song is Milan due to the filename literally being Rkenzo X Tkandz. Snippeted April 2026 — likely a lead single or album cut given the full verse preview. Rkenzo said if Tkandz label doesnt clear his feature then he will replace this song with another highly anticipated artist feature',
      },

      {
        position: 2,
        title: 'EVISU JEANS',
        confirmed: true,
        producer: 'Sogimura',
        notes: 'Unreleased experimental song, same producer as Rick owens kenz tries a new style with some familar flows and delievers a really solid song. This song will probably be considered for Momentary Bliss',

      },

      {
        position: 4,
        title: 'FINER THINGS',
        confirmed: true,
        features: '',
        producer: 'blancomadeit & Segway',
        notes: 'Song seen as track 4 on this version of momentary bliss under the name "blancomadeit x segway song" which we can easily dervive is finer things',
      },
      
      {
        position: 5,
        title: 'Streatham Hill',
        confirmed: true,
        producer: '? X Yoni',
        notes: "Seen as the outro for this version of momentary bliss as 'Streatham hill where i reside' ",
      },

      {
        position: 3,
        title: 'Alone',
        confirmed: true,
        producer: 'FinniX!Beats',
        notes: 'Instantly hailed as a grail after the instagram live preview. Fans are desperate for this one',
      },
      


    ],
  },

  {
    project: 'OS2S: Extended Edition',
    era: 'OS2S: Extended Edition',
    status: 'Confirmed',
    source: 'Official bundle release via OS2S website',
    updatedDate: '2024',
    notes: 'Extended version of One Shot To Shine with 3 bonus tracks, only available if you purchased the bundle.',
    tracks: [
      {
        position: 1,
        title: 'One Shot To Shine',
        confirmed: true,
        notes: 'Carried over from the original EP',
      },


      {
        position: 2,
        title: 'CANT WAIT',
        confirmed: true,
      },

      {
        position: 3,
        title: 'Out Till Late',
        confirmed: true,
        features: 'ft. Whizz',
      },

      {
        position: 4,
        title: 'Go With It',
        confirmed: true,
        producer: 'YiciBeats',
      },


      {
        position: 5,
        title: 'Papercuts',
        confirmed: true,
        producer: 'ROB EVN',
      },



      {
        position: 6,
        title: 'Crossroads',
        confirmed: true,
      },
      {
        position: 7,
        title: 'RUSH THIS!',
        confirmed: true,
        producer: 'RealRichMoney & Rkenzo',
        notes: 'Production changed from the original coreyblazyy versions',
        isBonusTrack: true,
      },
      {
        position: 8,
        title: 'Say So',
        confirmed: true,
        producer: 'Segway',
        notes: 'Revamped version, no Kadz feature',
        isBonusTrack: true,
      },
      {
        position: 9,
        title: 'Lifestyle Lately',
        confirmed: true,
        features: 'ft. Tkandz',
        producer: 'Gore Ocean',
        notes: 'UK reshot version with Tkandz',
        isBonusTrack: true,
      },
    ],
  },

  {
    project: 'One Shot To Shine V2',
    era: 'One Shot To Shine',
    status: 'Confirmed',
    source: 'Official EP release — August 23rd 2024',
    updatedDate: 'August 2024',
    notes: 'Debut EP. Officially released tracklist.',
    tracks: [
      {
        position: 1,
        title: 'One Shot To Shine',
        confirmed: true,
        notes: 'Title track and intro to the EP',
      },

      {
        position: 2,
        title: 'CANT WAIT',
        confirmed: true,
        notes: 'Bars referencing his ex',
      },

      {
        position: 3,
        title: 'Out Till Late',
        confirmed: true,
        features: 'ft. Whizz',
        notes: 'Reportedly made in one take',
      },
      
      {
        position: 4,
        title: 'Go With It',
        confirmed: true,
        producer: 'YiciBeats',
        notes: 'More emotional cut, small callback to Never Giving Up',
      },


      {
        position: 5,
        title: 'Papercuts',
        confirmed: true,
        producer: 'ROB EVN',
        notes: 'Made the day after his girlfriend broke up with him. Biggest song on the project',
      },

      {
        position: 6,
        title: 'Crossroads',
        confirmed: true,
        notes: 'Closing track — most personal song on the EP',
      },
    ],
  },

  {
    project: 'One Shot To Shine V1',
    era: 'One Shot To Shine',
    status: 'Scrapped',
    source: 'Original tracklist before the EP release, shared by Rkenzo',
    updatedDate: 'August 2024',
    notes: 'Rearranged order of the tracks on OS2S with some new changes like Fuck the world and Keep Goin and an addition 7th song',
    tracks: [
      {
        position: 1,
        title: "Keep Goin'",
        confirmed: true,
        notes: 'Title track and intro to the EP',
      },

      {
        position: 2,
        title: 'Crossroads',
        confirmed: true,
        notes: 'Personal track but changed to the 2nd position',
      },

      {
        position: 3,
        title: 'CANT WAIT',
        confirmed: true,
        notes: 'Bars referencing his ex',
      },

      {
        position: 4,
        title: 'Out Till Late',
        confirmed: true,
        features: 'ft. Whizz',
        notes: 'Reportedly made in one take',
      },

      {
        position: 5,
        title: 'Papercuts',
        confirmed: true,
        producer: 'ROB EVN',
        notes: 'Made the day after his girlfriend broke up with him. Biggest song on the project',
      },

      {
        position: 6,
        title: 'Go With It',
        confirmed: true,
        producer: 'YiciBeats',
        notes: 'More emotional cut, small callback to Never Giving Up',
      },


      {
        position: 7,
        title: 'Fuck The World',
        confirmed: true,
        notes: 'Closing track — most personal song on the EP',
      },
    ],
  },


];