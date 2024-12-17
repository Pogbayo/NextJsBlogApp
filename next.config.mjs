/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https", // Assuming the image uses HTTPS
  //       hostname: "www.pexels.com", // Replace with the actual hostname
  //       port: "",
  //       pathname: "/**", // Allow all paths under the domain
  //       search: "",
  //     },
  //   ],
  // },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
