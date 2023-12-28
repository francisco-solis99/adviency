
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
                      <span>
                        {gift.name}
                      </span>
                      <button
                        className='app__button'
                        onClick={() => handleClickDeleteGift(gift.id)}>
                        X
                      </button>
                    </li>
                  ))
            }
    </ul>
  )
}
