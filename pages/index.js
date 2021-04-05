import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = ({ meetups }) => (
  <>
    <Head>
      <title>Meetups</title>
      <meta name='description' content='List of highly active React meetups!' />
    </Head>
    <MeetupList meetups={meetups} />;
  </>
);

export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://dbuser:sCCs357a@devconnector.l78xb.mongodb.net/meetups?retryWrites=true&w=majority'
  );
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
