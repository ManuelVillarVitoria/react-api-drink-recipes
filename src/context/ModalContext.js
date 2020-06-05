import React,{useState, useEffect, createContext} from 'react';
import axios from 'axios';

//crear el Context
export const ModalContext = createContext();

const ModalProvider = (props) => {

    //state del provider
    const [idreceta, guardarIdReceta] = useState(null);
    const [receta, guardarReceta] = useState({});

    //una vez que tenemos una receta, llamar a la API
    useEffect(() => {
        const obtenerReceta = async () => {
            if(!idreceta) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`

            const res = await axios(url);
            guardarReceta(res.data.drinks[0]);
        }

        obtenerReceta();

    }, [idreceta]);

    return (  
        <ModalContext.Provider
            value={{
                guardarIdReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}
 
export default ModalProvider;