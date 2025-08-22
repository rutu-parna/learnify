const nextConfig = {
  images: {
    domains: [
      "cdn-xyz.huggingface.co",
      "fal.media",
      "res.cloudinary.com", // 👈 allow Cloudinary
    ],
  },
};

export default nextConfig;
