import React, { useContext, useState } from "react";
import PropTypes from 'prop-types';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
} from "@material-tailwind/react";
import AuthContext from "../context/AuthProvider";
import PasswordDialog from "./PasswordDialog";

ProfileDialog.propTypes = {
    profileDialog: PropTypes.bool,
    handleProfileDialog: PropTypes.func,
};

export default function ProfileDialog(props) {
    const { auth } = useContext(AuthContext);
    const [passwordDialog, setPasswordDialog] = useState(false);

    const handlePasswordDialog = () => {
        setPasswordDialog((cur) => !cur);
    };

    return (
        <React.Fragment>
            <Dialog
                open={Boolean(props.profileDialog)}
                handler={props.handleProfileDialog}
                size="sm"
                className="bg-myBlack/40 shadow-none"
            >
                <DialogHeader>
                    <Typography
                        variant="h3"
                        className="text-myRed3 tracking-wide"
                    >
                        Hi, {auth.username}
                    </Typography>
                </DialogHeader>
                <DialogBody>
                    <div className="flex flex-col gap-y-2">
                        <Typography
                            variant="h4"
                            className="text-myRed3/75 tracking-wide"
                        >
                            Account Details
                        </Typography>
                        <div className="flex flex-col">
                            <Typography
                                variant="lead"
                                className="text-myRed2 tracking-wide"
                            >
                                Name
                            </Typography>
                            <Typography
                                variant="paragraph"
                                className="text-myGray text-lg tracking-wide"
                            >
                                {auth.name}
                            </Typography>
                        </div>
                        <div className="flex flex-col">
                            <Typography
                                variant="lead"
                                className="text-myRed2 tracking-wide"
                            >
                                Email
                            </Typography>
                            <Typography
                                variant="paragraph"
                                className="text-myGray text-lg tracking-wide"
                            >
                                {auth.email}
                            </Typography>
                        </div>
                        <div className="flex flex-col">
                            <Typography
                                variant="lead"
                                className="text-myRed2 tracking-wide"
                            >
                                Admin?
                            </Typography>
                            <Typography
                                variant="paragraph"
                                className="text-myGray text-lg tracking-wide"
                            >
                                {auth.admin ? "Yes" : "No"}
                            </Typography>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="filled"
                        size="sm"
                        color="white"
                        onClick={handlePasswordDialog}
                        className="rounded-full bg-transparent shadow-none focus:shadow-none active:shadow-none hover:shadow-none border-2 border-myRed3/90 text-mywhite hover:border-myRed3/70 hover:text-mywhite/70"
                        ripple={false}
                    >
                        Change Password
                    </Button>
                    <PasswordDialog 
                        passwordDialog={passwordDialog}
                        handlePasswordDialog={handlePasswordDialog}  
                    />
                </DialogFooter>
            </Dialog>
        </React.Fragment>
    );
}