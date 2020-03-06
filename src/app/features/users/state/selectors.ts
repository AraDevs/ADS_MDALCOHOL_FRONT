import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState, FEATURE_KEY } from './reducer';
import { AppState } from '@state/app-state';


export const usersFeature = createFeatureSelector<AppState, UsersState>(FEATURE_KEY);
export const selectUsers = createSelector(usersFeature, users => users.users);
export const selectUser = createSelector(usersFeature, users => users.user);
