import { Dispatch } from "redux";
import { authAPI, loginParamsType } from "../../api/todolists-api";
import { SetErrorOrStatusType, setStatusAC } from "../../app/app-reducer";
import {handleServerAppError,handleServerNetworkError,} from "../../utils/error-utils";

const initialState: initialStateType = {
    isLoggedIn: false,
};

export const authReducer = (state: initialStateType = initialState,action: ActionsType): initialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGEDIN":
            return { ...state, isLoggedIn: action.value };
        default:
            return state;
    }
};

//actions
export const setIsLoggedInAC = (value: boolean) => {
    return { type: "login/SET-IS-LOGGEDIN", value } as const;
};

//thuks
export const loginTC = (data: loginParamsType) => {
    debugger
    return (dispatch: Dispatch<ThunkDispatchType>) => {
        dispatch(setStatusAC("loading"));
        authAPI.authorizing(data).then((res) => {
            debugger
                if (res.data.resultCode === 0) {
                    /* dispatch(setIsLoggedInAC(true)); */
                    alert("yo!")
                    dispatch(setStatusAC("succeeded"));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            });
    };
};
//types
type ThunkDispatchType = ActionsType | SetErrorOrStatusType;
type ActionsType = ReturnType<typeof setIsLoggedInAC>;
type initialStateType = { isLoggedIn: boolean };
