"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

export interface Track {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  url: string;
  artwork: string;
  description?: string;
  frequency?: number; // Target frequency for research synthesis (Hz)
}

interface AudioContextType {
  tracks: Track[];
  currentTrackIndex: number | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  activeFrequency: number | null; // For sound-therapy synth
  playbackError: string | null;
  playTrack: (index: number) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  stopPlayback: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (vol: number) => void;
  seek: (time: number) => void;
  toggleSynthesis: (freq: number) => void;
  stopSynthesis: () => void;
  analyzerNode: AnalyserNode | null;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const TRACK_LIST: Track[] = [
  {
    id: "surya-21-names",
    title: "Aditya Hridayam (Heart of the Sun)",
    artist: "Priyanko Sur",
    genre: "Traditional / New Age",
    duration: "4:10",
    url: "/audio/Surya_21_Names.mp3",
    artwork: "1.jpg",
    description: "Vedic Sanskrit Chants complimenting modern ambient soundscapes to activate vital solar energy.",
    frequency: 136.1, // Earth's tone / OM frequency
  },
  {
    id: "shabdoscope",
    title: "Shabdoscope",
    artist: "Priyanko Sur",
    genre: "Experimental / Bengali Pop",
    duration: "5:21",
    url: "/audio/Spanish_Raga.mp3",
    artwork: "5.jpg",
    description: "Avant-garde Bengali experimental pop fused with raga-inspired sound design and atmospheric textures.",
    frequency: 432,
  },
  {
    id: "surya-shakti",
    title: "Surya Shakti",
    artist: "Priyanko Sur",
    genre: "Traditional / Devotional",
    duration: "6:02",
    url: "/audio/Hola_Surya.mp3",
    artwork: "4.jpg",
    description: "Solar invocations and devotional motifs re-orchestrated with acoustic rhythms and electronic pads.",
    frequency: 528,
  },
  {
    id: "bho-ganesha",
    title: "Bho Ganesha Surashreshtha",
    artist: "Priyanko Sur",
    genre: "Traditional / Devotional",
    duration: "7:09",
    url: "/audio/Bho_Ganesha_Surashreshtha.mp3",
    artwork: "6.jpg",
    description: "Sanskrit Stuti said to be composed by Narad Muni. Released with Shrimant Dagdusheth Halwai Ganapati Trust.",
    frequency: 432, // Healing frequency
  },
  {
    id: "vishnu-sahashranaam",
    title: "Vishnu Sahashranaam",
    artist: "Priyanko Sur",
    genre: "Devotional / Meditative",
    duration: "4:48",
    url: "/audio/Kono_Ek_Din.mp3",
    artwork: "2.jpg",
    description: "A flowing devotional meditation suite tuned for contemplative recitation and calm spatial harmony.",
  },
  {
    id: "siddhi-vinayak-stuti",
    title: "Siddhi Vinayak Stuti",
    artist: "Priyanko Sur",
    genre: "Devotional / Temple Release",
    duration: "6:15",
    url: "/audio/Rabba_Ho_Rabba.mp3",
    artwork: "7.jpg",
    description: "Unique Sanskrit invocation released and shot directly within the world-famous Siddhivinayak Temple in Mumbai under their official trust.",
  },
  {
    id: "rim-jhim-barse-paani",
    title: "Rim Jhim Barse Paani",
    artist: "Priyanko Sur",
    genre: "Folk / Devotional",
    duration: "4:06",
    url: "/audio/Ganga_Aye_Kahan_Se.mp3",
    artwork: "3.jpg",
    description: "Original love song celebrating monsoon romance. Produced by Priyanko Sur with a cinematic folk lens.",
  },
];
export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.8);
  const [activeFrequency, setActiveFrequency] = useState<number | null>(null);
  const [playbackError, setPlaybackError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const playbackSessionRef = useRef(0);

  // Maintain refs to avoid stale closures in event listeners
  const currentTrackIndexRef = useRef<number | null>(null);
  // Don't assign to refs during render — update in effects below
  const nextTrackRef = useRef<() => void>(() => {});

  const [analyzerNodeState, setAnalyzerNodeState] = useState<AnalyserNode | null>(null);

  const clearAudioElement = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.removeAttribute("src");
    audioRef.current.load();
  };
  
  // Setup HTML Audio element on mount (runs exactly once)
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration || 0);
    const onError = () => {
      const mediaError = audio.error;
      const errorMessage = mediaError
        ? `Audio playback failed (${mediaError.code}). Please retry.`
        : "Audio playback failed. Please retry.";
      setPlaybackError(errorMessage);
      setIsPlaying(false);
    };
    const onEnded = () => {
      if (nextTrackRef.current) {
        nextTrackRef.current();
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("error", onError);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("ended", onEnded);
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
        setAnalyzerNodeState(null);
      }
    };
  }, []);

  // Setup Web Audio API Context for visualizer and synthesis
  const initAudioCtx = () => {
    if (!audioCtxRef.current) {
      type WinAudio = { AudioContext?: typeof window.AudioContext; webkitAudioContext?: typeof window.AudioContext };
      const AudioContextClass = ((window as unknown) as WinAudio).AudioContext || ((window as unknown) as WinAudio).webkitAudioContext;
      if (!AudioContextClass) {
        console.warn("Web Audio API not available in this environment");
        return;
      }
      const ctx = new AudioContextClass();
      const analyzer = ctx.createAnalyser();
      analyzer.fftSize = 256;
      analyzerRef.current = analyzer;
      setAnalyzerNodeState(analyzer);

      if (audioRef.current) {
        try {
          const source = ctx.createMediaElementSource(audioRef.current);
          source.connect(analyzer);
          analyzer.connect(ctx.destination);
        } catch (err: unknown) {
          console.warn("Audio connection notice:", err);
        }
      }
      audioCtxRef.current = ctx;
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const playTrack = (index: number) => {
    initAudioCtx();
    stopSynthesisNodes();
    setPlaybackError(null);
    const track = TRACK_LIST[index];
    if (!track || !audioRef.current) return;

    if (currentTrackIndexRef.current === index) {
      resumeTrack();
      return;
    }

    clearAudioElement();
    const sessionId = playbackSessionRef.current + 1;
    playbackSessionRef.current = sessionId;
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    currentTrackIndexRef.current = index;
    setCurrentTrackIndex(index);
    audioRef.current.src = track.url;
    audioRef.current.volume = volume;
    audioRef.current.play()
      .then(() => {
        if (playbackSessionRef.current !== sessionId) return;
        setIsPlaying(true);
      })
      .catch((err) => {
        if (playbackSessionRef.current !== sessionId) return;
        console.error("Audio playback failed:", err);
        setPlaybackError(`Unable to start "${track.title}". Please retry.`);
        currentTrackIndexRef.current = null;
        setCurrentTrackIndex(null);
        setCurrentTime(0);
        setDuration(0);
        setIsPlaying(false);
      });
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stopPlayback = () => {
    playbackSessionRef.current += 1;
    stopSynthesisNodes();

    clearAudioElement();

    currentTrackIndexRef.current = null;
    setCurrentTrackIndex(null);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    setPlaybackError(null);
  };

  const resumeTrack = () => {
    initAudioCtx();
    setPlaybackError(null);
    if (audioRef.current && currentTrackIndexRef.current !== null) {
      const sessionId = playbackSessionRef.current;
      audioRef.current.play()
        .then(() => {
          if (playbackSessionRef.current === sessionId) {
            setIsPlaying(true);
          }
        })
        .catch((err) => {
          if (playbackSessionRef.current !== sessionId) return;
          console.error("Audio resume failed:", err);
          setPlaybackError("Unable to resume playback. Please retry.");
        });
    } else if (TRACK_LIST.length > 0) {
      playTrack(0);
    }
  };

  const nextTrack = () => {
    if (currentTrackIndexRef.current === null) return;
    const nextIdx = (currentTrackIndexRef.current + 1) % TRACK_LIST.length;
    playTrack(nextIdx);
  };

  useEffect(() => {
    currentTrackIndexRef.current = currentTrackIndex;
  }, [currentTrackIndex]);

  useEffect(() => {
    nextTrackRef.current = nextTrack;
  }, [nextTrack]);

  const prevTrack = () => {
    if (currentTrackIndexRef.current === null) return;
    const prevIdx = (currentTrackIndexRef.current - 1 + TRACK_LIST.length) % TRACK_LIST.length;
    playTrack(prevIdx);
  };

  const setVolume = (vol: number) => {
    const safeVol = Math.max(0, Math.min(1, vol));
    setVolumeState(safeVol);
    if (audioRef.current) {
      audioRef.current.volume = safeVol;
    }
    if (gainRef.current) {
      gainRef.current.gain.setValueAtTime(safeVol * 0.1, audioCtxRef.current?.currentTime || 0); // Modulate synth volume
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Sound Healing Waveform Synthesis
  const toggleSynthesis = (freq: number) => {
    initAudioCtx();
    playbackSessionRef.current += 1;
    clearAudioElement();
    currentTrackIndexRef.current = null;
    setCurrentTrackIndex(null);
    setCurrentTime(0);
    setDuration(0);

    if (activeFrequency === freq) {
      stopSynthesis();
      return;
    }

    stopSynthesisNodes();
    const ctx = audioCtxRef.current;
    const analyzer = analyzerRef.current;
    if (!ctx || !analyzer) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume * 0.1, ctx.currentTime); // keep tone soft

    osc.connect(gain);
    gain.connect(analyzer);

    osc.start();
    oscRef.current = osc;
    gainRef.current = gain;
    setActiveFrequency(freq);
    setIsPlaying(true);
    setCurrentTrackIndex(null); // Clear active track index when synthesis starts
    currentTrackIndexRef.current = null;
  };

  function stopSynthesisNodes() {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch {}
      oscRef.current = null;
    }
    if (gainRef.current) {
      gainRef.current.disconnect();
      gainRef.current = null;
    }
    setActiveFrequency(null);
  }

  function stopSynthesis() {
    stopSynthesisNodes();
    setIsPlaying(false);
  }

  return (
    <AudioContext.Provider
      value={{
        tracks: TRACK_LIST,
        currentTrackIndex,
        isPlaying,
        currentTime,
        duration,
        volume,
        activeFrequency,
        playbackError,
        playTrack,
        pauseTrack,
        resumeTrack,
        stopPlayback,
        nextTrack,
        prevTrack,
        setVolume,
        seek,
        toggleSynthesis,
        stopSynthesis,
        analyzerNode: analyzerNodeState,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
