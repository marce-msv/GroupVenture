import { ActivityInterface } from '../pages/AddActivityPage/AddActivityPage';

let root = 'http://localhost:3333/';

// USER ACTIVITY TO DO USER ID !
export const postActivity = async (data: ActivityInterface, user: number) => {
  // const withId = Object.assign({ createdBy: user }, data);
  const withId = {...data, createdBy: user}

  // console.log(user);
  // console.log(withId)

  const response = await fetch(root + 'addactivity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(withId),
  });
  return response.json();
};

export function getActivities() {
  return fetch(root + 'activities/')
    .then((res) => {
      // console.log(res);
      return res.json();
    })
    .then((res) => {
      // console.log('response in service: ', res);
      return res;
    })
    .catch((error) => {
      throw new Error('Activity not found', error);
    });
}

export function getActivityById(id: string) {
  return fetch(root + 'activity/' + id)
    .then((res) => res.json())
    .then((res: ActivityInterface) => res)
    .catch((error) => {
      throw new Error('Activity not found', error);
    });
}

export function deleteActivityByID(id: string) {
  return fetch(root + 'delete/' + id, {
    method: 'DELETE',
  });
}

export function updateActivity(id: string, info: ActivityInterface) {
  return fetch(root + 'editactivity/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, info }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.statusText);
    }
  });
}
