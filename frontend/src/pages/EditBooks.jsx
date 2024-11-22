import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { useNavigate } from 'react-router'
import { useSnackbar } from 'notistack'
import { useParams } from 'react-router'

const EditBooks = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [price, setPrice] = useState('');

  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:9999/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear)
        setTitle(response.data.title)
        setPrice(response.data.price)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [])

  const handleEditButton = () => {
    const data = {
      title,
      author,
      publishYear,
      price
    }
    setLoading(true)
    axios
      .put(`http://localhost:9999/books/${id}`, data)
      .then(() => {
        setLoading(false)
        enqueueSnackbar("Book edited Successfully", { variant: 'success' })
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        console.log(error.message)
        enqueueSnackbar("Edit Unsuccessfull", { variant: 'error' })
      })

  }



  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-600 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-sky-900'>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-sky-900'>Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-sky-900'>Publish Year</label>
          <input type="text" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-sky-900'>Price</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
      </div>

      <div className='flex justify-center pt-10'>
        <button onClick={handleEditButton} className='p-4 border-2 border-sky-800 rounded-xl w-[600ox]'>
          Edit Book
        </button>
      </div>
    </div>
  )
}

export default EditBooks