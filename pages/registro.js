import React, {useState} from 'react';
import Layout from '../components/layout/Layout'
import {Formulario} from '../ui/Fomulario'
import Router from 'next/router'

//importa el  index.js dentro de la carpeta firebase
import firebase from '../firebase'

//validaciones
import useValidacion from '../hooks/useValidacion'
import validarRegistro from '../validacion/validarRegistro'



const STATE_INCIAL = {
    nombre: 'pedro',
    apellidos: 'robles',
    email: 'pedro@gmail.com',
    password: '1234567',
    password2: '1234567'
};

const Registro = () => {

    const [error, setError] = useState(false)

    const {valores, errores, submitForm, handleSubmit, handleChange} = useValidacion
    (STATE_INCIAL, validarRegistro, crearCuenta);

    const {nombre, apellidos, email, password, password2} = valores;

    async function crearCuenta () {
            console.log("Creando cuenta");
        try {
            console.log(nombre);
            console.log(email);
            console.log(password);
            console.log(firebase)
            console.log(firebase.constructor)
            // console.log(firebase.registrar())

            await firebase.registrar(nombre, apellidos, email, password);
            console.log("Creando cuenta");

            Router.push('/');
        } catch (error) {
            setError(error.message);
            
            console.log(error.message);
        }
    }

    

    
    return ( 
        
        <Layout>
            <div className="d-flex justify-content-center  ">
            
                <Formulario className="col-lg-5 mt-3 ">
                <h3 className="text-center">Crear Cuenta prueba</h3>
                    <form onSubmit={handleSubmit}>
                        {
                            error && <p className=" mt-1 text-center error">{error}</p>
                        }
                        <div className="form-group px-3 pt-3 ">
                            <label htmlFor="nombre">Nombre: </label>
                            <input className="form-control" type="text" 
                                id="nombre" name="nombre"
                                placeholder="Ej: Juan"
                                value= {nombre}
                                onChange={handleChange}
                            />
                            {errores.nombre && <p className=" mt-1 text-center error">Error: {errores.nombre}</p>}
                            <label htmlFor="apellidos">Apellidos: </label>
                            <input className="form-control" type="text" 
                                id="apellidos" name="apellidos"
                                placeholder="Ej: Lopez Diaz"
                                value= {apellidos}
                                onChange={handleChange}
                            />
                            {errores.apellidos && <p className=" mt-1 text-center error">{errores.apellidos}</p>}
                            <label htmlFor="correo">Correo: </label>
                            <input className="form-control" type="text" 
                                id="email" name="email"
                                placeholder="Ej: correo@gmail.com"
                                value= {email}
                                onChange={handleChange}
                            />
                            {errores.email && <p className=" mt-1 text-center error">{errores.email}</p>}
                            <label htmlFor="password">Password: </label>
                            <input className="form-control" type="password" 
                                id="password" name="password"
                                placeholder="********"
                                value= {password}
                                onChange={handleChange} 
                            />
                            {errores.password && <p className=" mt-1 text-center error">{errores.password}</p>}
                            <label htmlFor="password2">Repetir password: </label>
                            <input className="form-control" type="password" 
                                id="password2" name="password2"
                                placeholder="********"
                                value= {password2}
                                onChange={handleChange}
                            />
                            {errores.password2 && <p className=" mt-1 text-center error">{errores.password2}</p>}
                            <button className="btn btn-success form-control mt-3">Registrar</button>
                        </div>
                    </form>
                </Formulario>
            </div>
        </Layout>
        
     );
}
 
export default Registro;