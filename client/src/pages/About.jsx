import React from "react";
import { motion, easeInOut } from "framer-motion";
import { Typography } from "@material-tailwind/react";

export default function About() {
    return (
        <div className="flex flex-col absolute">
            <section className="w-[100vw] h-[100vh] items-center flex flex-col justify-center gap-y-20 md:snap-center">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: '-10px' }}
                        whileInView={{ opacity: 1, y: '0px' }}
                        transition={{ ease: easeInOut, duration: 0.8 }}
                    >
                        <Typography variant="h1" className="text-myRed3">About</Typography>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: '10px' }}
                        whileInView={{ opacity: 1, y: '0px' }}
                        transition={{ ease: easeInOut, duration: 0.8 }}
                    >
                        <Typography variant="lead" className="text-myGray">beyond the shutter.</Typography>
                    </motion.div>
                </div>
                <div className="text-left w-5/6">
                    <motion.div
                        className="mb-2"
                        initial={{ opacity: 0, x: '10px' }}
                        whileInView={{ opacity: 1, x: '0px' }}
                        transition={{ ease: easeInOut, duration: 0.8 }}
                    >
                        <Typography
                            variant="paragraph"
                            className="text-mywhite tracking-wide"
                        >
                            Welcome to DesktopDigs! I&apos;m Mukund Kumar, the creator and driving force behind this project.
                        </Typography>
                    </motion.div>
                    <motion.div
                        className="mb-2"
                        initial={{ opacity: 0, x: '10px' }}
                        whileInView={{ opacity: 1, x: '0px' }}
                        transition={{ ease: easeInOut, duration: 0.8 }}
                    >
                        <Typography
                            variant="paragraph"
                            className="text-mywhite tracking-wide"
                        >
                            At its heart, DesktopDigs is a space where my two passions—coding and in-game photography—converge to bring about a unique experience.
                            It&apos;s a platform where I showcase my in-game photography, carefully curated and presented to highlight the beauty that often rushes by in the heat of the game.
                        </Typography>
                    </motion.div>
                    <motion.div
                        className="mb-2"
                        initial={{ opacity: 0, x: '10px' }}
                        whileInView={{ opacity: 1, x: '0px' }}
                        transition={{ ease: easeInOut, duration: 0.8 }}
                    >
                        <Typography
                            variant="paragraph"
                            className="text-mywhite tracking-wide"
                        >
                            Thank you for taking the time to explore my project. Your interest means a lot. If you come across any aspects of the project that you think could be made better, I invite you to consider contributing to the project&apos;s GitHub repository. Your involvement would be greatly valued.
                        </Typography>
                    </motion.div>
                </div>
            </section>
            <motion.div
                className='spacer layer2 relative md:bottom-[120px] bottom-[90px]'
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 5 }}
                whileHover={{ scale: 1.03 }}
                transition={{ ease: easeInOut, duration: 0.9 }}
            />
        </div>
    )
}