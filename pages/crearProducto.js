import React, {useState, useContext} from 'react';
import Layout from '../components/layout/Layout'
import {Formulario} from '../ui/Fomulario'
import Router, {useRouter} from 'next/router'
import FileUploader from 'react-firebase-file-uploader'

//importa el  index.js dentro de la carpeta firebase
//import firebase from '../firebase'
import firebase, {FirebaseContext} from '../firebase/index'

//validaciones
import useValidacion from '../hooks/useValidacion'
import validarProducto from '../validacion/validarProducto'



const STATE_INCIAL = {
    nombre: '',
    empresa: '',
    url: '',
    descripcion: ''
};

const CrearProducto = () => {

    const [error, setError] = useState(false);
    const [nombreImagen, guardarNombreImagen] = useState('')
    const [subiendo, guardarSubiendo] = useState(false);
    const [progreso, guardarProgreso] = useState(0);
    const [urlImagen, guardarUrlImagen] = useState('');

    const {usuario, firebase} = useContext(FirebaseContext);

    const {valores, errores, submitForm, handleSubmit, handleChange} = useValidacion
    (STATE_INCIAL, validarProducto, crearProducto);

    const { nombre, empresa, url, descripcion } = valores;
    //hook de routing para redireccionar
    const router = useRouter();

    async function crearProducto(){
        console.log("Crenado producto...");
        if(!usuario)
            return router.push('/login');
        
        //Crear objeto de nuevo producto
        const producto = {
            nombre,
            empresa,
            url,
            urlImagen,
            descripcion,
            votos: 0,
            comentarios: [],
            creado: Date.now(),
            creador: {
                id: usuario.uid,
                nombre: usuario.displayName
              }, 
            haVotado:[]
        }
        //insertar datos a firebase
        try {
            console.log(producto);
            firebase.db.collection('productos').add(producto);
            Router.push('/');
        } catch (error) {
            setError(error.message);
            
            console.log(error.message);
        }
        
    }

    const handleUploadStart = () => {
        guardarProgreso(0);
        guardarSubiendo(true);
    }
  
    const handleProgress = progreso => guardarProgreso({ progreso });
  
    const handleUploadError = error => {
        guardarSubiendo(error);
        console.error(error);
    };
  
    const handleUploadSuccess = nombre => {
        guardarProgreso(100);
        guardarSubiendo(false);
        guardarNombreImagen(nombre)
        firebase
            .storage
            .ref("productos")
            .child(nombre)
            .getDownloadURL()
            .then(url => {
              console.log(url);
              guardarUrlImagen(url);
            } );
    };

    console.log(usuario)
    
    return ( 
        <Layout>
            <div className="d-flex justify-content-center contenedor_crearProducto ">

                {
                    usuario ?
                    <Formulario className="col-lg-6 mt-3 mb-4">
                <h3 className="text-center">Crear producto</h3>
                    <form onSubmit={handleSubmit}>
                        {
                            error && <p className=" mt-1 text-center error">{error}</p>
                        }
                        <div className="form-group px-3 pt-3 ">
                            <fieldset>
                                <legend>Información general</legend>
                                <label htmlFor="nombre">Nombre: </label>
                                <input className="form-control" type="text" 
                                    id="nombre" name="nombre"
                                    placeholder="Ej: Clases react"
                                    value= {nombre}
                                    onChange={handleChange}
                                />
                                {errores.nombre && <p className=" mt-1 text-center error">Error: {errores.nombre}</p>}

                                <label htmlFor="empresa" className="mt-3">Empresa o compañia: </label>
                                <input className="form-control" type="text" 
                                    id="empresa" name="empresa"
                                    placeholder="Ej: Independiente, GTSolutions"
                                    value= {empresa}
                                    onChange={handleChange}
                                    />
                                {errores.empresa && <p className=" mt-1 text-center error">{errores.empresa}</p>}

                                <label htmlFor="imagen" className="mt-3">Imagen: </label><br/>
                                <FileUploader className="" type="file" 
                                    id="imagen" name="imagen"
                                    accept="imagen/*"
                                    randomizeFilename
                                    storageRef={firebase.storage.ref("productos")}
                                    onUploadStart={handleUploadStart}
                                    onUploadError={handleUploadError}
                                    onUploadSuccess={handleUploadSuccess}
                                    onProgress={handleProgress}
                                    /><br></br>
                                {errores.imagen && <p className=" mt-1 text-center error">{errores.imagen}</p>} 

                                <label htmlFor="url" className="mt-3">URL/Link: </label>
                                <input className="form-control" type="text" 
                                    id="url" name="url"
                                    placeholder="Ej: www.gtsolutions.com"
                                    value= {url}
                                    onChange={handleChange}
                                    />
                                {errores.url && <p className=" mt-1 text-center error">{errores.url}</p>}
                            </fieldset>

                            <fieldset className="mt-3">
                                <legend>Sobre tu producto</legend>

                                <label htmlFor="url" className="">Descripción: </label>
                                <textarea className="form-control" 
                                    id="descripcion" name="descripcion"
                                    value= {descripcion}
                                    onChange={handleChange}
                                    />
                                {errores.descripcion && <p className=" mt-1 text-center error">{errores.descripcion}</p>}

                            </fieldset>
                            
                            <button className="btn btn-success form-control mt-3">Registrar</button>
                        </div>
                    </form>
                </Formulario>
                :<h3>Necesitas inciar Sesion</h3>
                }
                
            </div>
        </Layout>
     );
}
 
export default CrearProducto;