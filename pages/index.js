import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = ({ meetups }) => (
  <>
    <Head>
      <title>Meetups</title>
      <meta name='description' content='List of highly active React meetups!' />
    </Head>
    {/* Coming from getStaticProps */}
    <MeetupList meetups={meetups} />
  </>
);

// Fetch data from db/api/localstorage for pre rendering. Executed on server side (during build process).
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

  // Always return an object in getStaticProps, typically nested in props obj.
  return {
    props: {
      meetups: meetups.map(({ title, address, image, _id }) => ({
        title,
        address,
        image,
        id: _id.toString()
      }))
    },
    // Incremental static generation: Regenerate page every 1 second if there is request coming for page.
    revalidate: 3600
  };
}

// Runs on server for every request.
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export default HomePage;
