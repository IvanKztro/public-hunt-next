import React, {useState} from 'react';
import Layout from '../components/layout/Layout'
import {Formulario} from '../ui/Fomulario'
import useValidacion from '../hooks/useValidacion';
import validarLogin from '../validacion/validarLogin'
import  Router from 'next/router';

//importa el  index.js dentro de la carpeta firebase
import firebase from '../firebase'

const STATE_INCIAL = {
    email: '',
    password: ''
}

const Login = () => {

    const [error, setError] = useState(false);

    const {valores, errores, submitForm, handleSubmit, handleChange} = useValidacion
    (STATE_INCIAL, validarLogin, iniciarSesion);

    const {email, password} = valores;

    async function iniciarSesion (){
        try {
           await firebase.login(email, password);
        //    console.log(user.user);
            Router.push("/");
            
        } catch (error) {
            setError(error.message);
        }

    }
    
    return ( 
        
        <Layout>
            <div className="d-flex justify-content-center  ">
            
                <Formulario className="col-lg-5 mt-3 ">
                <h3 className="text-center">Iniciar sesión</h3>
                    <form onSubmit={handleSubmit}>
                        {error && <p className=" mt-1 text-center error">{error}</p>}
                        <div className="form-group px-3 pt-3 ">
                           
                            <label htmlFor="email">Correo: </label>
                            <input className="form-control" type="text" 
                                id="email" name="email"
                                value= {email}
                                onChange={handleChange}
                                placeholder="Ej: correo@gmail.com"
                            />
                            <label htmlFor="password">Password: </label>
                            <input className="form-control" type="password" 
                                id="password" name="password"
                                value= {password}
                                onChange={handleChange}
                                placeholder="********"    
                            />
                            
                            <button className="btn btn-success form-control mt-3">Inicar Sesion</button>
                        </div>
                    </form>
                </Formulario>
            </div>
        </Layout>
        
     );
}
 
export default Login;