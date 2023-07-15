import React from "react";
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

RegisterDialog.propTypes = {
    registerDialog: PropTypes.bool,
    handleLoginDialog: PropTypes.func,
    handleRegisterDialog: PropTypes.func,
    setUsername: PropTypes.func,
    setEmail: PropTypes.func,
    setPwd: PropTypes.func,
    handleRegister: PropTypes.func,
    errMsg: PropTypes.string
};

export default function RegisterDialog(props) {
    return (
        <React.Fragment>
            <Dialog
                open={Boolean(props.registerDialog)}
                handler={props.handleRegisterDialog}
                size="xs"
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <div className="flex flex-row w-full justify-between">
                            <Typography variant='h3'>Register</Typography>
                            <button onClick={props.handleRegisterDialog}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <Input
                            variant='standard'
                            type="text"
                            label='Username'
                            size="lg"
                            autoComplete="off"
                            onChange={e => props.setUsername(e.target.value)}
                            required={true}
                        />
                        <Input
                            variant='standard'
                            type="text"
                            label='Email'
                            size="lg"
                            autoComplete="off"
                            onChange={e => props.setEmail(e.target.value)}
                            required={true}
                        />
                        <Input
                            variant='standard'
                            type='password'
                            label='Password'
                            size="lg"
                            autoComplete="off"
                            onChange={e => props.setPwd(e.target.value)}
                            required={true}
                        />
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button
                            variant="filled"
                            onClick={props.handleRegister}
                            fullWidth={true}
                            className="mb-4"
                            ripple={false}
                        >
                            Register
                        </Button>
                        {
                            props.errMsg &&
                            <Alert
                                className="bg-red-500"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                                }
                            >
                                {props.errMsg}
                            </Alert>
                        }
                        <Typography className='mt-4'>
                            Already have an account? {" "}
                            <span
                                onClick={() => { props.handleRegisterDialog(); props.handleLoginDialog(); }} className='font-medium text-blue-500 transition-colors hover:text-blue-700 cursor-pointer'
                            >
                                Login
                            </span>
                        </Typography>
                    </CardFooter>
                </Card>
            </Dialog>
        </React.Fragment>
    );
}