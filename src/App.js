import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Characters from "./pages/RickAndMorty/Characters";
import CharacterDetails from "./pages/RickAndMorty/CharacterDetails";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/character/:id" component={CharacterDetails} />
        <Route path="/characters" component={Characters} />
        <Redirect exact from="/" to="/characters" />
      </Switch>
    </Router>
  );
}

export default App;
