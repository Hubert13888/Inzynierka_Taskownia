import React, { useEffect, useState } from "react";
import noAvatar from "../../assets/pictures/noAvatar.jpg";
import {
  Button,
  clientData,
  UserAuthContext
} from "../../managers/ImportManager";
import "./ChangeAvatar.scss";
import axios from "axios";

const ChangeAvatar = () => {
  const [hasAvatar, setHasAvatar] = useState(false);
  const userAuth = React.useContext(UserAuthContext);
  const handleRemoveAvatar = () => {};
  const handleChangeAvatar = async (e) => {
    console.log("teeeest");
    console.log(e);
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      const config = { headers: { "content-type": "multipart/form-data" } };
      formData.append("image", file, file.name);
      const _ = await axios.post(
        `${clientData.upload_image}`,
        formData,
        config
      );
      const { data } = await axios.get(clientData.user);

      userAuth.setState({ ...userAuth.state, image: data.image });
    } catch (e) {}
  };
  return (
    <div className="ChangeAvatarWrapper">
      <img
        src={userAuth.state.image ? userAuth.state.image : noAvatar}
        alt="Avatar"
      />
      <div>
        <label htmlFor="upload-photo">
          <input
            style={{ display: "none" }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            onChange={handleChangeAvatar}
          />
          <Button
            variant="contained"
            component="span"
            className="Change_Avatar_Button"
          >
            Zmień avatar
          </Button>
        </label>
      </div>
    </div>
  );
};

export default ChangeAvatar;
