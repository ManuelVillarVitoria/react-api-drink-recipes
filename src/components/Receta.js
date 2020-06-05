import React, {useContext,useState} from 'react';
import {ModalContext} from '../context/ModalContext';

import Modal from '@material-ui/core/Modal'; // npm i @material-ui/core
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({receta}) => {

    //configuración del Modal de Material-UI
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    //extraer los valores del context
    const {informacion, guardarIdReceta, guardarReceta} = useContext(ModalContext);
    console.log(informacion);

    //Muestra y formatea los ingredientes con sus cantidades
    const mostrarIngredientes = informacion => {
        let ingredientes = [];

        for(let i = 1; i < 16; i++){
            //Si la posición de los ingredientes no es null, agregamos cada ingrediente 
            //con su cantidad en un listado dentro del array
            if(informacion[`strIngredient${i}`]) {
                ingredientes.push(
                    <li>{informacion[`strIngredient${i}`]}
                    {informacion[`strMeasure${i}`]}</li>
                )
            }
        }
        return ingredientes;
    }


    return (  
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>

                <img className="card-img-top" src={receta.strDrinkThumb} 
                     alt={`Imagen de ${receta.strDrink}`}/>
                
                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            guardarIdReceta(receta.idDrink)
                            handleOpen();
                        }}
                    >
                        Ver receta
                    </button>

                    <Modal
                        open={open}
                        onClose={() => {
                            guardarIdReceta(null);
                            guardarReceta({});
                            handleClose();
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{informacion.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>
                                {informacion.strInstructions}
                            </p>
                            <img className="img-fluid my-4" src={informacion.strDrinkThumb} 
                             alt=""/>
                             <h3>Ingredientes y cantidades</h3>
                             <ul>
                                 {mostrarIngredientes(informacion)}
                             </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
 
export default Receta;