import { ActivityInterface } from "../pages/AddActivityPage/AddActivityPage";

let root = "http://localhost:3333/";
export const postActivity = async (data: ActivityInterface) => {
  const userId = localStorage.getItem("userId");
  const withId = Object.assign({createdBy: userId}, data);
  const response = await fetch(root + 'addactivity', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(withId),
  });
  return response.json();
};

export function getActivities() {
  return fetch(root + 'activities/').then((response) => {
    if (!response.ok) {
      throw new Error("Activity not found");
    }
    return response.json();
  });
}
export function getActivityById(id: any) {
  return fetch(root + id).then((response) => {
    if (!response.ok) {
      throw new Error("Activity not found");
    }
    return response.json();
  });
 
}