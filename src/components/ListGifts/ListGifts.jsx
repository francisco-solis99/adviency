
/* eslint-disable react/prop-types */

import './List-Gifs.css'

export function ListGifs({gifts, deleteGiftById}) {

  const handleClickDeleteGift = (id) => deleteGiftById(id)
  const isEmpty = gifts.length === 0;

  return (
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
                              {gift.quantity > 1 && `(${gift.quantity})`}
                            </span>
                          </p>
                          <span className='gift__recipient'>{gift.recipient}</span>
                        </div>
                      </div>
                      <button
                        className='app__button'
                        title='Eliminar Regalo'
                        onClick={() => handleClickDeleteGift(gift.id)}>
                        X
                      </button>
                    </li>
                  ))
            }
    </ul>
  )
}
