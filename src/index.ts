import CatApi from "./services/CatApi";
import FileManager from "./services/FileManager";
import PostMessageWriter from "./services/PostMessageWriter";
import TwitterApi from "./services/TwitterApi";
const CronJob = require("cron").CronJob;

function main() {
  const catApi = new CatApi();
  const twitterApi = new TwitterApi();
  const fileManager = new FileManager();
  const uploadedImageSourcePath = `${__dirname}/img/cat.png`;
  const postMessage = PostMessageWriter.getPostMessage();

  fileManager.downloadAndSaveImage(
    `${catApi.catWithTextUrl}/${postMessage}`,
    uploadedImageSourcePath,
    () => {
      twitterApi.uploadAndTweetMedia(uploadedImageSourcePath);
    }
  );
}

export default main;

// Será executado todos os dias às 00:00
const cronTweet = new CronJob("0 0 * * *", async () => {
  main();
});

cronTweet.start();
