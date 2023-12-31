import { IconButton, Spinner, Typography } from "@material-tailwind/react";
import { easeInOut, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import axios from "../../axios.js";
import Images from "../components/ImageResult";
import './GalleryStyles.css';

function Arrow() {
    return (
        <motion.div
            className='fixed bottom-[125px] left-0 right-0 z-20 flex justify-center'
            animate={{
                y: [1, 10, 1]
            }}
            transition={{ ease: easeInOut, repeat: Infinity, repeatDelay: 5, duration: 0.5 }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-mywhite">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        </motion.div>
    );
}

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [imgsCount, setImgsCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [imgsPerPage] = useState(6);

    const IMGS_URL = '/api/images/all';

    useEffect(() => {
        (async function getImgs() {
            const imgArr = [];
            try {
                const res = await axios.get(IMGS_URL, { headers: { 'Content-Type': 'application/json' } });
                const count = res?.data?.count;
                for (let i = 0; i < count; i++) {
                    const imgObj = {};
                    imgObj.imageURL = res?.data?.images[i]?.imageURL;
                    imgObj.tags = res?.data?.images[i]?.tags
                    imgArr.push(imgObj);
                }
                setImgsCount(() => count);
                setImages(() => [...imgArr]);
            } catch (err) {
                if (!err?.response) {
                    alert("No Server Response");
                } else if (err.response?.status === 404) {
                    alert("Could not get images");
                } else if (err.response?.status === 500) {
                    alert("Internal Server Error");
                }
            }
        })();
    }, []);

    const firstImg = currentPage * imgsPerPage;
    const lastImg = firstImg - imgsPerPage;
    const currentImgs = images.slice(lastImg, firstImg);

    const pages = Math.ceil(imgsCount / imgsPerPage);

    const next = () => {
        if (currentPage === pages) return;

        setCurrentPage(currentPage + 1);
    };

    const prev = () => {
        if (currentPage === 1) return;

        setCurrentPage(currentPage - 1);
    };

    return (
        <div className="flex flex-col absolute">
            <section className="h-[100vh] w-[100vw] items-center flex flex-col justify-center md:snap-center gap-1" id="1">
                <motion.div
                    initial={{ opacity: 0, y: '10px' }}
                    whileInView={{ opacity: 1, y: '0px' }}
                    transition={{ ease: easeInOut, duration: 0.8 }}
                >
                    <Typography variant='h1' className='text-myRed3 drop-shadow-xl tracking-wide'>The Gallery</Typography>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: '10px' }}
                    whileInView={{ opacity: 1, x: '0px' }}
                    transition={{ ease: easeInOut, duration: 0.8 }}
                >
                    <Typography variant='lead' className='text-myGray tracking-wide'>explore the collection.</Typography>
                </motion.div>
                <Arrow />
            </section>
            <motion.div
                className='spacer layer4 relative md:bottom-[120px] bottom-[90px]'
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 5 }}
                whileHover={{ scale: 1.03 }}
                transition={{ ease: easeInOut, duration: 0.9 }}
            ></motion.div>
            <section className="lg:mb-20 flex flex-col items-center md:snap-center justify-center lg:h-[100vh] lg:w-[100vw] h-2/4 ">
                {
                    (images.length > 0) ? (
                        <React.Fragment>
                            <div className="grid md:grid-cols-3 grid-cols-1 gap-2 lg:gap-4 mx-[20px] mb-[20px]">
                                {
                                    currentImgs.map((img, id) => (
                                        <Images
                                            imageURL={img.imageURL}
                                            tags={img.tags}
                                            id={id}
                                            key={id}
                                            currentPage={currentPage}
                                        />
                                    ))
                                }
                            </div>
                        </React.Fragment>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <Spinner
                                color="white"
                                className="h-10 w-10 text-myRed3"
                            />
                            <Typography variant='h2' className='text-md text-mywhite'>Loading...</Typography>
                        </div>
                    )
                }
                {
                    images.length > 0 && (
                        <div className="flex items-center gap-8 z-30">
                            <IconButton
                                size="sm"
                                variant="text"
                                color="white"
                                className="text-myRed3 border-none"
                                onClick={prev}
                                disabled={currentPage === 1}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                            </IconButton>
                            <Typography className='text-mywhite'>
                                Page <strong>{currentPage}</strong> of <strong>{pages}</strong>
                            </Typography>
                            <IconButton
                                size="sm"
                                variant="text"
                                color="white"
                                className="text-myRed3 border-none"
                                onClick={next}
                                disabled={currentPage === pages}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </IconButton>
                        </div>
                    )
                }
            </section>
            <motion.div
                className='spacer layer0 relative lg:bottom-[150px] bottom-[-150px]'
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: -5 }}
                whileHover={{ scale: 1.03 }}
                transition={{ ease: easeInOut, duration: 0.7 }}
            ></motion.div>
        </div>
    );
}