

export default function FilterByOrigin(){

    return (
        <div>
            <label htmlFor="filter">Filter by Origin:</label>
                <select name="filter" >
                    <option value="all">All Breeds</option>
                    <option value="existing">Existing Breeds</option>
                    <option value="created">Created by User</option>
                </select>
        </div>
    )
}