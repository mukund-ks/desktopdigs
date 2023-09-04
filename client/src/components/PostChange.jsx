import React, { useRef, useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

PostChange.propTypes = {
    handleProfileDialog: PropTypes.func,
};

export default function PostChange(props) {
    const [num, setNum] = useState(10);
    const { setUsername, setAuth, setAuthSuccess } = useContext(AuthContext);
    const navigate = useNavigate();
    let intervalRef = useRef();

    const decreaseNum = () => setNum((prev) => prev - 1);

    useEffect(() => {
        intervalRef.current = setInterval(decreaseNum, 1000);
        return () => clearInterval(intervalRef.current);
    }, []);

    if (num < 0) {
        localStorage.clear();
        setUsername("");
        setAuth({});
        setAuthSuccess(false);
        props.handleProfileDialog();
        navigate("/");
    }

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