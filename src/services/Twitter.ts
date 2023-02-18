import main from "../index";
import { TwitterApi } from "twitter-api-v2";

class Twitter {
  private twitterClient: TwitterApi;

  constructor(twitterClient: TwitterApi) {
    this.twitterClient = twitterClient;
  }

  public async uploadAndTweetMedia(mediaSourcePath: string, postCaption?: string) {
    try {
      const mediaId = await this.uploadMedia(mediaSourcePath);
      await this.tweetMedia(mediaId, postCaption);
    } catch (error) {
      console.log(error);
    }
  }

  private async uploadMedia(sourcePath: string): Promise<string> {
    try {
      return await this.twitterClient.v1.uploadMedia(sourcePath);
    } catch (error) {
      throw error;
    }
  }

  private async tweetMedia(mediaId: string, postCaption?: string) {
    try {
      await this.twitterClient.v2.tweet({
        text: postCaption ?? "",
        media: {
          media_ids: [mediaId]
        }
      });
      console.log("Media successful tweeted!!");
    } catch (error: any) {
      if (this.isGifUploadError(error)) {
        main();
      }
      throw error;
    }
  }

  private isGifUploadError(error: any) {
    return error.code === 400;
  }
}

export default Twitter;
