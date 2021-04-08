import Head from 'next/head';
import { useRouter } from 'next/router';
import { post } from 'axios';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    try {
      const { data } = await post('/api/new-meetup', enteredMeetupData);
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Add New Meetup</title>
        <meta name='description' content='Add your own meetups' />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetupPage;
