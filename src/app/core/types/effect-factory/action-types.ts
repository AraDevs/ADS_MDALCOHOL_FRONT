import { ActionCreator } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { ErrorActionData } from '@shared/types';

export type PlainActionCreator = ActionCreator<string, () => TypedAction<string>>;
export type DataActionCreator = ActionCreator<
  string,
  (props: { payload: any }) => { payload: any } & TypedAction<string>
>;

export type ErrorActionCreator = ActionCreator<
  string,
  (props: { payload: ErrorActionData }) => { payload: ErrorActionData } & TypedAction<string>
>;

export type LoadingAction = PlainActionCreator | DataActionCreator | ErrorActionCreator;
