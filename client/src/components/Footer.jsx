import React from "react";

import { Typography } from '@material-tailwind/react';

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="flex w-full flex-row flex-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 px-6 text-center md:justify-between">
                <Typography color="blue-gray" className="font-normal">
                    <span className="flex flex-row">
                    Made with <img src='/heart.png' alt='Heart' className="mx-1"/>
                    </span>
                </Typography>
                <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                    <li>
                        <Typography
                            as="a"
                            href="/"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            Creator
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="/"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            Github
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            Contribute
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            Contact
                        </Typography>
                    </li>
                </ul>
            </footer>
        </React.Fragment>
    );
};

export default Footer;