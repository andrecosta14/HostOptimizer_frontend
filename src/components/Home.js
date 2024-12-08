const Home = () => {
  return (
    <div style={styles.container}>
      <h1><b>Welcome to HostOptimizer</b></h1>
      <h3>Elevate Your Stay Experience</h3>
      <p style={styles.paragraph}>HostOptimizer is your ultimate companion for enhancing the guest experience and optimizing property management. Designed for both property owners and guests, our innovative platform ensures that guest expectations are met while providing actionable feedback to property owners.</p>
      <p style={styles.paragraph}>Our mission is to transform the stay experience across all types of accommodations by enabling property owners to efficiently manage guest needs and expectations.</p>
      <p style={styles.paragraph}>By collecting and analyzing both qualitative and quantitative feedback, HostOptimizer delivers valuable insights into key areas such as cleanliness, comfort, and service quality. With this information, property owners can make small yet impactful adjustments to elevate their service, resulting in happier guests and better reviews.</p>
      <p style={styles.paragraph}>Whether you’re a guest seeking a seamless stay or a property owner striving for excellence, HostOptimizer is here to foster personalized and satisfying experiences.</p>
      <p style={styles.paragraph}>Together, let’s create memorable stays, drive positive feedback, and build guest loyalty.</p>
      <p style={styles.paragraph}><b>Experience the difference with HostOptimizer – Because every stay matters!</b></p>
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
  paragraph: {
    textAlign: 'justify',
    marginTop: '30px',
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