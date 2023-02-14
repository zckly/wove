import { YoutubeVideoDetails } from "~/pages/api/youtube/save-video";

declare module "youtube-search-api" {
  let GetListByKeyword: (
    keyword: string,
    playlist: boolean,
    maxResults: number,
  ) => Promise<{ items: any[] }>;

  let GetVideoDetails: (videoId: string) => Promise<YoutubeVideoDetails>;
}
