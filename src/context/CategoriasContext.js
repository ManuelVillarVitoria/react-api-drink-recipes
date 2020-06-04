import React,{createContext, useState} from 'react';

//Crear el Context
export const CategoriasContext = createContext();

//Provider es donde se encuentran las fucniones y el State
const CategoriasProvider = (props) => {

    //crear el state del Context
    const [hola, guardarHola] = useState('hola desde State');

    return(
        <CategoriasContext.Provider
            value={{
                hola
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider;