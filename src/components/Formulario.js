import React, {useContext} from 'react';
import {CategoriasContext} from '../context/CategoriasContext';

const Formulario = () => {

    const {categorias} = useContext(CategoriasContext);
    
    console.log(categorias);
   

    return ( 
        <form
            className="col-12"
        >
            <fieldset className="text-center">
                <legend>Busca de bebidas por Categoría e Ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input 
                        name="nombre"
                        className="form-control"
                        type="text"
                        placeholder="Busca por Ingrediente"
                    />
                </div>
                <div className="col-md-4">
                    <select
                        name="categoria"
                        className="form-control"
                    >
                        <option value="">-- Selecciona Categoría --</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <input 
                        name="nombre"
                        className="btn btn-block btn-primary"
                        value="Buscar Bebidas"
                    />
                </div>
            </div>
        </form>
     );
}
 
export default Formulario;