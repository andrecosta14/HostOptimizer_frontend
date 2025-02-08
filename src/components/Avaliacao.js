import React, { useState } from "react";
import { Box, CircularProgress, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import useFetchData from "./hooks/useFetchData";
import AvaliacaoDialog from "./AvaliacaoDialog";
import CustomAlert from "./CustomAlert";

const Avaliacao = () => {
    console.log(process.env.REACT_APP_API_BASE_URL);
    const { configuracoes, loading, alert, showAlert, refetchData, closeAlert } = useFetchData();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedConfiguracaoId, setSelectedConfiguracaoId] = useState(null);

    const handleAvaliarClick = (id) => {
        setSelectedConfiguracaoId(id);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedConfiguracaoId(null);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            sx={{ minHeight: "91vh", bgcolor: "#f9f9f9", padding: 3 }}
        >
            <TableContainer
                component={Paper}
                sx={{
                    width: "70%",
                    padding: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    height: "70vh",
                    overflowY: 'auto',
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ color: 'black', fontWeight: 'bold', marginBottom: 3 }}
                >
                    Evaluations in Progress
                </Typography>
                <Typography
                    variant="body1"
                    component="p"
                    align="center"
                    gutterBottom
                    sx={{ color: 'black', marginBottom: 4 }}
                >
                    Share your stay experience with us to help ensure your feedback aligns with the owner's expectations and enhances future visits.
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Housing Name</TableCell>
                            <TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Cleaning</TableCell>
                            <TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Comfort</TableCell>
                            <TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Service</TableCell>
                            <TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Additional Services</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Evaluate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {configuracoes.map((config) => (
                            <TableRow key={config._id}>
                                <TableCell sx={{ textAlign: 'center' }}>{config.nameHousing}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{config.eCleaning}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{config.eComfort}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{config.eService}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{config.eAddservices}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleAvaliarClick(config._id)}
                                        sx={{
                                            color: '#375030', // Set the star icon button color
                                            '&:hover': {
                                                color: '#2f4e1e', // Slightly darker green on hover
                                            },
                                        }}
                                    >
                                        <HomeIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <AvaliacaoDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                configuracaoId={selectedConfiguracaoId}
                showParentAlert={showAlert}
                refetchData={refetchData} // Pass refetchData here
            />
            <CustomAlert
                open={alert.open}
                message={alert.message}
                type={alert.type}
                onClose={() => closeAlert()} // Close the alert when it's dismissed
            />
        </Box>
    );
};

export default Avaliacao;
