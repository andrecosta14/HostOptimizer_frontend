import { Grid, TextField } from "@mui/material";

const AvaliacaoForm = ({ register, errors }) => {
    return (
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
    );
}

export default AvaliacaoForm;
