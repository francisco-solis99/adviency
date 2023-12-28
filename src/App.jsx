import { useState } from 'react'
import './App.css'

const INITIAL_GIFTS = ['Medias', 'Caramelos', 'Vitel Tone']

function App() {
  const [gifts, setGifts] = useState(INITIAL_GIFTS)

  return (
    <>
      <div className='app__wrapper'>
        <div className='gifts__info'>
          <h1>Regalos</h1>

          <form action="" className='gifts__form'>
            <input type="text" className='gift__input gift__input-name' />
            <button type="button" className='gift__add'>
              Agregar
            </button>
          </form>

          <ul className='gifts__list'>
            {
              gifts.map(gift => (
                <li key={gift}>{gift}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
