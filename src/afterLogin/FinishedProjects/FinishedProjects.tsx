import React, { useState, useEffect, useContext } from "react";
import { Link, MainTemplate, Moment } from "../../managers/ImportManager";
import "./FinishedProjects.scss";
import {
  axios,
  clientData,
  UserAuthContext
} from "../../managers/ImportManager";

const FinishedProjects = () => {
  const [projects, setProjects] = useState([]);
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
        .filter(({ projectStatus }) => projectStatus === "FINISHED");
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
        .filter(({ projectStatus }) => projectStatus === "FINISHED");
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

  return (
    <>
      <MainTemplate>
        <div className="finished_projects">
          <h2>Ukończone projekty</h2>
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
                </div>
              </div>
            );
          })}
          <div> </div>
        </div>
      </MainTemplate>
    </>
  );
};

export default FinishedProjects;
