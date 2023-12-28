import { useState, useRef, useEffect} from 'react'
import {ListGifs} from './components/ListGifts/ListGifts'

import './App.css'


const INITIAL_GIFTS = [
      {
        id: 1,
        name: 'Medias',
        quantity: 1
      },
      {
        id: 2,
        name: 'Caramelos',
        quantity: 1
      },
      {
        id: 3,
        name: 'Vitel Tone',
        quantity: 1
      }
]

function App() {
  const [gifts, setGifts] = useState(INITIAL_GIFTS)
  const inputNameRef = useRef(null)
  const inputQuantityRef = useRef(null)

  useEffect(() => {
    const savedGifs = JSON.parse(window.localStorage.getItem('gifts')) ?? []
    setGifts(savedGifs)
    console.log('effect', savedGifs)
  }, [])

  const isValidGift = (giftName) => {
    const existAlready = gifts.some(gift => gift.name.toLowerCase() === giftName)
    return !existAlready;
  }

  const saveGifts = (gifts) => {
    const giftsString = JSON.stringify(gifts)
    window.localStorage.setItem('gifts', giftsString)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameNewGift = inputNameRef.current.value;

    if(!isValidGift(nameNewGift.toLowerCase())) {
      throw new Error('No valid gift, already exists in the gift list')
    }

    const lastId = gifts.at(-1)?.id ?? 0
    const newGift = {
      id: lastId + 1,
      name: nameNewGift,
      quantity: inputQuantityRef.current.value
    }

    setGifts(lastGifts => [...lastGifts, newGift])
    saveGifts([...gifts, newGift])
    e.target.reset()
  }

  const deleteGiftById = (id) => {
    const updatedGifts = [...gifts];
    const giftIndex = updatedGifts.findIndex(gift => gift.id === id);
    updatedGifts.splice(giftIndex, 1);
    setGifts(() => updatedGifts)
    saveGifts(updatedGifts)
  }

  const handleClickDelete = () => {
    setGifts([])
    saveGifts([])
  }

  return (
    <>
      <div className='app__wrapper'>
        <div className='gifts__info'>
          <h1>Regalos</h1>

          <form className='gifts__form' onSubmit={handleSubmit}>
            <input type="text" className='gift__input gift__input-name' name='gift' ref={inputNameRef} placeholder='Tu nuevo regalo' required/>
            <input type="number"
            className='gift__input gift__input-quantity'
            name='quantity'
            ref={inputQuantityRef} min={1}
            defaultValue="1"
            pattern='^[1-9]\d*$'
            />
            <button type="submit" title='Agregar regalo' className='app__button gift__add'>
              Agregar
            </button>
          </form>

          <ListGifs
            gifts={gifts}
            deleteGiftById ={deleteGiftById}
          />

          <button
            className='app__button gifts__remove'
            title='Eliminar todos los regalos'
            onClick={handleClickDelete}
          >
            Borrar Todo
          </button>
        </div>
      </div>
    </>
  )
}

export default App
