import React from "react";
import { Header, Footer } from "../managers/ImportManager";

const MainTemplate = (props: any) => {
  return (
    <div className="mainTemplate">
      <Header />
      <main>{props.children}</main>
      {props.showFooter && <Footer />}
    </div>
  );
};

export default MainTemplate;
