import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = () => {
    const [configuracoes, setConfiguracoes] = useState([]);
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ open: false, message: "", type: "" });
    const showAlert = (message, type) => {
        setAlert({ open: true, message, type });
    };

    const closeAlert = () => {
        setAlert({ ...alert, open: false });
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");
            if (!token || !userId) {
                showAlert("User not authenticated.", "error");
                setLoading(false);
                return;
            }

            const [avaliacoesResp, configuracoesResp] = await Promise.all([
                axios.get(`${process.env.REACT_APP_API_BASE_URL}/avaliacao`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get(`${process.env.REACT_APP_API_BASE_URL}/configuracao`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            const avaliacoes = avaliacoesResp.data.filter(
                (avaliacao) => avaliacao.userId === userId
            );

            const unfinishedConfiguracoes = configuracoesResp.data.filter(
                (config) =>
                    config.finalizado === "false" &&
                    !avaliacoes.some((avaliacao) => avaliacao.configuracaoId === config._id)
            );

            setAvaliacoes(avaliacoes);
            setConfiguracoes(unfinishedConfiguracoes);
        } catch (error) {
            console.error("Error fetching data:", error);
            showAlert(error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    const refetchData = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { configuracoes, avaliacoes, loading, alert, showAlert, closeAlert, refetchData };
};

export default useFetchData;
