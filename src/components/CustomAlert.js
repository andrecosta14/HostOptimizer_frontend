import React from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";

const CustomAlert = ({ open, message, type, onClose }) => {

    const backgroundColors = {
        success: "rgba(76, 175, 80, 0.5)",
        error: "rgba(244, 67, 54, 0.5)",
        warning: "rgba(255, 152, 0, 0.5)",
        info: "rgba(33, 150, 243, 0.5)",
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <MuiAlert
                onClose={onClose}
                severity={type}
                sx={{
                    width: "100%",
                    maxWidth: "600px",
                    fontSize: "1rem",
                    marginTop: "15px",
                    paddingRight: "155px",
                    paddingLeft: "155px",
                    backgroundColor: backgroundColors[type] || "rgba(255, 255, 255, 0.9)",
                    "& .MuiAlert-icon": {
                        fontSize: "1.5rem",
                    },
                }}
            >
                {message}
            </MuiAlert>
        </Snackbar>
    );
};

export default CustomAlert;
