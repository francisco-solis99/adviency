
/* eslint-disable react/prop-types */

export function ListGifs({gifts, deleteGiftById}) {

  const handleClickDeleteGift = (id) => deleteGiftById(id)


  return (
    <ul className='gifts__list'>
            {
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
