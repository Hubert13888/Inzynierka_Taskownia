import { render } from "react-dom";
import { StrictMode } from "react";

import { Contexts, Routing, axios } from "./managers/ImportManager";
import "/styles/styles.tsx";

import Cookies from "universal-cookie";

axios.interceptors.request.use(
  (request: any) => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    if (token) {
      const httpMethods = ["post", "put", "get", "delete"];
      httpMethods.forEach(
        (method) =>
          (request.headers[method]["Authorization"] = `Bearer ${token}`)
      );
    }
    return request;
  },
  (error) => Promise.reject(error)
);

render(
  <StrictMode>
    <Contexts>
      <Routing />
    </Contexts>
  </StrictMode>,
  document.getElementById("root")
);
