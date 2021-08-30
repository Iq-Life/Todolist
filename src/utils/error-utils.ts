import { setErrorAC, SetErrorOrStatusType, setStatusAC } from "../app/app-reducer"
import { ResponseType } from "../api/todolists-api"
import { Dispatch } from "redux"


export const handleServerAppError = <D>(data :ResponseType<D>, dispatch: Dispatch<SetErrorOrStatusType>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string },dispatch: Dispatch<SetErrorOrStatusType>) => {
    dispatch(setErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setStatusAC('failed'))
}