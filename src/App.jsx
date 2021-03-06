import React, { useRef } from "react";
import "./App.scss";
import { useStore } from "./context/FormContext";

export const initialState = {
  email: "",
  password: "",
  repeatPass: "",
  checked: true,
};

export default function App() {
  const formElRef = useRef(null);
  const [formState, dispatch] = useStore();
  const isMatchPassword = formState.password === formState.repeatPass;

  const clearInputs = () => {
    formElRef.current.reset();
    // dispatch({
    //   type: "CLEAR_FORM",
    // });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {
      email: e.target.email.value,
      password: e.target.password.value,
      repeatPass: e.target.repeatPass.value,
      checked: e.target.remember.checked,
    };
    if (isMatchPassword) {
      dispatch({
        type: "HANDLE_SUBMIT",
        payload: values,
      });
    }
    alert("it works! check your dev tools");
    clearInputs();
  };
  console.log("updated form values", formState);

  const handleCancel = (e) => {
    e.preventDefault();
    clearInputs();
  };

  return (
    <section className="container">
      <form ref={formElRef} className="form-area" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Sign Up</h2>
          <p>Please Fill up in this Form to creat an account</p>
          <hr />
        </div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          autoFocus
          required
        ></input>
        <p className="errorMsg">{}</p>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          autoFocus
          required
        ></input>
        <p className="errorMsg"></p>
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeatPass"
          placeholder="Repeat Password"
          autoFocus
          required
        ></input>
        <span className="errorMsg">
          {!isMatchPassword ? <p>Password not match</p> : null}
        </span>
        <div className="form-footer">
          <input name="remember" type="checkbox" />
          <span>Remember Me</span>
          <p>
            By creating an account you agree to our{" "}
            <a href="">Terms & Privacy</a>
          </p>
        </div>
        <div className="btn-container">
          <button onClick={handleCancel} id="cancel">
            Cancel
          </button>
          <button disabled={!isMatchPassword} type="submit" id="sign-up">
            Sign Up
          </button>
        </div>
      </form>
    </section>
  );
}
