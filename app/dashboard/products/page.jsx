 "use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ui/dashboard/products/product.module.css";
import Search from "@/app/ui/dashboard/search/search";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles1 from "@/app/ui/dashboard/products/addProduct/addProduct.module.css";

const ProductsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    images: []
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://frontbis.onrender.com/allhotamproduct");
        const data = await response.json();
        console.log("data", data);
        
        setProjects(data.project);
      } catch (error) {
        console.log("Error getting projects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://frontbis.onrender.com/hotamproduct/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProjects(projects.filter((project) => project._id !== id));
        toast.success("Product deleted successfully");
      } else {
        toast.error("Error deleting product");
        console.log("Error deleting project");
      }
    } catch (error) {
      toast.error("Error deleting product");
      console.log("Error deleting project", error);
    }
  };

  const handleEdit = (project) => {
    setSelectedProduct(project);
    setFormData({
      title: project.title,
      subtitle: project.subtitle,
      description: project.description,
      images: project.images || []
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      // Handle file upload for images
      const files = Array.from(e.target.files);
      const uploadedImages = files.map(file => URL.createObjectURL(file));
      setFormData({ ...formData, images: [...formData.images, ...uploadedImages] });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://frontbis.onrender.com/hotamproduct/${selectedProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Product updated successfully");
        // Update local state to reflect changes
        setProjects(projects.map((project) =>
          project._id === selectedProduct._id ? { ...project, ...formData } : project
        ));
        setIsEditing(false);
        setSelectedProduct(null);
      } else {
        toast.error("Error updating product");
        console.log("Error updating product");
      }
    } catch (error) {
      toast.error("Error updating product");
      console.log("Error updating product", error);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.top}>
        <Search placeholder="Search for a product..." />
        <Link href="/dashboard/products/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      {isEditing && selectedProduct && (
        <div className={styles1.container} style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#f9f9f9", margin: "20px 0" }}>
          <form style={{ display: "flex", flexDirection: "column", gap: "15px" }} onSubmit={handleSubmit}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Edit Product</h2>
            <label style={{ fontWeight: "bold" }}>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <label style={{ fontWeight: "bold" }}>Subtitle:</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <label style={{ fontWeight: "bold" }}>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", minHeight: "100px" }}
            />
            <label style={{ fontWeight: "bold" }}>Upload Images:</label>
            <input
              type="file"
              multiple
              onChange={handleChange}
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <div className={styles.images}>
              <h3 style={{ fontWeight: "bold" }}>Images:</h3>
              {formData.images.map((img, index) => (
                <div key={index} className={styles.imagePreview} style={{ display: "inline-block", margin: "5px" }}>
                  <Image
                    src={img}
                    alt={`Image ${index + 1}`}
                    width={70}
                    height={70}
                    style={{ borderRadius: "5px", objectFit: "cover" }}
                    onError={(e) => { e.target.src = "/noproduct.jpg"; }}
                  />
                </div>
              ))}
            </div>
            <button type="submit" style={{ padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#4CAF50", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>Update Product</button>
          </form>
        </div>
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>SubTitle</td>
            <td>Description</td>
            <td>Images</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : (
            projects.map((project) => (
              <tr key={project._id}>
                <td>
                  <div className={styles.product}>
                    <Image
                      src={`https://frontbis.onrender.com/${project.photo}` || "/noproduct.jpg"}
                      alt={project.title}
                      width={40}
                      height={40}
                      className={styles.productImage}
                      onError={(e) => { e.target.src = "/noproduct.jpg"; }}
                    />
                    {project.title}
                  </div>
                </td>
                <td>{project.subtitle}</td>
                <td>{project.description}</td>
                <td>
                  <Image
                    src={`https://frontbis.onrender.com/${project.photo}` || "/noproduct.jpg"}
                    alt={project.title}
                    width={70}
                    height={70}
                    className={styles.productImage}
                    onError={(e) => { e.target.src = "/noproduct.jpg"; }}
                  />
                </td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/products/${project._id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => handleEdit(project)}
                      className={`${styles.button} ${styles.edit}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className={`${styles.button} ${styles.delete}`}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
