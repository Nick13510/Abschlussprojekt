type Video = {
  id: string;
  title: string;
  channel: string;
  views: string;
  duration: string;
  thumbnail: string;
  publishedAt: string;
};

const videos: Video[] = [
  {
    id: "1",
    title: "Introduction to React — Beginner Tutorial",
    channel: "Code Academy",
    views: "1.2M views",
    duration: "12:34",
    thumbnail: "https://picsum.photos/seed/vid1/480/270",
    publishedAt: "1 year ago",
  },
  {
    id: "2",
    title: "Build a YouTube-like UI with React",
    channel: "UI Labs",
    views: "230K views",
    duration: "9:10",
    thumbnail: "https://picsum.photos/seed/vid2/480/270",
    publishedAt: "6 months ago",
  },
  {
    id: "3",
    title: "TypeScript: Tips & Tricks",
    channel: "TS Pro",
    views: "85K views",
    duration: "7:45",
    thumbnail: "https://picsum.photos/seed/vid3/480/270",
    publishedAt: "3 months ago",
  },
  {
    id: "4",
    title: "Advanced Vite + React Performance",
    channel: "Fast Frontend",
    views: "45K views",
    duration: "15:02",
    thumbnail: "https://picsum.photos/seed/vid4/480/270",
    publishedAt: "2 months ago",
  },
  {
    id: "5",
    title: "CSS Grid Tutorial — Build Layouts",
    channel: "Design School",
    views: "320K views",
    duration: "11:20",
    thumbnail: "https://picsum.photos/seed/vid5/480/270",
    publishedAt: "8 months ago",
  },
];

export default videos;
