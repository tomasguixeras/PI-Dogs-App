import { useDispatch } from "react-redux"
import { filterByOrigin } from '../../Redux/Actions'


export default function FilterByOrigin(){
    const dispatch = useDispatch()

    function onChange(e){
        let filter = e.target.value
        dispatch(filterByOrigin(filter))
    }
    return (
        <div>
            <label htmlFor="filter">Filter by Origin:</label>
                <select name="filter" onChange={onChange} >
                    <option value="all">All Breeds</option>
                    <option value="existing">Existing Breeds</option>
                    <option value="created">Created by User</option>
                </select>
        </div>
    )
}