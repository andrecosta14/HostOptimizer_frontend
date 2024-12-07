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
import StarIcon from "@mui/icons-material/Star";
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

      const response = await fetch("http://localhost:3000/api/v1/avaliacao", {
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
      <DialogTitle align={"center"} >Avaliar Prova</DialogTitle>
      <DialogContent >
        <form onSubmit={handleSubmit(onSubmit)} >
          <Grid container spacing={3} paddingTop={2}>
            <Grid item xs={12}>
              <TextField
                label="Peso Aroma"
                type="number"
                fullWidth
                {...register("nRooms", { required: "Peso Aroma é obrigatório" })}
                error={!!errors.nRooms}
                helperText={errors.nRooms?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Peso Cor"
                type="number"
                fullWidth
                {...register("nBedrooms", { required: "Peso Cor é obrigatório" })}
                error={!!errors.nBedrooms}
                helperText={errors.nBedrooms?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Peso Sabor"
                type="number"
                fullWidth
                {...register("nWC", { required: "Peso Sabor é obrigatório" })}
                error={!!errors.nWC}
                helperText={errors.nWC?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Peso Corpo"
                type="number"
                fullWidth
                {...register("nBedroomspo", { required: "Peso Corpo é obrigatório" })}
                error={!!errors.nBedroomspo}
                helperText={errors.nBedroomspo?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Peso Persistência"
                type="number"
                fullWidth
                {...register("pesoPersistencia", { required: "Peso Persistência é obrigatório" })}
                error={!!errors.pesoPersistencia}
                helperText={errors.pesoPersistencia?.message}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Enviar Avaliação
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
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
            const theResp = await axios.get("http://localhost:3000/api/v1/avaliacao", {
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

        const response = await axios.get("http://localhost:3000/api/v1/configuracao", {
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
          sx={{ fontWeight: "bold", color: "darkblue", marginBottom: 3 }}
        >
          Avaliações a Decorrer
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Tipo Prova</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nível Apreciação</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tipo Vinho</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Localização</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Duração Prova</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Avaliar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {configuracoes.map((config) => (
              <TableRow key={config._id}>
                <TableCell>{config.typeHousing}</TableCell>
                <TableCell>{config.eCleaning}</TableCell>
                <TableCell>{config.eComfort}</TableCell>
                <TableCell>{config.location}</TableCell>
                <TableCell>{config.eAddservices}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleAvaliarClick(config._id)}
                  >
                    <StarIcon />
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