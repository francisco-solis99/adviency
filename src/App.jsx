import { useState, useRef, useEffect } from 'react'
import { ListGifs } from './components/ListGifts/ListGifts'
import { FormAddEditGift } from './components/FormAddEditGift/FormAddEditGift'
import { Dialog } from './components/Dialog/Dialog'

import './App.css'

function App() {
  const [gifts, setGifts] = useState([])
  const dialogRef = useRef(null)
  const [dialogContent, setDialogContent] = useState(null)


  useEffect(() => {
    const savedGifs = JSON.parse(window.localStorage.getItem('gifts')) ?? []
    setGifts(savedGifs)
  }, [])

  const saveGifts = (giftsList) => {
    const giftsString = JSON.stringify(giftsList)
    window.localStorage.setItem('gifts', giftsString)
  }

  const createNewGift = (newGift) => {
    setGifts(lastGifts => [...lastGifts, newGift])
    saveGifts([...gifts, newGift])
    toggleDialog()
  }

  const deleteGiftById = (id) => {
    const copyGifts = [...gifts];
    const giftIndex = copyGifts.findIndex(gift => gift.id === id);
    copyGifts.splice(giftIndex, 1);
    setGifts(() => copyGifts)
    saveGifts(copyGifts)
  }

  const updateGiftById = (updatedGift) => {
    const copyGifts = [...gifts];
    const giftIndex = copyGifts.findIndex(gift => gift.id === updatedGift.id);
    copyGifts[giftIndex] = updatedGift
    setGifts(() => copyGifts)
    saveGifts(copyGifts)
    toggleDialog()
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
            tabIndex="1"
            className='app__button gift__dialog-open'
            onClick={() => {
              toggleDialog()
              setDialogContent(
                <FormAddEditGift
                  action="add"
                  gifts={gifts}
                  createNewGift={createNewGift}
                />
              )
            }}>
            Agregar Regalo
          </button>

          <Dialog ref={dialogRef}>
            {
              dialogContent
            }
            <button tabIndex="3" onClick={toggleDialog} className='gift__dialog-close' type='button'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
            </button>
          </Dialog>


          <ListGifs
            gifts={gifts}
            deleteGiftById={deleteGiftById}
            editGift={(giftInfo) => {
              toggleDialog()
              setDialogContent(
                <FormAddEditGift
                  action="edit"
                  giftToUpdate={giftInfo}
                  updateGift={updateGiftById}
                />
              )
            }}
          />

          <button
          tabIndex="2"
            className='app__button gifts__remove'
            title='Eliminar todos los regalos'
            onClick={handleClickDelete}
            type='button'
          >
            Borrar Todo
          </button>
        </div>
      </div>
    </>
  )
}

export default App
