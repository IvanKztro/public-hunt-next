import React, {useState, useEffect} from 'react';

const Validacion = (stateInicial, validar, fn) => {

    const [valores, guardarValores] = useState(stateInicial);
    const [errores, guardarErrores] = useState({});
    const [submitForm, guardarSubmitForm] = useState(false);
    useEffect(() => {

        if(submitForm)
        {
            const noErrores = Object.keys(errores).length === 0;
            if(noErrores)
            {
                fn();
            }
            guardarSubmitForm(false);
        }

    },[errores]);

    //Función qu se ejecuta cando el usuario escribe algo
    const handleChange = e =>{
        guardarValores({
            ...valores,
            [e.target.name]: e.target.value

        })
    }

    //Función que se ejecuta cuando el usuario envia el formulario
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
        guardarSubmitForm(true);
    }
    return { valores, errores, submitForm, handleSubmit, handleChange };
}
 
export default Validacion;