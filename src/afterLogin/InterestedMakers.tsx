import React, { useContext, useRef, useState, useEffect } from "react";
import {
  MainTemplate,
  Button,
  axios,
  Link,
  UserAuthContext,
  TextField,
  clientData
} from "../managers/ImportManager";

const InterestedMakers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(clientData["all_users"]);
        const makers = data.filter(
          ({ roles }) => roles[0] === "ROLE_CLIENT_MAKER"
        );
        const interested = makers.filter(
          ({ makerStatus }) => makerStatus === "READY"
        );
        setUsers(interested);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <MainTemplate>
      <div className="interested_makers_container">
        <p>Lista dostępnych zleceniobiorców</p>
        {users.map(
          ({
            id,
            username,
            email,
            firstName = "Nie podano",
            lastName = "Nie podano"
          }) => {
            return (
              <div className="interested_user">
                <p>Nazwa użytkownika: {username}</p>
                <p>Email: {email}</p>
                <p>Imię: {firstName ?? "Nie podano"}</p>
                <p>Nazwisko: {lastName ?? "Nie podano"}</p>
              </div>
            );
          }
        )}
      </div>
    </MainTemplate>
  );
};

export default InterestedMakers;
