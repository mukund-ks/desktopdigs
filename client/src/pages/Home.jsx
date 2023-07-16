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
};

function useParallax(value, distance) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

function Image(props) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 300);

    return (
        <React.Fragment>
            <section className='h-[100vh] snap-center relative items-center flex flex-col-reverse justify-center border-none md:flex-row'>
                <motion.div
                    ref={ref}
                    className='imgdiv rounded-3xl'
                    initial={{ opacity: 0.5, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1.01 }}
                    exit={{ scale: 0.9 }}
                    transition={{ ease: easeInOut, duration: 0.5 }}
                >
                    <img src={props.imglink} alt={`Image-${props.id}`} className='absolute top-0 left-0 bottom-0 right-0 w-full h-full object-fill' />
                </motion.div>
                <motion.h2 className='imgh2 drop-shadow-lg z-10' style={{ y }}>{`#00${props.id + 1}`}</motion.h2>
            </section>
        </React.Fragment>
    );
}

export default function Home() {
    const [images, setImages] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [tag, setTag] = useState('');

    const IMG_URL = '/api/images';

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        (async function getAll() {
            try {
                const res = await axios.get(`${IMG_URL}/all`, { headers: { 'Content-Type': 'application/json' } });
                const count = res?.data?.count;
                console.log(count);

                const imgArr = [];
                for (let i = 0; i < 5; i++) {
                    // let j = Math.floor((Math.random() * (count - 1)) + 1)
                    imgArr.push(res?.data?.images[i]?.imageURL);
                }
                setImages(() => [...imgArr]);
                setLoaded(true);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);


    function testAPI() {
        axios.get('/api/images/all', { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                const count = res?.data?.count;
                console.log(count);

                const imgArr = [];
                for (let i = 0; i < 10; i++) {
                    let j = Math.floor((Math.random() * (count - 1)) + 1);
                    imgArr.push(res?.data?.images[j]?.imageURL);
                }
                console.log(imgArr);
                setImages(() => [...imgArr]);
                setLoaded(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function testAPImulti(tag) {
        axios.get(`/api/images/${tag}`, { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                const count = res?.data?.count;
                console.log(count);

                const imgArr = [];
                for (let i = 0; i < res?.data?.count; i++) {
                    imgArr.push(res?.data?.images[i]?.imageURL);
                }
                setLoaded(true);
                setImages(() => [...imgArr]);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function RenderLine() {
        const lineRef = useRef();

        return (
            <React.Fragment>
                <section className='snap-center h-[100vh] items-center relative flex'>
                    <div>
                        <motion.div
                            ref={lineRef}
                            initial={{ opacity: 0, y: '-10px' }}
                            whileInView={{ opacity: 1, y: '0px' }}
                            transition={{ ease: easeInOut, duration: 0.8 }}
                        >
                            <Typography variant='h1' className='text-myRed3 drop-shadow-xl z-10'>
                                An In-Game Lens Exhibit
                            </Typography>
                        </motion.div>
                        <motion.div
                            ref={lineRef}
                            initial={{ opacity: 0, x: '-10px' }}
                            whileInView={{ opacity: 1, x: '0px' }}
                            transition={{ ease: easeIn, duration: 0.9, delay:0.1 }}
                        >
                            <Typography as='p' className='text-myGray z-10 text-lg'>
                                by Mukund Kumar
                            </Typography>
                        </motion.div>
                    </div>
                </section>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <div className='md:container md:mx-auto flex flex-col justify-between'>
                <motion.div className='progress' style={{ scaleX }} />
                <RenderLine />
                {loaded &&
                    images.map((imglink, id) => (
                        <React.Fragment key={id}>
                            <Image imglink={imglink} id={id} />
                        </React.Fragment>
                    ))}
            </div>
        </React.Fragment>
    );
}