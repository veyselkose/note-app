import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import SingUp from "./SingUp";
import { setIsSingUp } from "./store/noteSlice";

function Auth() {
  const isSingUp = useSelector((state) => state.isSingUp);
  const dispatch = useDispatch();
  return (
    <div className="auth">
      <div className="auth-container">
        <label className="switch" htmlFor="loginOrSingUp">
          <input
            type="checkbox"
            id="loginOrSingUp"
            checked={isSingUp}
            onChange={() => dispatch(setIsSingUp())}
          />
          <span className="slider">
            <span className="switch-key1">Login</span>
            <span className="switch-key2">Sing Up</span>
          </span>
        </label>

        {isSingUp ? <SingUp /> : <Login />}
      </div>
    </div>
  );
}

export default Auth;
