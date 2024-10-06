/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // This option disables ESLint checks during the build process
        ignoreDuringBuilds: true,
      },
      typescript: {
          // This option disables TypeScript type checking during the build process
          ignoreBuildErrors: true,
        },
};

export default nextConfig;
