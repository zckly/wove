// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds and Linting.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@wove/api", "@wove/auth", "@wove/db"],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: !!process.env.CI },
  typescript: { ignoreBuildErrors: !!process.env.CI },
  images: {
    domains: [
      "localhost:3000",
      "lh3.googleusercontent.com",
      "emojipedia-us.s3.dualstack.us-west-1.amazonaws.com",
      "images.unsplash.com",
      "ui-avatars.com",
    ],
  },
};

export default config;
