import React, { useEffect, useState, useContext } from "react";

import {
  Link,
  Button,
  TextField,
  MainTemplate,
  FilledInput,
  MaskedInput,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DateFnsUtils,
  axios,
  Paper,
  FormControl,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  IconButton,
  clientData,
  faEye,
  faEyeSlash,
  cookies,
  UserAuthContext,
  FontAwesomeIcon
} from "../managers/ImportManager";
import ChangeAvatar from "./ChangeAvatar/ChangeAvatar";
import {
  nameValidator,
  emailValidator,
  passwordValidator,
  passwordConfirmationValidator,
  oldPasswordValidator
} from "../managers/ValidationManager";

import ButtonGroup from "@material-ui/core/ButtonGroup";

export default function ProfileEdit(props: any) {
  const userAuth = useContext(UserAuthContext);
  const [show, setShow] = useState({
    oldPassword: false,
    newPassword: false
  });
  // console.log("USER AUTH STATE: ", userAuth);

  const [passwordErrors, setPasswordErrors] = useState({
    oldPassword: "",
    newPassword: "",
    passwordConfirmation: ""
  });
  const [personalDataErrors, setPersonalDataErrors] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    phone: ""
  });
  const [addressErrors, setAddressErrors] = useState({
    city: "",
    state: "",
    country: ""
  });

  const [values, setValues] = useState({
    newPassword: "",
    state: userAuth.state?.state ? userAuth.state?.state : ""
  });

  const [selectedDate, setSelectedDate] = useState(
    (() => {
      if (userAuth.state?.birthDate) {
        let [day, month, year] = userAuth.state?.birthDate.split("-");
        return new Date(year, month - 1, day);
      }
      return null;
    })()
  );
  //const [profileInfo, setProfileInfo] = useState({});

  const handleDateChange = (date: any) => {
    setPersonalDataErrors({
      ...personalDataErrors,
      birthDate: undefined
    });
    setSelectedDate(date);
  };

  const handleStatusChange = async (makerStatus: any) => {
    try {
      const response = await axios.post(clientData["update-data"], {
        makerStatus
      });
      userAuth.setState({
        ...userAuth.state,
        makerStatus
      });
      console.log(response);
    } catch (e) {}
  };
  return (
    <MainTemplate>
      <div className="profileEdit_container">
        <Paper elevation={2}>
          <h1>Edycja profilu</h1>
          <div className="section_name">
            <h3>Ustaw nowe hasło</h3>
          </div>
          <form
            action=""
            className="wrapper set_password_wrapper"
            onSubmit={async (e) => {
              e.preventDefault();
              let formData = new FormData(e.target);
              let d: any = {};

              for (let data of formData) {
                if (data[0] === "passwordConfirmation") continue;
                d[data[0]] = data[1];
              }
              try {
                let resp = await axios({
                  url: clientData["change-pwd"],
                  params: { oldPass: d.oldPassword, newPass: d.newPassword },
                  method: "post"
                });
                console.log(resp);
                alert("Zmieniono hasło");
              } catch (err) {
                setPasswordErrors({
                  ...passwordErrors,
                  oldPassword: "Podane hasło jest nieprawidłowe"
                });
              }
            }}
          >
            <div className="password_form">
              <div className="row_name"></div>

              <FormControl
                variant="outlined"
                className="row_expand"
                error={!!passwordErrors.oldPassword}
              >
                <InputLabel>Wprowadź stare hasło</InputLabel>
                <FilledInput
                  type={show.oldPassword ? "text" : "password"}
                  name="oldPassword"
                  onFocus={(e) => {
                    let copyErrors = { ...passwordErrors };
                    copyErrors[e.target.name] = "";
                    setPasswordErrors(copyErrors);
                  }}
                  onBlur={(e) => {
                    let copyErrors = { ...passwordErrors };
                    copyErrors[e.target.name] = oldPasswordValidator(
                      e.target.value
                    );
                    setPasswordErrors(copyErrors);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShow({
                            ...show,
                            oldPassword: !show.oldPassword
                          })
                        }
                      >
                        {show.oldPassword ? (
                          <FontAwesomeIcon icon={faEye} />
                        ) : (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>{passwordErrors.oldPassword}</FormHelperText>
              </FormControl>
              <FormControl
                variant="outlined"
                className="row_expand"
                error={!!passwordErrors.newPassword}
              >
                <InputLabel>Wprowadź nowe hasło</InputLabel>
                <FilledInput
                  type={show.newPassword ? "text" : "password"}
                  name="newPassword"
                  onFocus={(e) => {
                    let copyErrors = { ...passwordErrors };
                    copyErrors[e.target.name] = "";
                    setPasswordErrors(copyErrors);
                  }}
                  onBlur={(e) => {
                    let copyErrors = { ...passwordErrors };
                    copyErrors[e.target.name] = passwordValidator(
                      e.target.value
                    );
                    setValues({
                      ...values,
                      newPassword: e.target.value
                    });
                    setPasswordErrors(copyErrors);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setShow({
                            ...show,
                            newPassword: !show.newPassword
                          });
                        }}
                      >
                        {show.newPassword ? (
                          <FontAwesomeIcon icon={faEye} />
                        ) : (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>{passwordErrors.newPassword}</FormHelperText>
              </FormControl>
              <TextField
                placeholder="Potwierdź nowe hasło"
                type="password"
                name="passwordConfirmation"
                variant="outlined"
                error={!!passwordErrors.passwordConfirmation}
                helperText={passwordErrors.passwordConfirmation}
                onFocus={(e) => {
                  let copyErrors = { ...passwordErrors };
                  copyErrors[e.target.name] = "";
                  setPasswordErrors(copyErrors);
                }}
                onBlur={(e) => {
                  let copyErrors = { ...passwordErrors };
                  copyErrors[e.target.name] = passwordConfirmationValidator(
                    e.target.value,
                    values.newPassword
                  );
                  setPasswordErrors(copyErrors);
                }}
                className="row_expand"
              />
            </div>
            <div className="submit_button_1">
              <Button
                type="submit"
                variant="contained"
                disabled={(() => {
                  for (let err of Object.values(passwordErrors)) {
                    if (typeof err !== "undefined") return true;
                  }
                  return false;
                })()}
              >
                Zapisz hasło
              </Button>
            </div>
          </form>
          <div className="main_section">
            <div className="personal_data">
              <div className="section_name">
                <h3>Edytuj dane personalne</h3>
              </div>
              <form
                className="wrapper"
                onSubmit={async (e: any) => {
                  e.preventDefault();
                  const token = cookies.get("token");
                  let formData = new FormData(e.target);
                  let d: any = {};
                  for (let data of formData) {
                    d[data[0]] = data[1];
                  }

                  let newData = {};
                  for (let field in d) {
                    if (typeof personalDataErrors[field] === "undefined") {
                      if (field === "birthDate") {
                        newData[field] = d[field].split(".").join("-");
                        continue;
                      }
                      newData[field] = d[field];
                    }
                  }

                  try {
                    const response = await axios.post(
                      clientData["update-data"],
                      newData
                    );
                    console.log(response);
                    alert("Zaktualizowano");
                  } catch (err) {
                    console.log("error", err);
                  }
                }}
              >
                <div className="rows">
                  <div className="row_name">
                    <h3>Imię i nazwisko</h3>
                  </div>
                  <TextField
                    placeholder="Wprowadź imię"
                    type="text"
                    name="firstName"
                    error={!!personalDataErrors.firstName}
                    helperText={personalDataErrors.firstName}
                    onFocus={(e) => {
                      setPersonalDataErrors({
                        ...personalDataErrors,
                        firstName: ""
                      });
                    }}
                    onBlur={(e) => {
                      if (!e.target.value[0]) {
                        setPersonalDataErrors({
                          ...personalDataErrors,
                          firstName: "Pole imie nie może być puste"
                        });
                      } else {
                        setPersonalDataErrors({
                          ...personalDataErrors,
                          firstName: undefined
                        });
                      }
                    }}
                    variant="outlined"
                    defaultValue={userAuth.state?.firstName}
                  />
                  <TextField
                    placeholder="Wprowadź nazwisko"
                    type="text"
                    name="lastName"
                    error={!!personalDataErrors.lastName}
                    helperText={personalDataErrors.lastName}
                    onFocus={(e) => {
                      if (!e.target.value[0]) {
                        setPersonalDataErrors({
                          ...personalDataErrors,
                          lastName: ""
                        });
                      }
                    }}
                    onBlur={(e) => {
                      if (!e.target.value[0]) {
                        setPersonalDataErrors({
                          ...personalDataErrors,
                          lastName: "Pole nazwisko nie może być puste"
                        });
                      } else {
                        setPersonalDataErrors({
                          ...personalDataErrors,
                          lastName: undefined
                        });
                      }
                    }}
                    variant="outlined"
                    defaultValue={userAuth.state?.lastName}
                  />
                  <div className="row_name">
                    <h3>E-mail</h3>
                  </div>
                  <TextField
                    placeholder="Wprowadź nazwę użytkownika"
                    type="text"
                    disabled
                    variant="outlined"
                    className="row_expand"
                    defaultValue={userAuth.state.email}
                  />
                  <div className="row_name">
                    <h3>Nazwa użytkownika</h3>
                  </div>
                  <TextField
                    placeholder="Wprowadź nazwę użytkownika"
                    type="text"
                    disabled
                    variant="outlined"
                    className="row_expand"
                    defaultValue={userAuth.state.username}
                  />

                  <div className="row_name">
                    <h3>Data urodzenia</h3>
                  </div>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      name="birthDate"
                      margin="normal"
                      inputVariant="outlined"
                      invalidDateMessage="Nieprawidłowy format daty"
                      format="dd.MM.yyyy"
                      value={selectedDate}
                      initialFocusedDate={
                        new Date(1, 12, 1999) ? new Date(1, 12, 1999) : ""
                      }
                      onChange={handleDateChange}
                      onError={(e) => {
                        setPersonalDataErrors({
                          ...personalDataErrors,
                          birthDate: "invalid date"
                        });
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <div className="row_name">
                    <h3>Numer telefonu</h3>
                  </div>
                  <div className="phone">
                    <span>+48</span>
                    <MaskedInput
                      name="phone"
                      error={!!personalDataErrors.phone}
                      helperText={personalDataErrors.phone}
                      mask={[
                        /\d/,
                        /\d/,
                        /\d/,
                        "-",
                        /\d/,
                        /\d/,
                        /\d/,
                        "-",
                        /\d/,
                        /\d/,
                        /\d/
                      ]}
                      onFocus={(e) => {
                        setPersonalDataErrors({
                          ...personalDataErrors,
                          phone: ""
                        });
                      }}
                      onBlur={(e) => {
                        let parts = e.target.value.split("-");
                        if (
                          parts[0]?.length === 3 &&
                          parts[1]?.length === 3 &&
                          parts[2]?.length === 3
                        ) {
                          setPersonalDataErrors({
                            ...personalDataErrors,
                            phone: undefined
                          });
                        } else {
                          setPersonalDataErrors({
                            ...personalDataErrors,
                            phone: "invalid"
                          });
                        }
                      }}
                      placeholderChar={"\u2000"}
                      defaultValue={userAuth.state?.phone}
                    />
                  </div>
                  <div className="submit_button">
                    <Button type="submit" variant="contained">
                      Zapisz dane
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="section_name">
            <h3>Edytuj adres</h3>
          </div>
          <form
            className="wrapper"
            onSubmit={async (e: any) => {
              e.preventDefault();
              let formData = new FormData(e.target);
              let d: any = {};
              for (let data of formData) {
                d[data[0]] = data[1];
              }
              let newData = {};
              for (let field in d) {
                if (typeof addressErrors[field] === "undefined") {
                  newData[field] = d[field];
                }
              }

              try {
                const response = await axios.post(
                  clientData["update-data"],
                  newData
                );
                alert("Zaktualizowano");
              } catch (err) {
                console.log("error", err);
              }
            }}
          >
            <div className="rows">
              <div className="row_name">
                <h3>Miasto</h3>
              </div>
              <TextField
                placeholder="Miasto"
                type="text"
                name="city"
                error={!!addressErrors.city}
                helperText={addressErrors.city}
                onFocus={(e) => {
                  setAddressErrors({
                    ...addressErrors,
                    city: ""
                  });
                }}
                onBlur={(e) => {
                  if (!e.target.value?.[0])
                    setAddressErrors({
                      ...addressErrors,
                      city: "Miasto nie powinno być puste"
                    });
                  else {
                    setAddressErrors({
                      ...addressErrors,
                      city: undefined
                    });
                  }
                }}
                variant="outlined"
                className="row_expand"
                defaultValue={userAuth.state?.city}
              />
              <div className="row_name">
                <h3>Województwo</h3>
              </div>

              <FormControl className="row_expand" variant="outlined">
                <Select
                  labelId="state-select-label"
                  name="state"
                  value={values.state}
                  onChange={(e) => {
                    setAddressErrors({
                      ...addressErrors,
                      state: undefined
                    });
                    setValues({
                      ...values,
                      state: e.target.value
                    });
                  }}
                >
                  <MenuItem value={"Dolnośląskie"}>Dolnośląskie</MenuItem>
                  <MenuItem value={"Kujawsko-Pomorskie"}>
                    Kujawsko-Pomorskie
                  </MenuItem>
                  <MenuItem value={"Lubelskie"}>Lubelskie</MenuItem>
                  <MenuItem value={"Lubuskie"}>Lubuskie</MenuItem>
                  <MenuItem value={"Łódzkie"}>Łódzkie</MenuItem>
                  <MenuItem value={"Małopolskie"}>Małopolskie</MenuItem>
                  <MenuItem value={"Mazowieckie"}>Mazowieckie</MenuItem>
                  <MenuItem value={"Opolskie"}>Opolskie</MenuItem>
                  <MenuItem value={"Podkarpackie"}>Podkarpackie</MenuItem>
                  <MenuItem value={"Podlaskie"}>Podlaskie</MenuItem>
                  <MenuItem value={"Pomorskie"}>Pomorskie</MenuItem>
                  <MenuItem value={"Śląskie"}>Śląskie</MenuItem>
                  <MenuItem value={"Świętokrzyskie"}>Świętokrzyskie</MenuItem>
                  <MenuItem value={"Warmińsko-Mazurskie"}>
                    Warmińsko-Mazurskie
                  </MenuItem>
                  <MenuItem value={"Wielkopolskie"}>Wielkopolskie</MenuItem>
                  <MenuItem value={"Zachodniopomorskie"}>
                    Zachodniopomorskie
                  </MenuItem>
                </Select>
              </FormControl>

              <div className="row_name">
                <h3>Kraj</h3>
              </div>
              <TextField
                placeholder="Kraj"
                type="text"
                name="country"
                variant="outlined"
                className="row_expand"
                disabled={true}
                defaultValue={"Polska"}
              />

              <div className="submit_button">
                <Button type="submit" variant="contained">
                  Zapisz adres
                </Button>
              </div>
            </div>
            <ChangeAvatar />
          </form>
          {userAuth.state.roles[0] === "ROLE_CLIENT_MAKER" ? (
            <div className="status">
              <span className="status_heading">Wybierz status</span>
              <ButtonGroup color="primary">
                <Button
                  className={
                    userAuth.state.makerStatus === "NOT_READY" &&
                    "status_active"
                  }
                  onClick={() => handleStatusChange("NOT_READY")}
                >
                  BRAK GOTOWOŚCI
                </Button>
                <Button
                  className={
                    userAuth.state.makerStatus === "NEUTRAL" && "status_active"
                  }
                  onClick={() => handleStatusChange("NEUTRAL")}
                >
                  NEUTRALNY
                </Button>
                <Button
                  className={
                    userAuth.state.makerStatus === "READY" && "status_active"
                  }
                  onClick={() => handleStatusChange("READY")}
                >
                  GOTOWY
                </Button>
              </ButtonGroup>
            </div>
          ) : null}
        </Paper>
      </div>
    </MainTemplate>
  );
}
