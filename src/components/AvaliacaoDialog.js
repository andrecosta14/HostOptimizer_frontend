import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import AvaliacaoForm from "./AvaliacaoForm";

const AvaliacaoDialog = ({ open, onClose, configuracaoId, showParentAlert, refetchData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");
            if (!token) {
                showParentAlert("User not authenticated.", "error");
                return;
            }
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/avaliacao`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...data, configuracaoId, userId }),
            });

            if (!response.ok) {
                throw new Error("Error creating evaluation.");
            }
            showParentAlert("Evaluation successfully created!", "success");
            onClose();
            refetchData(); // Refresh the data
        } catch (error) {
            console.error("Error creating evaluation:", error);
            showParentAlert("Error creating evaluation.", "error");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle align={"center"} sx={{ fontWeight: 'bold' }}>EVALUATE HOUSING</DialogTitle>
            <DialogContent >
                <Typography align="center" sx={{ marginBottom: 2 }}>
                    We value your feedback!
                </Typography>
                <Typography align="center" sx={{ marginBottom: 2 }}>
                    Based on the criteria below, evaluate your stay, between 1 and 5, by selecting the score that best reflects your experience:
                </Typography>
                <Typography align="center" sx={{ marginBottom: 2 }}>
                    <strong>1 - Very Poor ; 2 - Poor ; 3 - Average ; 4 - Good ; 5 - Excellent</strong>
                </Typography>
                <Typography align="center" sx={{ marginBottom: 2 }}>
                    Your opinion helps us improve and ensures better experiences for all our guests.
                </Typography>
                <Typography align="center" sx={{ marginBottom: 2 }}>
                    Thank you for sharing your thoughts with us!
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <AvaliacaoForm register={register} errors={errors} />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: '#375030', // Set custom button background color
                            color: '#ffffff', // Set text color to white for better contrast
                            '&:hover': {
                                backgroundColor: '#2f4e1e', // Slightly darker green on hover
                            },
                            mt: 2,
                        }}
                    >
                        Send Evaluation
                    </Button>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AvaliacaoDialog;
