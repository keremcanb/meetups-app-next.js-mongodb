import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

const MeetupList = ({ meetups }) => (
  <ul className={classes.list}>
    {meetups.map((meetup) => (
      <MeetupItem key={meetup.id} {...meetup} />
    ))}
  </ul>
);

export default MeetupList;
