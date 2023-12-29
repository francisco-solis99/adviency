import { useState, useRef, useEffect } from 'react'
import { ListGifs } from './components/ListGifts/ListGifts'
import { FormAddGift } from './components/FormAddGift/FormAddGift'
import { Dialog } from './components/Dialog/Dialog'

import './App.css'

function App() {
  const [gifts, setGifts] = useState([])
  const dialogRef = useRef(null)
  // TODO: Maybe I could use a state for the content of the dialog when the elements context has to be dynamic or there are more modal than 1 in the page
  // const [dialogContent, setDialogContent] = useState(null)


  useEffect(() => {
    const savedGifs = JSON.parse(window.localStorage.getItem('gifts')) ?? []
    setGifts(savedGifs)
  }, [])

  const saveGifts = (gifts) => {
    const giftsString = JSON.stringify(gifts)
    window.localStorage.setItem('gifts', giftsString)
  }

  const createNewGift = (newGift) => {
    setGifts(lastGifts => [...lastGifts, newGift])
    saveGifts([...gifts, newGift])
    toggleDialog()
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

  const toggleDialog = () => {
    if (!dialogRef.current) return

    dialogRef.current.hasAttribute('open')
      ? dialogRef.current.close()
      : dialogRef.current.showModal()
  }

  return (
    <>
      <div className='app__wrapper'>
        <div className='gifts__info'>
          <h1>Regalos</h1>

          <button
            className='app__button gift__dialog-open'
            onClick={toggleDialog}>
            Agregar Regalo
          </button>

          <Dialog ref={dialogRef}>
            <FormAddGift
              gifts={gifts}
              createNewGift={createNewGift}
            />
            <button onClick={toggleDialog} className='gift__dialog-close'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
            </button>
          </Dialog>


          <ListGifs
            gifts={gifts}
            deleteGiftById={deleteGiftById}
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
