import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import SignUp from "./SignUp";
import { setIsSignUp } from "./store/noteSlice";

function Auth() {
  const isSignUp = useSelector((state) => state.isSignUp);
  const dispatch = useDispatch();
  return (
    <div className="auth">
      <div className="auth-container">
        <label className="switch" htmlFor="loginOrSignUp">
          <input
            type="checkbox"
            id="loginOrSignUp"
            checked={isSignUp}
            onChange={() => dispatch(setIsSignUp())}
          />
          <span className="slider">
            <span className="switch-key1">Login</span>
            <span className="switch-key2">Sign Up</span>
          </span>
        </label>

        {isSignUp ? <SignUp /> : <Login />}
      </div>
    </div>
  );
}

export default Auth;
