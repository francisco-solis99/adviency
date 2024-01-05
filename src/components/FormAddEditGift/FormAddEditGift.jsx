/* eslint-disable react/prop-types */

import { useRef } from 'react';
import './FormAddEditGift.css'


export function FormAddEditGift({action = 'add', createNewGift, gifts, updateGift, giftToUpdate}) {

  const inputNameRef = useRef(null)
  const inputQuantityRef = useRef(null)
  const inputImageRef = useRef(null)
  const inputRecipientRef = useRef(null)

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

  const runActionGift = (gift) => {
    const actions = {
      'add': () => {
        const lastId = gifts.at(-1)?.id ?? 0
        const newGift = {
          id: lastId + 1,
          ...gift
        }

        const errorMsg = isInvalidGift(newGift);
        if (errorMsg) throw new Error(errorMsg)
        createNewGift(newGift)
      },
      'edit': () => {
        updateGift({id: giftToUpdate.id, ...gift})
      }
    }
    actions[action]()
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const gift = {
      name: inputNameRef.current.value,
      quantity: inputQuantityRef.current.value,
      image: inputImageRef.current.value,
      recipient: inputRecipientRef.current.value
    }

    runActionGift(gift)
    e.target.reset()
  }

  return (
    <form className='gifts__form' onSubmit={handleSubmit}>
      <label htmlFor="gift" className='gift__label'>
        <span>Regalo:</span>
        <input
          type="text"
          className='gift__input gift__input-name'
          name='gift'
          id='gift'
          ref={inputNameRef}
          defaultValue={giftToUpdate?.name ?? ''}
          placeholder='Tu nuevo regalo' required
          tabIndex="4"
          aria-describedby="name-gift"
        />
      </label>
      <label htmlFor="image" className='gift__label'>
        <span>Imagen:</span>
        <input type="url"
          className='gift__input'
          placeholder='https//image...'
          name='image'
          id='image'
          ref={inputImageRef}
          defaultValue={giftToUpdate?.image ?? ''}
          required
          tabIndex="5"
          aria-describedby="image-validation"
        />
      </label>
      <label htmlFor="quantity" className='gift__label'>
        <span>Cantidad:</span>
        <input type="number"
          className='gift__input gift__input-quantity'
          name='quantity'
          id='quantity'
          ref={inputQuantityRef} min={1}
          defaultValue={giftToUpdate?.quantity ?? "1"}
          pattern='^[1-9]\d*$'
          tabIndex="6"
          aria-describedby="quantity-validation"
        />
      </label>
      <label htmlFor="recipient" className='gift__label'>
        <span>Destinatario:</span>
        <input type="text"
          className='gift__input'
          name='recipient'
          id='recipient'
          placeholder='Goncy...'
          defaultValue={giftToUpdate?.recipient ?? ''}
          ref={inputRecipientRef}
          tabIndex="7"
          aria-describedby="recipient-validation"
        />
      </label>
      <button type="submit"
        title='Agregar regalo'
        className='app__button gift__add'
        tabIndex="8"
      >
        {
          action === 'add' ? 'Agregar' : 'Editar'
        }
      </button>
    </form>
  )
}