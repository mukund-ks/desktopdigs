import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import axios from '@/api/axios.js';
import AuthContext from "../context/AuthProvider";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    ButtonGroup,
} from '@material-tailwind/react';
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";

const Nav = () => {
    const [openNav, setOpenNav] = useState(false);
    const [loginDialog, setLoginDialog] = useState(false);
    const [registerDialog, setRegisterDialog] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [authSuccess, setAuthSuccess] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [currUser, setCurrUser] = useState('');
    const [admin, setAdmin] = useState(false);
    const { setAuth } = useContext(AuthContext);

    const LOGIN_URL = '/api/user/login';
    const REGISTER_URL = '/api/user/register';
    const JWT_URL = '/api/user/jwtinfo';

    useEffect(() => {
        window.addEventListener('resize', () => { window.innerWidth >= 960 && setOpenNav(false) });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (!token) {
            axios.defaults.headers.common.Authorization = null;
        } else {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;

            (async function getTokenInfo() {
                try {
                    const res = await axios.get(JWT_URL, { headers: { 'Content-Type': 'application/json' } });
                    const userID = res?.data?.User?._id;

                    try {
                        const res2 = await axios.get(`/api/user/${userID}`, { headers: { 'Content-Type': 'application/json' } });
                        setCurrUser(() => res2?.data?.username);
                        setAdmin(() => res2?.data?.admin);
                        setAuthSuccess(true);
                    } finally {
                        null;
                    }
                } catch (err) {
                    if (!err?.response) {
                        alert("No Server Response");
                    } else if (err.response?.status === 401) {
                        alert("Invalid Token. Login Again.");
                    } else if (err.response?.status === 403) {
                        alert("Unauthorized");
                    } else if (err.response?.status === 404) {
                        alert("User Not Found");
                    } else {
                        alert("Internal Server Error. Try Again Later.");
                    }
                    localStorage.clear();
                }
            })();

        }
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd]);

    const handleLoginDialog = () => {
        setLoginDialog((cur) => !cur);
        setErrMsg('')
    };
    const handleRegisterDialog = () => {
        setRegisterDialog((cur) => !cur);
        setErrMsg('')
    };

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
            setCurrUser(() => username);
            setAdmin(() => admin);

            localStorage.setItem('jwt', token);

            setAuth({ username, admin, token });
            setEmail('');
            setPwd('');
            setAuthSuccess(true);
            setLoginDialog(false);
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

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(REGISTER_URL,
                JSON.stringify(
                    {
                        username: username,
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
            setCurrUser(() => username);
            setAdmin(() => admin);

            localStorage.setItem('jwt', token);

            setAuth({ username, admin, token });
            setEmail('');
            setPwd('');
            setAuthSuccess(true);
            setRegisterDialog(false);
        } catch (error) {
            if (!error?.response) {
                setErrMsg("No Server Response");
            } else if (error.response?.status === 409) {
                setErrMsg('Email or Username already exist');
            } else {
                setErrMsg("Registration Failed");
            }
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        setAuth({});
        setAuthSuccess(false)
        setCurrUser('')
        setAdmin(false);
    };
    console.log(currUser);
    console.log(admin);

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal text-md transition-colors text-mywhite hover:text-myGray focus:text-myGray"
            >
                <Link to='/' className="flex items-center">Home</Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal text-md transition-colors text-mywhite hover:text-myGray focus:text-myGray"
            >
                <Link to='/' className="flex items-center">Gallery</Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal text-md transition-colors text-mywhite hover:text-myGray focus:text-myGray"
            >
                <Link to='/' className="flex items-center">Search</Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal text-md transition-colors text-mywhite hover:text-myGray focus:text-myGray"
            >
                <Link to='/' className="flex items-center">About</Link>
            </Typography>
        </ul>
    );

    return (
        <React.Fragment>
            <Navbar className="bg-myBlack shadow-md border-none sticky inset-0 z-50 h-max max-w-full rounded-none py-2 px-4 mb-4 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-mywhite">
                    <Typography
                        as="a"
                        href="/"
                        className="mr-4 cursor-pointer py-1.5 font-medium text-xl text-mywhite"
                    >
                        DesktopDigs
                    </Typography>
                    <div className="m-auto hidden lg:block">{navList}</div>
                    {
                        !(authSuccess) ? (
                            <div className="flex items-center gap-4 ml-1">
                                <ButtonGroup
                                    variant="text"
                                    size="md"
                                    color="white"
                                    className="m-auto hidden lg:inline-block"
                                    ripple={false}
                                >
                                    {/* login */}
                                    <Button onClick={handleLoginDialog} className="rounded-l-md">
                                        <span>Login</span>
                                    </Button>
                                    <LoginDialog
                                        loginDialog={loginDialog}
                                        handleLoginDialog={handleLoginDialog}
                                        handleRegisterDialog={handleRegisterDialog}
                                        setEmail={setEmail}
                                        setPwd={setPwd}
                                        handleLogin={handleLogin}
                                        errMsg={errMsg}
                                    />
                                    {/* Register */}
                                    <Button onClick={handleRegisterDialog} className="rounded-r-md">
                                        <span>Register</span>
                                    </Button>
                                    <RegisterDialog
                                        registerDialog={registerDialog}
                                        handleLoginDialog={handleLoginDialog}
                                        handleRegisterDialog={handleRegisterDialog}
                                        handleRegister={handleRegister}
                                        setUsername={setUsername}
                                        setEmail={setEmail}
                                        setPwd={setPwd}
                                        errMsg={errMsg}
                                    />
                                </ButtonGroup>
                                <IconButton
                                    variant="text"
                                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                                    ripple={false}
                                    onClick={() => setOpenNav(!openNav)}
                                >
                                    {openNav ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            className="h-6 w-6"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    )}
                                </IconButton>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 ml-0">
                                <ButtonGroup
                                    variant="text"
                                    size="md"
                                    color="white"
                                    className="m-auto hidden lg:inline-block"
                                    ripple={false}
                                >
                                    <Button className="rounded-l-md">Profile</Button>
                                    <Button 
                                        className="rounded-r-md"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                </ButtonGroup>
                                <IconButton
                                    variant="text"
                                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                                    ripple={false}
                                    onClick={() => setOpenNav(!openNav)}
                                >
                                    {openNav ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            className="h-6 w-6"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    )}
                                </IconButton>
                            </div>
                        )}
                </div>
                <Collapse open={openNav}>
                    {navList}
                    {
                        !(authSuccess) ? (
                            <React.Fragment>
                                <Button
                                    variant="text"
                                    size="sm"
                                    fullWidth
                                    className="mb-2"
                                    color="white"
                                    ripple={false}
                                    onClick={handleLoginDialog}
                                >
                                    <span>Sign In</span>
                                </Button>
                                <Button
                                    variant="text"
                                    size="sm"
                                    fullWidth
                                    className="mb-2"
                                    color="white"
                                    ripple={false}
                                    onClick={handleRegisterDialog}
                                >
                                    <span>Register</span>
                                </Button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Button
                                    variant="text"
                                    size="sm"
                                    fullWidth
                                    className="mb-2"
                                    color="white"
                                    ripple={false}
                                >
                                    <span>Profile</span>
                                </Button>
                                <Button
                                    variant="text"
                                    size="sm"
                                    fullWidth
                                    className="mb-2"
                                    ripple={false}
                                    color="white"
                                    onClick={handleLogout}
                                >
                                    <span>Logout</span>
                                </Button>
                            </React.Fragment>
                        )
                    }
                </Collapse>
            </Navbar>
        </React.Fragment>
    );
};

export default Nav;