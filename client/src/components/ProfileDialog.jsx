import React, { useContext } from "react";
import PropTypes from 'prop-types';
import AuthContext from "../context/AuthProvider";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
} from "@material-tailwind/react";
import axios from "@/api/axios.js";

const REFRESH_URL = "/api/images/"

ProfileDialog.propTypes = {
    profileDialog: PropTypes.bool,
    handleProfileDialog: PropTypes.func,
    handlePasswordDialog: PropTypes.func,
};

export default function ProfileDialog(props) {
    const { auth } = useContext(AuthContext);

    const refreshDB = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(REFRESH_URL, { headers: { 'Content-Type': 'application/json' }, });
            alert(res?.data?.message);
        } catch (error) {
            if (!error?.response) {
                alert("No Response");
            } else if (error.response?.status === 500) {
                alert("Server Error!");
            }
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={Boolean(props.profileDialog)}
                handler={props.handleProfileDialog}
                size="xs"
                className="bg-myBlack/50 shadow-none"
            >
                <DialogHeader>
                    <div className="flex flex-col gap-y-2">
                        <Typography
                            variant="h3"
                            className="text-mywhite/90 tracking-wide"
                        >
                            My Profile
                        </Typography>
                        <Typography
                            variant="h3"
                            className="text-myRed3/80 tracking-wide"
                        >
                            Hi, {auth.username}
                        </Typography>
                    </div>
                </DialogHeader>
                <DialogBody divider>
                    <div className="flex flex-col gap-y-2">
                        <Typography
                            variant="h5"
                            className="text-myRed3/80 tracking-wide"
                        >
                            Name
                        </Typography>
                        <Typography
                            variant="paragraph"
                            className="text-mywhite/90 text-lg tracking-wide"
                        >
                            {auth.name ? auth.name : "name not provided"}
                        </Typography>
                        <Typography
                            variant="h5"
                            className="text-myRed3/80 tracking-wide"
                        >
                            Email
                        </Typography>
                        <Typography
                            variant="paragraph"
                            className="text-mywhite/90 text-lg tracking-wide"
                        >
                            {auth.email}
                        </Typography>
                        <Typography
                            variant="h5"
                            className="text-myRed3/80 tracking-wide"
                        >
                            Admin?
                        </Typography>
                        <Typography
                            variant="paragraph"
                            className="text-mywhite/90 text-lg tracking-wide"
                        >
                            {auth.admin ? "Yes" : "No"}
                        </Typography>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <div className="flex flex-row justify-around gap-2 w-full">
                        <Button
                            variant="filled"
                            size="sm"
                            color="white"
                            onClick={() => { props.handlePasswordDialog(); props.handleProfileDialog(); }}
                            className="rounded-full bg-transparent shadow-none tracking-wide focus:shadow-none active:shadow-none hover:shadow-none border-2 border-myRed3/80 text-mywhite hover:border-myRed3/70 hover:text-mywhite/70"
                            ripple={false}
                        >
                            Change Password
                        </Button>
                        {
                            auth.admin && (
                                <Button
                                    variant="filled"
                                    size="sm"
                                    color="white"
                                    onClick={refreshDB}
                                    className="rounded-full bg-transparent shadow-none tracking-wide focus:shadow-none active:shadow-none hover:shadow-none border-2 border-myRed3/80 text-mywhite hover:border-myRed3/70 hover:text-mywhite/70"
                                    ripple={false}
                                >
                                    Refresh DB
                                </Button>
                            )
                        }
                    </div>
                </DialogFooter>
            </Dialog>
        </React.Fragment>
    );
}