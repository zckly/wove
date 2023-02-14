import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@wove/db";

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
const youtubesearchapi = require("youtube-search-api");

export type YoutubeVideo = {
  id: string;
  type: "video" | "playlist" | "channel";
  title: string;
  thumbnail: {
    thumbnails: Thumbnail[];
  };
  channelTitle: string;
  length: {
    accessibility: {
      accessibilityData: {
        label: string;
      };
    };
    simpleText: string;
  };
};

export type YoutubeVideoDetails = {
  title: string;
  isLive: boolean;
  channel: string;
  description: string;
  suggestion: YoutubeVideo[];
};

export type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { videoId, accessToken } = req.body;

  if (!videoId) {
    res.status(400).json({ error: "Missing videoId" });
    return;
  }

  if (!accessToken) {
    res.status(400).json({ error: "Missing accessToken" });
    return;
  }

  // Look up user by accessToken
  const session = await prisma.session.findUnique({
    where: {
      sessionToken: accessToken,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    res.status(400).json({ error: "Invalid accessToken" });
    return;
  }

  console.log({ videoId, accessToken });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: YoutubeVideoDetails = await youtubesearchapi.GetVideoDetails(
    videoId,
  );

  // Check if video is already in DB
  // If not, create it

  // await prisma.watchedVideo.create({
  //   data: {
  //     videoId: videoId as string,
  //     title: data.title,
  //     description: data.description,
  //     platform: VideoPlatform.YOUTUBE,
  //     channel: data.channel,
  //     url: `https://www.youtube.com/watch?v=${videoId}`,
  //     user: {
  //       connect: {
  //         id: session.userId,
  //       },
  //     },
  //   },
  // });

  res.status(200).json({ name: "John Doe" });
}
