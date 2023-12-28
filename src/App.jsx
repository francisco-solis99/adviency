import { useState, useRef} from 'react'
import {ListGifs} from './components/ListGifts/ListGifts'

import './App.css'


const INITIAL_GIFTS = [
      {
        id: 1,
        name: 'Medias'
      },
      {
        id: 2,
        name: 'Caramelos'
      },
      {
        id: 3,
        name: 'Vitel Tone'
      }
]

function App() {
  const [gifts, setGifts] = useState(INITIAL_GIFTS)
  const inputNameRef = useRef(null)


  const handleSubmit = (e) => {
    e.preventDefault();
    const lastId = gifts.at(-1)?.id ?? 0

    const newGift = {
      id: lastId + 1,
      name: inputNameRef.current.value
    }

    setGifts(lastGifts => [...lastGifts, newGift])
    e.target.reset()
  }

  const deleteGiftById = (id) => {
    const updatedGifts = [...gifts];
    const giftIndex = updatedGifts.findIndex(gift => gift.id === id);
    updatedGifts.splice(giftIndex, 1);
    setGifts(() => updatedGifts)
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

          <ListGifs gifts={gifts} deleteGiftById ={deleteGiftById}/>

          <button className='gifts__remove' onClick={handleClickDelete}>
            Borrar Todo
          </button>
        </div>
      </div>
    </>
  )
}

export default App
