import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import axios from 'axios'
import { useParams } from 'react-router'
import Spinner from '../components/Spinner'


const ShowBooks = () => {

  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);

  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:9999/books/${id}`)
      .then((res) => {
        setBook(res.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error.message)
        setLoading(false)
      })
  }, []);

  return (
    <div className='p-4'>
    <BackButton/>

    <h1 className='text-3xl my-4'>Show Book</h1>
    {loading ? (
      <Spinner/>
    ) : (
      <div className='flex flex-col border-2 border-sky-500 rounded-xl w-fit p-4'> 
        <div className='my-4'>
          <span className='text-xl mr-4 text-sky-900'>
            Id:
          </span>
          <span>{book._id}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-sky-900'>
            Title:
          </span>
          <span>{book.title}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-sky-900'>
            Author:
          </span>
          <span>{book.author}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-sky-900'>
            Publish year:
          </span>
          <span>{book.publishYear}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-sky-900'>
            Price:
          </span>
          <span>{book.price}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-sky-900'> Create Time:
          </span>
          <span>{new Date(book.createdAt).toString()}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-sky-900'> Last Update Time:
          </span>
          <span>{new Date(book.updatedAt).toString()}</span>
        </div>
        

      </div>
    )
    }
    </div>
  )
}

export default ShowBooks