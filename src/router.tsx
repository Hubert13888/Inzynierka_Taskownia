import React, { useEffect } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  UserAuthContext,
  axios,
  clientData,
  cookies
} from "./managers/ImportManager";
import {
  Home,
  Login,
  Chat,
  Registration,
  Dashboard,
  ProfileEdit,
  ProjectSummary,
  ProfileOverview,
  InterestedMakers
} from "./managers/ImportManager";
import Cookies from "universal-cookie";
import FinishedProjects from "./afterLogin/FinishedProjects/FinishedProjects";

const Router = () => {
  const userAuth = React.useContext(UserAuthContext);
  const cookies = new Cookies();
  useEffect(() => {
    const token = cookies.get("token");
    const test = false;

    const CheckAuthorization = async () => {
      try {
        const response = await axios({
          url: clientData.user,
          method: "get"
        });
        if (response.data) {
          return {
            logged: "yes",
            ...response.data
          };
        }
      } catch (err) {
        alert("Błąd autoryzacji!");
        cookies.remove("token");
        return {
          logged: "no"
        };
      }
    };
    if (userAuth.state.logged === "load") {
      if (test) {
        const Fetchdata = async () => {
          try {
            userAuth.setState({
              logged: "yes",
              username: "janek_kowalski",
              user_id: 1,
              roles: ["ROLE_CLIENT_MAKER"],
              email: "janek_kowalski@wp.pl",
              first_name: "Jan",
              last_name: "Kowalski",
              birth_date: "21-01-1998",
              phone: "123-456-789",
              city: "Poznań",
              state: "Wielkopolskie",
              country: "Polska",
              makerStatus: "READY"
            });
          } catch (error) {
            console.log("error");
          }
        };
        Fetchdata();
      } else {
        if (token) {
          const Fetchdata = async () =>
            userAuth.setState(await CheckAuthorization());
          Fetchdata();
        } else
          userAuth.setState({
            logged: "no"
          });
      }
    }
  }, [userAuth]);

  return (
    <>
      <BrowserRouter>
        {(() => {
          switch (userAuth.state.logged) {
            case "load":
              return (
                <>
                  <h1>Ładuję...</h1>
                </>
              );
            case "yes":
              return (
                <Switch>
                  <Route path="/project_summary" component={ProjectSummary} />
                  <Route path="/chat" component={Chat} />
                  <Route
                    path="/finished_projects"
                    component={FinishedProjects}
                  />
                  <Route
                    path="/interested_makers"
                    component={InterestedMakers}
                  />
                  <Route path="/user/:id" component={ProfileOverview} />
                  <Route path="/profile_edit" component={ProfileEdit} />
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/registration" component={Registration} />
                  <Route path="/login" component={Login} />

                  <Route path="/" strict exact component={Home} />
                  <Route path="/">
                    <h1> 404 Not found</h1>
                  </Route>
                </Switch>
              );
            case "no":
              return (
                <Switch>
                  <Route path="/project_summary">
                    <Redirect to="/login" />
                  </Route>
                  <Route path="/chat">
                    <Redirect to="/login" />
                  </Route>
                  <Route path="/profile_edit">
                    <Redirect to="/login" />
                  </Route>
                  <Route path="/dashboard">
                    <Redirect to="/login" />
                  </Route>
                  <Route path="/user">
                    <Redirect to="/login" />
                  </Route>
                  <Route path="/registration" component={Registration} />
                  <Route path="/login" component={Login} />
                  <Route path="/" strict exact component={Home} />
                  <Route path="/">
                    <h1> 404 Not found</h1>
                  </Route>
                </Switch>
              );
          }
          return (
            <>
              <h1>404 Not Found</h1>
            </>
          );
        })()}
      </BrowserRouter>
    </>
  );
};

export default Router;
