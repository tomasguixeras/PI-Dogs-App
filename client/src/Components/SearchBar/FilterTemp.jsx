import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTemperaments } from "../../Redux/Actions"


export default function FilterByTemperament(){
    let temperaments = useSelector(state => state.temperaments)
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getTemperaments())
    }, [dispatch])
    return (
        <div>
            <label htmlFor="filter">Filter by:</label>
                <select name="filter" >
                    {
                        temperaments.data ?
                        //console.log(temperaments.data)
                        temperaments.data.map((resp, idx)=>{
                            return <option value={resp.name.toLowerCase()}key={idx}>{resp.name}</option>
                        }) : ''
                    }
                </select>
        </div>
    )
}