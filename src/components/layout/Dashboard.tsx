import React from "react";
import {
  Route,
  //  HashRouter as Router,
  Switch,
  useRouteMatch,
} from "react-router-dom";

import Sidebar from "./Sidebar";
import CadastroAluno from "../alunos/CadastroAluno";
import ListarAlunos from "../alunos/ListarAluno";
import "./layout.css";

const Dashboard = (): JSX.Element => {
  const { path } = useRouteMatch();

  return (
    <div className="flex-container-row">
      <Sidebar />
      <div className="container-fluid bg-mygray px-4 vh-100 overflow-auto">
        <Switch>
          <Route exact path={path}>
            <ListarAlunos />
          </Route>

          <Route path={`${path}/cadastro`}>
            <CadastroAluno />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
