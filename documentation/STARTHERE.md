# Start Here

This a short guide to get you started with Wove.

## Installation

Installation and set up instructions are documented in (README.md)[../README.md].

## Where everything is

`apps/nextjs` contains the Next.js app. Here you can find the pages, components, and other frontend code. We also have some API routes here for handling Auth, TRPC, and Webhooks for Upstash/Qstash.

`packages/api` contains the TRPC router. This is where you can find most of the API endpoints and their types. Currently we have endpoints for auth, teams, workflows, workflow blocks, and workflow runs.

`packages/auth` contains the authentication code. This is where you can find the NextAuth.js configuration and the code for handling the OAuth flow.

`packages/db` contains the Prisma schema and generated client. This is where you can find the database models and the code for interacting with the database.

`config/tailwind` contains the TailwindCSS configuration.

## How to contribute

Contributions are welcome! Please read the (contributing guidelines)[../CONTRIBUTING.md] before contributing.

## License

Wove is licensed under the (MIT License)[../LICENSE].

## Credits

Wove is built by [Zack](https://twitter.com/zckly) with the help of the T3 stack.
