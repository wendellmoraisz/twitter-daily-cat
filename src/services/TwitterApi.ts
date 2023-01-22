import twitterClient from "../config/TwitterConfig";

class TwitterApi {
  private async uploadMedia(sourcePath: string): Promise<string> {
    try {
      return await twitterClient.v1.uploadMedia(sourcePath);
    } catch (error) {
      throw error;
    }
  }

  private async tweetMedia(mediaId: string, postCaption?: string) {
    try {
      await twitterClient.v2.tweet({
        text: postCaption ?? "",
        media: {
          media_ids: [mediaId]
        }
      });
      console.log("Media successful tweeted!!");
    } catch (error) {
      throw error;
    }
  }

  public async uploadAndTweetMedia(mediaSourcePath: string, postCaption?: string) {
    try {
      const mediaId = await this.uploadMedia(mediaSourcePath);
      await this.tweetMedia(mediaId, postCaption);
    } catch (error) {
      console.log(error);
    }
  }
}

export default TwitterApi;
