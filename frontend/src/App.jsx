import { useState, useEffect } from 'react'
import ItemList from './ItemList'
import './App.css'
import ItemForm from './ItemForm'

function App() {
  const [schedule, setSchedule] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentSchedule, setCurrentSchedule] = useState({})

  useEffect(() => {
    fetchSchedule()
  }, [])

  const fetchSchedule = async () => {
    const response = await fetch("http://127.0.0.1:5000/schedule")
    const data = await response.json()
    setSchedule(data.schedule)
    console.log(data.schedule)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentSchedule({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (schedule) => {
    if (isModalOpen) return
    setCurrentSchedule(schedule)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchSchedule()
  }

  return (
    <>
      <ItemList schedule={schedule} updateItem={openEditModal} updateCallback={onUpdate}/>
      <button onClick={openCreateModal}>Create New Item</button>
      {
        isModalOpen && <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <ItemForm existingItem={currentSchedule} updateCallback={onUpdate}/>
          </div>
        </div>
      }
    </>
  );
}

export default App
