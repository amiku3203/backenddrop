 "use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./loginForm.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('https://frontbis.onrender.com/user/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      toast.success('Login successful!');
      setTimeout(() => {
        console.log('Redirecting to /dashboard');
        router.push('/dashboard');
      }, 2000);
    } else {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Login</h1>
        <input 
          type="email" 
          placeholder="email" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="password" 
          name="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
