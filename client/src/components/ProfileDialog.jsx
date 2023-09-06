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

ProfileDialog.propTypes = {
    profileDialog: PropTypes.bool,
    handleProfileDialog: PropTypes.func,
    handlePasswordDialog: PropTypes.func,
};

export default function ProfileDialog(props) {
    const { auth } = useContext(AuthContext);

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
                    <Button
                        variant="filled"
                        size="sm"
                        color="white"
                        onClick={() => { props.handlePasswordDialog(); props.handleProfileDialog(); }}
                        className="rounded-full bg-transparent shadow-none focus:shadow-none active:shadow-none hover:shadow-none border-2 border-myRed3/80 text-mywhite hover:border-myRed3/70 hover:text-mywhite/70"
                        ripple={false}
                    >
                        Change Password
                    </Button>
                </DialogFooter>
            </Dialog>
        </React.Fragment>
    );
}