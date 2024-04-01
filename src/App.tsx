import "./leaflet.css";

import { Component } from "react";
import { Header } from "./components/ui/header";
import { Body } from "./components/ui/body";
import { Footer } from "./components/ui/footer";

class App extends Component {
  render() {
    const title = "kimchicabbage prototype client app";

    return (
      <>
        <Header title={title} />
        <Body />
        <Footer />
      </>
    );
  }
}

export default App;
