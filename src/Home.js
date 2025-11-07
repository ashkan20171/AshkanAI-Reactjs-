import React from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';

const Home = () => {
  return (
    <Container style={{ marginTop: '50px' }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h3">Welcome to the AI Website</Typography>
          <Typography variant="h6" paragraph>
            Discover the power of artificial intelligence to transform your business and life.
          </Typography>
          <Button variant="contained" color="primary">
            Learn More
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src="https://via.placeholder.com/400" alt="AI Illustration" style={{ width: '100%' }} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
