import { useState, useRef} from 'react'
import {ListGifs} from './components/ListGifts'

import './App.css'


const INITIAL_GIFTS = ['Medias', 'Caramelos', 'Vitel Tone']

function App() {
  const [gifts, setGifts] = useState(INITIAL_GIFTS)
  const inputNameRef = useRef(null)


  const handleSubmit = (e) => {
    e.preventDefault();

    const newGift = inputNameRef.current.value;

    setGifts(lastGifts => [...lastGifts, newGift])
    e.target.reset()
  }

  const handleClickDelete = () => {
    setGifts([])
  }

  return (
    <>
      <div className='app__wrapper'>
        <div className='gifts__info'>
          <h1>Regalos</h1>

          <form className='gifts__form' onSubmit={handleSubmit}>
            <input type="text" className='gift__input gift__input-name' name='gift' ref={inputNameRef} required/>
            <button type="submit" className='gift__add'>
              Agregar
            </button>
          </form>

          <ListGifs gifts={gifts}/>

          <button className='gifts__remove' onClick={handleClickDelete}>
            Borrar Todo
          </button>
        </div>
      </div>
    </>
  )
}

export default App
