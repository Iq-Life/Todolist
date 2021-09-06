import React from 'react';
import './App.css';
import { AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography } from "@material-ui/core";
import { Menu} from "@material-ui/icons";
import CircularProgress from '@material-ui/core/CircularProgress';
import { TodolistsList } from '../features/todolists/TodolistsList';
import { ErrorSnackbar } from '../components/errorSnackbar/ErrorSnackbar';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './store';
import { initializeAppTC, RequestStatusType } from './app-reducer';
import { Login } from '../features/login/Login';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


function App({ demo = false }: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div 
        style={{position: 'fixed', top: '40%', width: '100%', textAlign: 'center'}}>
            <CircularProgress />
            </div>
    }

    const loginClick = () => {
        return <Redirect to={"/login"} />
    }
    return (
        <BrowserRouter>
            <div>
                <ErrorSnackbar />
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu></Menu>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        <Button color="inherit" onClick={loginClick}>Login</Button>
                    </Toolbar>
                    {status === 'loading' && <LinearProgress />}
                </AppBar>
                <Container fixed>
                    <Route exact path={"/"} render={() => <TodolistsList demo={demo} />} />
                    <Route path={"/login"} render={() => <Login />} />
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;

//type
type PropsType = { demo?: boolean}