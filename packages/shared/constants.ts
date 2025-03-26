export const databaseConfig = {
  prefix: "yts",
};

export const siteConfig = {
  name: "VideoInsight",
  title: "VideoInsight - AI-Powered YouTube Video Summarizer",
  tagline: "Summarize, chat, and learn from YouTube videos with AI.",
  description:
    "Transform how you learn from YouTube videos with AI-powered summaries, interactive chat, and personalized learning paths.",
  email: "contact@yts.ai",
  url:
    process.env.NODE_ENV === "production"
      ? "https://vidinsight.vercel.app"
      : "http://localhost:4321",
};
