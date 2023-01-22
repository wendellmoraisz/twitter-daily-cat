import CatApi from "./services/CatApi";
import FileManager from "./services/FileManager";
import MessageWriter from "./services/MessageWriter";
import TwitterApi from "./services/TwitterApi";
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
    () => {
      twitterApi.uploadAndTweetMedia(uploadedImageSourcePath, postMessage);
    }
  );
}

main();

// const cronTweet = new CronJob("*/30 * * * * *", async () => {
//   main();
// });

// cronTweet.start();
