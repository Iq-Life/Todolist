import React from 'react'
import {
    Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField,
    Button, Grid
} from '@material-ui/core'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux';
import { loginTC } from './login-reducer';


export const Login = () => {
    const dispatch = useDispatch()
    const formik = useFormik({

        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            debugger
            dispatch(loginTC(values))
        },
        validate: values => {
            if (!values.email) {
                return { email: 'Email is required' }
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                return { email: 'Invalid email address' }
            }
            if (!values.password) {
                return { password: 'Password is required' }
            }
        }
    })



    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                                target={'_blank'}>here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            {...formik.getFieldProps("email")}
                            label="Email"
                            margin="normal"
                        />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField
                            {...formik.getFieldProps("password")}
                            type="password"
                            label="Password"
                            margin="normal"
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<
                                Checkbox
                                {...formik.getFieldProps("rememberMe")}
                                checked={formik.values.rememberMe}
                            />}
                        />
                        <Button type={'submit'} variant={'contained'}
                            color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}