import CatApi from "./services/CatApi";
import FileManager from "./services/FileManager";
import PostMessageWriter from "./services/PostMessageWriter";
import Twitter from "./services/Twitter";
import twitterClient from "./config/TwitterConfig";
import { Request, Response } from "express";
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({ response: "ok" });
});

app.get("/run", (req: Request, res: Response) => {
  main();
  res.json({ response: "ok" });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

function main() {
  const twitterApi = new Twitter(twitterClient);
  const catApi = new CatApi();
  const fileManager = new FileManager();
  const uploadedImageSourcePath = `${__dirname}/cat.png`;
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
