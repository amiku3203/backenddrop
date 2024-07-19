
'use client'
import { useState } from 'react';
import styles from '@/app/ui/dashboard/products/addProduct/addProduct.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProductPage = () => {
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', e.target.title.value);
    formData.append('subtitle', e.target.SubTitle.value); // Ensure correct casing
    formData.append('description', e.target.desc.value);
    if (photo) {
      formData.append('photo', photo);
    }
    
    fetch('https://frontbis.onrender.com/addproducthotam', {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      toast.success('Product added successfully!');
      console.log('Product added successfully:', data);
    })
    .catch(error => {
      toast.error('Error adding product: ' + error.message);
      console.error('Error adding product:', error);
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" name="title" required />
        <input type="text" placeholder="SubTitle" name="SubTitle" />
        <textarea
          required
          name="desc"
          id="desc"
          rows="16"
          placeholder="Description"
        ></textarea>
        <input type="file" name="photo" onChange={handleFileChange} accept="image/*" />
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProductPage;
