var config = {};

config.twitter = {};

config.twitter.consumer_key = process.env.TWITTER_CONSUMER_KEY;
config.twitter.consumer_secret = process.env.TWITTER_CONSUMER_SECRET;
config.twitter.access_token = process.env.TWITTER_ACCESS_TOKEN;
config.twitter.access_token_secret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

module.exports = config;
