import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainTemplate from "../components/MainTemplate";
import { axios, clientData } from "../managers/ImportManager";

export default function AboutProject() {
  let { id } = useParams();
  const [projectInfo, setProjectInfo] = useState([]);
  const token = localStorage.getItem("token");

  const getNewestProjects = async () => {
    let response = {};
    try {
      response = await axios({
        url: clientData.domain + "/latest_projects",
        method: "post",
        headers: {
          "x-auth-token": token
        },
        data: {
          oldProjects: []
        }
      });
    } catch (err) {
      console.log("error", err);
    }
    response = {
      data: {
        title: "Lorem Ipsum",
        description: "Lorem Ipsum dolor sit amet"
      }
    };
    return response.data;
  };

  useEffect(() => {
    const FetchData = async () => {
      let response = await getNewestProjects();
      setProjectInfo(response);
    };
    FetchData();
  });
  return (
    <MainTemplate>
      <h1>Tutaj idą informacje o projekcie</h1>
      <p>ID projektu: {id}</p>
    </MainTemplate>
  );
}
