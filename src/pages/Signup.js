import React, { useState } from "react";
import styled from "styled-components";
import {
  createUserWithEmailAndPassword
} from "firebase/auth";
import { firebaseAuth } from "../firebase";
import capchabg from "./capchabg.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const toastOptions = {
        position: "top-center",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [capchinput, setCapchinput] = useState({
    capcha: "",
  });


  const characters = "abc123";            //to make captcha
  const generateString = () => {
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * 6));
    }
    return result;
  };
  const captcha = generateString();



  let handleChange = (e) => {             //assign value
    let name = e.target.name;
    let value = e.target.value;
    capchinput[name] = value;
    setCapchinput(capchinput);
  };


  const hadleValidation = () => {          //to validate captcha
    const { capcha } = capchinput;
    if (captcha !== capcha) {
        toast.error(
            "icorrect Captcha",
            toastOptions
          );
      return false;
    }
    return true;
  };
  const handleSubmit = async (event) => {       //to SignUp 
    event.preventDefault();
    if (hadleValidation()) {
      try {
        const { email, password } = formValues;
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
        toast.success(
            "SignUp Succesfull",
            toastOptions
          );
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
    <Container>
      <form action="" onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
          <h1>SIGNUP</h1>
        </div>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formValues.email}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              [e.target.name]: e.target.value,
            })
          }
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formValues.password}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              [e.target.name]: e.target.value,
            })
          }
        />
        <span>
            Are you Human ?
          </span>
        <div className="capch">
          <img src={capchabg} height="50" width="100%" />
          <h4>{captcha}</h4>
        </div>
        <input
          type="text"
          placeholder="captcha text"
          name="capcha"
          onChange={handleChange}
        />
        <button type="submit">Create User</button>
      </form>
    </Container>
    <ToastContainer />
    </>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .capch {
    position: relative;
    h4 {
      position: absolute;
      top: -7px;
      left: 95px;
    }
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    h1 {
      color: white;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
  }
`;
