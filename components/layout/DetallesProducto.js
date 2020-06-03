import React from 'react'
import styled from '@emotion/styled'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import Link from 'next/link'


const DetallesProducto = ({producto}) => {

    const Imagen = styled.img`
        width: 12rem;
    `;

    const Producto = styled.li`
    
        display:flex;
        padding: 2rem;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e1e1e1;
        background-color: #FAFAFA
    `;

    const Descripcion = styled.div`
        
        flex: 0 1 600px;
        display: grid;
        grid-template-columns: 1fr 3fr;
        column-gap: 2rem;
    `;

    const Titulo = styled.a`
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0;
        :hover {
            cursor: pointer;
        }
    `;

    const TextoDescripcion = styled.p`
        font-size: 1rem;
        margin: 0;
        color: #888;
        
    `

    const Comentarios = styled.div`
        
        margin-top: 2rem;
        display: flex;
        align-items: center;

        div{
            display: flex;
            align-items: center;
            padding: .2rem .2rem;
            margin-right: 1rem;
            border: 1px solid #e1e1e1;
            

        }

        img{
            width: 1.3rem;
            margin-right: 1rem;
        }
        p{
            font-size: .9rem;
            font-weight: 700;
            margin-right: .5rem;
            &:last-of-type {
            margin: 0;
            }

        }
    `;

const Votos = styled.div`
    
    text-align: center; 
    /*border: 1px solid #e1e1e1;*/
    
    div {
        font-size: 1.2rem;
    }
    p {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 700;
    }
`;

    const { id, comentarios, creado, descripcion, empresa, nombre, url, urlImagen, votos } = producto;
    return ( 
        
         <Producto>
             <Descripcion className="bg-">
                 <div >
                     <Imagen src={urlImagen} alt=""/>
                 </div>
                 <div className="">
                    <Link href="/productos/[id]" as={`/productos/${id}`}>
                        <Titulo>{nombre}</Titulo>
                    </Link>
                     <TextoDescripcion>{descripcion}</TextoDescripcion>
                     <Comentarios>
                         <div>
                             <img src="/img/comentario.png" />
                             <p>{comentarios.length}</p>
                         </div>
                     </Comentarios>
                     <p>Publicado hace: {formatDistanceToNow(new Date(creado), {locale: es})}</p>
                 </div>
              
             </Descripcion>
             <Votos >
                 <div>&#9650;</div>
                 <p>{votos}</p>
             </Votos>
         </Producto>
     );
}
 
export default DetallesProducto;