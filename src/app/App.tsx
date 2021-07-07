import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import { TodolistsList } from '../features/todolists/TodolistsList';
import { ErrorSnackbar } from '../components/errorSnackbar/ErrorSnackbar';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './store';
import { RequestStatusType } from './app-reducer';


function App({demo = false}: PropsType) {
const status = useSelector<AppRootStateType, RequestStatusType>(state=>state.app.status)
    return (
        <div>
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu></Menu>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    );
}

export default App;

//type
type PropsType = { demo?: boolean }