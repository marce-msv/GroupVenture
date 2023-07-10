import { useEffect, useState } from 'react';
import { getActivities } from '../../Services/serviceActivity';
import './CreatedActivities.css';
import { ActivityInterface } from '../../pages/AddActivityPage/AddActivityPage';
import { useUID } from '../../customHooks';
import { useParams } from 'react-router-dom';

const CreatedActivities = () => {
  const [createdActivities, setCreatedActivities] = useState<
    ActivityInterface[]
  >([]);

  const uid = useUID();
  const { id } = useParams();

  useEffect(() => {
    const fetchActivities = async () => {
      if (id) {
        try {
          const activities = await getActivities();
          const filteredActivities = activities.data.filter(
            (activity: ActivityInterface) => {
              return activity.createdBy === +id;
            }
          );
          setCreatedActivities(filteredActivities);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchActivities();
  }, [uid]);

  return (
    <>
      {createdActivities.length > 0 && (
        <>
          <div className='created-activities-title'> Created activities:</div>
          <div className='createdActv'>
            <div className='activity-list'>
              {createdActivities.map((activity, index) => (
                <ul key={activity.id}>
                  <li>
                    {activity.title}
                    {index !== createdActivities.length - 1}
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default CreatedActivities;
