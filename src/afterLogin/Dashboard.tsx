import React, { useState, useEffect, useContext } from "react";
import { getJSDocReturnTag } from "typescript";
import {
  MainTemplate,
  TextField,
  Button,
  clientData,
  axios,
  UserAuthContext,
  Link
} from "../managers/ImportManager";
import Moment from "react-moment";

export default (props: any) => {
  const [projectPages, setProjectPages] = useState([]);
  const userAuth = useContext(UserAuthContext);

  const [addProjectErrors, setAddProjectErrors] = useState({
    title: "",
    description: ""
  });

  const test = false;

  const getNewestProjects = async () => {
    let response: any;
    try {
      let resp = await axios({
        url: clientData.get_projects,
        method: "get"
      });
      return resp.data.reverse();
    } catch (err) {
      console.log("error", err);
    }
  };

  const FetchData = async () => {
    let projects;
    if (test) {
      projects = [
        {
          id: "1",
          title: "Lorem Ipsum",
          created_at: "2019-08-01",
          status: "NEW",
          authorUsername: "Bruce Wayne",
          description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo deleniti alias laboriosam consequatur sapiente nobis quibusdam, fuga dicta nostrum eos illo ipsum impedit odit sed doloremque nulla similique. Soluta, cupiditate?Accusamus facilis, aspernatur ipsam sapiente, maxime numquam deserunt placeat dignissimos consequuntur culpa commodi eius molestiae eum veniam at vel ipsa tempore repellat fugiat. Architecto unde aliquid iste delectus necessitatibus perferendis!"
        },
        {
          id: "2",
          title: "Dolor Sit Amet",
          created_at: "2019-08-01",
          status: "NEW",
          author_username: "Peter Parker",
          description: "Lorem Ipsum Dolor Sit Amet"
        }
      ];
    } else {
      projects = await getNewestProjects();
    }
    console.log(projects);
    setProjectPages(projects);
  };

  useEffect(() => {
    FetchData();
  }, []);

  if (userAuth.state.roles[0] === "ROLE_CLIENT_AUTHOR")
    return (
      <>
        <MainTemplate>
          <div className="dashboard dashboard_client">
            <div className="column1">
              <h1>Lista dostępnych projektów</h1>
              {projectPages
                .filter(({ projectStatus }) => {
                  if (projectStatus === "NEW") return true;
                  return false;
                })
                .map(
                  ({
                    id,
                    title,
                    authorUsername,
                    createdAt,
                    authorId,
                    description
                  }) => {
                    return (
                      <div className="project_page">
                        <div className="project_tile">
                          <div className="tile_info">
                            <h2>{title}</h2>
                            <div className="userInfo">
                              <p>
                                <Link to={`/user/${authorId}`}>
                                  {authorUsername}
                                </Link>
                              </p>
                              <p>
                                <Moment
                                  className="date"
                                  format="DD.MM.YYYY hh:mm"
                                >
                                  {createdAt}
                                </Moment>
                              </p>
                            </div>
                            <p className="description">{description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
            <div className="column2">
              <h1>Dodaj nowy projekt</h1>
              <form
                onSubmit={async (e: any) => {
                  e.preventDefault();
                  console.log(e);
                  let formData = new FormData(e.target);
                  let d: any = {};
                  for (let data of formData) {
                    d[data[0]] = data[1];
                  }
                  const { title, description } = d;
                  console.log(d);
                  let valid = true;
                  try {
                    await axios({
                      url: clientData.new_project,
                      method: "post",
                      data: { title, description }
                    });
                    e.target.reset();
                    FetchData();
                    alert("Dodano projekt");
                  } catch (err) {
                    alert("error");
                  }
                }}
              >
                <TextField
                  label="Tytuł"
                  type="text"
                  name="title"
                  error={!!addProjectErrors.title}
                  helperText={addProjectErrors.title}
                  onFocus={(e) => {
                    setAddProjectErrors({
                      ...addProjectErrors,
                      title: ""
                    });
                  }}
                  onBlur={(e) => {
                    let val = e.target.value;
                    if (val.length === 0)
                      return setAddProjectErrors({
                        ...addProjectErrors,
                        title: "Tytuł projektu nie może być pusty"
                      });
                    if (val.length < 5 || val.length > 40)
                      return setAddProjectErrors({
                        ...addProjectErrors,
                        title:
                          "Tytuł projektu powinien mieścić się w przedziale od 5 do 40 znaków"
                      });
                    return setAddProjectErrors({
                      ...addProjectErrors,
                      title: undefined
                    });
                  }}
                  variant="filled"
                />
                <TextField
                  label="Opis"
                  type="text"
                  name="description"
                  error={!!addProjectErrors.description}
                  helperText={addProjectErrors.description}
                  onFocus={(e) => {
                    setAddProjectErrors({
                      ...addProjectErrors,
                      description: ""
                    });
                  }}
                  onBlur={(e) => {
                    let val = e.target.value;
                    if (val.length === 0)
                      return setAddProjectErrors({
                        ...addProjectErrors,
                        description: "Opis projektu nie może być pusty"
                      });
                    if (val.length < 20 || val.length > 500)
                      return setAddProjectErrors({
                        ...addProjectErrors,
                        description:
                          "Opis projektu powinien mieścić się w przedziale od 20 do 500 znaków"
                      });
                    return setAddProjectErrors({
                      ...addProjectErrors,
                      description: undefined
                    });
                  }}
                  variant="filled"
                  multiline
                  rows={5}
                />
                <Button
                  className="submit_button"
                  type="submit"
                  variant="contained"
                  disabled={(() => {
                    for (let error of Object.values(addProjectErrors)) {
                      if (typeof error !== "undefined") return true;
                    }
                    return false;
                  })()}
                >
                  Zatwierdź
                </Button>
              </form>
              <div className="relatedLinks">
                <h2>Dostępne Funkcjonalności</h2>
                <Link to="/chat">
                  <Button variant="contained">Chat</Button>
                </Link>
                <br />
                <Link to="/interested_makers">
                  <Button variant="contained">
                    Lista dostępnych zleceniobiorców
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </MainTemplate>
      </>
    );
  if (userAuth.state.roles[0] === "ROLE_CLIENT_MAKER")
    return (
      <>
        <MainTemplate>
          <div className="dashboard dashboard_worker">
            <div className="column1">
              <h1>Lista dostępnych projektów</h1>
              {projectPages
                .filter(({ projectStatus }) => {
                  if (projectStatus === "NEW") return true;
                  return false;
                })
                .map(
                  ({
                    id,
                    title,
                    authorUsername,
                    authorId,
                    createdAt,
                    description
                  }) => {
                    return (
                      <div className="project_page">
                        <div className="project_tile">
                          <div className="tile_info">
                            <h2>{title}</h2>
                            <div className="userInfo">
                              <Link to={`/user/${authorId}`}>
                                {authorUsername}
                              </Link>
                              <p>
                                <Moment
                                  className="date"
                                  format="DD.MM.YYYY hh:mm"
                                >
                                  {createdAt}
                                </Moment>
                              </p>
                            </div>
                            <p className="description">{description}</p>
                          </div>
                          <div className="tile_button">
                            <Button
                              className="submit_button"
                              variant="contained"
                              onClick={async (e) => {
                                e.preventDefault();

                                try {
                                  await axios({
                                    method: "post",
                                    params: { projId: id },
                                    url: clientData.take_project
                                  });
                                  alert("Zabrano projekt");
                                } catch (err) {
                                  console.log("Error", err);
                                }
                                let filteredProjects = projectPages.filter(
                                  (p) => {
                                    if (id === p.id) return false;
                                    return true;
                                  }
                                );
                                setProjectPages([...filteredProjects]);
                              }}
                            >
                              Weź projekt
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
            <div className="column2">
              <div className="relatedLinks">
                <h2>Dostępne Funkcjonalności</h2>
                <Link to="/chat">
                  <Button variant="contained">Chat</Button>
                </Link>
              </div>
            </div>
          </div>
        </MainTemplate>
      </>
    );
  return <h1>Authorization error</h1>;
};
