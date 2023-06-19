import { FormDataInterface } from '../pages/Authentication/SignupPage';

// Can I import this from the server folders?
import { UserModel } from './../../../server/models/user';

let root = 'http://localhost:3333/';

export const postUser = async (data: FormDataInterface) => {
  const response = await fetch(root + 'signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(data),
  });
  return response.json();
};

export function getUserById(id: number | string) {
  console.log('helo');
  
  return fetch(root + 'profile/' + id, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'cors',
  }).then((response) => {
    if (!response.ok) {
      throw new Error('User not found');
    }
    console.log(response);
    
    return response.json();
  });
}

export function getUsersByIds(ids: number[]) {
  const promises = ids.map((id) => {
    return fetch(root + 'profile/' + id, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      mode: 'cors',
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`User with ID ${id} not found`);
      }
      return response.json();
    });
  });

  return Promise.all(promises);
}

export function login(user: { email: string; password: string }) {
  return fetch(root + `login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }).then((res) => {
    console.log(res);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.statusText);
    }
  });
}

export function logout() {
  return fetch(root + `logout`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => {
    console.log(res);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.statusText);
    }
  });
}

export function updateUser(id: number, info: FormDataInterface | UserModel) {
  return fetch(root + 'profile/edit/' + id, {
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
