"use client";
import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch("https://frontbis.onrender.com/gallery");
      const data = await response.json();
      console.log("data", data);
      setGalleryImages(data?.allimages);
    } catch (error) {
      console.error("Failed to fetch gallery images:", error);
      toast.error("Failed to fetch gallery images!");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    for (const file of files) {
      formData.append("photos", file);
    }

    try {
      const response = await fetch("http://localhost:4000/upload-multiple", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Upload successful!");
        fetchGalleryImages(); // Refresh gallery images
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to upload images!");
    }
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);

    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setSelectedImages(imageUrls);
  };

  const handleDelete = async (imageId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/delete-image/${imageId}`,
        {
          method: "DELETE",
        }
      );
console.log("response", response);
      if (response.ok) {
        toast.success("Image deleted successfully!");
        fetchGalleryImages(); // Refresh gallery images
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete image!");
    }
  };

  return (
    <>
      <ToastContainer />
      <div style={styles.container}>
        <h2 style={styles.heading}>Upload Multiple Images</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={styles.fileInput}
            required
          />
          <button type="submit" style={styles.button}>
            Upload
          </button>
        </form>

        <div style={styles.imagePreviewContainer}>
          <h3 style={styles.subheading}>Selected Images</h3>
          <div style={styles.imagesContainer}>
            {selectedImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Selected ${index}`}
                style={styles.image}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={styles.galleryContainer}>
        {galleryImages.map((image) => (
          <div key={image.id} style={styles.imageWrapper}>
            <h3 style={styles.subheading}>{image?.title}</h3>
            <img
              src={`http://localhost:4000/${image.photo}` || "/noproduct.jpg"}
              alt={`Gallery ${image.id}`}
              style={styles.galleryImage}
            />
            <button
              style={styles.deleteButton}
              onClick={() => handleDelete(image._id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    marginTop: "20px",
    margin: "0 auto",
    maxWidth: "500px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  input: {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  fileInput: {
    marginBottom: "10px",
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
  },
  imagePreviewContainer: {
    marginTop: "20px",
    width: "50%",
  },
  subheading: {
    marginBottom: "10px",
    textAlign: "center",
  },
  imagesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px",
  },
  image: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  galleryContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    padding: "20px",
  },
  imageWrapper: {
    position: "relative",
    border: "1px solid #ccc",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  galleryImage: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    display: "block",
  },
  deleteButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#d9534f",
    fontSize: "16px",
    transition: "color 0.3s",
  },
  deleteButtonHover: {
    color: "#ff0000",
  },
};

export default Page;
