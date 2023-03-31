# Wove

## ⚠️ This is still a work in progress⚠️

Currently the app is missing the scheduling and agent functionality. Working on getting these merged in, but it may take me a few more days or so. Check back for updates!

<img width="1758" alt="turbo2" src="https://i.imgur.com/XwiPXMa.jpg">

## About

This is the monorepo for Wove, a tool for building long-running workflows with LLMs.

## Stack

This repo uses the following technologies:

- Node 18
- PNPM
- Typescript
- Turborepo
- NextJS 13
- React 18
- Auth.js (formerly known as NextAuth.js)
- Prisma
- tRPC v10
- TailwindCSS
- OpenAI GPT4
- Langchain
- Vercel
- Upstash
- SQLite

...there's probably more, but that's what I can think of off the top of my head.

## Folder Structure

```
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  └─ next.js
      ├─ Next.js 13
      ├─ React 18
      ├─ TailwindCSS
      └─ E2E Typesafe API Server & Client
packages
 ├─ api
 |   └─ tRPC v10 router definition
 ├─ auth
     └─ authentication using next-auth
 └─ db
     └─ typesafe db-calls using Prisma
```

## FAQ

TODO

## Quick Start

To get it running, follow the steps below:

### Setup dependencies

```diff
# Install dependencies
pnpm i

# If you'd like to use a different database other than SQLite, you can go
# to packages/db/prisma and update schema.prisma provider
# or use your own database provider
- provider = "sqlite"
+ provider = "postgresql"

# Configure environment variables.
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Push the Prisma schema to your database
pnpm db:push
```

## Set up login providers

This app has Discord and Google as login options. If you want to run it locally and be able to log in, you need to have one of these two options set up.

Here's how to set up Discord:

- [Create a Discord developer application](https://discord.com/developers/applications)
- Grab your client ID and client secret and add them to your `.env` file as `DISCORD_CLIENT_ID` and `DISCORD_CLIENT_SECRET`

Here's how to set up Google:

- [Create a Google developer application](https://console.developers.google.com/apis/credentials)
- Grab your client ID and client secret and add them to your `.env` file as `GOOGLE_OAUTH_CLIENT_ID` and `GOOGLE_OAUTH_CLIENT_SECRET`

## Set up OpenAI

This app uses OpenAI GPT4 to generate text. If you want to run it locally and be able to use the OpenAI feature, you need to have an OpenAI account and set up your API key.

- [Create an OpenAI account](https://platform.openai.com/)
- Grab your API key and add it to your `.env` file as `OPENAI_API_KEY`

Also note that if you don't have GPT4 access, you can modify the `OPENAI_MODEL_KEY` environment variable to use a different chat model (e.g. `gpt-3.5.-turbo`).

## Deployment

### Next.js

#### Prerequisites

_We do not recommend deploying a SQLite database on serverless environments since the data wouldn't be persisted. I provisioned a quick Postgresql database on [Railway](https://railway.app), but you can of course use any other database provider. Make sure the prisma schema is updated to use the correct database._

#### Deploy to Vercel

Let's deploy the Next.js application to [Vercel](https://vercel.com/). If you have ever deployed a Turborepo app there, the steps are quite straightforward. You can also read the [official Turborepo guide](https://vercel.com/docs/concepts/monorepos/turborepo) on deploying to Vercel.

1. Create a new project on Vercel, select the `apps/nextjs` folder as the root directory and apply the following build settings:

<img width="927" alt="Vercel deployment settings" src="https://user-images.githubusercontent.com/11340449/201974887-b6403a32-5570-4ce6-b146-c486c0dbd244.png">

> The install command filters out the expo package and saves a few second (and cache size) of dependency installation. The build command makes us build the application using Turbo.

2. Add your `DATABASE_URL` environment variable.

3. Done! Your app should successfully deploy. Assign your domain and use that instead of `localhost` for the `url` in the Expo app so that your Expo app can communicate with your backend when you are not in development.

## References

The stack originates from [create-t3-app](https://github.com/t3-oss/create-t3-app).
