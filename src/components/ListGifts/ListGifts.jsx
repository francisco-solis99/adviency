
/* eslint-disable react/prop-types */

import './List-Gifs.css'

export function ListGifs({ gifts, mode = "full", deleteGiftById, editGift, duplicateGift }) {

  const handleClickDeleteGift = (id) => deleteGiftById(id)
  const handleClickEditGift = (gift) => editGift(gift)
  const handleClickDuplicateGift = (gift) => duplicateGift(gift)
  const isEmpty = gifts.length === 0;
  const totalToPay = gifts.reduce((acum, gift) => acum + (Number(gift.price) * Number(gift.quantity)), 0)

  return (
    <>
      <ul className='gifts__list'>
        {
          isEmpty
            ?
            <li className="gift__empty">
              No hay regalos, agrega alguno
            </li>
            :
            gifts.map(gift => (
              <li key={gift.id} className='gift'>
                <div className='gift__info'>
                  <img
                    className='gift__image'
                    src={gift.image}
                    alt={gift.name}
                  />
                  <div className='gift__details'>
                    <p className='gift__name'>
                      <span>
                        {gift.name}
                      </span>
                      <span>
                        {gift.quantity > 1 && ` (${gift.quantity})`}
                      </span>
                      {
                        mode === 'full' && (
                          <span>
                            {` - $ ${(gift.quantity * gift.price).toFixed(2)}`}
                          </span>
                        )
                      }
                    </p>
                    <span className='gift__recipient'>{gift.recipient}</span>
                  </div>
                </div>

                {/* Controls just in full mode */}
                {
                  mode === 'full' && (
                    <div className='gift__controls'>
                      <button
                        className='app__button'
                        title='Editar Regalo'
                        onClick={() => handleClickEditGift(gift)}>
                        E
                      </button>
                      <button
                        className='app__button'
                        title='Duplicar Regalo'
                        onClick={() => handleClickDuplicateGift(gift)}>
                        D
                      </button>
                      <button
                        className='app__button'
                        title='Eliminar Regalo'
                        onClick={() => handleClickDeleteGift(gift.id)}>
                        X
                      </button>
                    </div>
                  )
                }

              </li>
            ))
        }
      </ul>

      {/* More info in full mode */}
      {
        mode === 'full' && (
          <>
            <hr className='gifts__line' />
            <p className='gifts__total'>
              <strong>
                Total: $ {totalToPay.toFixed(2)}
              </strong>
            </p>

          </>
        )
      }
    </>
  )
}
