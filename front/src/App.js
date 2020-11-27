//point d'entrée de l'applications

import React from 'react';//Importation de React
import Login from './components/login_page_component';//Importation du composant 'Login'
import './App.css';//Importation de la feuille de style
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Userpage from './components/user_page_component';



//La fonction App est le point d'entré de l'application, il return le bloc principal de l'application.
function App() {
  return (
    <Router>
    <div className="App">
      {/* le composant 'Login' intègre la page de connexion et d'inscription de l'application */}
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/home" component={Userpage}/>
        </Switch>
    </div>
    </Router>
  );
}

//On Export la fonction principal(Le point d'entré de l'application) de l'application
export default App;
