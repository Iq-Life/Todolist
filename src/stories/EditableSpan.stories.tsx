import React from "react";
import { action } from "@storybook/addon-actions";
import {EditableSpan} from "../EditableSpan";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator.stories";
import '@storybook/addon-console';
export default {
    title: "EditableSpan Component",
    component: EditableSpan,
    decorators: [ReduxStoreProviderDecorator]
}

const changeTitleCallback = action("Value changed")

export const EditableSpanBaseExample = () => {
    return <>
<EditableSpan title={"Start value"} changeTitle={changeTitleCallback} />
    </>
}