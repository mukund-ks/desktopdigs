import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Typography, Spinner } from "@material-tailwind/react";
import axios from '@/api/axios.js';

Images.propTypes = {
    images: PropTypes.array,

};

function Images(props) {
    console.log(props);
    return (
        <div className="w-full h-96">
            {
                props.images.map((img, id) => {
                    <img
                        src={img.imgLink}
                        alt={`Image-${id}`}
                        loading="lazy"
                        className="h-96 w-full rounded-lg object-cover object-center"
                    />
                })
            }
        </div>
    );
}

export default function Gallery() {
    const [images, setImages] = useState([]);

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
                setImages(() => [...imgArr]);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return (
        <React.Fragment>
            <div className="flex flex-col h-[100vh] w-[100vw] items-center justify-around overflow-y-scroll">
                <Typography variant='h1' className='text-myRed3'>The Gallery</Typography>
                {
                    (images.length > 0) ? (
                        <div className="flex">
                            {
                                <Images images={images} />
                            }
                        </div>
                    ) : (
                        <Spinner
                            color="white"
                            className="h-10 w-10 text-myRed3"
                        />
                    )
                }
            </div>
        </React.Fragment>
    );
}