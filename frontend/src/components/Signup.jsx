import { useState, useRef, useEffect } from "react";
import { PageWrapper } from "../Assests/Wrappers/index";
import styled from "styled-components";
import { useAuth } from "./context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup, signin, currentUser } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRef.current.value || !passwordRef.current.value) {
      toast.error("Please fill out all the fields");
      return;
    }

    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      isRegistered
        ? await signin(email, password)
        : await signup(email, password);

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);
  return (
    <PageWrapper>
      <Wrapper className="form">
        <h1>Let's Sign You In.</h1>
        <h2>Welcome to NipponGPT.</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Your Email" ref={emailRef} />
          <input
            type="password"
            placeholder="Your Password"
            ref={passwordRef}
          />
          <button className="btn" type="submit">
            {!isRegistered ? "Register" : "Sign In"}
          </button>
        </form>
        <h4 onClick={() => setIsRegistered(!isRegistered)}>
          {!isRegistered ? "Do you have an account?" : "Don't have an account?"}
          <span id="register"> {!isRegistered ? "Sign in" : "Register"}</span>
        </h4>
      </Wrapper>
    </PageWrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 2rem;
  padding: 5rem;
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    margin-top: 5rem;
    input {
      padding: 2rem;
      width: 100%;
      background-color: transparent;
      border: #eee solid 1px;
      border-radius: 20px;
      color: #fff;
    }

    input:focus {
      border: 1px solid var(--primary-color);
    }
  }
  h4 {
    align-self: center;
    justify-self: end;
    margin-top: 4rem;

    #register {
      color: #189ab4;
      cursor: pointer;
    }
  }
`;
export default Signup;
