import React, { useEffect, useRef, useState } from "react";
import {
  MainTemplate,
  Button,
  IconButton,
  TextField,
  FontAwesomeIcon,
  faChevronLeft,
  faFacebook,
  axios,
  Link,
  FilledInput,
  InputAdornment,
  InputLabel,
  FormControl,
  clientData,
  useHistory,
  UserAuthContext,
  faEye,
  faEyeSlash
} from "./managers/ImportManager";

import Cookies from "universal-cookie";

export default function Login() {
  const cookies = new Cookies();
  let history = useHistory();
  const userAuth = React.useContext(UserAuthContext);
  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false
  });
  // const [success, setSuccess] = useState(false);
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  return (
    <MainTemplate>
      <div className="auth_container">
        <div className="auth_back">
          <FontAwesomeIcon icon={faChevronLeft} />
          Wróć
        </div>
        <div className="auth_wrapper">
          <div className="auth_section">
            <div className="auth_header">
              <h1>Logowanie</h1>
              <Link to="/registration">Załóż konto</Link>
            </div>
            <form
              onSubmit={async (e: any) => {
                e.preventDefault();
                let valid = true;
                if (valid) {
                  const { username, password } = values;
                  try {
                    const response = await axios({
                      url: clientData.login,
                      method: "post",
                      params: { username, password }
                    });
                    console.log(response.data);
                    cookies.set("token", response.data, { path: "/" });
                    console.log(UserAuthContext);
                    userAuth.setState({
                      logged: "load"
                    });
                    history.push("/dashboard");
                  } catch (err) {
                    console.log("error", err);
                  }
                }
              }}
            >
              <TextField
                label="Nazwa Użytkownika"
                type="text"
                name="username"
                onChange={handleChange("username")}
                variant="filled"
              />
              <FormControl variant="filled">
                <InputLabel>Hasło</InputLabel>
                <FilledInput
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  name="password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <FontAwesomeIcon icon={faEye} />
                        ) : (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button
                className="submit_button"
                type="submit"
                variant="contained"
              >
                Zaloguj
              </Button>
            </form>
            <div className="auth_or">
              <span>lub</span>
            </div>
            <div className="facebook_button">
              <Button variant="contained">
                <FontAwesomeIcon icon={faFacebook} />
                Zaloguj za pomocą facebooka
              </Button>
            </div>
            <div className="forgot_password">
              <Link to="/registration">Nie pamiętasz hasła? </Link>
            </div>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
