import React, { useContext, useEffect } from "react";
import axios from '@/api/axios.js';
import AuthContext from "../context/AuthProvider";
import PropTypes from 'prop-types';
import {
    Typography,
    Button,
    Dialog,
    CardBody,
    CardFooter,
    Card,
    Input,
    Alert,
} from '@material-tailwind/react';

LoginDialog.propTypes = {
    loginDialog: PropTypes.bool,
    handleLoginDialog: PropTypes.func,
    handleRegisterDialog: PropTypes.func,
};

const LOGIN_URL = '/api/user/login';

export default function LoginDialog(props) {
    const {
        setAuth,
        email,
        setEmail,
        pwd,
        setPwd,
        setAuthSuccess,
        errMsg,
        setErrMsg,
    } = useContext(AuthContext);

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd]);

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(LOGIN_URL,
                JSON.stringify(
                    {
                        email: email,
                        password: pwd
                    }
                ),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const token = res?.data?.token;
            const admin = res?.data?.admin;
            const username = res?.data?.username
            const name = res?.data?.name

            localStorage.setItem('jwt', token);

            setAuth({ name, email, username, admin, token });
            setEmail('');
            setPwd('');
            setAuthSuccess(true);
            props.handleLoginDialog();
        } catch (error) {
            if (!error?.response) {
                setErrMsg("No Server Response");
            } else if (error.response?.status === 404) {
                setErrMsg('User Not Found');
            } else if (error.response?.status === 401) {
                setErrMsg('Invalid Credentials');
            } else {
                setErrMsg("Login Failed");
            }
        }
    };

    return (
        <React.Fragment>
            <Dialog
                open={Boolean(props.loginDialog)}
                handler={props.handleLoginDialog}
                size="xs"
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem] bg-myBlack/50 shadow-inner">
                    <CardBody className="flex flex-col gap-4 text-mywhite">
                        <div className="flex flex-row w-full justify-between">
                            <Typography variant='h3'>Login</Typography>
                            <button onClick={props.handleLoginDialog}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <Input
                            variant='standard'
                            type="text"
                            label='Email'
                            size="lg"
                            color="white"
                            autoComplete="off"
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            variant='standard'
                            type='password'
                            label='Password'
                            size="lg"
                            color="white"
                            required={true}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button
                            variant="gradient"
                            onClick={handleLogin}
                            fullWidth={true}
                            color="white"
                            className="mb-4"
                        >
                            Login
                        </Button>
                        {
                            errMsg &&
                            <Alert
                                className="bg-myRed3"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                                }
                            >
                                {errMsg}
                            </Alert>
                        }
                        <Typography className='mt-4 text-mywhite/80'>
                            Don&apos;t have an account? {" "}
                            <a
                                onClick={() => { props.handleLoginDialog(); props.handleRegisterDialog(); }}
                                className='font-medium text-myRed3 transition-colors hover:text-myRed3/70 cursor-pointer'
                            >
                                Register
                            </a>
                        </Typography>
                    </CardFooter>
                </Card>
            </Dialog>
        </React.Fragment >
    );
}