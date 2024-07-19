"use client"
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [numberOfProjects, setNumberOfProjects] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:4000/allhotamproduct');
        const data = await response.json();
        console.log(data);
        setProjects(data.project.length);
        setNumberOfProjects(data.project.length);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Dashboard</h1>
      <p style={styles.info}>Number of Projects: {numberOfProjects}</p>
       
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    fontSize: '2em',
  },
  info: {
    textAlign: 'center',
    margin: '20px 0',
  },
  projectsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  projectCard: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px',
    width: 'calc(100% - 40px)',
    maxWidth: '300px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s',
  },
  projectTitle: {
    fontSize: '1.5em',
    margin: '0 0 10px',
  },
  projectDescription: {
    fontSize: '1em',
    color: '#555',
  },
};

export default Dashboard;
