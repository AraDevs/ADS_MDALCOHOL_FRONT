import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { UsersState, FEATURE_KEY } from './reducer';
import { AppState } from '@state/app-state';

export const usersFeature = createFeatureSelector<AppState, UsersState>(FEATURE_KEY);
export const selectUsers = createSelector(usersFeature, (users: UsersState) => users.users);
export const selectUser = createSelector(usersFeature, users => users.user);

export const selectUserType = createSelector(usersFeature, (users:UsersState) => users.userType);


