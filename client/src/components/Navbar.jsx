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
    Dialog,
    CardBody,
    CardFooter,
    Card,
    Input,
    Alert,
} from '@material-tailwind/react';

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
                    if (!err?.response){
                        alert("No Server Response");
                    } else if(err.response?.status===401){
                        alert("Invalid Token");
                    } else if(err.response?.status===403){
                        alert("Unauthorized");
                    } else if(err.response?.status===404){
                        alert("User Not Found");
                    } else {
                        alert("Internal Server Error. Try Again Later.");
                    }
                    localStorage.clear();
                }
            })();

        }
        console.log('i fire once');
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
                className="p-1 font-normal text-md transition-colors hover:text-blue-500 focus:text-blue-500"
            >
                <Link to='/' className="flex items-center">Home</Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal text-md transition-colors hover:text-blue-500 focus:text-blue-500"
            >
                <Link to='/' className="flex items-center">Gallery</Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal text-md transition-colors hover:text-blue-500 focus:text-blue-500"
            >
                <Link to='/' className="flex items-center">Search</Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal text-md transition-colors hover:text-blue-500 focus:text-blue-500"
            >
                <Link to='/' className="flex items-center">About</Link>
            </Typography>
        </ul>
    );
    return (
        <React.Fragment>
            <Navbar className="sticky top z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="/"
                        className="mr-4 cursor-pointer py-1.5 font-medium text-xl"
                    >
                        DesktopDigs
                    </Typography>
                    <div className="m-auto hidden lg:block">{navList}</div>
                    {
                        !(authSuccess) ?
                            <div className="flex items-center gap-4">
                                <ButtonGroup
                                    variant="text"
                                    size="md"
                                    className="m-auto hidden lg:inline-block"
                                    ripple={false}
                                >
                                    {/* login */}
                                    <Button onClick={handleLoginDialog} className="rounded-l-md">
                                        <span>Login</span>
                                    </Button>
                                    <Dialog
                                        open={Boolean(loginDialog)}
                                        handler={handleLoginDialog}
                                        size="xs"
                                        className="bg-transparent shadow-none"
                                    >
                                        <Card className="mx-auto w-full max-w-[24rem]">
                                            <CardBody className="flex flex-col gap-4">
                                                <div className="flex flex-row w-full justify-between">
                                                    <Typography variant='h3'>Login</Typography>
                                                    <button onClick={handleLoginDialog}>
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
                                                    autoComplete="off"
                                                    required={true}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <Input
                                                    variant='standard'
                                                    type='password'
                                                    label='Password'
                                                    size="lg"
                                                    required={true}
                                                    onChange={(e) => setPwd(e.target.value)}
                                                />
                                            </CardBody>
                                            <CardFooter className="pt-0">
                                                <Button
                                                    variant="gradient"
                                                    onClick={handleLogin}
                                                    fullWidth={true}
                                                    className="mb-4"
                                                >
                                                    Login
                                                </Button>
                                                {
                                                    errMsg &&
                                                    <Alert
                                                        className="bg-red-500"
                                                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                                        </svg>
                                                        }
                                                    >
                                                        {errMsg}
                                                    </Alert>
                                                }
                                                <Typography className='mt-4'>
                                                    Don&apos;t have an account? {" "}
                                                    <a
                                                        onClick={() => { handleLoginDialog(); handleRegisterDialog(); }}
                                                        className='font-medium text-blue-500 transition-colors hover:text-blue-700 cursor-pointer'
                                                    >
                                                        Register
                                                    </a>
                                                </Typography>
                                            </CardFooter>
                                        </Card>
                                    </Dialog>
                                    {/* Register */}
                                    <Button onClick={handleRegisterDialog} className="rounded-r-md">
                                        <span>Register</span>
                                    </Button>
                                    <Dialog
                                        open={Boolean(registerDialog)}
                                        handler={handleRegisterDialog}
                                        size="xs"
                                        className="bg-transparent shadow-none"
                                    >
                                        <Card className="mx-auto w-full max-w-[24rem]">
                                            <CardBody className="flex flex-col gap-4">
                                                <div className="flex flex-row w-full justify-between">
                                                    <Typography variant='h3'>Register</Typography>
                                                    <button onClick={handleRegisterDialog}>
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
                                                    onChange={e => setUsername(e.target.value)}
                                                    required={true}
                                                />
                                                <Input
                                                    variant='standard'
                                                    type="text"
                                                    label='Email'
                                                    size="lg"
                                                    autoComplete="off"
                                                    onChange={e => setEmail(e.target.value)}
                                                    required={true}
                                                />
                                                <Input
                                                    variant='standard'
                                                    type='password'
                                                    label='Password'
                                                    size="lg"
                                                    autoComplete="off"
                                                    onChange={e => setPwd(e.target.value)}
                                                    required={true}
                                                />
                                            </CardBody>
                                            <CardFooter className="pt-0">
                                                <Button
                                                    variant="filled"
                                                    onClick={handleRegister}
                                                    fullWidth={true}
                                                    className="mb-4"
                                                    ripple={false}
                                                >
                                                    Register
                                                </Button>
                                                {
                                                    errMsg &&
                                                    <Alert
                                                        className="bg-red-500"
                                                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                                        </svg>
                                                        }
                                                    >
                                                        {errMsg}
                                                    </Alert>
                                                }
                                                <Typography className='mt-4'>
                                                    Already have an account? {" "}
                                                    <span
                                                        onClick={() => { handleRegisterDialog(); handleLoginDialog(); }} className='font-medium text-blue-500 transition-colors hover:text-blue-700 cursor-pointer'
                                                    >
                                                        Login
                                                    </span>
                                                </Typography>
                                            </CardFooter>
                                        </Card>
                                    </Dialog>
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
                            :
                            <div className="flex items-center gap-4">
                                <ButtonGroup
                                    variant="text"
                                    size="md"
                                    className="m-auto hidden lg:inline-block"
                                    ripple={false}
                                >
                                    <Button className="rounded-l-md">Profile</Button>
                                    <Button className="rounded-r-md" onClick={handleLogout}>Logout</Button>
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
                    }
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
                                    ripple={false}
                                    onClick={setLoginDialog}
                                >
                                    <span>Sign In</span>
                                </Button>
                                <Button
                                    variant="text"
                                    size="sm"
                                    fullWidth
                                    className="mb-2"
                                    ripple={false}
                                    onClick={setRegisterDialog}
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