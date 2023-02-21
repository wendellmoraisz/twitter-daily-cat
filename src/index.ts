import CatApi from "./services/CatApi";
import FileManager from "./services/FileManager";
import PostMessageWriter from "./services/PostMessageWriter";
import Twitter from "./services/Twitter";
import twitterClient from "./config/TwitterConfig";
import { CronJob } from "cron";

function main() {
  const twitterApi = new Twitter(twitterClient);
  const catApi = new CatApi();
  const fileManager = new FileManager();
  const uploadedImageSourcePath = `${__dirname}/img/cat.png`;
  const postMessage = PostMessageWriter.getPostMessage();

  fileManager
    .downloadAndSaveImage(
      `${catApi.catWithTextUrl}/${postMessage}`,
      uploadedImageSourcePath
    )
    .then(() => {
      try {
        twitterApi.uploadAndTweetMedia(uploadedImageSourcePath);
      } catch (error) {
        console.log(error);
        main();
      }
    })
    .catch((error) => console.log("Error in image download\n", error));
}

// Irá executar todos os dias às 03:00
const cronTweet = new CronJob("0 3 * * *", () => main());

cronTweet.start();