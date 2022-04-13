import {
  Link,
  MainTemplate,
  FontAwesomeIcon,
  faFacebook,
  faTwitter,
  faChevronDown
} from "./managers/ImportManager";

export default function Home() {
  /*const sum = useSelector((state: any) => state.sum),
    dispatch = useDispatch();*/

  return (
    <MainTemplate showFooter={true}>
      <div className="Home">
        <div className="frontWrapper">
          <div className="goDown">
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <div className="front">
            <div className="leftTitle">
              <div className="leftContent">
                <div className="box1">
                  <p className="leftMessage">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Tenetur consectetur natus
                  </p>
                  <button className="leftMessageAfter">Lorem ipsum</button>
                </div>
              </div>
            </div>
            <div className="rightTitle">
              <div className="rightInfo">
                <div className="box1">
                  <p>
                    We are the <span>leaders</span>
                  </p>
                  <div className="box2">
                    <p>and we help our dreams grow</p>
                  </div>
                </div>
              </div>

              <p className="rightMessage">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium velit repudiandae saepe cumque magni
              </p>

              <div className="buttonBox">
                <Link to="/login">
                  <button className="loginButton">Logowanie</button>
                </Link>
                <Link to="/registration">
                  <button className="registrationButton">Rejestracja</button>
                </Link>
              </div>
            </div>
            <div className="followUsBox">
              <h1>Zobacz nas na:</h1>
              <div className="facebookIcon brandIcon">
                <FontAwesomeIcon icon={faFacebook} />
              </div>
              <div className="TwitterIcon brandIcon">
                <FontAwesomeIcon icon={faTwitter} />
              </div>
            </div>
          </div>
        </div>
        <h1>Hello World!</h1>
      </div>
    </MainTemplate>
  );
}
