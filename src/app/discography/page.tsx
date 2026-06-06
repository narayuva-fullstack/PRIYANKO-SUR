"use client";

import React from "react";
import { useAudio } from "@/context/AudioContext";
import { Play, Pause, ExternalLink } from "lucide-react";
import { InteractiveCard } from "@/components/InteractiveCard";

interface Album {
  title: string;
  description: string;
  artworkIndex: number; // Index of associated preview track in TRACK_LIST
  tracksCount: string;
  artwork: string; // Path to album cover thumbnail
  links: {
    spotify?: string;
    apple?: string;
    saavn?: string;
    youtube?: string;
  };
}

const ALBUM_DATA: Album[] = [
  {
    title: "Aditya Hridayam (Heart of the Sun)",
    description: "A transformative compilation of Sanskrit Solar Mantras chanted in dynamic Vedic metres, synthesized with futuristic ambient layouts and orchestral strings.",
    artworkIndex: 0,
    tracksCount: "3 Original Soundtracks",
    artwork: "/images/albums/1.jpg",
    links: {
      spotify: "https://open.spotify.com/album/4Dc53C78drzHM7m3dqhDad",
      apple: "https://music.apple.com/us/album/the-heart-of-the-sun-aditya-hridayam/1129260558",
      saavn: "https://www.jiosaavn.com/song/surya-21-names--sarva-rog-niramay-yash-vriddhi-dhan-vriddhi/PCQ4AwdJWAE",
      youtube: "https://music.youtube.com/playlist?list=OLAK5uy_lX_1_fcR1OB0WkahjZxU7kKHRe6h7Ztmw",
    },
  },
  {
    title: "Shabdoscope",
    description: "Avant-garde Bengali experimental pop. Merges classical raga vocal hooks with heavy electronic beats and atmospheric synth design. Composed and arranged by Priyanko Sur.",
    artworkIndex: 1,
    tracksCount: "5 Original Soundtracks",
    artwork: "/images/albums/5.jpg",
    links: {
      spotify: "https://open.spotify.com/album/1kBp2BeD8bNIqggxSRys5J",
      apple: "https://music.apple.com/us/album/shabdoscope-ep/1533083655",
      saavn: "https://www.jiosaavn.com/album/shabdoscope/G8CEJr3O4n4_",
      youtube: "https://music.youtube.com/watch?v=kN3_msOn8zY&list=PLXX5Kv_nOMDtQ73d33Vn-GZwPM9KvYOKQ",
    },
  },
  {
    title: "Surya Shakti",
    description: "Traditional solar stutis and Vedic invocations to Ganesha and Hanuman, re-orchestrated with acoustic rhythms and electronic pads.",
    artworkIndex: 2,
    tracksCount: "6 Original Soundtracks",
    artwork: "/images/albums/4.jpg",
    links: {
      spotify: "https://open.spotify.com/album/53m46FdrCup9VCsFT97cDd",
      apple: "https://music.apple.com/us/album/surya-shakti-ep/1016361278",
      saavn: "https://gaana.com/album/surya-shakti",
      youtube: "https://music.youtube.com/playlist?list=OLAK5uy_mU-zw05YIZrGNO4cOAgQ2tfsoR8OVxtpI",
    },
  },
  {
    title: "Bho Ganesha Surashreshtha",
    description: "Sanskrit Devotional Stuti composed by Narad Muni. Released officially in partnership with Shrimant Dagdusheth Halwai Ganapati Temple Trust in Pune.",
    artworkIndex: 3,
    tracksCount: "1 Extended Suite",
    artwork: "/images/albums/6.jpg",
    links: {
      spotify: "http://www.dagdushethganpati.com/audio-gallery-2/",
    },
  },
  {
    title: "Vishnu Sahashranaam",
    description: "A modern, flowing 1000 names of Lord Vishnu devotional layout, including Das Avatar Stuti and Mahalaxmi Stuti. Elegant background chord alignments.",
    artworkIndex: 4,
    tracksCount: "3 Compositions",
    artwork: "/images/albums/2.jpg",
    links: {
      spotify: "https://open.spotify.com/album/644hC3ao9jJkq6DguFXTGM",
      apple: "https://music.apple.com/us/album/mahalakshmi-stuti-dhanvriddhi/1319297988?i=1319298795",
      saavn: "https://www.jiosaavn.com/album/vishnu-sahashranaam/UR5SJcUWylw_",
    },
  },
  {
    title: "Siddhi Vinayak Stuti",
    description: "Unique Sanskrit invocation released and shot directly within the world-famous Siddhivinayak Temple in Mumbai under their official trust.",
    artworkIndex: 5,
    tracksCount: "1 Chanting Video Release",
    artwork: "/images/albums/7.jpg",
    links: {
      youtube: "https://www.youtube.com/channel/UC4iO1_QwMM2uq_FBG_U6ZKA/videos",
    },
  },
  {
    title: "Rim Jhim Barse Paani",
    description: "Original love song celebrating monsoon romance. Composed by Shri Viswanarayan and sung by playback singer Sadhana Sargam. Produced by Priyanko Sur.",
    artworkIndex: 6,
    tracksCount: "1 Acoustic Single",
    artwork: "/images/albums/3.jpg",
    links: {
      spotify: "https://open.spotify.com/track/0nHnyij0aVwL2L7MDbpKqD",
      apple: "https://music.apple.com/au/album/rim-jhim-barse-paani-single/1444251377",
      saavn: "https://www.jiosaavn.com/song/Rim-Jhim-Barse-Paani/IBo-AQJ2ZEE",
    },
  },
];

export default function Discography() {
  const { currentTrackIndex, isPlaying, playTrack, pauseTrack } = useAudio();

  return (
    <div className="relative min-h-screen text-white py-16 divine-aura-glow-large">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-16">
        
        {/* Header */}
        <div className="flex flex-col gap-4 text-center items-center">
          <span className="text-[10px] font-mono text-luxury-accent uppercase tracking-widest">
            Studio Releases & Tracks
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-reveal heading-safe">
            Discography
          </h1>
          <p className="text-sm text-luxury-secondary max-w-2xl leading-relaxed font-light mt-1">
            Browse through full studio albums, singles, and collaborations. Use the inline player triggers to sample previews directly or stream complete suites on official platforms.
          </p>
        </div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divine-aura-glow">
          {ALBUM_DATA.map((album) => {
            const isCurrent = currentTrackIndex === album.artworkIndex;
            const isCurrentPlaying = isCurrent && isPlaying;
            
            return (
              <InteractiveCard
                key={album.title}
                cardType="album"
                className="flex flex-col justify-between gap-6 group relative border-white/5"
              >
                {/* Visualizer active badge */}
                {isCurrentPlaying && (
                  <div className="absolute top-4 right-4 z-30 bg-luxury-accent/10 border border-luxury-accent/20 px-2.5 py-0.5 rounded-full text-[9px] font-mono text-luxury-accent animate-pulse">
                    Active Preview
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  {/* Vinyl Album art sleeve wrapper */}
                  <div className="w-full aspect-[2/1] rounded-lg bg-luxury-surface/50 border border-white/5 flex items-center justify-between p-4 overflow-hidden relative">
                    <div className="flex flex-col justify-between h-full relative z-20">
                      {/* Album Cover Sleeve Thumbnail */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-white/10 shadow-2xl relative z-20 flex-shrink-0">
                        <img
                          src={album.artwork}
                          alt={album.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[10px] font-mono text-luxury-secondary uppercase tracking-widest mt-2 block">
                        {album.tracksCount}
                      </span>
                    </div>

                    {/* Interactive Vinyl CD layout */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 flex items-center justify-center z-10 transition-all duration-700 ease-out group-hover:translate-x-6">
                      <div className="w-full h-full rounded-full bg-neutral-950 border-4 border-neutral-900 flex items-center justify-center relative shadow-2xl transition-transform duration-1000 group-hover:rotate-180">
                        {/* Grooves */}
                        <div className="absolute inset-1.5 rounded-full border border-neutral-800/40" />
                        <div className="absolute inset-3 rounded-full border border-neutral-800/40" />
                        <div className="absolute inset-5 rounded-full border border-neutral-800/40" />
                        {/* Center spindle label */}
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-luxury-accent flex items-center justify-center overflow-hidden border border-neutral-900">
                          <img
                            src={album.artwork}
                            alt=""
                            className="w-full h-full object-cover opacity-85"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 mt-2">
                    <h3 className="text-xl font-serif text-white group-hover:text-luxury-accent transition-colors heading-safe">
                      {album.title}
                    </h3>
                    <p className="text-xs text-luxury-secondary leading-relaxed font-light mt-1">
                      {album.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 pt-4 border-t border-white/5 z-20">
                  {/* Streaming redirection badges */}
                  <div className="flex flex-wrap gap-2 text-[10px] font-mono text-luxury-secondary">
                    {album.links.spotify && (
                      <a href={album.links.spotify} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1">
                        Spotify <ExternalLink size={10} />
                      </a>
                    )}
                    {album.links.saavn && (
                      <a href={album.links.saavn} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1">
                        JioSaavn <ExternalLink size={10} />
                      </a>
                    )}
                    {album.links.apple && (
                      <a href={album.links.apple} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1">
                        Apple Music <ExternalLink size={10} />
                      </a>
                    )}
                    {album.links.youtube && (
                      <a href={album.links.youtube} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1">
                        YouTube <ExternalLink size={10} />
                      </a>
                    )}
                  </div>

                  {/* Playback CTA */}
                  <button
                    onClick={() => (isCurrentPlaying ? pauseTrack() : playTrack(album.artworkIndex))}
                    className="w-full py-2.5 rounded-full bg-white text-luxury-bg hover:bg-neutral-200 transition-colors text-xs font-mono uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
                  >
                    {isCurrentPlaying ? (
                      <>
                        <Pause size={12} fill="currentColor" /> Pause Preview
                      </>
                    ) : (
                      <>
                        <Play size={12} fill="currentColor" /> Play Preview
                      </>
                    )}
                  </button>
                </div>

              </InteractiveCard>
            );
          })}
        </div>

      </div>
    </div>
  );
}
