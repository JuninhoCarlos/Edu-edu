import React from "react";
import { Link } from "react-router-dom";

import img from "../../assets/logo.png";
import iconFace from "../../assets/icons/icon_face.png";
import iconDoc from "../../assets/icons/icon_doc.png";
import iconHelp from "../../assets/icons/icon_help.png";
import iconTest from "../../assets/icons/icon_test.png";
import iconSettings from "../../assets/icons/icon_settings.png";

const Sidebar = (): JSX.Element => {
  return (
    <nav className="nav d-flex flex-column">
      <img src={img} alt="" />
      <Link to="/dashboard" className="nav-item active">
        <img src={iconFace} alt="" className="icon" />
        Perfil dos Alunos
      </Link>
      <Link to="/dashboard" className="nav-item">
        <img src={iconDoc} alt="" className="icon" />
        Prova de Português
      </Link>
      <Link to="/dashboard" className="nav-item">
        <img src={iconTest} alt="" className="icon" />
        Atividades Digitais
      </Link>
      <Link to="/dashboard" className="nav-item">
        <img src={iconHelp} alt="" className="icon" />
        Ajuda
      </Link>
      <Link to="/dashboard" className="nav-item">
        <img src={iconSettings} alt="" className="icon" />
        Configurações
      </Link>
    </nav>
  );
};

export default Sidebar;
