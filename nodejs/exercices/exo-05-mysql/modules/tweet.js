const tweetModel = require('../database/tweet-model')

const tweet = {
  getAllTweets: async () => await tweetModel.get(),
  getTweetById: async (tweetId) => await tweetModel.getById(tweetId),
  getTweetsByUserId: async (userId) => await tweetModel.getByUserId(userId),
  createTweet: async (message, userId) => await tweetModel.insert(message, userId),
  updateTweet: async (tweetId, message) => await tweetModel.update(tweetId, message),
}

module.exports = tweet