import axios from "axios";
import { useLogin } from "@refinedev/core";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Container, Divider, Typography } from "@mui/material";
import record from '../../assets/record.png';

import styles from './login.module.css';

import { CredentialResponse } from "../../interfaces/google";



// Todo: Update Google Client ID here
const GOOGLE_CLIENT_ID =
  "1041339102270-e1fpe2b6v6u1didfndh7jkjmpcashs4f.apps.googleusercontent.com";

export const Login: React.FC = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login } = useLogin();

  const handlelogin = (event: React.FormEvent) => {
    event.preventDefault();
    axios.post('http://localhost:3001/login',
      { email: email, password: password }
    ).then((response) => {
      if (response.data.message) {
        alert(response.data.message);
      }
      else {
        console.log(response.data);
        login(response.data);
        // Redirect the user to the dashboard
        login(response.data);
        navigate('/');
      }
    });
  };

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "outline",
          size: "large",
          type: "standard",
          width: "325px",
          shape: 'rectangular',
          logo_alignment: 'left',
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2.1}
      >

        <div className={styles.mybackground}>
        </div>
        <form className={styles.myform}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <img src={record} alt="logo" className={styles.mylogo} />
          </Box>
          <h2 className={styles.myh2}>Hi, Welcome Back</h2>

          <input
            className={styles.myinput}
            type="text"
            placeholder="Email or Phone"
            id="username"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className={styles.myinput}
            type="password"
            placeholder="Password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2.1}
          >
            <button
              className={styles.mybutton}
              type="submit"
              onClick={handlelogin}
            >Log In</button>
            <Divider style={{ background: 'black' }} variant="middle" />
            <GoogleButton />
          </Box>
        </form>
      </Box>
    </Container>
  );
};
