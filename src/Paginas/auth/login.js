import React, { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import APIInvoke from "../../Utils/APIInvoke";
import swal from 'sweetalert';

const Login = () =>{

        //redirect login 
        const navigate = useNavigate();
    
        //definit initial state
        const[usuario, setUsuario] = useState({
          email: '',
          password:''
        });
    
        const{email, password} =usuario;
    
        const onChange = (e) => {
        setUsuario({
          ...usuario,
          [e.target.name]: e.target.value
        })
      }
    
      useEffect(()=>{
        document.getElementById("email").focus();
    },[])
    
    const iniciarSesion = async () => {
       if(password.length < 6){
        const msg = "La contraseña debe ser al menos de 6 caracteres";
        swal(
          {
            title: 'Error',
            text: msg, 
            icon: 'error',
            buttons: {
              confirm:{
                text:'OK',
                value:true,
                visible: true,
                className: 'btn btn-danger',
                closeModal: true
              }
            }
          }
        );
       }else{
        const data = {
          email: usuario.email,
          password: usuario.password
        }
        const  response = await APIInvoke.invokePOST("/auth", data);
        const  mensaje = response.msg;
    
        if (mensaje === 'El usuario no existe' || mensaje === 'Contraseña incorrecta'){
          const msg = "Un de los datos ingresados es incorrecto, por favor verifica ";
          swal(
            {
              title: 'Error',
              text: msg, 
              icon: 'error',
              buttons: {
                confirm:{
                  text:'OK',
                  value:true,
                  visible: true,
                  className: 'btn btn-danger',
                  closeModal: true
                }
              }
            }
          );
        }else {
          //obtener token 
          const jwt = response.token;
          //guardar token en localstorage
          localStorage.setItem('token', jwt);
          //redireccionamiento al dash board 
          navigate("/Home");
          
        }
       }
    }
    
    const onSubmit = (e) => {
      e.preventDefault();
      iniciarSesion();
    }

    return(
        <div>
    <div className="hold-transition login-page">
  <div className="login-box">
    <div className="login-logo">
      <Link to="{#}"><b>Iniciar Sesión</b>LTE</Link>
    </div>
    {/* /.login-logo */}
    <div className="card">
      <div className="card-body login-card-body">
        <p className="login-box-msg">Bienvenido, ingrese sus credenciales</p>

        <form onSubmit={onSubmit}>
          <div className="input-group mb-3">

            <input type="email" 
            className="form-control" 
            placeholder="Email" 
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            />

            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-envelope" />
              </div>
            </div>
          </div>

          <div className="input-group mb-3">

            <input type="password"
             className="form-control"
              placeholder="Password" 
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              />

            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock" />
              </div>
            </div>
          </div>
        </form>
        <div className="social-auth-links text-center mb-3">

          <button type="submit" className="btn btn-block btn-primary">
          Ingresar
          </button>
          <Link to={"/crear-cuenta"} className="btn btn-block btn-danger">
          Crear Cuenta
          </Link>
        </div>
      </div>
      {/* /.login-card-body */}
    </div>
  </div>
  {/* /.login-box */}
</div>
</div>
    );
}

export default Login;