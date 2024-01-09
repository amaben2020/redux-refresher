/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["course-material-dev.s3.us-east-2.amazonaws.com"],
  },
};
module.exports = {
  ...nextConfig,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(mp3)$/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[path][name].[hash][ext]",
      },
    });
    return config;
  },
};
