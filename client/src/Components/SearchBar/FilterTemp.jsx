import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterByTemperament, getTemperaments } from "../../Redux/Actions/index.js"

export default function FilterByTemperament(){
    let temperaments = useSelector(state => state.temperaments)
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getTemperaments())
    }, [dispatch])

    function onChange(e){
        let filter = e.target.value
        dispatch(filterByTemperament(filter))
    }

    return (
        <div>
            <label htmlFor="filter">Filter by:</label>
                <select name="filter" onChange={onChange} >
                    {
                        temperaments.data ?
                        temperaments.data.map((resp, idx)=>{
                            return <option value={resp.name}key={idx} >{resp.name}</option>
                        }) : ''
                    }
                </select>
        </div>
    )
}