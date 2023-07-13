import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
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
    Input
} from '@material-tailwind/react';

const Nav = () => {
    const [openNav, setOpenNav] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);

    useEffect(() => {
        window.addEventListener('resize', () => { window.innerWidth >= 960 && setOpenNav(false) });
    }, []);

    const handleOpenLogin = () => { setOpenLogin(!openLogin) };
    const handleOpenRegister = () => { setOpenRegister(!openRegister) };

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal text-md transition-colors hover:text-blue-500 focus:text-blue-500"
            >
                <a href="/" className="flex items-center">
                    Home
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal text-md transition-colors hover:text-blue-500 focus:text-blue-500"
            >
                <a href="#" className="flex items-center">
                    Gallery
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal text-md transition-colors hover:text-blue-500 focus:text-blue-500"
            >
                <a href="#" className="flex items-center">
                    Search
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal text-md transition-colors hover:text-blue-500 focus:text-blue-500"
            >
                <a href="#" className="flex items-center">
                    About
                </a>
            </Typography>
        </ul>
    );
    return (
        <React.Fragment>
            <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="#"
                        className="mr-4 cursor-pointer py-1.5 font-medium text-xl"
                    >
                        DesktopDigs
                    </Typography>
                    <div className="m-auto hidden lg:block">{navList}</div>
                    <div className="flex items-center gap-4">
                        <ButtonGroup
                            variant="text"
                            size="md"
                            className="m-auto hidden lg:inline-block"
                            ripple={false}
                        >
                            <Button onClick={handleOpenLogin} className="rounded-l-md">
                                <span>Login</span>
                            </Button>
                            <Dialog
                                open={openLogin}
                                handler={handleOpenLogin}
                                size="xs"
                                className="bg-transparent shadow-none"
                            >
                                <Card className="mx-auto w-full max-w-[24rem]">
                                    <CardBody className="flex flex-col gap-4">
                                        <div className="flex flex-row w-full justify-between">
                                            <Typography variant='h3'>Login</Typography>
                                            <button onClick={handleOpenLogin}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                        <Input variant='standard' label='Email' size="lg" required={true} />
                                        <Input variant='standard' type='password' label='Password' size="lg" required={true} />
                                    </CardBody>
                                    <CardFooter className="pt-0">
                                        <Button
                                            variant="gradient"
                                            onClick={handleOpenLogin}
                                            fullWidth={true}
                                            className="mb-4"
                                        >
                                            Login
                                        </Button>
                                        <Typography>
                                            Don&apos;t have an account? {" "}
                                            <a
                                                onClick={() => { handleOpenLogin(); handleOpenRegister(); }}
                                                className='font-medium text-blue-500 transition-colors hover:text-blue-700 cursor-pointer'
                                            >
                                                Register
                                            </a>
                                        </Typography>
                                    </CardFooter>
                                </Card>
                            </Dialog>
                            <Button onClick={handleOpenRegister} className="rounded-r-md">
                                <span>Register</span>
                            </Button>
                            <Dialog
                                open={openRegister}
                                handler={handleOpenRegister}
                                size="xs"
                                className="bg-transparent shadow-none"
                            >
                                <Card className="mx-auto w-full max-w-[24rem]">
                                    <CardBody className="flex flex-col gap-4">
                                        <div className="flex flex-row w-full justify-between">
                                            <Typography variant='h3'>Register</Typography>
                                            <button onClick={handleOpenRegister}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                        <Input variant='standard' label='Username' size="lg" required={true} />
                                        <Input variant='standard' label='Email' size="lg" required={true} />
                                        <Input variant='standard' type='password' label='Password' size="lg" required={true} />
                                    </CardBody>
                                    <CardFooter className="pt-0">
                                        <Button
                                            variant="filled"
                                            onClick={handleOpenRegister}
                                            fullWidth={true}
                                            className="mb-4"
                                            ripple={false}
                                        >
                                            Register
                                        </Button>
                                        <Typography>
                                            Already have an account? {" "}
                                            <span
                                                onClick={() => { handleOpenRegister(); handleOpenLogin(); }} className='font-medium text-blue-500 transition-colors hover:text-blue-700 cursor-pointer'
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
                </div>
                <Collapse open={openNav}>
                    {navList}
                    <Button variant="text" size="sm" fullWidth className="mb-2" ripple={false}>
                        <span>Sign In</span>
                    </Button>
                    <Button variant="text" size="sm" fullWidth className="mb-2" ripple={false}>
                        <span>Register</span>
                    </Button>
                </Collapse>
            </Navbar>
        </React.Fragment>
    );
};

export default Nav;