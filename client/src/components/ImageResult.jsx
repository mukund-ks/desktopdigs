import React, { useState } from "react";
import Viewer from 'react-viewer';
import { motion, easeInOut } from "framer-motion";
import { Typography } from "@material-tailwind/react";
import PropTypes from 'prop-types';

Images.propTypes = {
    imageURL: PropTypes.string,
    tags: PropTypes.array,
    id: PropTypes.number,
    currentPage: PropTypes.number,
};

export default function Images(props) {
    const [visible, setVisible] = useState(false);

    return (
        <React.Fragment key={props.id}>
            <motion.div
                className="bg-transparent overflow-hidden rounded-lg shadow-md cursor-pointer"
                key={props.imageURL}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ ease: easeInOut, duration: 0.7 }}
            >
                <Typography
                    variant='paragraph'
                    className='text-mywhite text-sm absolute bg-myBlack/60 backdrop-blur-md p-1 rounded-br-md opacity-0 md:opacity-100'
                >
                    #{props.tags[0]}{' '}#{props.tags[1]}
                </Typography>
                <img
                    onClick={() => setVisible(true)}
                    src={props.imageURL}
                    id={props.id}
                    alt={`image-${props.id}`}
                    width={700}
                    height={500}
                    loading="lazy"
                />
                <Viewer
                    visible={visible}
                    onClose={() => { setVisible(false); }}
                    images={
                        [
                            {
                                src: props.imageURL,
                                alt: `#${props.tags[0]} #${props.tags[1]}`,
                                downloadUrl: props.imageURL
                            }
                        ]
                    }
                    downloadable
                    downloadInNewWindow
                    exportFileName={`image-${props.tags[0]}-${props.tags[1]}-DesktopDigs`}
                    noNavbar
                    showTotal={false}
                    noImgDetails
                />
            </motion.div>
        </React.Fragment>
    );
}