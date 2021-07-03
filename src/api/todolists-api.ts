import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "api-key": "d9baecdc-1ca4-440c-8d10-aee3256853c8"
    }
}
const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    ...settings
})

//api
export const todolistsAPI = {
    getTodolists() {
        const promise = instance.get <TodolistType[]>(`todo-lists`)
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<CreateDataTodolistType>>(`todo-lists`, {title: title})
        return promise
    },
    deleteTodolist(id: string) {
        const promise = instance.delete<ResponseType<{}>>(`todo-lists/${id}`)
        return promise
    },
    updateTodolist(id: string, title: string) {
        const promise = instance.put<ResponseType<{}>>(`todo-lists/${id}`, {title: title})
        return promise
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask( title: string, todolistId:string){
      return instance.post<ResponseType<{items:TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskId : string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId : string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{items:TaskType}>>
        (`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

//types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TaskType = {
    description: string | null
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
    id: string
    todolistId: string
    order: number
    addedDate: string
}
type ResponseType< D= {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type UpdateTaskModelType = {
    title: string
    description: string | null
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
}
type CreateDataTodolistType = { item: TodolistType }
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}