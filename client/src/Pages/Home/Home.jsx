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
    let dispatch = useDispatch()
    
    let loading = useSelector(state => state.loading)
    let breeds = useSelector(state => state.filteredBreeds)

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

    return (
    <div>
        <div className={styles.fullNavbar} >
            <NavBar />
            <SearchBar />
        </div>
        <div className={styles.bodyCards}>
            <div className={styles.cards}>
                {loading ? <Loading /> : (
                    currentPosts.length > 0 ? currentPosts.map( e => (
                    <Card 
                        key= {e.id}
                        id= {e.id}
                        image= {e.image}
                        name= {e.name}
                        weight= {e.weight}
                        temperament= {e.temperament}
                        />) ) : <NotFound message="Breed" />)}
            </div>
            < PaginationButtons 
                postsPerPage={postsPerPage}
                totalPosts={breeds.length}
                paginate={paginate}
                currentPage= {currentPage}
            />
        </div>
    </div>
    )
}