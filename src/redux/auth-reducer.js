
import { myFirebase } from "../firebase/firebase"
import firebase from 'firebase'

export const LOGIN_REQUEST = "auth-reducer/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "auth-reducer/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "auth-reducer/LOGIN_FAILURE";

export const LOGOUT_REQUEST = "auth-reducer/LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "auth-reducer/LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "auth-reducer/LOGOUT_FAILURE";

export const VERIFY_REQUEST = "auth-reducer/VERIFY_REQUEST";
export const VERIFY_SUCCESS = "auth-reducer/VERIFY_SUCCESS";


const initialState = {
    isLoggingIn: false,
    isLoggingOut: false,
    isVerifying: false,
    loginError: false,
    logoutError: false,
    isAuthenticated: false,
    user: null
}


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                loginError: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: false,
                loginError: true
            }
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoggingOut: true,
                logoutError: false
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggingOut: false,
                isAuthenticated: false,
                user: null
            }
        case LOGOUT_FAILURE:
            return {
                ...state,
                isLoggingOut: false,
                logoutError: true
            }
        case VERIFY_REQUEST:
            return {
                ...state,
                isVerifying: true,
                verifyingError: false
            }
        case VERIFY_SUCCESS:
            return {
                ...state,
                isVerifying: false
            }
        default:
            return state;
    }
}


const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    };
};

const receiveLogin = user => {
    return {
        type: LOGIN_SUCCESS,
        payload: { user }
    };
};

const loginError = () => {
    return {
        type: LOGIN_FAILURE
    };
};

const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

const logoutError = () => {
    return {
        type: LOGOUT_FAILURE
    };
};

const verifyRequest = () => {
    return {
        type: VERIFY_REQUEST
    };
};

const verifySuccess = () => {
    return {
        type: VERIFY_SUCCESS
    };
};

export const loginWithGoogle = () => dispatch => {
    dispatch(requestLogin())
    console.log(myFirebase)
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('profile')
    provider.addScope('email')

    firebase.auth().signInWithPopup(provider)
        .then(result => {
            dispatch(receiveLogin(result.user))
            console.log(firebase)

        })
        .catch(error => {
            dispatch(loginError())
        });
}

export const logoutUser = () => dispatch => {
    dispatch(requestLogout())
    firebase
        .auth()
        .signOut()
        .then(() => {
            dispatch(receiveLogout())
        })
        .catch(error => {
            dispatch(logoutError())
        });
};

export const verifyAuth = () => dispatch => {
    dispatch(verifyRequest());
    firebase
        .auth()
        .onAuthStateChanged(user => {
            if (user !== null) {
                dispatch(receiveLogin(user));
            }
            dispatch(verifySuccess())
        })
}

export default authReducer