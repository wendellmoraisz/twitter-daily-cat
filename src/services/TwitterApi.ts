import twitterClient from "../config/TwitterConfig";
require("dotenv").config({ path: __dirname + "/.env" });

class TwitterApi {
  private async uploadMedia(sourcePath: string): Promise<string> {
    try {
      return await twitterClient.v1.uploadMedia(sourcePath);
    } catch (error) {
      throw error;
    }
  }

  public async uploadAndTweetMedia(
    mediaSourcePath: string,
    postCaption?: string
  ): Promise<void> {
    try {
      const mediaId = await this.uploadMedia(mediaSourcePath);
      await twitterClient.v2.tweet({
        text: postCaption ?? "",
        media: {
          media_ids: [mediaId]
        }
      });
      console.log("Media successful tweeted!!");
    } catch (error) {
      console.log(`Error in Tweet Media: ${error}`);
    }
  }
}

export default TwitterApi;
