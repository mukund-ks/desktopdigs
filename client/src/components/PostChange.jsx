import React, { useRef, useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import { Typography } from "@material-tailwind/react";
import AuthContext from "../context/AuthProvider";

PostChange.propTypes = {
    handlePasswordDialog: PropTypes.func,
    handleLogout: PropTypes.func,
};

export default function PostChange(props) {
    const [num, setNum] = useState(10);
    const { setPassSuccess } = useContext(AuthContext);
    let intervalRef = useRef();

    const decreaseNum = () => { if (num > 0 && num <= 10) setNum((prev) => prev - 1) };

    useEffect(() => {
        intervalRef.current = setInterval(decreaseNum, 1000);
        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        if (num === 0) {
            setPassSuccess(false);
            props.handleLogout();
            props.handlePasswordDialog();
        } else {
            null
        }
    }, [num])

    return (
        <React.Fragment>
            <Typography
                variant="paragraph"
                className="text-xs tracking-wide"
            >
                You will be redirected in {num} seconds.
            </Typography>
        </React.Fragment>
    )
}