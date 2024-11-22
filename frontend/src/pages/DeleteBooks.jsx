import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useParams, useNavigate } from 'react-router'


const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  const handleDeleteButton = () => {
    setLoading(true);
    axios 
      .delete(`http://localhost:9999/books/${id}`)
      .then(() => {
        setLoading(false)
        navigate('/')
        alert("Book Deleted Successfully!")
      })
      .catch((error) => {
        setLoading(false)
        alert("Error finding the book.")
        console.log(error.message)
      })
  }

  const handleBackButton = () => {
    navigate('/');
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col items-center border-2 border-sky-700 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
      <div className='flex w-[400px]'>
      <button onClick={handleDeleteButton} className='p-4 bg-red-700 text-white m-8 w-full border rounded-xl'>Yes, Delete it</button>
      <button onClick={handleBackButton} className='p-4 bg-green-600 text-white m-8 w-full border rounded-xl'>No, Go Back</button>
      </div>
        
      </div>

    </div>
  )
}

export default DeleteBooks