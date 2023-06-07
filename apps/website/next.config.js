/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.youtube.com', 'yt3.ggpht.com', 'static-cdn.jtvnw.net', 'via.placeholder.com']
  },
  sassOptions: {
    includePaths: [__dirname, 'src/styles']
  }
};

module.exports = nextConfig;
