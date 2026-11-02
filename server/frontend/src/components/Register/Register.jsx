import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const register = async (e) => {
    e.preventDefault();
    let register_url = window.location.origin + "/djangoapp/register";
    const res = await fetch(register_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
      }),
    });
    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem('username', json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
    }
  };

  return (
    <div className="register_container">
      <h2>Sign Up</h2>
      <form onSubmit={register}>
        <div className="input_group">
          <label>Username</label>
          <input type="text" placeholder="Username" required onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className="input_group">
          <label>First Name</label>
          <input type="text" placeholder="First Name" required onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="input_group">
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" required onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="input_group">
          <label>Email</label>
          <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input_group">
          <label>Password</label>
          <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="action_btn">Register</button>
      </form>
    </div>
  );
};

export default Register;
