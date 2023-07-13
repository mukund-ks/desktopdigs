import React from 'react';
import { Button, Card, Input, Typography } from '@material-tailwind/react';

const LoginForm = () => {
    <React.Fragment>
        <Card color='transparent' shadow={false}>
            <Typography variant='h4' color='blue-gray'>
                Login
            </Typography>
            <Typography color='gray' className='mt-1 font-normal'>
                Enter your details.
            </Typography>
            <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'>
                <div className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'>
                    <Input size='lg' label='Email' />
                    <Input type='password' size='lg' label='Password' />
                </div>
                <Button className='mt-6' fullWidth={true}>Submit</Button>
                <Typography color='gray' className='mt-4 text-center font-normal'>
                    Not Registered? {" "}
                    <a href='/' className='font-medium text-blue-500 transition-colors hover:text-blue-700'>
                        Register here.
                    </a>
                </Typography>
            </form>
        </Card>
    </React.Fragment>
}

export default LoginForm;