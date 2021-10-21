import React, {useContext, useState} from 'react';
import Link from 'next/link'
import Router from 'next/router';

import {FirebaseContext} from '../../firebase/index';


const Navbar = () => {
    //const esUsuario = false;
    const {usuario, firebase} = useContext(FirebaseContext);
    
    const [ busqueda, guardarBusqueda] = useState('');

    const buscarProducto = e => {
        e.preventDefault();

        if(busqueda.trim() === '') return;

        // redireccionar a /buscar
        Router.push({
            pathname: '/buscar', 
            query: { q : busqueda }
        })
    }

    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Products-Services</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                
                <form 
                    className="form-group form_search my-2 my-lg-0"
                    onSubmit={buscarProducto}
                >
                    <input className="form-control mr-sm-2" 
                        type="search" placeholder="Search" 
                        aria-label="Search"
                        onChange={e =>  guardarBusqueda(e.target.value) }
                    />
                    <button className="button_search" type="submit"></button>
                </form>

                <li className="nav-item">
                    <Link  href="/"><a className="nav-link">Inicio</a></Link>
                </li>
                <li className="nav-item">
                    <Link  href="/populares"><a className="nav-link">Populares</a></Link>
                </li>
                {
                    usuario &&
                    <li className="nav-item">
                        <Link  href="/crearProducto"><a className="nav-link">Crear producto</a></Link>
                    </li>
                }
                </ul>
                <div className=" d-flex ">
                
                <ul className="navbar-nav ">
                    {
                        usuario
                        ?
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink"  data-toggle="dropdown" >
                            Bienvenido: {usuario.displayName}
                            </a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" onClick={()=>firebase.cerrarSesion()}>Cerrar Sesion</a>
                            </div>
                        </li>
                        :
                        <>
                            <li className="nav-item">
                                <Link  href="/login"><a className="nav-link">Inciar sesion</a></Link>
                            </li>
                            <li className="nav-item">
                                <Link  href="/registro"><a className="nav-link">Registrarse</a></Link>
                            </li>
                        </>
                    }
                
                
                </ul>
                </div>
                
            </div>
            <style jsx>{`
                img_search: font-size: 277px;
            `}</style>
        </nav>
     );
}
 
export default Navbar;