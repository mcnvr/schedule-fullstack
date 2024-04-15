import {useState} from "react"

const ItemForm = ({ existingItem = {}, updateCallback}) => {
    const[month, setMonth] = useState(existingItem.month || "")
    const[day, setDay] = useState(existingItem.day || "")
    const[year, setYear] = useState(existingItem.year || "")
    const[title, setTitle] = useState(existingItem.title || "")
    const[desc, setDesc] = useState(existingItem.desc || "")

    const updating = Object.entries(existingItem).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            month,
            day,
            year,
            title,
            desc,
        }
        const url = "http://127.0.0.1:5000/" + (updating ? `update_schedule/${existingItem.id}` : "create_item")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else{
            updateCallback()
        }
    }

    return <form onSubmit ={onSubmit}>
        <div>
            <label htmlFor="month">Month: </label>
            <input 
                type="number" 
                id="month"
                min="1"
                max="12"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="day">Day: </label>
            <input 
                type="number" 
                id="day"
                min="0"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="year">Year: </label>
            <input 
                type="number" 
                id="year"
                min="0"
                value={year}
                onChange={(e) => setYear(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="title">Title: </label>
            <input 
                type="text" 
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="desc">Description: </label>
            <input 
                type="text" 
                id="Desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />
        </div>
        <button type="submit">{updating ? "Update" : "Create"}</button>
    </form>
}

export default ItemForm