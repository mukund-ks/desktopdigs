import React, { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from '@/api/axios.js';

const AuthContext = createContext({});

const JWT_URL = '/api/user/jwtinfo';

AuthProvider.propTypes = {
    children: PropTypes.any,
}

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [authSuccess, setAuthSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (!token) {
            axios.defaults.headers.common.Authorization = null;
        } else {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;

            (async function getTokenInfo() {
                try {
                    const res = await axios.get(JWT_URL, { headers: { 'Content-Type': 'application/json' } });
                    const userID = res?.data?.User?._id;

                    try {
                        const res2 = await axios.get(`/api/user/${userID}`, { headers: { 'Content-Type': 'application/json' } });
                        const name = res2?.data?.name;
                        const username = res2?.data?.username;
                        const admin = res2?.data?.admin;
                        setAuthSuccess(true);
                        setUsername(username);
                        setName(name);
                        setAuth({ name, username, admin, token });
                    } finally {
                        null;
                    }
                } catch (err) {
                    if (!err?.response) {
                        alert("No Server Response");
                    } else if (err.response?.status === 401) {
                        alert("Invalid Token. Login Again.");
                    } else if (err.response?.status === 403) {
                        alert("Unauthorized");
                    } else if (err.response?.status === 404) {
                        alert("User Not Found");
                    } else {
                        alert("Internal Server Error. Try Again Later.");
                    }
                    localStorage.clear();
                }
            })();

        }
    }, []);

    return (
        <AuthContext.Provider value={{
            auth, setAuth,
            name, setName,
            username, setUsername,
            email, setEmail,
            pwd, setPwd,
            errMsg, setErrMsg,
            authSuccess, setAuthSuccess,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;