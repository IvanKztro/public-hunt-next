import firebaseConfig from './config'
import app from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/database';
import Router from 'next/router'

class Firebase {
    constructor(){
        if(!app.apps.length)
            app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();

        
        
    }

    //FUNCIONES

    async registrar(nombre, apellidos, email, password){
        // console.log("Creando cuenta firebase");

        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password);
        // console.log("Creando cuenta firebase");

        const nombreCompleto = `${nombre} ${apellidos}`;
        // console.log("Creando cuenta firebase");

        return await nuevoUsuario.user.updateProfile({
            displayName: nombreCompleto
        })
    }

    async login (email, password){
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    async cerrarSesion (){
        await this.auth.signOut();
        Router.push("/");
    }
}

const firebase = new Firebase();

export default firebase;