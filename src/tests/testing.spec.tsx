import React from "react";
import { Login, ProfileEdit, Registration } from "../managers/ImportManager";
import "@testing-library/jest-dom";
import { Button } from "../testing/button";
import Chat from "../afterLogin/Chat";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { screen, fireEvent } from "@testing-library/react";

// describe("Button", () => {
//   it("Renders the button", () => {
//     render(<Button />);
//   });
// });

// it("Renders the chat", () => {
//   render(
//     <BrowserRouter>
//       <Chat />
//     </BrowserRouter>
//   );
// });

// it("Renders the registration", () => {
//   render(
//     <BrowserRouter>
//       <Registration />
//     </BrowserRouter>
//   );
// });

// it("Renders the ProfileEdit", () => {
//   render(
//     <BrowserRouter>
//       <ProfileEdit />
//     </BrowserRouter>
//   );
// });

it("Renders login with filled inputs", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  fireEvent.change(screen.getByTestId("username"), {
    target: { value: "Uzytkownik" }
  });
  fireEvent.change(screen.getByTestId("password"), {
    target: { value: "passwd" }
  });
  fireEvent.click(screen.getByText("Zaloguj"));
});
