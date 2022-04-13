import React, { useEffect, useState, useContext } from "react";
import {
  MainTemplate,
  cookies,
  axios,
  clientData,
  Link,
  UserAuthContext,
  Button
} from "../managers/ImportManager";
import Moment from "react-moment";

export default function ProjectSummary() {
  const [recentProjects, setRecentProjects] = useState([]);
  const userAuth = useContext(UserAuthContext);

  const test = false;
  const getWorkerProjects = async () => {
    let response = {};
    if (test)
      return [
        {
          id: "1",
          title: "Lorem Ipsum",
          addDate: "2019-08-01",
          author: "Bruce Wayne",
          desc:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo deleniti alias laboriosam consequatur sapiente nobis quibusdam, fuga dicta nostrum eos illo ipsum impedit odit sed doloremque nulla similique. Soluta, cupiditate?Accusamus facilis, aspernatur ipsam sapiente, maxime numquam deserunt placeat dignissimos consequuntur culpa commodi eius molestiae eum veniam at vel ipsa tempore repellat fugiat. Architecto unde aliquid iste delectus necessitatibus perferendis!"
        }
      ];
    try {
      const test = await axios({
        url: clientData.my_maker_projects,
        method: "get"
      });
      response = test.data
        .reverse()
        .filter(({ projectStatus }) => projectStatus !== "FINISHED");
    } catch (err) {
      console.log("error", err);
    }
    return response;
  };
  const getClientProjects = async () => {
    let response = {};
    if (test)
      return [
        {
          id: "2",
          title: "Dolor Sit Amet",
          addDate: "2019-08-01",
          author: "Peter Parker",
          description: "Lorem Ipsum Dolor Sit Amet"
        }
      ];
    try {
      const test = await axios({
        url: clientData.my_author_projects,
        method: "get"
      });
      response = test.data
        .reverse()
        .filter(({ projectStatus }) => projectStatus !== "FINISHED");
    } catch (err) {
      console.log("error", err);
    }
    return response;
  };
  const FetchData = async () => {
    let projects = [];
    if (userAuth.state.roles[0] === "ROLE_CLIENT_MAKER")
      projects = await getWorkerProjects();
    if (userAuth.state.roles[0] === "ROLE_CLIENT_AUTHOR")
      projects = await getClientProjects();

    setRecentProjects([...projects]);
  };
  useEffect(() => {
    FetchData();
  }, []);

  const handleCloseProject = async (projId) => {
    console.log(recentProjects);

    console.log(projId);

    try {
      const res = await axios({
        url: clientData.finish_project,
        method: "post",
        params: { projId }
      });
      await FetchData();
    } catch (e) {}
  };
  if (userAuth.state.roles[0] === "ROLE_CLIENT_AUTHOR") {
    return (
      <MainTemplate>
        <div className="project_summary_container">
          <h1>Utworzone projekty</h1>
          <div className="recent_projects">
            {recentProjects.map((project: any) => {
              return (
                <div className="project_tile">
                  <div className="tile_info">
                    <h2>{project.title}</h2>
                    <div className="userInfo">
                      <p>
                        <Link to={`user/${project.authorId}`}>
                          {project.authorUsername}
                        </Link>
                      </p>
                      <Moment className="date" format="DD.MM.YYYY hh:mm">
                        {project.createdAt}
                      </Moment>
                    </div>
                    <p className="description">{project.description}</p>
                    <Button onClick={() => handleCloseProject(project.id)}>
                      Zakończ projekt
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </MainTemplate>
    );
  }
  if (userAuth.state.roles[0] === "ROLE_CLIENT_MAKER") {
    return (
      <MainTemplate>
        <div className="project_summary_container">
          <h1>Projekty aktualnie robione przeze mnie</h1>
          <div className="recent_projects">
            {recentProjects.map((project: any) => {
              return (
                <div className="project_tile">
                  <div className="tile_info">
                    <h2>{project.title}</h2>
                    <div className="userInfo">
                      <p>
                        <Link to={`user/${project.authorId}`}>
                          {project.authorUsername}
                        </Link>
                      </p>
                      <Moment className="date" format="DD.MM.YYYY hh:mm">
                        {project.createdAt}
                      </Moment>
                    </div>
                    <p className="description">{project.description}</p>
                    <Button onClick={() => handleCloseProject(project.id)}>
                      Zakończ projekt
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </MainTemplate>
    );
  }
}
