

export default function HomeFilter(){

    return (
        <div>
            <label for="filter">Filter by:</label>
                <select name="filter" >
                    <optgroup label="By name:">
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                </optgroup>
                <optgroup label="By Weight">
                        <option value="ascendent">Ascendent</option>
                        <option value="descendent">Descendent</option>
                </optgroup>
                </select>
        </div>
    )
}