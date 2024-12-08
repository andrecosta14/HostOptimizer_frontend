import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel, Button, Grid, Card, CardContent, Typography, Box } from '@mui/material';

const ConfiguracaoForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem('token');

      // Ensure the user is authenticated
      if (!token) {
        alert('Usuário não está autenticado.');
        return;
      }

      console.log('Sending data:', data);

      // Send data without userId (let backend handle userId from token)
      // LOCAL SERVER
      //const response = await fetch('http://localhost:3000/api/v1/configuracao', {
      // REMOTE SERVER
      const response = await fetch('https://hostoptimizer.onrender.com/api/v1/configuracao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           authorization: `Bearer ${token}`, // Token in Authorization header
        },
        body: JSON.stringify(data), // No userId here, it will be added by the backend
      });

      if (!response.ok) {
        // Log error details
        const errorDetails = response.headers.get('Content-Type')?.includes('application/json')
          ? await response.json()
          : await response.text();
        console.error('API Error:', response.status, errorDetails);
        alert(`Error: ${response.status} - ${errorDetails}`);
        return;
      }

      const result = await response.json();
      console.log('API Response:', result);
      alert('Configuração criada com sucesso!');
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Ocorreu um erro ao criar a configuração.');
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
    </Box>
  );
};

export default ConfiguracaoForm;
