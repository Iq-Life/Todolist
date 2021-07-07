


const InitialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = InitialState, action: ActionType) => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export const setErrorAC = (error: string | null) => {
    return {type: 'APP/SET-ERROR', error} as const
}
export const setStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}

//type
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetErrorActionType = ReturnType<typeof setErrorAC>;
export type setStatusActionType = ReturnType<typeof setStatusAC>;
export type SetErrorOrStatusType = SetErrorActionType | setStatusActionType
type ActionType = SetErrorOrStatusType
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}
