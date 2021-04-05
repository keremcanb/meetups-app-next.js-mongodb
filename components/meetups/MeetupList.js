import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

const MeetupList = ({ meetups }) => (
  <ul className={classes.list}>
    {meetups.map(({ id, image, title, address }) => (
      <MeetupItem key={id} id={id} image={image} title={title} address={address} />
    ))}
  </ul>
);

export default MeetupList;
