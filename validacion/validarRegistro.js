export default function validarRegistro(valores){

    let errores = {}

    //validar el nombre de usuario
    if(!valores.nombre)
        errores.nombre = "El nombre es obligatorio";

    if(!valores.apellidos)
        errores.apellidos = "Apellido/s obligatorios";

    if(!valores.email)
    {
        errores.email = "Correo obligatorio";
    }else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email) ) 
    {
        errores.email = "Correo no válido"
    }

    if(!valores.password)
    {
        errores.password = "Contraseña obligatoria";
    }else if(valores.password.length < 6 ) 
    {
        errores.password = 'El password debe ser de al menos 6 caracteres'
    }else if(valores.password != valores.password2)
    {
        errores.password = "La contraseña no es igual";
    }

    if(!valores.password2)
    {
        errores.password2 = "Es necesario confirmar la contraseña";
    }

    return errores;
}