import React, {useEffect, useContext, useState} from 'react';
import {useRouter, Router} from 'next/router';
import {FirebaseContext} from '../../firebase/index'
import Layout from '../../components/layout/Layout'
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

import {Formulario} from '../../ui/Fomulario'

const Contenedor = styled.div`
        @media (min-width:768px) {
            display: grid;
            /* separa en columnas */
            grid-template-columns: 2fr 1fr;
            column-gap: 2rem;
        }
    `;
const Usuario = styled.div`
    background-color: #e1e1e1;

    span{
        font-weight: bold;
    }
`;

const Comentario = styled.div`
    
    border: 1px solid #e1e1e1;
`;

const Creador = styled.small`
    background-color: rgba(0,179,126,.1);
    color: #056d4e;
    padding: 3px 10px;
    border-radius: 10px;
    font-weight: 500;
    font-size: 12px;
    text-transform: uppercase;
    /* margin-bottom: 15px; */
    
`;

const Producto = () => {

    

    //State del componente
    const [producto, guardarProducto] = useState({});
    const [error, guardarError] = useState(false);
    const [comentario, guardarComentario] = useState({});
    const [consultarDB, guardarConsultarDB ] = useState(true);

    const router = useRouter();
    const {query: {id}} = router;

    const {usuario, firebase} = useContext(FirebaseContext);

    

    //const esCreador = true;
   //const esCreador = (producto.creador.id === usuario.uid);
  

    useEffect(() => {
        if(id && consultarDB)
        {
            const obtenerProducto = async() =>{
                // console.log("Ya hay un ID: ", id);
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();
                //console.log(producto.data());

                if(producto.exists)
                 {
                    guardarProducto(producto.data());
                    guardarConsultarDB(false);
                 }else{
                    guardarError( true );
                    guardarConsultarDB(false);
                 }
            }
            obtenerProducto();
        }
            
            //console.log(firebase);
            
    }, [id])

    if(Object.keys(producto).length === 0 && !error)  return 'Cargando...';
    const { comentarios, creado, descripcion, empresa, nombre, url, urlImagen, votos, creador, haVotado } = producto;

    const votarProducto = () =>{
        
        if(!usuario)
            router.push('/login');

        // Verificar si el usuario actual ha votado
        if(haVotado.includes(usuario.uid) ) return;

        //Guardar el ID del usuario que esta votando
        const nuevoHaVotado = [...haVotado, usuario.uid];
        
        //sumar un voto
        const nuevoTotalVotos = votos +1;

        //Actualizar la BD
        firebase.db.collection('productos').doc(id).update({votos: nuevoTotalVotos, haVotado: nuevoHaVotado});
        
        //Actualizar State
        guardarProducto({
            ...producto,
            votos: nuevoTotalVotos,
            haVotado: nuevoHaVotado
        })
        
        //Actualizar estado de consulta para que se realice una consulta a la base de datos
        guardarConsultarDB(true);
    }

    const changeComentario = e =>{
        guardarComentario({
            ...comentario,
            [e.target.name]: e.target.value
        })
    }

    const agregarComentario = e =>{
        e.preventDefault();

        //Veificar si el usuario ha iniciado sesión
        if(!usuario)
            router.push("/login")

        console.log(comentario.mensaje);

        if(!comentario.mensaje || comentario.mensaje.trim() == '')
        {
            alert("Ingrese texto")
            return
        }
        
        //Agregar id y nombre del usuario que comenta
        comentario.idUsuario = usuario.uid;
        comentario.nombreUsuario = usuario.displayName;

        //Actualizar State de comentarios
        const nuevosComentarios = [...comentarios, comentario];

        //Actualizar base de datos
        firebase.db.collection('productos').doc(id).update({
            comentarios: nuevosComentarios
        })
        guardarProducto({
            ...producto,
            comentarios: nuevosComentarios
        })

        //Actualizar estado de consulta para que se realice una consulta a la base de datos
        guardarConsultarDB(true);
        document.getElementById("formComentario").reset();
        guardarComentario({});
    }

    // Identifica si el comentario es del creador del producto
    const esCreador = id => {
        if(creador.id == id) {
            return true;
        }
    }

    // función que revisa que el creador del producto sea el mismo que esta autenticado
    const puedeBorrar = () => {
        if(!usuario) return false;

        if(creador.id === usuario.uid) {
            return true
        }
    }

    // elimina un producto de la bd
    const eliminarProducto = async () => {

        if(!usuario) {
            return router.push('/login')
        }

        if(creador.id !== usuario.uid) {
            return router.push('/')
        }

        try {
            await firebase.db.collection('productos').doc(id).delete();
            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }
   

    return ( 
        <Layout>
            
            <div>
                {error ? <h1 className="text-center">El producto no existe</h1>
                    : 
                    <div className="container">
                        <h3 className="text-center">{nombre}</h3>
                        <Contenedor>
                            <div className="pb-3 "> 
                                <p className="fecha_publicado">
                                    Publicado hace: {formatDistanceToNow(new Date(creado), {locale: es})}
                                </p>
                                <p>Por: {creador.nombre} de la empresa {empresa}</p>
                                { puedeBorrar() && 
                                    <div>
                                        <button
                                            onClick={eliminarProducto}
                                            className="btn btn-danger mb-3"
                                        >Eliminar Producto</button>
                                    </div>
                                }
                                <img className="img_producto_detalles" src={urlImagen} alt=""/>
                                <p>{descripcion}</p>

                                {
                                    usuario &&
                                    (<>
                                        <h4>Agrega un comentario</h4>
                                        <Formulario>
                                            <form id="formComentario" onSubmit={agregarComentario} >
                                                <div className="form-group">
                                                    <textarea 
                                                        placeholder="agrega tu comentario aqui"
                                                        className="form-control"
                                                        id="mensaje"
                                                        name="mensaje"
                                                        onChange={changeComentario}
                                                        />
                                                </div>
                                                <button className="btn btn-primary btn-sm form-control">Agregar Comentario</button>
                                            </form>
                                        </Formulario>
                                    </>)
                                }

                                <h4 className="mt-4">Comentarios</h4>
                                <div >
                                    {comentarios.map(( comentario, index) =>(
                                        <Comentario
                                            key={index}
                                            className="mb-2"
                                        >
                                            {esCreador( comentario.idUsuario )
                                                ?
                                                <Usuario className="">
                                                    <span>{comentario.nombreUsuario}
                                                        <Creador className="badge">creador</Creador>
                                                    </span>
                                                </Usuario>
                                                :
                                                <Usuario className="">
                                                    <span>{comentario.nombreUsuario}</span>
                                                </Usuario>
                                            }
                                            <p className="ml-3">{comentario.mensaje}</p>
                                            
                                        </Comentario>
                                    ))}
                                </div>

                            </div>
                            <aside className="bg-">
                                <a className="btn btn-primary btn-sm form-control"
                                    target="_blank"
                                    href={url}
                                
                                >Visitar pagina</a>
                                <div className="mt-5">
                                    <p className="text-center">Votos: {votos}</p>
                                    {
                                    usuario &&
                                    (<>
                                    <button 
                                        className="btn btn-success  btn-sm form-control"
                                        onClick={votarProducto}
                                    >Votar</button>
                                    </>)}
                                </div>
                                
                            </aside>
                        </Contenedor>
                        
                    </div>
                }
            </div>
        </Layout>
     );
}
 
export default Producto;