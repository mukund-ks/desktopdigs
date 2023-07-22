import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { IconButton, Typography, Spinner } from "@material-tailwind/react";
import axios from '@/api/axios.js';

Images.propTypes = {
    imageURL: PropTypes.string,
    id: PropTypes.number,
};

function Images(props) {
    return (
        <React.Fragment key={props.id}>
            <div className="bg-transparent overflow-hidden rounded-lg shadow-md w-full h-full object-cover">
                <img src={props.imageURL} id={props.id} alt={`image-${props.id}`} />
            </div>
        </React.Fragment>
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
                console.log(err);
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

    console.log(currentPage);

    return (
        <div>
            <section className="h-[100vh] w-auto items-center flex flex-row justify-center snap-center">
                <Typography variant='h1' className='text-myRed3'>The Gallery</Typography>
            </section>
            <section className="mb-20 flex flex-col items-center snap-center">
                {
                    (images.length > 0) ? (
                        <React.Fragment>
                            <div className="grid grid-cols-3 gap-3 mx-[20px] mb-[20px]">
                                {
                                    currentImgs.map((img, id) => (
                                        <Images imageURL={img.imageURL} id={id} key={id} />
                                    ))
                                }
                            </div>
                        </React.Fragment>
                    ) : (
                        <Spinner
                            color="white"
                            className="h-10 w-10 text-myRed3"
                        />
                    )
                }
                <div className="flex items-center gap-8">
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
        </div>
    );
}