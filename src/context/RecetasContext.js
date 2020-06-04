import React,{createContext, useState, useEffect} from 'react';
import axios from 'axios';

//Crear el Context
export const RecetasContext = createContext();

//Provider es donde se encuentran las funciones y el State
const RecetasProvider = (props) => {

    const [recetas, guardarRecetas] = useState([]);
    const [busqueda, buscarRecetas] = useState({
        nombre : '',
        categoria : ''
    });
    const [consultar, guardarConsultar] = useState(false);

    const {nombre, categoria} = busqueda;

    useEffect(() => {

        if(consultar) {
            const obtenerRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;

                const res= await axios(url);

                //console.log(res.data.drinks);
                guardarRecetas(res.data.drinks);
            }
            obtenerRecetas();
        }

    }, [busqueda]);


    return(
        <RecetasContext.Provider
            value={{
                buscarRecetas,
                guardarConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    )
}

export default RecetasProvider;