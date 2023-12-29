/* eslint-disable react/prop-types */

import { useRef } from 'react';

export function FormAddGift({ createNewGift, gifts }) {

  const inputNameRef = useRef(null)
  const inputQuantityRef = useRef(null)
  const inputImageRef = useRef(null)

  const isInvalidGift = (gift) => {
    const { name, image, quantity } = gift;

    const typesError = {
      'name': 'No valid gift, already exist in the gifts list',
      'image': 'No valid image source, check your image input',
      'quantity': 'No valid quantity, use the range of each gift between 1 and 9'
    }

    // Valid if exists
    const existAlready = gifts.some(gift => gift.name.toLowerCase() === name.toLowerCase())
    if (existAlready) return typesError['name'];

    // Valid if there is valid Url img
    try {
      new URL(image)
    } catch (error) {
      return typesError['image']
    }

    // valid the quantity
    const isInvalidQuantity = quantity <= 0 || quantity > 9
    if (isInvalidQuantity) return typesError['quantity']


    return false;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const lastId = gifts.at(-1)?.id ?? 0
    const newGift = {
      id: lastId + 1,
      name: inputNameRef.current.value,
      quantity: inputQuantityRef.current.value,
      image: inputImageRef.current.value
    }

    const errorMsg = isInvalidGift(newGift);
    if (errorMsg) throw new Error(errorMsg)

    createNewGift(newGift)
    e.target.reset()
  }

  return (
    <form className='gifts__form' onSubmit={handleSubmit}>
      <input
        type="text"
        className='gift__input gift__input-name'
        name='gift'
        ref={inputNameRef}
        placeholder='Tu nuevo regalo' required
      />
      <input type="url"
        className='gift__input'
        placeholder='https//image...'
        name='image'
        ref={inputImageRef}
        required
      />
      <input type="number"
        className='gift__input gift__input-quantity'
        name='quantity'
        ref={inputQuantityRef} min={1}
        defaultValue="1"
        pattern='^[1-9]\d*$'
      />
      <button type="submit"
        title='Agregar regalo'
        className='app__button gift__add'
      >
        Agregar
      </button>
    </form>
  )
}
