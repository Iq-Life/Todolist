import React from "react";
import AppWithRedux from "./App";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator.stories";
import '@storybook/addon-console';
import App from "./App";

export default {
    title: "App Component",
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = () => {
    return <App />
}