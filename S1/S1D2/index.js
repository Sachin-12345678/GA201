const express = require('express');
const axios = require('axios');
const { MongoClient } = require('mongodb');

const app = express();
const port = 8000;

// MongoDB Connection URL
const mongoURL = 'mongodb+srv://sachin:chavan@cluster0.1kuxcjb.mongodb.net/Github?retryWrites=true&w=majority';
const dbName = 'githubdata';
const collectionName = 'repositories';

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB Connection
let db;

(async () => {
  try {
    const client = new MongoClient(mongoURL);
    await client.connect();
    db = client.db(dbName);
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
})();

// API 1: Save GitHub Data to MongoDB
app.post('/github', async (req, res) => {
  const { url } = req.body;

  try {
    // Fetch data from GitHub API
    const response = await axios.get(url);
    const githubData = response.data;

    // Create or update each repository
    for (const repo of githubData) {
      const filter = { id: repo.id };
      const update = { $set: repo };
      const options = { upsert: true };

      await db.collection(collectionName).updateOne(filter, update, options);
    }

    res.status(200).json({ message: 'Data saved to MongoDB' });
  } catch (error) {
    console.error('Error saving data to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API 2: Retrieve Saved GitHub Data from MongoDB
app.get('/github/:id', async (req, res) => {
  const repoId = parseInt(req.params.id);

  try {
    const repository = await db.collection(collectionName).findOne({ id: repoId });

    if (repository) {
      res.status(200).json(repository);
    } else {
      res.status(404).json({ error: 'Repository not found' });
    }
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
