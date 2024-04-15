import React from "react"

const ItemList = ({schedule, updateItem, updateCallback}) => {
    const onDelete= async(id) =>{
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_item/${id}`, options)
            if (response.status === 200){
                updateCallback()
            } else{
                console.error("Failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    }

    return <div>
        <h2>Schedule</h2>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {schedule.map((schedule) => (
                    <tr key={schedule.id}>
                        <td>{schedule.month}/{schedule.day}/{schedule.year}</td>
                        <td>{schedule.title}</td>
                        <td style={{ maxWidth: "400px"}}>{schedule.desc}</td>
                        <td>
                            <button onClick={() => updateItem(schedule)}>Update</button>
                            <button onClick={() => onDelete(schedule.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default ItemList