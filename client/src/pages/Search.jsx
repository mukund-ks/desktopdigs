import { IconButton, Typography } from "@material-tailwind/react";
import { easeInOut, motion } from "framer-motion";
import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import axios from "../../axios.js";
import Images from "../components/ImageResult";
import "./SearchStyles.css";

ShowTags.propTypes = {
    setTag: PropTypes.func,
    checked: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
};

function ShowTags(props) {
    return (
        <label className="text-mywhite bg-myGray mx-2 p-2 rounded-md radio-label text-xs lg:text-md">
            <input
                type="radio"
                className="mx-1 radio-input"
                checked={props.checked == props.value}
                onChange={() => props.setTag(props.value)}
            />
            <span className="mx-1 custom-radio" />
            {props.label}
        </label>
    );
}

function Arrow() {
    return (
        <motion.div
            className='fixed bottom-[125px] left-0 right-0 z-30 flex justify-center'
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

export default function Search() {
    const [game, setGame] = useState('');
    const [gameList, setGameList] = useState([]);
    const [brand, setBrand] = useState('');
    const [brandList, setBrandList] = useState([]);
    const [query, setQuery] = useState("");
    const [error, setError] = useState();
    const [images, setImages] = useState([]);
    const [imgsCount, setImgsCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [imgsPerPage] = useState(6);

    const TAG_URL = "/api/images/all-tags";
    const IMG_URL = "api/images";

    useEffect(() => {
        (async function fetchTags() {
            try {
                const res = await axios.get(TAG_URL, { headers: { "Content-Type": "application/json" } });

                const brandTags = res?.data?.brandTags;
                const gameTags = res?.data?.gameTags;

                setBrandList(() => [...brandTags]);
                setGameList(() => [...gameTags]);
            } catch (err) {
                if (!err?.response) {
                    setError("No Server Response");
                } else if (err.response?.status === 404) {
                    setError(err.response?.data?.message);
                } else if (err.response?.status === 500) {
                    setError("Internal Server Error");
                }
            }
        })();
    }, []);

    useEffect(() => {
        if (game && brand) {
            setQuery(() => `${IMG_URL}/${game}&${brand}`);
        } else if (game && !brand) {
            setQuery(() => `${IMG_URL}/${game}`);
        } else {
            setQuery(() => `${IMG_URL}/${brand}`);
        }
    }, [brand, game]);

    useEffect(() => {
        (async function fetchImgs() {
            try {
                const imgArr = [];
                const res = await axios.get(query, { headers: { "Content-Type": "application/json" } });
                setError("");
                const count = res?.data?.count;
                for (let i = 0; i < count; i++) {
                    const imgObj = {};
                    imgObj.imageURL = res?.data?.images[i]?.imageURL;
                    imgObj.tags = res?.data?.images[i]?.tags;
                    imgArr.push(imgObj);
                }
                setCurrentPage(() => 1);
                setImgsCount(() => count);
                setImages(() => [...imgArr]);
            } catch (err) {
                if (!err?.response) {
                    setError("No Server Response");
                } else if (err.response?.status === 404) {
                    setError("No Results for selected tag(s)");
                } else if (err.response?.status === 500) {
                    setError("Internal Server Error");
                }
                setImgsCount(0);
                setImages(() => []);
            }
        })();
    }, [query]);

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
            <section className="h-[100vh] w-[100vw] items-center flex flex-col justify-center md:snap-center gap-y-5 lg:gap-y-20">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: '-10px' }}
                        whileInView={{ opacity: 1, x: '0px' }}
                        transition={{ ease: easeInOut, duration: 0.8 }}
                    >
                        <Typography variant="h1" className="text-myRed3 drop-shadow-xl tracking-wide">Search</Typography>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: '10px' }}
                        whileInView={{ opacity: 1, x: '0px' }}
                        transition={{ ease: easeInOut, duration: 0.8 }}
                    >
                        <Typography variant="lead" className="text-myGray tracking-wide">tag and discover.</Typography>
                    </motion.div>
                </div>
                <motion.div
                    className="flex flex-col gap-4 items-center"
                    initial={{ opacity: 0, y: '10px' }}
                    whileInView={{ opacity: 1, y: '0px' }}
                    transition={{ ease: easeInOut, duration: 0.8 }}
                >
                    <Typography
                        variant="h4"
                        className="text-myRed3 tracking-wide"
                    >
                        Select Game
                    </Typography>
                    {
                        gameList.length ? (
                            <div className="flex flex-row items-center justify-center">
                                {
                                    gameList.map((g, id) => {
                                        return (
                                            <ShowTags setTag={setGame} checked={game} label={g} value={g} key={id} />
                                        );
                                    })
                                }
                            </div>
                        ) : (
                            <Typography
                                variant="paragraph"
                                className="text-myGray tracking-wide"
                            >
                                Could not load tags
                            </Typography>
                        )
                    }
                    <Typography
                        variant="h4"
                        className="text-myRed3 tracking-wide"
                    >
                        Select Brand
                    </Typography>
                    {
                        brandList.length ? (
                            <div className="flex flex-row flex-wrap gap-3 justify-center">
                                {
                                    brandList.map((b, id) => {
                                        return (
                                            <ShowTags setTag={setBrand} checked={brand} label={b} value={b} key={id} />
                                        );
                                    })
                                }
                            </div>
                        ) : (
                            <Typography
                                variant="paragraph"
                                className="text-myGray tracking-wide"
                            >
                                Could not load tags
                            </Typography>
                        )
                    }
                </motion.div>
                <div className="h-4">
                    {
                        !brand && !game ? (
                            <motion.div
                                initial={{ opacity: 0, y: '10px' }}
                                whileInView={{ opacity: 1, y: '0px' }}
                                transition={{ ease: easeInOut, duration: 0.8 }}
                            >
                                <Typography variant="lead" className="text-myGray tracking-wide">
                                    Choose Tag(s)
                                </Typography>
                            </motion.div>
                        ) : error ? (
                            <h1>
                                <Typography variant="lead" className="text-myGray">{error}</Typography>
                            </h1>
                        ) : (
                            <Arrow />
                        )
                    }
                </div>
            </section>
            <motion.div
                className='spacer layer3 relative md:bottom-[120px] bottom-[90px]'
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 5 }}
                whileHover={{ scale: 1.03 }}
                transition={{ ease: easeInOut, duration: 0.9 }}
            />
            {
                images.length > 0 && (
                    <React.Fragment>
                        <section className="lg:mb-20 flex flex-col items-center md:snap-center justify-center lg:h-[100vh] lg:w-[100vw] h-2/4 ">
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
                        </section>
                        <motion.div
                            className='spacer layer0 relative lg:bottom-[150px] bottom-[-150px]'
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: -5 }}
                            whileHover={{ scale: 1.03 }}
                            transition={{ ease: easeInOut, duration: 0.7 }}
                        ></motion.div>
                    </React.Fragment>
                )
            }
        </div>
    );
}