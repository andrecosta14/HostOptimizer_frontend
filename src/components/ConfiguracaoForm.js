import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel, Button, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import CustomAlert from "./CustomAlert";

// Observer Pattern: AlertSubject and AlertObserver
class AlertSubject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class AlertObserver {
  constructor(updateCallback) {
    this.update = updateCallback;
  }
}

const alertSubject = new AlertSubject();

const ConfiguracaoForm = () => {
  const [alert, setAlert] = useState({ open: false, message: "", type: "" });

  const showAlert = (message, type) => {
    alertSubject.notify({ open: true, message, type });
  };

  useEffect(() => {
    const alertObserver = new AlertObserver((data) => {
      setAlert(data);
    });

    alertSubject.subscribe(alertObserver);

    // Cleanup on unmount
    return () => alertSubject.unsubscribe(alertObserver);
  }, []);

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        showAlert('User não está autenticado.', "error");
        return;
      }

      console.log('Sending data:', data);
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/deploy-atividade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorDetails = response.headers.get('Content-Type')?.includes('application/json')
            ? await response.json()
            : await response.text();
        console.error('API Error:', response.status, errorDetails);
        showAlert(`Error: ${response.status} - ${errorDetails}`, "error");
        return;
      }

      const result = await response.json();
      console.log('API Response:', result);
      showAlert('Configuração criada com sucesso!', "success");

      // Reset the form after successful submission
      reset();
    } catch (error) {
      console.error('Fetch error:', error);
      showAlert('Ocorreu um erro ao criar a configuração.', 'error');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ minHeight: '100vh', bgcolor: '#f9f9f9', padding: 3 }}
    >
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{ color: 'black', fontWeight: 'bold', marginBottom: 4 }}
      >
        Housing Details
      </Typography>

      <Typography
          variant="body1"
          component="p"
          align="center"
          gutterBottom
          sx={{ color: 'black', marginBottom: 4 }}
      >
        Specify your housing, as well as the desired evaluation metrics:
      </Typography>

      <Typography
          variant="body1"
          component="p"
          align="center"
          gutterBottom
          sx={{ color: 'black', fontWeight: 'bold', marginBottom: 4 }}
      >
        1 - Very Poor ; 2 - Poor ; 3 - Average ; 4 - Good ; 5 - Excellent
      </Typography>

      <Card sx={{ width: '70%' }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* Housing Name */}
              <Grid item xs={12}>
                <TextField
                  label="Housing Name"
                  variant="filled"
                  fullWidth
                  {...register('nameHousing', { required: 'The housing name is mandatory' })}
                  error={!!errors.nameHousing}
                  helperText={errors.nameHousing?.message}
                />
              </Grid>
              {/* Housing Type */}
              <Grid item xs={12}>
                <TextField
                  label="Housing Type"
                  variant="filled"
                  fullWidth
                  {...register('typeHousing', { required: 'The housing type is mandatory' })}
                  error={!!errors.typeHousing}
                  helperText={errors.typeHousing?.message}
                />
              </Grid>

              {/* Location */}
              <Grid item xs={12}>
                <TextField
                    label="Location"
                    variant="filled"
                    fullWidth
                    {...register('location', { required: 'Location is mandatory' })}
                    error={!!errors.location}
                    helperText={errors.location?.message}
                />
              </Grid>

              {/* Characteristics */}
              <Grid container item spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    label="Rooms"
                    type="number"
                    variant="filled"
                    fullWidth
                    {...register('nRooms', { required: 'The number of rooms is mandatory' })}
                    error={!!errors.nRooms}
                    helperText={errors.nRooms?.message}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Bedrooms"
                    type="number"
                    variant="filled"
                    fullWidth
                    {...register('nBedrooms', { required: 'The number of bedrooms is mandatory' })}
                    error={!!errors.nBedrooms}
                    helperText={errors.nBedrooms?.message}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="WC"
                    type="number"
                    variant="filled"
                    fullWidth
                    {...register('nWC', { required: 'Peso Sabor é obrigatório' })}
                    error={!!errors.nWC}
                    helperText={errors.nWC?.message}
                  />
                </Grid>
                <Grid item xs={3}>
                </Grid>
              </Grid>

              {/* Evaluation Metrics */}
              <Grid item xs={3}>
                <TextField
                  label="Cleaning"
                  type="number"
                  variant="filled"
                  fullWidth
                  {...register('eCleaning', { required: 'Cleanliness level is mandatory' })}
                  error={!!errors.eCleaning}
                  helperText={errors.eCleaning?.message}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  label="Comfort"
                  type="number"
                  variant="filled"
                  fullWidth
                  {...register('eComfort', { required: 'Comfort level is mandatory' })}
                  error={!!errors.eComfort}
                  helperText={errors.eComfort?.message}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  label="Service"
                  type="number"
                  variant="filled"
                  fullWidth
                  {...register('eService', { required: 'The level of service is mandatory' })}
                  error={!!errors.eService}
                  helperText={errors.eService?.message}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  label="Additional Services"
                  type="number"
                  variant="filled"
                  fullWidth
                  {...register('eAddservices', { required: 'The level of additional services is mandatory' })}
                  error={!!errors.eAddservices}
                  helperText={errors.eAddservices?.message}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={Object.keys(errors).length > 0}
                    sx={{
                      backgroundColor: '#375030', // Set custom button background color
                      color: '#ffffff', // Set text color to white for better contrast
                      '&:hover': {
                        backgroundColor: '#2f4e1e', // Slightly darker green on hover
                      },
                    }}
                >
                  Create Housing
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <CustomAlert
          open={alert.open}
          message={alert.message}
          type={alert.type}
          onClose={handleCloseAlert}
      />
    </Box>
  );
};

export default ConfiguracaoForm;
