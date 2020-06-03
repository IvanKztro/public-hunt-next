export default function validarProducto(valores){

    let errores = {}
    //{nombre, empresa, imagen, url, descripcion}

    //validar el nombre de usuario
    if(!valores.nombre)
        errores.nombre = "El nombre es obligatorio";

    if(!valores.empresa)
        errores.empresa = "Nombre de empresa o compañia obligatorio";

    // if(!valores.imagen)
    // {
    //     errores.imagen = "Imagen obligatorio";
    // }

    if(!valores.url)
    {
        errores.url = "Url obligatoria";
    }else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url) ) {
        errores.url = "URL no válida"
    }

    if(!valores.descripcion)
    {
        errores.descripcion = "Descripción del producto es obligatoria";
    }

    return errores;
}