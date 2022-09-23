const mongoose = require('mongoose');

const connectToDatabase = () => {
  mongoose
    .connect(process.env.mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Atlas CONNECTED!'))
    .catch((error) => {
      console.log(`Error connecting to MongoDB.\nError: ${error}`);
    });
};

module.exports = connectToDatabase;
