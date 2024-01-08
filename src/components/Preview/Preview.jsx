/* eslint-disable react/prop-types */

import { ListGifs } from "../ListGifts/ListGifts"

const handleClickPrint = (giftsList) => {
  if(!giftsList.length) throw new Error('There are no gifts in the list to buy')
  window.print()
}

export function Preview({giftsList}) {
  return (
    <div>
      <h3 className="preview__title">Comprar:</h3>
      <ListGifs
        gifts={giftsList}
        mode="preview"
      />
      <button
        type="button"
        className="app__button preview__print-btn"
        onClick={() => handleClickPrint(giftsList)}
      >
        Imprimir
      </button>
    </div>
  )
}
