import React, {useState} from 'react';
import Error from './Error';

const Formulario = ({setSearch}) => {

    const [term, setTerm] = useState('');
    const [error, setError] = useState(false);


    const searchImage = (e) => {
        e.preventDefault();

        if(term.trim()===''){            
            setError(true);
        }else{
            setError(false)
            setSearch(term)
        }
    };


    return (

        <form
            onSubmit={searchImage}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text" 
                        value={term}                 
                        className='form-control form-control-lg' 
                        placeholder="Ingrese su busqueda" 
                        onChange={e => setTerm(e.target.value)}
                    />
                </div>    
                <div className='form-group col-md-4'>
                    <input 
                        type="submit" 
                        name="" 
                        value="Buscar"
                        className='btn btn-lg btn-danger btn-block'
                    />               
                </div>       
                             
            </div>  
            {error ? <Error mensaje='Debes ingresar un termino'/> : null}              
        </form>
    )
}

export default Formulario
