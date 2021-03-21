import React from "react";
import { Link } from "react-router-dom";
import "./style.css"

const CadastroAluno = (): JSX.Element => {
  return (
    <div className="content">
      <div className="flex-container-column cadastro-form">
        <form className="form">
          <div className="form-group relative">
            <label htmlFor="exampleInputEmail1" className="label">Nome Completo</label>            
            <input
              type="email"
              className="form-control my-input input-login"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"            
            />
          </div>

          <div className="form-group relative">
            <label htmlFor="exampleInputEmail1" className="label">Escola</label>            
            <input
              type="email"
              className="form-control my-input input-login"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"            
            />
          </div>
          <div className="w-50 mx-auto">
            <Link
              to="/dashboard"
              type="button"
              className="btn btn-primary text-white my-btn my-primary "
            >
              Adicionar Aluno
            </Link>
          </div>
        </form>       

      </div>

    </div>
  )
};

export default CadastroAluno;
