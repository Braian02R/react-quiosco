import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
//import { categorias as categoriasDB} from "../data/categoria"
import axios from "axios";

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {

    //const [categorias, setCategorias] = useState([categoriasDB]);
    const [categorias, setCategorias] = useState([]);
    //const [categoriaActual, setCategoriaActual] = useState(categorias[0]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [modal, setModal] = useState(false);
    const [producto, setProducto] = useState({});
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const nuevoTotal = pedido.reduce( (total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    const obtenerCategorias = async () => {
        try {
            //const respuesta = await axios('http://localhost/api/categorias')
            //console.log(respuesta)
            //console.log(import.meta.env.VITE_API_URL)
            const {data} = await axios(`${import.meta.env.VITE_API_URL}/api/categorias`)
            setCategorias(data.data)
            console.log(data.data)
            setCategoriaActual(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( ()=> {
        obtenerCategorias();
    },[])

    const handleClickCategoria = id => {
        //console.log(id)
        const categoria = categorias.filter(categoria => categoria.id === id)[0] //lo seteo a objeto con el [0]
        setCategoriaActual(categoria)
    }

    const handleClickModal = () => {
        setModal(!modal )
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleAgregarPedido = ({categoria_id,  ...producto}) => {
        //console.log(producto)
        

        if(pedido.some( pedidoState => pedidoState.id === producto.id )) {
            const pedidoActualizado = pedido.map( pedidoState => pedidoState.id ===
                producto.id ? producto : pedidoState)
            setPedido(pedidoActualizado)
            toast.success('Guardado correctamente')
        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado al Pedido')
        }
    }

    const handleEditarCantidad = id => {
        //console.log(id)
        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(productoActualizar)
        setModal(!modal)
    }

    const handleEliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Eliminado del Pedido')
    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total
            }}
        >{children}</QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext