import React, { useContext } from "react";
import { motion, easeInOut } from "framer-motion";
import AuthContext from "../context/AuthProvider";
import { Typography } from "@material-tailwind/react";

export default function Profile() {
    const { auth } = useContext(AuthContext);
    return (
        <div className="flex flex-col absolute">
            <section className="w-[100vw] h-[100vh] items-center flex flex-col justify-center gap-y-7 md:gap-y-20 md:snap-center">
                <motion.div
                    initial={{ opacity: 0, x: '-10px', y: -10 }}
                    whileInView={{ opacity: 1, x: '0px', y: 0 }}
                    transition={{ ease: easeInOut, duration: 0.8 }}
                >
                    <Typography variant="h1" className="text-myRed3">Hi, {auth.username}</Typography>
                </motion.div>
            </section>
            <motion.div
                className='spacer layer0 relative md:bottom-[120px] bottom-[90px]'
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 5 }}
                whileHover={{ scale: 1.03 }}
                transition={{ ease: easeInOut, duration: 0.9 }}
            />
        </div>
    );
}