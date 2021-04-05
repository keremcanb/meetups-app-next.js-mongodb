import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = ({ meetupData: { title, description, image, address } }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Head>
    <MeetupDetail image={image} title={title} address={address} description={description} />
  </>
);

export async function getStaticPaths() {
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
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() }
    }))
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;
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
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId)
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description
      }
    }
  };
}

export default MeetupDetails;
