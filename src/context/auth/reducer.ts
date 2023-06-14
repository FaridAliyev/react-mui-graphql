import produce, { Draft } from 'immer';
import jwtDecode from 'jwt-decode';
import { Reducer } from 'react';

export const USER_KEY = '@auth/user';
export const ACCESS_TOKEN_KEY = '@auth/accessToken';

// #region State

export type AuthUserProps =
    | {
          email: string;
          roles: string[];
          firstName: string;
          lastName: string;
          fullName: string;
          shortName: string;
          id: string;
          userCode: string;
          avatar: { url: string } | null;
          phoneNumber: number;
          code: string;
      }
    | undefined;

export type AuthState = {
    user: AuthUserProps;
    isLoggedIn: boolean;
};

export const INITIAL_AUTH_STATE: AuthState = {
    user: undefined,
    isLoggedIn: true,
};
// #endregion

// #region Sync Actions
type AuthLoadedAction = { type: 'AUTH_LOADED' };
type LoggedInAction = { type: 'LOGGED_IN'; accessToken: string };
type LoggedOutAction = { type: 'LOGGED_OUT' };

export type AuthAction = AuthLoadedAction | LoggedInAction | LoggedOutAction;

const authLoaded = (draft: Draft<AuthState>) => {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
        draft.user = JSON.parse(user);
        draft.isLoggedIn = true;
    } else {
        draft.isLoggedIn = false;
    }
};

const loggedIn = (draft: Draft<AuthState>, accessToken) => {
    const user = jwtDecode(accessToken);
    const shortName = user && user?.firstName.split('')[0].toUpperCase() + user?.lastName.split('')[0].toUpperCase();
    const fullName = user?.firstName + user?.lastName;
    const normalizedUser: AuthUserProps = {
        firstName: user.firstName,
        lastName: user.lastName,
        fullName,
        shortName,
        email: user.email,
        roles: user.roles,
        id: user.id,
        avatar: user.avatar,
        userCode: user.customer?.code,
        phoneNumber: user?.phoneNumber,
        code: user?.code,
    };
    draft.user = normalizedUser;
    draft.isLoggedIn = true;
    localStorage.setItem(USER_KEY, JSON.stringify(normalizedUser));
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

const logIn = (draft: Draft<AuthState>, action: LoggedInAction) => {
    loggedIn(draft, action.accessToken);
};

const logOut = (draft: Draft<AuthState>) => {
    draft.user = undefined;
    draft.isLoggedIn = false;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};

export const reducer: Reducer<AuthState, AuthAction> = produce((draft: Draft<AuthState>, action: AuthAction): void => {
    switch (action.type) {
        case 'AUTH_LOADED':
            authLoaded(draft);
            break;
        case 'LOGGED_IN':
            logIn(draft, action);
            break;
        case 'LOGGED_OUT':
            logOut(draft);
            break;
        default:
            break;
    }
});
