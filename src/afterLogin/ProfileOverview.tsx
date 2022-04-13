import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  axios,
  MainTemplate,
  Moment,
  Typography,
  Slider,
  Button,
  TextField,
  UserAuthContext,
  clientData
} from "../managers/ImportManager";

const marks = [
  {
    value: 1,
    label: "Bardzo źle"
  },
  {
    value: 2,
    label: "Słabo"
  },
  {
    value: 3,
    label: "Ok"
  },
  {
    value: 4,
    label: "Świetnie"
  },
  {
    value: 5,
    label: "Wspaniale"
  }
];

const ProfileOverview = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const {
    state: { image, id: user_id }
  } = useContext(UserAuthContext);
  const [reviewMark, setReviewMark] = useState(3);
  const [reviewText, setReviewText] = useState("");
  const test = false;

  const Fetch = async () => {
    let response = {};
    if (test) {
      response = {
        id: 1,
        username: "Kamilek",
        email: "kamilek@kamilek.pl",
        roles: ["ROLE_CLIENT_MAKER"],
        makerStatus: "NEUTRAL",
        firstName: "Kamil",
        lastName: null,
        phone: null,
        birthDate: null,
        city: null,
        state: null,
        country: null,
        zipCode: null,
        image: null,
        myReviews: [
          {
            id: 1,
            authorId: 1,
            reviewedId: 3,
            comment: "Niezły zawodnik",
            rating: 5,
            createdAt: "2021-05-31T19:52:02.444+00:00",
            updatedAt: "2021-05-31T19:52:02.444+00:00"
          },
          {
            id: 9,
            authorId: 1,
            reviewedId: 3,
            comment: "Niezły zawodnik",
            rating: 5,
            createdAt: "2021-05-31T20:07:11.522+00:00",
            updatedAt: "2021-05-31T20:07:11.522+00:00"
          }
        ],
        projectsMaker: [],
        createdAt: "2021-04-25T21:56:45.953+00:00",
        updatedAt: "2021-04-25T21:56:45.953+00:00"
      };
    } else {
      response = (
        await axios({
          method: "get",
          url: clientData.userViewId + id
        })
      ).data;
    }
    setUserData(response);
  };
  useEffect(() => {
    console.log("twoj id: ", user_id);
    console.log("id w param: ", id);
    Fetch();
  }, [id]);

  return (
    <MainTemplate>
      <div className="projectOverview">
        <div className="centerWrapper">
          <h1>{userData.username}</h1>
          <p>{userData.email}</p>
          <p>
            {userData.roles?.[0] === "ROLE_CLIENT_MAKER"
              ? "wykonawca"
              : "zleceniodawca"}
          </p>
          <h1>Avatar</h1>
          <img alt="" src={image ? image : "/assets/pictures/auth.jpg"} />
          <h2>Dane personalne</h2>
          <p>Imię: {userData.firstName ?? "nie podano"}</p>
          <p>Nazwisko: {userData.lastName ?? "nie podano"}</p>
          <p>Telefon: {userData.phone ?? "nie podano"}</p>
          <p>Data urodzenia: {userData.birthDate ?? "nie podano"}</p>
          <p>Miasto: {userData.city ?? "nie podano"}</p>
          <p>Województwo: {userData.state ?? "nie podano"}</p>
          <p>Kraj: {userData.country ?? "Polska"}</p>
          {userData?.projectsMaker?.[0] && <h2>Wykonywane projekty</h2>}
          {userData?.projectsAuthor?.[0] && <h2>Utworzone projekty</h2>}
          <div>
            {userData?.projectsMaker?.map((project) => {
              return (
                <>
                  <h3>Tytuł: {project.title}</h3>
                  <p>
                    Data dodania:{" "}
                    <Moment className="date" format="DD.MM.YYYY hh:mm">
                      {project.createdAt}
                    </Moment>
                  </p>
                  <p>Opis: {project.description}</p>
                </>
              );
            })}
            {userData?.projectsAuthor?.map((project) => {
              return (
                <>
                  <h3>Tytuł: {project.title}</h3>
                  <p>
                    Data dodania:{" "}
                    <Moment className="date" format="DD.MM.YYYY hh:mm">
                      {project.createdAt}
                    </Moment>
                  </p>
                  <p>Opis: {project.description}</p>
                </>
              );
            })}
            <div>
              <h2>Opinie</h2>
              {userData.myReviews ? (
                <>
                  {userData.myReviews.map((rev) => {
                    return (
                      <div className="review">
                        <h3>{rev.title}</h3>
                        <p>
                          <Moment format="DD.MM.yyyy hh:mm">
                            {rev.updatedAt}
                          </Moment>
                        </p>
                        <p>
                          Ocena:{" "}
                          {(() => {
                            switch (rev.rating) {
                              case 1:
                                return `Bardzo źle (${rev.rating})`;
                              case 2:
                                return `Słabo (${rev.rating})`;
                              case 3:
                                return `Ok (${rev.rating})`;
                              case 4:
                                return `Świetnie (${rev.rating})`;
                              case 5:
                                return `Wspaniale (${rev.rating})`;
                            }
                          })()}
                        </p>
                        <p>{rev.comment}</p>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <p>Brak opinii</p>
                </>
              )}
            </div>
            <div>
              {userData.id !== user_id && (
                <form
                  className="writeReview"
                  onSubmit={(e) => {
                    console.log({
                      reviewed: userData.id,
                      comment: reviewText,
                      rating: reviewMark
                    });

                    e.preventDefault();
                    axios({
                      method: "post",
                      url: clientData.add_user_review,
                      data: {
                        reviewed: userData.id,
                        comment: reviewText,
                        rating: reviewMark
                      }
                    });
                  }}
                >
                  <h3>Oceń użytkownika</h3>
                  <p>Napisz opinię</p>
                  <TextField
                    label="Napisz opinię"
                    multiline
                    rows={4}
                    onChange={(e) => {
                      setReviewText(e.target.value);
                    }}
                    variant="outlined"
                  />
                  <Typography id="discrete-slider-always" gutterBottom>
                    Oceń użytkownika
                  </Typography>
                  <Slider
                    defaultValue={3}
                    aria-labelledby="discrete-slider-always"
                    step={1}
                    max={5}
                    min={1}
                    getAriaValueText={setReviewMark}
                    marks={marks}
                  />
                  <Button
                    className="submit_button"
                    type="submit"
                    variant="contained"
                  >
                    Wyślij opinię
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
};

export default ProfileOverview;
