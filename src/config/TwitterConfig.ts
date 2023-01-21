const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();

const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET_KEY,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET_TOKEN
});

const twitterClient = client.readWrite;

export default twitterClient;
