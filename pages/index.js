
import React from 'react'
import Layout from '../components/layout/Layout'
import DetallesProducto from '../components/layout/DetallesProducto'
import useProductos from '../hooks/useProductos';

export default function Home() {

  
  const { productos } = useProductos('creado');


  return (
    <div className="">
      
      
      <Layout>
          <div className="productos">
            <div className="mx-3">
              <div className="lista_productos mt-3">
                  {
                    productos.map(producto => (
                      <DetallesProducto
                        key={producto.id}
                        producto= {producto}
                      />
                    ))
                  }
              </div>
            </div>
          </div>
      </Layout>

      {/* <footer>
      </footer>

      <style jsx>{``}</style>

      <style jsx global>{``}</style> */}
      
    </div>
  )
}
