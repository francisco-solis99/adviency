/* eslint-disable react/prop-types */

import { ListGifs } from "../ListGifts/ListGifts"


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
        onClick={window.print}
      >
        Imprimir
      </button>
    </div>
  )
}
