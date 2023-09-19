import { Typography, Spinner } from '@material-tailwind/react';
import {
    easeIn,
    easeInOut,
    motion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import axios from "../../axios.js";
import './HomeStyles.css';

Image.propTypes = {
    imglink: PropTypes.string,
    id: PropTypes.number,
    valid: PropTypes.bool,
};

function useParallax(value, distance) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

function Image(props) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 300);
    const captionObj = [
        {
            title: 'Sculpted for Dreams, Engineered for Speed: The Ferrari Enzo.',
            caption: 'A symphony of power and aesthetics, where innovation and passion converge to create a timeless icon that leaves an indelible mark on both roads and hearts.',
        },
        {
            title: 'Roaring Elegance: Lamborghini Aventador',
            caption: 'Unleashing untamed power and precision, the Lamborghini Aventador prowls the streets with ferocity. Its razor-sharp lines and mind-bending performance redefine the boundaries of automotive excellence.',
        },
        {
            title: 'The JDM Legend: Nissan GTR R-34',
            caption: 'Pay homage to the iconic Nissan GTR R-34, a true Japanese performance masterpiece. Capturing the essence of raw power and engineering excellence. Its iconic status and blistering performance have secured its place in the hall of automotive greatness.',
        },
        {
            title: 'Unleashing the Spirit of Porsche: 911 Carrera S',
            caption: 'Embrace the heritage and legacy of Porsche with the 911 Carrera S. Its exhilarating performance, coupled with iconic design cues, embodies the true essence of the legendary Porsche spirit.',
        },
        {
            title: 'Embracing the Legend: Toyota Supra',
            caption: 'A legendary symbol of power and performance, has left an indelible mark on the road. With its iconic design and exhilarating driving dynamics, the Supra embodies a heritage that fuels the dreams of driving enthusiasts worldwide.',
        },
    ];

    const newid = `section-${props.id}`;
    const spacerClass = `spacer layer${props.id} relative md:bottom-[105px] bottom-[70px]`;

    return (
        <React.Fragment>
            <section className='h-[100vh] snap-center relative items-center flex flex-col justify-center border-none md:flex-row' id={newid}>
                <motion.div
                    ref={ref}
                    className='aspect-video w-[85%] md:w-[65%] h-auto m-0 bg-transparent overflow-hidden rounded-3xl shadow-md'
                    initial={{ opacity: 0.5, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1.01 }}
                    whileHover={{ scale: 1.02 }}
                    exit={{ scale: 0.9 }}
                    transition={{ ease: easeInOut, duration: 0.5 }}
                >
                    {
                        props.valid ? (
                            <React.Fragment>
                                <img
                                    src={props.imglink}
                                    alt={`Image-${props.id}`}
                                    className='absolute top-0 left-0 bottom-0 right-0 w-full h-full object-fill'
                                />
                                <figcaption
                                    className="absolute bottom-1.5 md:bottom-3 left-2/4 flex flex-col w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl bg-[#28282B]/60 p-3 md:p-5 saturate-200 backdrop-blur-sm opacity-0 hover:opacity-100 lg:opacity-100 transition-opacity"
                                >
                                    <Typography variant="h5" className='text-black font-semibold text-[15px] lg:text-[18px] leading-normal tracking-wide'>
                                        {captionObj[props.id].title}
                                    </Typography>
                                    <Typography className="mt-2 font-normal text-[#D3D3D3] text-[13px] lg:text-[16px] leading-normal tracking-wide">
                                        {captionObj[props.id].caption}
                                    </Typography>
                                </figcaption>
                            </React.Fragment>
                        ) : (
                            <div className='absolute top-0 left-0 bottom-0 right-0 flex flex-col justify-evenly  items-center bg-myGray'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-1/5 h-1/4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                                </svg>
                                <Typography className=' text-mywhite text-3xl md:text-5xl'>
                                    There was an error in loading this image.
                                </Typography>
                            </div>
                        )
                    }
                </motion.div>
                <motion.h2
                    className='m-0 text-myRed3 lg:text-[60px] text-[30px] leading-[1.2] font-bold tracking-[-3px] absolute xl:left-[calc(64.2%+250px)] left-[calc(80%+10px)] drop-shadow-lg z-10'
                    style={{ y }}
                >
                    {`#00${props.id + 1}`}
                </motion.h2>
            </section>
            <motion.div
                className={spacerClass}
                initial={{ opacity: 0.2, y: 10 }}
                whileInView={{ opacity: 1, y: -5 }}
                whileHover={{ scale: 1.03 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ ease: easeInOut, duration: 0.6 }}
            ></motion.div>
        </React.Fragment>
    );
}

function Intro() {
    const lineRef = useRef(null);

    return (
        <React.Fragment>
            <section className='snap-center h-[100vh] w-[100vw] items-center flex flex-row relative'>
                <div className='absolute flex flex-row-reverse mx-1 w-[100%] items-center justify-between'>
                    <motion.svg
                        drag
                        dragSnapToOrigin
                        id="visual"
                        viewBox="-190 -150 480 300"
                        className='relative mx-[12vw]'
                        height="960"
                        width="600"
                        initial={{
                            y: -50,
                            opacity: 0
                        }}
                        whileInView={{
                            y: 0,
                            opacity: 1
                        }}
                        whileHover={{
                            scale: 1.1,
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                    >
                        <motion.path
                            animate={{
                                d: [
                                    'M59.3 -67C78.4 -54.7 96.3 -37.4 100.1 -17.4C103.9 2.6 93.5 25.3 80.9 46.3C68.3 67.4 53.5 86.8 31.1 102.3C8.7 117.8 -21.3 129.4 -41.8 119.8C-62.2 110.1 -73.1 79.3 -84.4 52.3C-95.7 25.3 -107.4 2.2 -104.7 -19.3C-101.9 -40.8 -84.7 -60.6 -64.9 -72.8C-45 -84.9 -22.5 -89.3 -1.2 -87.9C20.1 -86.5 40.3 -79.3 59.3 -67',
                                    'M66.7 -82.2C87.5 -62 106.3 -42 113.5 -17.6C120.6 6.8 116.2 35.6 103.9 62.8C91.6 90 71.4 115.5 47.5 119.4C23.5 123.3 -4.3 105.7 -33 93.9C-61.8 82.1 -91.5 76 -102.8 58.4C-114 40.8 -106.7 11.6 -98.7 -14.6C-90.7 -40.8 -82 -64.1 -65.4 -85C-48.9 -105.9 -24.4 -124.4 -0.7 -123.5C22.9 -122.7 45.9 -102.3 66.7 -82.2',
                                    "M71.7 -90.1C90.2 -69.9 100.8 -44.7 109.1 -16.4C117.5 11.9 123.7 43.5 111.4 63.8C99 84.1 68.2 93.3 38.3 103.3C8.4 113.4 -20.4 124.4 -40.2 115.1C-59.9 105.8 -70.5 76.4 -82.7 50.2C-94.8 24.1 -108.5 1.3 -109.5 -23.9C-110.6 -49.1 -99 -76.6 -78.6 -96.5C-58.3 -116.5 -29.1 -128.7 -1.3 -127.2C26.6 -125.7 53.1 -110.3 71.7 -90.1",
                                    "M77.5 -94.7C96.7 -76.2 106 -48.3 107.8 -21.4C109.7 5.5 104.2 31.2 93 56.5C81.8 81.9 64.8 106.7 41.9 114.9C19 123.1 -9.8 114.6 -31.2 100.5C-52.6 86.3 -66.6 66.4 -84.8 44.4C-102.9 22.3 -125.3 -1.9 -121.9 -21.6C-118.6 -41.3 -89.4 -56.6 -64.8 -74.1C-40.2 -91.5 -20.1 -111.3 4.5 -116.7C29.1 -122.1 58.3 -113.1 77.5 -94.7",
                                    "M63.8 -75.6C79.5 -62.8 87 -39.7 88.6 -17.6C90.2 4.6 85.8 25.8 76.7 46.9C67.6 68 53.8 89 34.9 95.7C16.1 102.4 -7.9 94.9 -28.8 84.8C-49.8 74.8 -67.8 62.1 -87.1 43.2C-106.4 24.3 -127.1 -0.9 -122.8 -21.1C-118.6 -41.3 -89.4 -56.6 -64.8 -67.9C-40.2 -79.2 -20.1 -86.6 2 -88.9C24 -91.3 48 -88.5 63.8 -75.6",
                                    'M59.3 -67C78.4 -54.7 96.3 -37.4 100.1 -17.4C103.9 2.6 93.5 25.3 80.9 46.3C68.3 67.4 53.5 86.8 31.1 102.3C8.7 117.8 -21.3 129.4 -41.8 119.8C-62.2 110.1 -73.1 79.3 -84.4 52.3C-95.7 25.3 -107.4 2.2 -104.7 -19.3C-101.9 -40.8 -84.7 -60.6 -64.9 -72.8C-45 -84.9 -22.5 -89.3 -1.2 -87.9C20.1 -86.5 40.3 -79.3 59.3 -67',
                                ]
                            }}
                            transition={{
                                ease: easeInOut,
                                duration: 10,
                                repeat: Infinity,
                            }}
                            fill='#C3073F'
                        />
                    </motion.svg>
                    <div className='pl-16'>
                        <motion.div
                            ref={lineRef}
                            initial={{ opacity: 0, y: '-10px' }}
                            whileInView={{ opacity: 1, y: '0px' }}
                            transition={{ ease: easeInOut, duration: 0.8 }}
                        >
                            <Typography
                                variant='h1'
                                className='text-myRed3 drop-shadow-xl z-10 tracking-wide'>
                                An In-Game Lens Exhibit
                            </Typography>
                        </motion.div>
                        <motion.div
                            ref={lineRef}
                            initial={{ opacity: 0, x: '-10px' }}
                            whileInView={{ opacity: 1, x: '0px' }}
                            transition={{ ease: easeIn, duration: 0.9, delay: 0.1 }}
                        >
                            <Typography variant='lead' className='text-myGray z-10 text-lg tracking-wide'>
                                by Mukund Kumar
                            </Typography>
                        </motion.div>
                    </div>
                </div>
                <motion.div
                    className='fixed bottom-[165px] left-0 right-0 z-20 flex justify-center items-center flex-col w-auto'
                    ref={lineRef}
                    animate={{
                        y: [1, 10, 1]
                    }}
                    transition={{ ease: easeInOut, repeat: Infinity, repeatDelay: 5, duration: 0.5 }}
                >
                    <Typography
                        variant="paragraph"
                        className="text-myGray tracking-wide"
                    >
                        Explore Featured Images!
                    </Typography>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-mywhite">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </motion.div>
            </section>
            <motion.div
                className='spacer layer relative md:bottom-[160px] bottom-[90px] -z-10'
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 5 }}
                whileHover={{ scale: 1.03 }}
                transition={{ ease: easeInOut, duration: 0.9 }}
            ></motion.div>
        </React.Fragment>
    );
}


export default function Home() {
    const [images, setImages] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const IMG_URL = '/api/images/id';
    const IMG_IDS = [
        '64861154d11697b0a9373dd3',
        '64861155d11697b0a9373e6f',
        '64861155d11697b0a9373e7b',
        '64861155d11697b0a9373e8d',
        '64861155d11697b0a9373ed7'
    ];

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        (async function getImgs() {
            const imgArr = [];

            for (let i = 0; i < IMG_IDS.length; i++) {
                const imgObj = {};
                try {
                    const res = await axios.get(`${IMG_URL}/${IMG_IDS[i]}`,
                        { headers: { 'Content-Type': 'application/json' } }
                    );
                    imgObj.imageURL = res?.data?.image?.imageURL;
                    imgObj.valid = true;
                }
                catch (err) {
                    if (!err?.response) {
                        alert("No Server Response");
                    } else if (err.response?.status === 404) {
                        alert("Could not get image(s)");
                    } else if (err.response?.status === 500) {
                        alert("Internal Server Error");
                    }
                    imgObj.imageURL = '';
                    imgObj.valid = false;
                } finally {
                    imgArr.push(imgObj);
                }
            }
            setLoaded(true);
            setImages(() => [...imgArr]);
        })();
    }, []);

    return (
        <React.Fragment>
            <div className='flex flex-col'>
                <motion.div
                    className='fixed top-[100px] left-0 right-0 h-[3px] bg-[#bf0041] z-20 self-center'
                    initial={{
                        opacity: 0
                    }}
                    whileInView={{
                        opacity: 1
                    }}
                    transition={{ ease: easeInOut, duration: 0.9 }}
                    style={{ scaleX }}
                />
                <Intro />
                {loaded ? (
                    images.map((img, id) => (
                        <React.Fragment key={id}>
                            <Image imglink={img.imageURL} id={id} valid={img.valid} />
                        </React.Fragment>
                    ))
                ) : (
                    <section className='snap-center h-[100vh] w-[100vw] flex flex-col items-center justify-center'>
                        <div className="flex flex-col items-center gap-4">
                            <Spinner
                                color="white"
                                className="h-10 w-10 text-myRed3"
                            />
                            <Typography variant='h2' className='text-md text-mywhite'>Loading...</Typography>
                        </div>
                    </section>
                )}
            </div>
        </React.Fragment>
    );
}