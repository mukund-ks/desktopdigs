import React from "react";
import { motion, easeInOut } from "framer-motion";
import { Typography } from "@material-tailwind/react";

export default function About() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                ease: easeInOut,
                duration: 0.8,
                staggerChildren: 0.05,
                delayChildren: 0.03,
            },
        },
    }

    const child = {
        hidden: { opacity: 0, x: -15 },
        show: { opacity: 1, x: 0 },
    }

    const para = "Welcome to DesktopDigs! I'm Mukund Kumar, the creator and driving force behind this project.\n At its heart, DesktopDigs is a space where my two passions, coding and ingame photography converge to bring about a platform for showcasing the clicks, carefully curated and presented to highlight the beauty that often rushes by in the heat of the game.\n Thank you for taking the time to explore my project. Your interest means a lot.\n If you come across any aspects of the project that you think could be made better, I invite you to consider contributing to the project's GitHub repository. Your involvement would be greatly valued."

    return (
        <div className="flex flex-col absolute">
            <section className="w-[100vw] h-[100vh] items-center flex flex-col justify-center gap-y-7 md:gap-y-20 md:snap-center">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: '-10px', x: -5 }}
                        whileInView={{ opacity: 1, y: '0px', x: 0 }}
                        transition={{ ease: easeInOut, duration: 0.8 }}
                    >
                        <Typography variant="h1" className="text-myRed3 drop-shadow-xl tracking-wide">About</Typography>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: '10px', x: 5 }}
                        whileInView={{ opacity: 1, y: '0px', x: 0 }}
                        transition={{ ease: easeInOut, duration: 0.8 }}
                    >
                        <Typography variant="lead" className="text-myGray tracking-wide">beyond the shutter.</Typography>
                    </motion.div>
                </div>
                <div className="text-center w-5/6 break-words leading-loose">
                    <motion.div
                        className="mb-2"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        {
                            para.split(" ").map((word, i) => {
                                return (
                                    <React.Fragment key={i}>
                                        <motion.span
                                            variants={child}
                                            className="text-mywhite tracking-wide mx-[0.2rem]"
                                        >
                                            {word}
                                        </motion.span>
                                    </React.Fragment>
                                )
                            })
                        }
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