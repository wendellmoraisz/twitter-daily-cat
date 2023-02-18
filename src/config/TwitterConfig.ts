import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";
dotenv.config();

const twitterClient = new TwitterApi({
  // @ts-ignore
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET_KEY,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET_TOKEN
});

export default twitterClient;
