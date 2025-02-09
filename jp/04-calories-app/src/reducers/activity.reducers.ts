import { Activity } from "../interfaces/activity.interface";

export type ActivityActions = 
  | { type: "save-activity", payload: { newActivity: Activity } }
  | { type: "set-active-id", payload: { id: Activity['id'] } }
  | { type: "delete-activity-by-id", payload: { id: Activity['id'] } }
  | { type: "delete-all-activities" };

export interface ActivityState {
  activities: Activity[];
  activeActivityId: Activity['id'];
}

const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem('activities') ? JSON.parse(localStorage.getItem('activities')!) : [];
  return activities;
}

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeActivityId: '',
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  let updatedActivities: Activity[] = [];
  switch (action.type) {
    case "save-activity":
      if (state.activeActivityId.trim() !== '') {
        updatedActivities = state.activities.map(activity => {
          if (activity.id === state.activeActivityId) {
            return {
              ...activity,
              ...action.payload.newActivity,
            }
          }
          return activity;
        });
      } else {
        updatedActivities = [...state.activities, action.payload.newActivity];
      }
      return {
        ...state,
        activities: updatedActivities,
        activeActivityId: '',
      };
    case 'set-active-id':
      return {
        ...state,
        activeActivityId: action.payload.id,
      };
    case 'delete-activity-by-id':
      return {
        ...state,
        activities: state.activities.filter(activity => activity.id !== action.payload.id),
        activeActivityId: '',
      }
    case 'delete-all-activities':
      return {
        ...state,
        activities: [],
        activeActivityId: '',
      }
    default:
      return state;
  }
};
