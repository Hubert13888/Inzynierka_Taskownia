import React, { useState, useContext } from "react";

import {
  Paper,
  Button,
  Toolbar,
  Classnames,
  UserAuthContext,
  Link,
  useHistory,
  cookies
} from "../managers/ImportManager";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const userAuth = React.useContext(UserAuthContext);
  const history = useHistory();

  let test = false;
  return (
    <>
      <nav>
        <Paper elevation={2} className="toolbar">
          <Link to="/" className="logo">
            Logo
          </Link>
          <section className="routing">
            {test && (
              <Link to="/dashboard">
                <button>Dashboard</button>
              </Link>
            )}
            {userAuth.state.logged === "yes" ? (
              <div className="slidedownmenu_badge">
                <p
                  onClick={() => {
                    setShowMenu(!showMenu);
                  }}
                >
                  Witaj {userAuth.state.username}
                </p>
                <div
                  className={Classnames({
                    slidedownmenu: true,
                    show: showMenu
                  })}
                >
                  <Link to={`/user/${userAuth.state.id}`}>Mój profil</Link>
                  <Link to="/profile_edit">Edytuj profil</Link>
                  <Link to="/project_summary">Lista aktualnych projektów</Link>
                  <Link to="/finished_projects">
                    Lista zakończonych projektów
                  </Link>
                  <Button
                    className="logout_button"
                    onClick={(e) => {
                      cookies.remove("token");
                      userAuth.setState({
                        logged: "load"
                      });
                      history.push("/");
                    }}
                  >
                    Wyloguj się
                  </Button>
                </div>
              </div>
            ) : (
              "Jesteś niezalogowany"
            )}
          </section>
          <section className="profile">
            {userAuth.state.logged === "yes" ? (
              <>
                <Link to="/dashboard">
                  <Button>Kokpit</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button>Zaloguj się</Button>
                </Link>
              </>
            )}
          </section>
        </Paper>
      </nav>
    </>
  );
}
