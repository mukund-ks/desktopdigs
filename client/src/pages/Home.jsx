import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
} from '@material-tailwind/react';
import {
    easeIn,
    easeInOut,
    motion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import axios from '@/api/axios.js';
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
            title: 'Sculpted for Supremacy: The Alluring Ferrari Enzo',
            caption: 'An artistic masterpiece in motion. The Ferrari Enzo commands attention with its seductive curves, formidable performance, and a soul that ignites the passion of every automotive enthusiast.',
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
            caption: 'The Toyota Supra, a legendary symbol of power and performance, has left an indelible mark on the road. With its iconic design and exhilarating driving dynamics, the Supra embodies a heritage that fuels the dreams of driving enthusiasts worldwide.',
        },
    ]

    const newid = `section-${props.id}`
    const spacerClass = `spacer layer${props.id} relative bottom-[110px]`

    return (
        <React.Fragment>
            <section className='h-[100vh] px-[12vw] snap-center relative items-center flex flex-col justify-center border-none md:flex-row' id={newid}>
                <motion.div
                    ref={ref}
                    className='w-4/5 h-4/6 relative max-h-[90vh] m-[20px] bg-transparent overflow-hidden rounded-3xl shadow-md'
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
                                    className="absolute bottom-8 left-2/4 flex flex-col w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl bg-[#28282B]/60 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm"
                                >
                                    <Typography variant="h5" className='text-black font-semibold'>
                                        {captionObj[props.id].title}
                                    </Typography>
                                    <Typography className="mt-2 font-normal text-[#D3D3D3]">
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
                    className='m-0 text-myRed3 text-[50px] leading-[1.2] font-bold tracking-[-3px] absolute left-[calc(70%+145px)] drop-shadow-lg z-10'
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
            <section className='snap-center h-[100vh] px-[12vw] items-start relative flex flex-col justify-center'>
                <div className='flex flex-col absolute'>
                    <motion.div
                        ref={lineRef}
                        initial={{ opacity: 0, y: '-10px' }}
                        whileInView={{ opacity: 1, y: '0px' }}
                        transition={{ ease: easeInOut, duration: 0.8 }}
                    >
                        <Typography
                            variant='h1'
                            className='text-myRed3 drop-shadow-xl z-10'>
                            An In-Game Lens Exhibit
                        </Typography>
                    </motion.div>
                    <motion.div
                        ref={lineRef}
                        initial={{ opacity: 0, x: '-10px' }}
                        whileInView={{ opacity: 1, x: '0px' }}
                        transition={{ ease: easeIn, duration: 0.9, delay: 0.1 }}
                    >
                        <Typography as='p' className='text-myGray z-10 text-lg'>
                            by Mukund Kumar
                        </Typography>
                    </motion.div>
                </div>
                <motion.div
                    className='fixed bottom-[165px] left-0 right-0 z-20 flex justify-center'
                    ref={lineRef}
                    initial={{ y: 1 }}
                    whileInView={{ y: [1, 10, 1] }}
                    transition={{ ease: easeInOut, repeat: Infinity, repeatDelay: 5, duration: 0.5 }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-mywhite">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </motion.div>
            </section>
            <motion.div
                className='spacer layer relative bottom-[160px]'
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

    const IMG_URL = '/api/images';
    const IMG_IDS = [
        '64861154d11697b0a9373dd3',
        '64861155d11697b0a9373e6f',
        '64861155d11697b0a9373e7b',
        '64861155d11697b0a9373e8d',
        '64861155d11697b0a9373ed7'
    ]

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
                    console.log(err);
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
            <div>
                <motion.div
                    className='fixed top-[100px] left-0 right-0 h-[2px] bg-mywhite z-20 self-center'
                    style={{ scaleX }}
                />
                <Intro />
                {loaded &&
                    images.map((img, id) => (
                        <React.Fragment key={id}>
                            <Image imglink={img.imageURL} id={id} valid={img.valid} />
                        </React.Fragment>
                    ))}
            </div>
        </React.Fragment>
    );
}