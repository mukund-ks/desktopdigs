import {
    Button,
    ButtonGroup,
    Collapse,
    IconButton,
    Navbar,
    Typography,
} from '@material-tailwind/react';
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthProvider";
import LoginDialog from "./LoginDialog";
import PasswordDialog from "./PasswordDialog";
import ProfileDialog from "./ProfileDialog";
import RegisterDialog from "./RegisterDialog";

const Nav = () => {
    const [openNav, setOpenNav] = useState(false);
    const [loginDialog, setLoginDialog] = useState(false);
    const [registerDialog, setRegisterDialog] = useState(false);
    const [profileDialog, setProfileDialog] = useState(false);
    const [passwordDialog, setPasswordDialog] = useState(false);
    const {
        setAuth,
        setErrMsg,
        authSuccess,
        setAuthSuccess,
        setUsername,
        // passSuccess
    } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        window.addEventListener('resize', () => { window.innerWidth >= 960 && setOpenNav(false) });
    }, []);

    const handleLoginDialog = () => {
        setLoginDialog((cur) => !cur);
        setErrMsg('');
    };

    const handleRegisterDialog = () => {
        setRegisterDialog((cur) => !cur);
        setErrMsg('');
    };

    const handleProfileDialog = () => {
        setProfileDialog((cur) => !cur);
        // setErrMsg('')
    };

    const handlePasswordDialog = () => {
        setPasswordDialog((cur) => !cur);
    };

    const handleLogout = () => {
        localStorage.clear();
        setAuth({});
        setAuthSuccess(false);
        setUsername("");
        navigate("/");
    };

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal text-md tracking-wide transition-colors text-mywhite hover:text-myGray focus:text-myGray"
            >
                <Link to='/' className="flex items-center">Home</Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal text-md tracking-wide transition-colors text-mywhite hover:text-myGray focus:text-myGray"
            >
                <Link to='/gallery' className="flex items-center">Gallery</Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal text-md tracking-wide transition-colors text-mywhite hover:text-myGray focus:text-myGray"
            >
                <Link to='/search' className="flex items-center">Search</Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal text-md tracking-wide transition-colors text-mywhite hover:text-myGray focus:text-myGray"
            >
                <Link to='/about' className="flex items-center">About</Link>
            </Typography>
        </ul>
    );

    return (
        <React.Fragment>
            <Navbar className="bg-myBlack shadow-md border-none fixed top-0 z-50 h-max max-w-full rounded-none py-2 px-4 mb-4 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-mywhite">
                    <Typography
                        as="a"
                        href="/"
                        className="mr-4 cursor-pointer py-1.5 font-medium text-xl text-mywhite tracking-wide"
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
                                    <Button onClick={handleLoginDialog} className="rounded-l-md tracking-wide">
                                        <span>Login</span>
                                    </Button>
                                    {/* Register */}
                                    <Button onClick={handleRegisterDialog} className="rounded-r-md tracking-wide">
                                        <span>Register</span>
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
                        ) : (
                            <div className="flex items-center gap-4 ml-0">
                                <ButtonGroup
                                    variant="text"
                                    size="md"
                                    color="white"
                                    className="m-auto hidden lg:inline-block"
                                    ripple={false}
                                >
                                    {/* Profile */}
                                    <Button
                                        onClick={handleProfileDialog}
                                        className="rounded-l-md tracking-wide">
                                        <span>Profile</span>
                                    </Button>
                                    {/* Logout */}
                                    <Button
                                        className="rounded-r-md tracking-wide"
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
                                    className="mb-2 tracking-wide"
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
                                    className="mb-2 tracking-wide"
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
                                    className="mb-2 tracking-wide"
                                    color="white"
                                    ripple={false}
                                    onClick={handleProfileDialog}
                                >
                                    {/* <Link to='/profile'>Profile</Link> */}
                                    <span>Profile</span>
                                </Button>
                                <Button
                                    variant="text"
                                    size="sm"
                                    fullWidth
                                    className="mb-2 tracking-wide"
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
            {/* Dialogs */}
            <LoginDialog
                loginDialog={loginDialog}
                handleLoginDialog={handleLoginDialog}
                handleRegisterDialog={handleRegisterDialog}
            />
            <RegisterDialog
                registerDialog={registerDialog}
                handleLoginDialog={handleLoginDialog}
                handleRegisterDialog={handleRegisterDialog}
            />
            {
                authSuccess ? (
                    <React.Fragment>
                        <ProfileDialog
                            profileDialog={profileDialog}
                            handleProfileDialog={handleProfileDialog}
                            handlePasswordDialog={handlePasswordDialog}
                        />
                        <PasswordDialog
                            passwordDialog={passwordDialog}
                            handlePasswordDialog={handlePasswordDialog}
                            handleLogout={handleLogout}
                        />
                    </React.Fragment>
                ) : null
            }
        </React.Fragment>
    );
};

export default Nav;