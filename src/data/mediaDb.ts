export interface MediaPhoto {
  id: string;
  src: string;
  category: "gallery" | "shows" | "press";
  title: string;
}

export interface MediaVideo {
  id: string;
  title: string;
  category: "general" | "shows" | "research";
}

export const MEDIA_DATABASE = {
  photos: [
    // General Gallery Photos (images/photos/)
    { id: "p1", src: "/images/photos/1.jpg", category: "gallery", title: "Priyanko Sur Studio Portrait" },
    { id: "p2", src: "/images/photos/2.jpg", category: "gallery", title: "Live Concert Performance Vocal Close-up" },
    { id: "p3", src: "/images/photos/3.jpg", category: "gallery", title: "Acoustic Classical Session" },
    { id: "p4", src: "/images/photos/4.jpg", category: "gallery", title: "Traditional Chanting Performance" },
    { id: "p5", src: "/images/photos/5.jpg", category: "gallery", title: "Electronic World Music Mixing" },
    { id: "p6", src: "/images/photos/6.jpg", category: "gallery", title: "Stage Performance under Cinematic Lights" },
    { id: "p7", src: "/images/photos/7.jpg", category: "gallery", title: "Sanskrit Invocation Vocalist Session" },
    { id: "p8", src: "/images/photos/8.jpg", category: "gallery", title: "Folk Recreation Guitar Session" },
    { id: "p9", src: "/images/photos/9.jpg", category: "gallery", title: "Siddhivinayak CD Launch Snapshot" },
    { id: "p10", src: "/images/photos/10.jpg", category: "gallery", title: "Live Show Stage Overview" },
    { id: "p11", src: "/images/photos/11.jpg", category: "gallery", title: "Vocal Recording Studio Setting" },
    { id: "p13", src: "/images/photos/13.jpg", category: "gallery", title: "Sun Concert Live Overview" },
    { id: "p14", src: "/images/photos/14.jpg", category: "gallery", title: "Performing Arts Gathering" },
    { id: "p15", src: "/images/photos/15.jpg", category: "gallery", title: "Stage Instrumental Harmony Session" },
    { id: "p16", src: "/images/photos/16.jpg", category: "gallery", title: "Hindustani Raga Live Presentation" },
    { id: "p17", src: "/images/photos/17.jpg", category: "gallery", title: "Pune Festival Concert Backstage" },
    { id: "p18", src: "/images/photos/18.jpg", category: "gallery", title: "Collaborative Artist Portrait" },
    { id: "p19", src: "/images/photos/19.jpg", category: "gallery", title: "Studio Mixing Board Session" },
    { id: "p20", src: "/images/photos/20.jpg", category: "gallery", title: "Vedic Frequencies Lab Recording" },
    { id: "p21", src: "/images/photos/21.jpg", category: "gallery", title: "Sun Consciousness Seminar Presentation" },
    { id: "p22", src: "/images/photos/22.jpg", category: "gallery", title: "Traditional Vocal Tribute Close-up" },

    // Live Shows Specific Photos (images/shows/)
    { id: "s1", src: "/images/shows/1.jpg", category: "shows", title: "Pune Festival Concert Stage" },
    { id: "s2", src: "/images/shows/2.jpg", category: "shows", title: "Doordarshan Mumbai Live Telecast" },
    { id: "s3", src: "/images/shows/3.jpg", category: "shows", title: "Mood Indigo College Festival" },
    { id: "s4", src: "/images/shows/4.jpg", category: "shows", title: "Music Healing Workshop Session" },
    { id: "s6", src: "/images/shows/6.jpg", category: "shows", title: "Radio FTII Studio Recording" },
    { id: "s7", src: "/images/shows/7.jpg", category: "shows", title: "RK Dance Collaboration Stage" },
    { id: "s8", src: "/images/shows/8.jpg", category: "shows", title: "Saraswati Puja School Concert" },
    { id: "s9", src: "/images/shows/9.jpg", category: "shows", title: "Shabdoscope Album Premiere" },
    { id: "s10", src: "/images/shows/10.jpg", category: "shows", title: "Sun & Sound Concert Arena" },
    { id: "s11", src: "/images/shows/11.jpg", category: "shows", title: "Mumbai Live Festival Gathering" },
    { id: "s12", src: "/images/shows/12.jpg", category: "shows", title: "Sadhana Vocal Recital Stage" },
    { id: "s13", src: "/images/shows/13.jpg", category: "shows", title: "Vedic Healing Chants Seminar" },

    // Press Clippings Photos (images/media/)
    { id: "m1", src: "/images/media/1.jpg", category: "press", title: "UN Environment Program Green Anthem Feature Clip" },
    { id: "m2", src: "/images/media/2.jpg", category: "press", title: "Siddhivinayak CD Official Release Press News" },
    { id: "m3", src: "/images/media/3.jpg", category: "press", title: "Vedic Chants Contemporary Sound Interview" },
    { id: "m4", src: "/images/media/4.jpg", category: "press", title: "Mumbai Concert Appreciation Media Coverage" },
    { id: "m5", src: "/images/media/5.jpg", category: "press", title: "National Television Live Broadcast Article" },
    { id: "m6", src: "/images/media/6.jpg", category: "press", title: "Folk Fusion Recreations Press Release" },
    { id: "m7", src: "/images/media/7.jpg", category: "press", title: "Sound Healing Workshop Press Coverage" },
    { id: "m8", src: "/images/media/8.jpg", category: "press", title: "Youth Chanting Awareness Press Feature" },
    { id: "m9", src: "/images/media/9.jpg", category: "press", title: "Guru Viswanarayan Tutelage Memorial Feature" },
  ] as MediaPhoto[],

  videos: [
    // General Videos
    { id: "gUY8gR9B5WQ", title: "Live Concert Performance Highlights", category: "general" },
    { id: "xuTbohfWEpA", title: "Contemporary Folk Vocal Presentation", category: "general" },
    { id: "a-sjAiAhhN8", title: "Siddhivinayak Stuti Audio-Visual Release", category: "general" },
    { id: "BRqoQpg2lHM", title: "Folk Recreations & Modern Orchestration", category: "general" },
    { id: "8y9qjKTDUnM", title: "Sanskrit Raga Invocation Live", category: "general" },
    { id: "kxJCZJz3HiI", title: "Vedic Mantras Fusion Suite", category: "general" },
    { id: "TrG9yGLNENA", title: "Vocal Sadhana Classical Session", category: "general" },
    { id: "FIBt3mF6hMY", title: "Traditional Sanskrit Chants Live Stage", category: "general" },
    { id: "zc7jUIqH8h4", title: "Television Interview & Performance Recital", category: "general" },
    { id: "yGJYUxxKoz8", title: "Monsoon Romance Single - Behind the Scenes", category: "general" },

    // Live Shows Videos
    { id: "_KZbtZlrFho", title: "Pune Festival Concert Stage Suite", category: "shows" },
    { id: "1-2-d2jrmso", title: "Doordarshan Mumbai Live Broadcast", category: "shows" },
    { id: "3u2wTEvPfGg", title: "Mood Indigo Vocalist Performance", category: "shows" },
    { id: "0v-4hh8tNAk", title: "Music Healing Workshop Session Highlights", category: "shows" },
    { id: "pAzCrpar_58", title: "Radio FTII Recording Studio Interview", category: "shows" },
    { id: "mZxwq6Hr0_4", title: "RK Dance Group Live Orchestration", category: "shows" },
    { id: "i6uSNIBJFkU", title: "Saraswati Puja School Concert Highlights", category: "shows" },
    { id: "OrZ5BEzDAxA", title: "Shabdoscope Album Live Premiere", category: "shows" },
    { id: "DdMR7Hsmzr4", title: "Sun & Sound Concert Arena Highlights", category: "shows" },

    // Research Videos
    { id: "YB4mO5pWx-c", title: "Surya 21 Names Invocation Chanting", category: "research" },
    { id: "VQqbJyB7NxM", title: "Acoustic Healing Frequencies Workshop", category: "research" },
    { id: "a8Kv-i2il1g", title: "Sun Consciousness Seminar Audio Record", category: "research" },
    { id: "AYruL7y4pXM", title: "Vedic Sanskrit Chanting & Modern Acoustic Blends", category: "research" },
  ] as MediaVideo[],
};
