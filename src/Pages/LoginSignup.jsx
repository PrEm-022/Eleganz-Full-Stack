import React, { useState, useContext } from "react";
import "./CSS/LoginSignup.css";
import { ShopContext } from "../Context/ShopContext";
import { auth } from "../../Firebase/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";

const LoginSignup = () => {
  const { addCustomer } = useContext(ShopContext);
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login function executed with Firebase", formData);

    let email = formData.email;
    if (email === "admin@123") {
      email = "admin123@elegence.com";
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, formData.password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      localStorage.setItem("auth-token", token);
      window.location.replace("/");
    } catch (error) {
      console.error("Firebase Login Error", error);
      alert(error.message);
    }
  };

  const signup = async () => {
    console.log("Sign Up function executed with Firebase", formData);

    let email = formData.email;
    if (email === "admin@123") {
      email = "admin123@elegence.com";
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, formData.password);
      const user = userCredential.user;
      
      // Update display name if username is provided
      if (formData.username) {
        await updateProfile(user, { displayName: formData.username });
      }

      // Save customer details to database logs
      await addCustomer({
        name: formData.username || "Customer",
        email: email
      });

      const token = await user.getIdToken();
      localStorage.setItem("auth-token", token);
      window.location.replace("/");
    } catch (error) {
      console.error("Firebase Sign Up Error", error);
      alert(error.message);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Your Password"
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          <></>
        )}
        {state === "Login" ? (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click here
            </span>
          </p>
        ) : (
          <></>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing I agree to the terms of use and privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
