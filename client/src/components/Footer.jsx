import React from "react";

import { Typography } from '@material-tailwind/react';

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="fixed bottom-0 z-50 flex w-full flex-row flex-wrap justify-center gap-y-6 gap-x-12 py-6 px-6 mt-6 text-center md:justify-between">
                <div>
                    <Typography color="white" className="font-normal tracking-wide">
                        <span className="flex flex-row text-mywhite">
                            Made with
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-2 fill-mywhite">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </span>
                    </Typography>
                </div>
                <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                    <li>
                        <Typography
                            as="a"
                            href="https://github.com/mukund-ks"
                            target='_blank'
                            className="font-normal tracking-wide transition-colors text-mywhite hover:text-myGray"
                        >
                            Creator
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="https://github.com/mukund-ks/desktopdigs"
                            target='_blank'
                            className="font-normal tracking-wide transition-colors text-mywhite hover:text-myGray"
                        >
                            Github
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="mailto:mukund.28.k@gmail.com"
                            target='_blank'
                            color="blue-gray"
                            className="font-normal tracking-wide transition-colors text-mywhite hover:text-myGray"
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