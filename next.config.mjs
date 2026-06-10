import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This app has its own lockfile; pin the tracing root to silence the
  // multi-lockfile workspace-root inference warning.
  outputFileTracingRoot: __dirname,
  images: {
    // Article/category imagery is served as plain static files from /public/assets.
    unoptimized: true,
  },
};

export default nextConfig;
