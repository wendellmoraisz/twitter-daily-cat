const CronJob = require("cron").CronJob;
const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");

app.use(cors());

app.get("/*", (req: any, res: any) => {
  res.json({response: "ok"});
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

module.exports = main

const cronTweet = new CronJob("0 0 * * *", async () => {
  // Será executado todos os dias às 00:00
  main();
});

cronTweet.start();
