import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup
async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const client = new MongoClient(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_URI}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    if (!client.isConnected()) await client.connect();
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;
