import { useState } from 'react'
import './App.css'

const INITIAL_GIFTS = ['Medias', 'Cramelos', 'Vitel Tone']

function App() {
  const [gifts, setGifts] = useState(INITIAL_GIFTS)

  return (
    <>
      <div className='app__wrapper'>
        <div className='gifts__info'>
          <h1>Regalos</h1>

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
