import useSWR from "swr"
import Producto from "../components/Producto"
import useQuiosco from "../hooks/useQuiosco"
import clienteAxios from "../../config/axios"

export default function Inicio() {

    //console.log(productos)

    const { categoriaActual } = useQuiosco()
    
    const token = localStorage.getItem('AUTH_TOKEN')

    // consulta SWR
    const fetcher = () => clienteAxios('/api/productos', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(data => data.data)
    const {data, error, isLoading} = useSWR('/api/productos', fetcher, {
        refreshInterval: 1000
    });

    if(isLoading) return 'Cargando...'
    const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id)

    return (
        <>
            <div className='text-4xl font-black'>{categoriaActual.nombre}</div>
            <p className='text-2xl my-10'>
                Elige y personaliza tu pedido a continuación.
            </p>

            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                {productos.map(producto => (
                    <Producto 
                        key={producto.imagen}
                        producto={producto}
                        botonAgregar={true}
                    />
                ))}
            </div>
        </>
    )
}