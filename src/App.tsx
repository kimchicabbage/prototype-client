import React from "react";
import "./leaflet.css";

import { Home } from "./pages";
import { Body, Footer, Header } from "./components";

class App extends React.Component {
  render() {
    const title = "kimchicabbage prototype client app";

    return (
      <>
        <Header title={title} />
        <Body>
          <Home />
        </Body>
        <Footer />
      </>
    );
  }
}

export default App;
