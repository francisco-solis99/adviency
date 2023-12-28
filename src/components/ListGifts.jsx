
/* eslint-disable react/prop-types */

export function ListGifs({gifts}) {

  return (
    <ul className='gifts__list'>
            {
              gifts.map(gift => (
                <li key={gift} className='gift'>
                  <span>
                    {gift}
                  </span>
                  <button>X</button>
                </li>
              ))
            }
    </ul>
  )
}
