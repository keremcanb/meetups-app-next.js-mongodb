import { useRouter } from 'next/router';
import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

const MeetupItem = ({ id, image, title, address }) => {
  const router = useRouter();

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <address>{address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={() => router.push('/' + id)}>Show Details</button>
        </div>
      </Card>
    </li>
  );
};

export default MeetupItem;
