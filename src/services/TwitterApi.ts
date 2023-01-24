const twitterClient = require("../config/TwitterConfig");
const mainFunction = require("../index");

class TwitterApi {
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
    } catch (error: any) {
      if (this.isGifUploadError(error)) {
        mainFunction();
      }
      throw error;
    }
  }

  private isGifUploadError(error: any) {
    if (error.code === 400) return true;
    return false;
  }
}

module.exports = TwitterApi;
