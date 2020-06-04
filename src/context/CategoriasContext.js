import React,{createContext, useState, useEffect} from 'react';
import axios from 'axios';

//Crear el Context
export const CategoriasContext = createContext();

//Provider es donde se encuentran las fucniones y el State
const CategoriasProvider = (props) => {

    //crear el state del Context
    const [categorias, guardarCategorias] = useState([]);

    //Ejecutar el llamado a la API
    useEffect(() => {

        const obtenerCategorias = async () => {

            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

            const categorias = await axios(url);

            guardarCategorias(categorias.data.drinks);
        }

        obtenerCategorias();
    },[]);
    

    return(
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider;