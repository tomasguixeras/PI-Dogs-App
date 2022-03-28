import styles from './Home.module.css'

import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllBreeds } from '../../Redux/Actions'


import NavBar from '../../Components/NavBar/NavBar.jsx'
import SearchBar from '../../Components/SearchBar/SearchBar.jsx'
import Card from '../../Components/DogCard/DogCard.jsx'
import Loading from '../../Components/Loading/Loading.jsx'
import NotFound from '../../Components/NotFound/NotFound.jsx'
import PaginationButtons from '../../Components/PaginationButtons/PaginationButtons.jsx'


export default function Home (){
    let breeds = useSelector(state => state.filteredBreeds)
    console.log('breeds -->', breeds)
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllBreeds())
    }, [dispatch] )

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = breeds.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    // const items_per_page = 9
    // const [ items, setItems ] = useState([...breeds].splice(0, items_per_page))
    // const [ currentPage, setCurrentPage ] = useState(0);

    
    // function onPreviousPage(e){
    //     const prevPage = currentPage - 1
    //     if(prevPage < 0) return
    //     const firstIndex = prevPage * items_per_page

    //     setItems([...breeds].splice(firstIndex, items_per_page))
    //     setCurrentPage(prevPage)
    // }
    // function onNextPage(e){
    //     const totalElements = breeds.length
    //     const nextPage = currentPage + 1
    //     const firstIndex = nextPage * items_per_page

    //     if( firstIndex === totalElements ) return

    //     setItems([...breeds].splice(firstIndex, items_per_page))
    //     setCurrentPage(nextPage)

    // }
    return (
    <div>
        <div className={styles.fullNavbar} >
            <NavBar />
            <SearchBar />
        </div>
        <div className={styles.bodyCards}>
            <div className={styles.cards}>
                {console.log('CurrentPosts --> ',currentPosts)}
                {currentPosts.length > 0 ? currentPosts.map( e => (
                    <Card 
                        key= {e.id}
                        id= {e.id}
                        image= {e.image}
                        name= {e.name}
                        weight= {e.weight}
                        temperament= {e.temperament}
                />) ) : <Loading />}
            </div>
            < PaginationButtons 
                postsPerPage={postsPerPage}
                totalPosts={breeds.length}
                paginate={paginate}
            />
        </div>
    </div>
    )
}