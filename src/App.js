import { useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import ImagesList from "./components/ImagesList";


function App() {

    const [search, setSearch] = useState('')
    const [images, setImages] = useState([]);
    const [totalPage, setTotalPage] = useState(1)
    const [actualPage, setActualPage] = useState(1)


    useEffect(() => {




        const consulApi = async () => {
            if (search === '') return;

            const imagePerPage = 30;
            const apiKey = `19224386-aa30a16e0a85b00685f6086aa`;
            const url = `https://pixabay.com/api/?key=${apiKey}&q=${search}&per_page=${imagePerPage}&page=${actualPage}`;

            const response = await fetch(url);
            const result = await response.json();

            console.log(result.totalHits, "result")
            const totalPage = Math.ceil(result.totalHits / imagePerPage);
            setTotalPage(totalPage)

            console.log('total paginas', totalPage)

            setImages(result.hits)

            //mover la pagina hacia arriba
            const jumbotron = document.querySelector('.jumbotron');
            jumbotron.scrollIntoView({behavior:"smooth"})

        }
        consulApi();


    }, [search, actualPage]);

    const prevPage = () => {
        const newActualPage = actualPage - 1;
        if (actualPage < 1) return;
        setActualPage(newActualPage)


    };

    const nextPage = () => {
        const newActualPage = actualPage + 1;
        if (actualPage === totalPage) return;
        setActualPage(newActualPage)


    };


    return (
        <div className="container">
            <div className="jumbotron">
                <p className='lead text-center'>Busqueda de imagenes</p>
                <Formulario
                    setSearch={setSearch}
                />

            </div>
            <div className='row justify-content-center'>
                <ImagesList
                    images={images}
                />
                {actualPage===1 ? null : (
                    <button type="button" className='btn btn-info mr-1' onClick={prevPage}>
                    &laquo; Anterior
                    </button>
                )}

                {actualPage===totalPage ? null: (
                    <button type="button" className='btn btn-info' onClick={nextPage}>
                    Siguiente &raquo;
                    </button>
                )}
                
                
            </div>


        </div>
    );
}

export default App;
