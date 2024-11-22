import React, { useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import {useSnackbar} from 'notistack'
import { useNavigate } from 'react-router-dom'


const CreateBooks = () => {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [price, setPrice] = useState('');
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();

  const handleCreateButton = () => {
    setLoading(true)
    const data = {
      title,
      author,
      publishYear,
      price
    }

    axios
      .post('http://localhost:9999/books/', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Creation Successfull!", {variant: 'success'})
        navigate('/')
      })
      .catch((error) => {
        console.log(error.message)
        setLoading(false)
      })
  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-600 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-sky-900'>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-sky-900'>Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-sky-900'>Publish Year</label>
          <input type="text" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-sky-900'>Price</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
      </div>

      <div className='flex justify-center pt-10'>
        <button onClick={handleCreateButton} className='p-4 border-2 border-sky-800 rounded-xl w-[600ox]'>
          Create Book
        </button>
      </div>
    </div>
  )
}

export default CreateBooks