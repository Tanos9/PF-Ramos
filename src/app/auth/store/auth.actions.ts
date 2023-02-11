import { createAction, createSelector, props } from "@ngrx/store";
import { AppState } from "src/app/core/models/app-state.model";
import { User } from "src/app/models/user.model";

export const setAuthenticatedUser = createAction(
    '[AUTH] SET USER',
    props<{ authenticatedUser: User }>()
);

export const unsetAuthenticatedUser = createAction('[AUTH] UNSET USER');
export const updateAuthenticatedUser = createAction(
    '[AUTH] UPDATE USER',
    props<{ first_name: string; last_name: string }>()
)

export const authStateSelector = (appState: AppState) => appState.auth;
export const authenticatedUserSelector = createSelector(
    authStateSelector,
    (authState) => authState.authenticatedUser
);