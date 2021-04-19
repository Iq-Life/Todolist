import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";
import {store} from "../state/store";
import {Provider} from "react-redux";

export default {
    title: "Task Component",
    component: Task
}

const callback = action("Button 'add' was pressed inside the from")

export const TaskBaseExample = () => {
    return<Provider store={store}>
        <Task task={{id: "1", title: "task№1", isDone: true}} todolistId={"todolistId1"}/>
        <Task task={{id: "1", title: "task№2", isDone: true}} todolistId={"todolistId2"}/>
    </Provider>

}