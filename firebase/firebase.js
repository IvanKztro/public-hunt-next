import app from 'firebase/app'
import firebaseConfig from './config'
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage'
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
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password);
        const nombreCompleto = `${nombre} ${apellidos}`;
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