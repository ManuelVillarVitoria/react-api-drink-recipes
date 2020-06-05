import React, { useContext, useState } from 'react';
import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {

    const [ busqueda, guardarBusqueda ] = useState({
        nombre: '',
        categoria: ''
    });
    const [error, guardarError] = useState(false);
    const {categoria} = busqueda;

    const { categorias } = useContext(CategoriasContext);
    const { buscarRecetas, guardarConsultar } = useContext(RecetasContext );

    // función para leer los contenidos
    const obtenerDatosReceta = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

     //consultar las API
     const buscarInformacion = e => {
        e.preventDefault();

        if(categoria.trim() === "")  {
            guardarError(true);
            return;
        }
        guardarError(false);
        //Todo bien, pasar al componente principal
        buscarRecetas(busqueda);
        guardarConsultar(true);
    }

    return ( 
        

        <form
            className="col-12"
            onSubmit={buscarInformacion}
        >

        {error ? <p className="alert alert-warning text-center p-2">Es obligatorio seleccionar la categoría</p> : null}

            <fieldset className="text-center">
                <legend>Busca bebidas por Categoría o Categoría e Ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input
                        name="nombre"
                        className="form-control"
                        type="text"
                        placeholder="Buscar por Ingrediente"
                        onChange={obtenerDatosReceta}
                    />
                </div>
                <div className="col-md-4">
                    <select 
                        className="form-control"
                        name="categoria"
                        onChange={obtenerDatosReceta}
                    >
                        <option value="">-- Selecciona Categoría --</option>
                        {categorias.map(categoria => (
                            <option 
                                key={categoria.strCategory} 
                                value={categoria.strCategory} 
                            >{categoria.strCategory}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buscar Bebidas"
                    />
                </div>
            </div>
        </form>
      
     );
}
 
export default Formulario;