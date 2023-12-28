
/* eslint-disable react/prop-types */

export function ListGifs({gifts, deleteGiftById}) {

  const handleClickDeleteGift = (id) => deleteGiftById(id)
  const isEmpty = gifts.length === 0;

  return (
    <ul className='gifts__list'>
            {
              isEmpty
                ?
                  <li className="gifts__empty">
                    No hay regalos, agrega alguno
                  </li>
                :
                  gifts.map(gift => (
                    <li key={gift.id} className='gift'>
                      <span>
                        {gift.name}
                      </span>
                      <button
                        onClick={() => handleClickDeleteGift(gift.id)}>
                        X
                      </button>
                    </li>
                  ))
            }
    </ul>
  )
}
