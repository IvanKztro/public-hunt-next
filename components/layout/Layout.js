import React from 'react';
import Link from 'next/link'
import Navbar from './Navbar'
import Head from 'next/head'
import { Global, css } from '@emotion/core';

const Layout = (props) => {
    return ( 
        <>
        <Global 
                styles={css`
                    :root {
                        --gris: #3d3d3d;
                        --gris2: #6F6F6F;
                        --gris3: #e1e1e1;
                        --naranja: #DA552F;
                    }
                    
                    img {
                        max-width: 100%;
                    }
                    /* body{
                        background-color: rgba(10, 10, 10, 0.444);
                    } */
                    


.navbar-brand
{
    color: #28a745!important;
}
.button_search
{
    height: 2rem;
    width: 2rem;
    display: block;
    background-size: 2.5rem;
    background-image: url('../img/buscar.png');
    position: absolute;
    background-color: white;
    border: none;
    top:1.5px;
    right: 1rem;
}
.form_search
{
    position: relative;
}
.error
{
    color: white;
    background-color: rgb(235, 46, 46);
}


.lista_productos{
    border: 1px solid #e1e1e1;
}

/* */
.contenedor_crearProducto
{
    background-color:#D8D8D8;
}


                    
                `}
            />
            <Head>
                <title>Product Hunt Firebase y Next.js</title>
                <meta charSet="utf-8" />
                {/* <link rel="icon" href="%PUBLIC_URL%/favicon.ico" /> */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta http-equiv="Expires" content="0"/>
                <meta http-equiv="Last-Modified" content="0"/>
                <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate"/>
                <meta http-equiv="Pragma" content="no-cache"></meta>
                
                <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"/>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"/>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"/>
                <script src="https://kit.fontawesome.com/997099676b.js" crossorigin="anonymous"/>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"/>
                <link href="./css/app.css" rel="stylesheet" />

                
            </Head>
            <Navbar/>
            <main>
                {props.children}
            </main>
            
        </>
     );
}
 
export default Layout;