import { useState,useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    const auth=localStorage.getItem("user")
    if(auth){
      navigate('/')
    }
  },[])
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log({ email, password });
    try {
      const data = await fetch("https://bookweb-backend-yx1p.vercel.app/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await data.json();
      console.log(result);
      if (result.email) {
        localStorage.setItem("user", JSON.stringify(result));
        navigate('/');
      } else {
        alert("enter correct user email");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  return (
    <div className="signup_details">
      <h1>Login to your account</h1>

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
      <button type="submit" className="signup_button" onClick={handleLogin}>
        Login
      </button>
      <hr />
        <p className="or">OR</p>
        <p>
          Don't have an account?
         <Link to='/Signup'>Signup</Link>
        </p>
    </div>
  );
}

export default LogIn;
