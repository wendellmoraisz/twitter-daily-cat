import CatApi from "./classes/CatApi";
import FileManager from "./classes/FileManager";
import MessageWriter from "./classes/MessageWriter";
import TwitterApi from "./classes/TwitterApi";
const CronJob = require("cron").CronJob;

function main() {
  const catApi = new CatApi();
  const twitterApi = new TwitterApi();
  const fileManager = new FileManager();
  const uploadedImageSourcePath = `${__dirname}/img/cat.png`;
  const postMessage = MessageWriter.getMessage();

  fileManager.downloadAndSaveImage(
    catApi.randomCatUrl,
    uploadedImageSourcePath,
    () => twitterApi.uploadAndTweetMedia(uploadedImageSourcePath, postMessage)
  );
}

main();

// const cronTweet = new CronJob("*/30 * * * * *", async () => {
//   main();
// });

// cronTweet.start();
