import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = ({ meetups }) => (
  <>
    <Head>
      <title>Meetups</title>
      <meta name='description' content='List of highly active React meetups!' />
    </Head>
    <MeetupList meetups={meetups} />
  </>
);

export async function getStaticProps() {
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
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map(({ title, address, image, _id }) => ({
        title,
        address,
        image,
        id: _id.toString()
      }))
    },
    revalidate: 1
  };
}

export default HomePage;
