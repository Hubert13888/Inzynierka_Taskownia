import React, { useState, useContext } from "react";
import {
  MainTemplate,
  Button,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  FontAwesomeIcon,
  faChevronLeft,
  Link,
  FilledInput,
  Input,
  FormHelperText,
  InputAdornment,
  InputLabel,
  FormControl,
  axios,
  clientData,
  useHistory,
  cookies,
  UserAuthContext,
  faEye,
  faEyeSlash
} from "./managers/ImportManager";
import ReCaptcha from "react-google-recaptcha";
import Cookies from "universal-cookie";

import {
  nameValidator,
  emailValidator,
  passwordValidator,
  passwordConfirmationValidator
} from "./managers/ValidationManager";

export default function Home() {
  let history = useHistory();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    role: "",
    showPassword: false
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    role: "",
    captcha: ""
  });
  const [captchaToken, setCaptchaToken] = useState();
  const userAuth = useContext(UserAuthContext);
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
    setErrors({ ...errors, role: undefined });
  };
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  const cookies = new Cookies();
  return (
    <MainTemplate>
      <div className="register_container">
        <div className="register_back">
          <FontAwesomeIcon icon={faChevronLeft} />
          Wróć
        </div>
        <div className="register_wrapper">
          <div className="register_section">
            <div className="register_header">
              <h1>Rejestracja</h1>
              <Link to="/login">Logowanie</Link>
            </div>
            <form
              onSubmit={async (e: any) => {
                e.preventDefault();

                let valid = true;
                for (let val of Object.values(errors)) {
                  if (typeof val !== "undefined") valid = false;
                }
                /*if (!(captchaToken && typeof errors.captcha === "undefined")) {
                  valid = false;
                }
*/
                if (valid) {
                  try {
                    const { name, email, password, role } = values;
                    console.log(captchaToken);
                    const response = await axios({
                      url: clientData.register,
                      method: "post",
                      params: {
                        captcha: captchaToken
                      },
                      data: {
                        username: name,
                        email,
                        password,
                        roles: [role]
                      }
                    });

                    if (response.status === 201) {
                      alert(
                        `Na podany adres e-mail: ${email} został wysłany link aktywacyjny. Proszę sprawdzić swoją pocztę.`
                      );

                      setErrors({
                        name: "",
                        email: "",
                        password: "",
                        passwordConfirmation: "",
                        role: "",
                        captcha: undefined
                      });
                      history.push("/login");
                    }
                    if (response.status === 409) {
                      alert("Ten e-mail jest już w użyciu!");
                    }
                    // else {
                    //   alert(
                    //     "Coś poszło nie tak. Proszę odświeżyć stronę i spróbować ponownie."
                    //   );
                    // }

                    /*cookies.set("token", response.data, { path: "/" });

                    userAuth.setState({
                      logged: "load"
                    });
                    history.push("/dashboard");*/
                  } catch (err) {
                    console.log("errorrr: ", err);
                  }
                } else {
                  alert(
                    "Przed zatwierdzeniem popraw wszystkie błędy i wypełnij wszystkie wymagane pola!"
                  );
                }
              }}
            >
              <div className="inputs">
                <TextField
                  label={"Nazwa użytkownika"}
                  type="text"
                  name="name"
                  error={!!errors.name}
                  helperText={errors.name}
                  onFocus={(e) => {
                    let copyErrors = { ...errors };
                    copyErrors[e.target.name] = "";
                    setErrors(copyErrors);
                  }}
                  onBlur={async (e) => {
                    e.persist();
                    let copyErrors = { ...errors };
                    copyErrors[e.target.name] = nameValidator(e.target.value);
                    setErrors(copyErrors);
                    if (
                      !copyErrors[e.target.name] ||
                      !copyErrors[e.target.name]?.[0]
                    ) {
                      await axios({
                        url: clientData.inUse,
                        method: "post",
                        params: {
                          username: e.target.value
                        }
                      }).catch((err) => {
                        console.log(err);
                        copyErrors[e.target.name] =
                          "Ta nazwa użytkownika jest już w użyciu";
                        console.log(copyErrors);
                        setErrors(copyErrors);
                      });
                    }
                  }}
                  onChange={handleChange("name")}
                  variant="filled"
                />
                <TextField
                  label="E-mail"
                  type="email"
                  name="email"
                  error={!!errors.email}
                  helperText={errors.email}
                  onFocus={(e) => {
                    let copyErrors = { ...errors };
                    copyErrors[e.target.name] = "";
                    setErrors(copyErrors);
                  }}
                  onBlur={async (e) => {
                    let copyErrors = { ...errors };
                    copyErrors[e.target.name] = emailValidator(e.target.value);
                    setErrors(copyErrors);

                    if (
                      !copyErrors[e.target.name] ||
                      !copyErrors[e.target.name]?.[0]
                    ) {
                      await axios({
                        url: clientData.inUse,
                        method: "post",
                        params: {
                          email: e.target.value
                        }
                      }).catch((err) => {
                        console.log(err);
                        copyErrors[e.target.name] =
                          "Ten e-mail jest już w użyciu";
                        console.log(copyErrors);
                        setErrors(copyErrors);
                      });
                    }
                  }}
                  onChange={handleChange("email")}
                  variant="filled"
                />
                <FormControl variant="filled" error={!!errors.password}>
                  <InputLabel>Hasło</InputLabel>
                  <FilledInput
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    name="password"
                    onFocus={(e) => {
                      let copyErrors = { ...errors };
                      copyErrors[e.target.name] = "";
                      setErrors(copyErrors);
                    }}
                    onBlur={(e) => {
                      let copyErrors = { ...errors };
                      copyErrors[e.target.name] = passwordValidator(
                        e.target.value
                      );
                      setErrors(copyErrors);
                    }}
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
                  <FormHelperText>{errors.password}</FormHelperText>
                </FormControl>
                <FormControl
                  variant="filled"
                  error={!!errors.passwordConfirmation}
                >
                  <InputLabel>Powtórz hasło</InputLabel>
                  <FilledInput
                    type={values.showPassword ? "text" : "password"}
                    name="passwordConfirmation"
                    onFocus={(e) => {
                      let copyErrors = { ...errors };
                      copyErrors[e.target.name] = "";
                      setErrors(copyErrors);
                    }}
                    onBlur={(e) => {
                      let copyErrors = { ...errors };
                      copyErrors[e.target.name] = passwordConfirmationValidator(
                        e.target.value,
                        values.password
                      );
                      setErrors(copyErrors);
                    }}
                  />
                  <FormHelperText>{errors.passwordConfirmation}</FormHelperText>
                </FormControl>
              </div>
              <FormControl component="fieldset" className="roles">
                <FormLabel>Rola</FormLabel>
                <RadioGroup
                  name="role"
                  value={values.role}
                  onChange={handleChange("role")}
                >
                  <FormControlLabel
                    value="ROLE_CLIENT_MAKER"
                    control={<Radio color="primary" />}
                    label="Wykonawca"
                  />
                  <FormControlLabel
                    value="ROLE_CLIENT_AUTHOR"
                    control={<Radio color="primary" />}
                    label="Zleceniodawca"
                  />
                </RadioGroup>
              </FormControl>
              <ReCaptcha
                onChange={(token) => {
                  setCaptchaToken(token);
                  let copyErrors = { ...errors };
                  if (token) {
                    copyErrors.captcha = undefined;
                  } else {
                    copyErrors.captcha = "";
                  }
                  setErrors(copyErrors);
                }}
                onErrored={(e) => {
                  let copyErrors = { ...errors };
                  copyErrors.captcha = "";
                  setErrors(copyErrors);
                }}
                sitekey={"6Ld8cfYaAAAAAHfonxhiZDBS_cwk4Ilo23gNKJMJ"}
              />
              <Button
                className="submit_button"
                type="submit"
                variant="contained"
                disabled={(() => {
                  for (let val of Object.values(errors))
                    if (typeof val !== "undefined") return true;
                  return false;
                })()}
              >
                Zarejestruj
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
