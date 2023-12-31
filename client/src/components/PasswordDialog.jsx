import {
    Alert,
    Button,
    Card,
    CardBody,
    CardFooter,
    Dialog,
    Input,
    Typography,
} from '@material-tailwind/react';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from "react";
import axios from "../../axios.js";
import AuthContext from "../context/AuthProvider";
import PostChange from "./PostChange";

PasswordDialog.propTypes = {
    passwordDialog: PropTypes.bool,
    handlePasswordDialog: PropTypes.func,
    handleLogout: PropTypes.func,
};

const PASSWORD_URL = '/api/user/change-password';

export default function PasswordDialog(props) {
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [checkNewPass, setCheckNewPass] = useState(false);
    const [checkPass, setCheckPass] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const { auth, passSuccess, setPassSuccess } = useContext(AuthContext);

    useEffect(() => {
        if (oldPass !== "" || newPass !== "" || confirmPass !== "") {
            newPass === confirmPass ? setCheckNewPass(true) : setCheckNewPass(false);
            oldPass === newPass ? setCheckPass(true) : setCheckPass(false);
        }
        setErrMsg('')
    }, [oldPass, newPass, confirmPass]);

    useEffect(() => {
        checkPass ? setErrMsg("Current Password and New Password are identical") : setErrMsg("")
    }, [checkPass]);

    const handlePassChange = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(PASSWORD_URL,
                JSON.stringify(
                    {
                        email: auth.email,
                        oldPass: oldPass,
                        newPass: newPass,
                    }
                ),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            if (res) null;
            setPassSuccess(true);
        } catch (error) {
            if (!error?.response) {
                setErrMsg("No Server Response");
            } else if (error.response?.status === 401) {
                setErrMsg(error.response?.data?.message);
            } else if (error.response?.status === 404) {
                setErrMsg("User not found");
            } else {
                setErrMsg("Password Change Failed");
            }
        }
    };

    return (
        <React.Fragment>
            <Dialog
                open={Boolean(props.passwordDialog)}
                handler={props.handlePasswordDialog}
                size="xs"
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem] bg-myBlack/50 shadow-inner">
                    <CardBody className="flex flex-col gap-4 text-mywhite">
                        <div className="flex flex-row w-full justify-between">
                            <Typography variant='h3' className="tracking-wide">Change Password</Typography>
                            <button onClick={props.handlePasswordDialog}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <Input
                            variant='standard'
                            type="password"
                            label='Current Password'
                            size="lg"
                            autoComplete="off"
                            color="white"
                            className="text-mywhite"
                            onChange={e => setOldPass(e.target.value)}
                            required={true}
                        />
                        <Input
                            variant='standard'
                            type="password"
                            label='New Password'
                            size="lg"
                            color="white"
                            className="text-mywhite"
                            autoComplete="off"
                            onChange={e => setNewPass(e.target.value)}
                            required={true}
                        />
                        <Input
                            variant='standard'
                            type='password'
                            label='Confirm Password'
                            size="lg"
                            color="white"
                            className="text-mywhite"
                            autoComplete="off"
                            onChange={e => setConfirmPass(e.target.value)}
                            required={true}
                        />
                    </CardBody>
                    <CardFooter>
                        <Button
                            disabled={((newPass === oldPass) ? true : !checkNewPass ? true : false)}
                            variant="gradient"
                            onClick={handlePassChange}
                            fullWidth={true}
                            color="white"
                            className="mb-4"
                        >
                            Submit
                        </Button>
                        {
                            !checkNewPass && newPass && confirmPass && !checkPass &&
                            <Alert
                                className="bg-yellow-800 mb-2"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                                }
                            >
                                <Typography
                                    variant="paragraph"
                                    className="text-sm tracking-wide"
                                >
                                    Password and Confirm Password don&apos;t match
                                </Typography>
                            </Alert>
                        }
                        {
                            passSuccess &&
                            <Alert
                                className="bg-green-600"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                                }
                            >
                                <Typography
                                    variant="paragraph"
                                    className="text-sm tracking-wide"
                                >
                                    Password Reset successfull
                                </Typography>
                                <PostChange
                                    handlePasswordDialog={props.handlePasswordDialog}
                                    handleLogout={props.handleLogout}
                                />
                            </Alert>
                        }
                        {
                            errMsg &&
                            <Alert
                                className="bg-myRed3 tracking-wide"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                                }
                            >
                                {errMsg}
                            </Alert>
                        }
                    </CardFooter>
                </Card>
            </Dialog>
        </React.Fragment>
    );
}