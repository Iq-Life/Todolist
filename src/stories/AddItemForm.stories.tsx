import React from "react";
import {AddItemForm} from "../AddItemForm";
import { action } from "@storybook/addon-actions";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator.stories";
import '@storybook/addon-console';
export default {
    title: "AddItemForm Component",
    component: AddItemForm,
    decorators: [ReduxStoreProviderDecorator],
    argTypes: { addItem: { callback: "Button 'add' was pressed inside the from" } }
}

const callback = action("Button 'add' was pressed inside the from")

export const AddItemFormBaseExample = (props:any) => {
    return <AddItemForm addItem={callback}/>
}