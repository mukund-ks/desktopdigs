import React from "react";
import PropTypes from 'prop-types';
import {
    // Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

ProfileDialog.propTypes = {
    profileDialog: PropTypes.bool,
    handleProfileDialog: PropTypes.func,
};

export default function ProfileDialog(props) {
    return (
        <React.Fragment>
            <Dialog
                open={Boolean(props.profileDialog)}
                handler={props.handleProfileDialog}
                size="md"
                className="bg-transparent shadow-none"
            >
                <DialogHeader>Profile</DialogHeader>
                <DialogBody divider>
                    Profile Body
                </DialogBody>
                <DialogFooter>
                    Profile Footer
                </DialogFooter>
            </Dialog>
        </React.Fragment>
    );
}