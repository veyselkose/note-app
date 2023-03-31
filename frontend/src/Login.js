import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRemember, login } from "./store/noteSlice";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const remember = useSelector(state => state.remember)
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username: userName, password: password }));
  };
  return (
    <form onSubmit={handleSubmit} className="auth-form">
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
      <label htmlFor="user_remember">
        <input
          type="checkbox"
          name="user_remember"
          id="user_remember"
          value={remember}
          onChange={(e) => {
            dispatch(changeRemember())
          }}
        />
        Remember Me
      </label>
      <input type="submit" value="Login" />
    </form>
  );
}

export default Login;
