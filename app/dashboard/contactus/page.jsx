"use client"
import { useState } from 'react';
 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const page= () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    instagram: '',
    facebook: '',
    pinterest: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://frontbis.onrender.com/addcontact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  console.log("response", response);
      if (response.ok) {
        toast.success('Contact added successfully!');
        setFormData({
          name: '',
          email: '',
          mobile: '',
          instagram: '',
          facebook: '',
          pinterest: '',
        });
      } else {
        toast.error('Failed to add contact.');
      }
    } catch (error) {
      toast.error('An error occurred while adding the contact.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
     <ToastContainer/>
      <div style={styles.formGroup}>
        <label htmlFor="name" style={styles.label}>Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="email" style={styles.label}>Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="mobile" style={styles.label}>Mobile Number:</label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="instagram" style={styles.label}>Instagram ID:</label>
        <input
          type="text"
          id="instagram"
          name="instagram"
          value={formData.instagram}
          onChange={handleChange}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="facebook" style={styles.label}>Facebook ID:</label>
        <input
          type="text"
          id="facebook"
          name="facebook"
          value={formData.facebook}
          onChange={handleChange}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="pinterest" style={styles.label}>Pinterest ID:</label>
        <input
          type="text"
          id="pinterest"
          name="pinterest"
          value={formData.pinterest}
          onChange={handleChange}
          style={styles.input}
        />
      </div>
      <button type="submit" style={styles.button}>Submit</button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: '600px',
    margin: '10px 10px 0  10px',
    // marginTop:"40px"
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default page;
