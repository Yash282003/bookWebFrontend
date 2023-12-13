import React, { useState,useEffect } from "react";
import "../css/SignUp.css";
import { useNavigate,Link } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const navigate=useNavigate();
  useEffect(()=>{
    const auth=localStorage.getItem("user")
    if(auth){
      navigate('/')
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch('https://bookweb-backend-1ux3.vercel.app/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!data.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await data.json();
      console.log(result);
      localStorage.setItem("user",JSON.stringify(result));
      navigate('/')
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };


  return (
    <div className="signup_details">
      <h1>SignUp Now</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="name"
          className="input_box"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="input_box"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input_box"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPwd(e.target.value)}
        />
        <p>
          <span>
            <input type="checkbox" />
          </span>
          I agree to the terms of services{" "}
        </p>
        <button type="submit" className="signup_button">
          Sign up
        </button>
        <hr />
        <p className="or">OR</p>
        <p>
          Do you already have an account?
         <Link to='/Login'>Log in</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;