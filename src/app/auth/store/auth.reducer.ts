import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/models/user.model";
import { setAuthenticatedUser, unsetAuthenticatedUser, updateAuthenticatedUser } from "./auth.actions";

export const authFeatureKey = 'auth'

export interface AuthState {
    authenticatedUser: User | null;
}

const initialState: AuthState = {
    authenticatedUser: null,
};

export const authReducer = createReducer(
    initialState,
    on(setAuthenticatedUser, (oldState, payload) => {
        return {
            ...oldState,
            authenticatedUser: payload.authenticatedUser
        }
    }),
    on(unsetAuthenticatedUser, () => {
        localStorage.removeItem('token');
        return initialState;
      }),
    on(updateAuthenticatedUser, (oldState, payload) => {
        if (!oldState.authenticatedUser) return oldState;
        return {
            ...oldState,
            authenticatedUser: new User(
                oldState.authenticatedUser.id,
                oldState.authenticatedUser.email,
                payload.first_name || oldState.authenticatedUser.firstName,
                payload.last_name || oldState.authenticatedUser.lastName,
                oldState.authenticatedUser.isAdmin,
                oldState.authenticatedUser.password
            )
        }
    })
);
