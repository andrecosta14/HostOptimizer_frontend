const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Bem-vindo ao HostOptimizer!</h1>
      <p>Novidades em breve...</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '20px',
    lineHeight: '1.6',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  highlight: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginTop: '30px',
    marginBottom: '15px',
    fontSize: '1.5em',
    color: '#333',
  },
};

export default Home;