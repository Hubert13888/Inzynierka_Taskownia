import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  createRef
} from "react";
import {
  MainTemplate,
  Button,
  axios,
  Link,
  UserAuthContext,
  TextField,
  clientData
} from "../managers/ImportManager";
import { publicMessages } from "../mockData/publicMessages";
import Moment from "react-moment";

const Chat = () => {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const handleChange = (event: any) => setMessage(event.target.value);
  // const { content } = publicMessages;
  const currentId = useContext(UserAuthContext).state.id;
  const messagesRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      console.log(messagesRef);
      const scrollHeight = messagesRef.current.scrollHeight;
      messagesRef.current.scrollTo({ top: scrollHeight, behavior: "smooth" });
    }, 70);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${clientData["chat"]}/all`);
        setMessages(data);
        scrollToBottom();
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleClick = async () => {
    try {
      const { data } = await axios({
        url: `${clientData["chat"]}/sent`,
        method: "post",
        params: { msg: message }
      });

      setMessages(data);
      setMessage("");
      scrollToBottom();
    } catch (e) {
      console.error(e);
    }
  };

  const handleKeyPress = (e: any) => (e.key === "Enter" ? handleClick() : null);

  return (
    <MainTemplate>
      <div className="chat_container">
        {/* <Link to="/dashboard" className="container_heading">
          Powrót do kokpitu
        </Link> */}
        <div className="chat_wrapper">
          <div className="chat_body">
            <div className="chat_heading">Czat publiczny</div>
            <div className="chat_messages" ref={messagesRef}>
              {messages.map(
                ({ message, date, userId, userUsername }, index) => {
                  return (
                    <div className="message_wrapper" key={index}>
                      {userId === currentId ? (
                        <>
                          <div className="message my_message">
                            <div className="name">You</div>
                            <div className="content">{message}</div>
                            <Moment className="date" format="MM/DD hh:mm">
                              {date}
                            </Moment>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="message other_message">
                            <div className="name">{userUsername}</div>
                            <div className="content">{message}</div>
                            <Moment className="date" format="MM/DD hh:mm">
                              {date}
                            </Moment>
                          </div>
                        </>
                      )}
                    </div>
                  );
                }
              )}
            </div>
            <div className="chat_actions">
              <TextField
                variant="outlined"
                placeholder="Wiadomość"
                inputProps={{ maxLength: 300 }}
                multiline
                rows={2}
                rowsMax={2}
                value={message}
                onKeyPress={handleKeyPress}
                onChange={handleChange}
              />
              <Button disabled={message.length === 0} onClick={handleClick}>
                Wyślij
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
};

export default Chat;
