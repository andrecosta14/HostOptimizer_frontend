import React, { useEffect, useState } from "react";
import axios, {postForm} from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    Box,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useForm } from "react-hook-form";

const AvaliacaoDialog = ({ open, onClose, configuracaoId }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("User não autenticado.");
                return;
            }

            // LOCAL SERVER
            //const response = await fetch("http://localhost:3000/api/v1/avaliacao", {
            // REMOTE SERVER
            const response = await fetch("https://hostoptimizer.onrender.com/api/v1/avaliacao", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...data, configuracaoId }),
            });

            if (!response.ok) {
                throw new Error("Erro ao criar avaliação.");
            }

            alert("Avaliação criada com sucesso!");
            onClose(); // Close dialog on successful submission
        } catch (error) {
            console.error("Erro ao criar avaliação:", error);
            alert("Erro ao criar avaliação.");
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
                    <Grid container spacing={3} paddingTop={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Cleaning"
                                type="number"
                                fullWidth
                                {...register("eCleaning", { required: "Cleanliness level is mandatory" })}
                                error={!!errors.eCleaning}
                                helperText={errors.eCleaning?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Comfort"
                                type="number"
                                fullWidth
                                {...register("eComfort", { required: "Comfort level is mandatory" })}
                                error={!!errors.eComfort}
                                helperText={errors.eComfort?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Service"
                                type="number"
                                fullWidth
                                {...register("eService", { required: "The level of service is mandatory" })}
                                error={!!errors.eService}
                                helperText={errors.eService?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Additional Services"
                                type="number"
                                fullWidth
                                {...register("eAddservices", { required: "The level of additional services is mandatory" })}
                                error={!!errors.eAddservices}
                                helperText={errors.eAddservices?.message}
                            />
                        </Grid>
                    </Grid>
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

const Avaliacao = () => {
    const [configuracoes, setConfiguracoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedConfiguracaoId, setSelectedConfiguracaoId] = useState(null);
    const [avaliacoesByTheUser, setAvaliacoes] = useState([]);



    useEffect(() => {
        const fetchConfiguracoes = async () => {
            try {
                try {
                    // LOCAL SERVER
                    //const theResp = await axios.get("http://localhost:3000/api/v1/avaliacao", {
                    // REMOTE SERVER
                    const theResp = await axios.get("https://hostoptimizer.onrender.com/api/v1/avaliacao", {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    const avaliacoesByTheUser = theResp.data.filter(
                        (config) => config.userId === localStorage.getItem("userId")
                    );

                    // Use the filtered data instead of the entire response
                    setAvaliacoes(avaliacoesByTheUser);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching avaliacoes:", error);
                    setLoading(false);
                }

                // LOCAL SERVER
                //const response = await axios.get("http://localhost:3000/api/v1/configuracao", {
                // REMOTE SERVER
                const response = await axios.get("https://hostoptimizer.onrender.com/api/v1/configuracao", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const unfinishedConfiguracoes = response.data.filter((config) => {
                    return !avaliacoesByTheUser.some(
                        (avaliacao) => avaliacao.configuracaoId === config._id
                    );
                });

                setConfiguracoes(unfinishedConfiguracoes);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching configuracoes:", error);
                setLoading(false);
            }
        };
        fetchConfiguracoes();
    }, []);

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
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    let showAlert;
    let handleCloseAlert;
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
            />
        </Box>
    );
};

export default Avaliacao;