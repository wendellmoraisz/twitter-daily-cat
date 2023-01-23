import CatApi from "./services/CatApi";
import FileManager from "./services/FileManager";
import PostMessageWriter from "./services/PostMessageWriter";
import TwitterApi from "./services/TwitterApi";
const CronJob = require("cron").CronJob;
const express = require("express");
const app = express();
const PORT = 443;
const cors = require("cors");

app.use(cors());

app.get("/", (req: any, res: any) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Listening app on port ${PORT}`);
});

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

const cronTweet = new CronJob("0 0 * * *", async () => {
  // Será executado todos os dias às 00:00
  main();
});

cronTweet.start();
