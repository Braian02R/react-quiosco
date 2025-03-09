import clienteAxios from "../../config/axios";

export const useAuth = ({middleware, url}) => {
    const login = async (datos, setErrores) => {
        try {
            const {data} = await clienteAxios.post('/api/login', datos)
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([])
        } catch (error) {
            console.log(error.response.data.errors)
            //console.log(Object.values(error.response.data.errors))
            setErrores(Object.values(error.response.data.errors))
        }
    }

    const registro = () => {

    }

    const logout = () => {

    }

    return{
        login,
        registro,
        logout
    }
}