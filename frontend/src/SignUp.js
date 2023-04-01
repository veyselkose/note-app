import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "./store/noteSlice";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp({ username: userName, password: password, email: email }));
  };
  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <label htmlFor="user_email">Email</label>
      <input
        type="email"
        name="user_email"
        id="user_email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label htmlFor="user_username">Username</label>
      <input
        type="text"
        name="user_username"
        id="user_username"
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <label htmlFor="user_password">Password</label>
      <input
        type="password"
        name="user_password"
        id="user_password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input type="submit" value="Sign Up" />
    </form>
  );
}

export default SignUp;
