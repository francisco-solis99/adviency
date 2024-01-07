/* eslint-disable react/prop-types */

import { useRef } from 'react';
import './FormAddEditGift.css'
import { generateRandomGiftName } from '../../services/gifts';
import { useEffect } from 'react';


export function FormAddEditGift({action = 'add', createNewGift, gifts, updateGift, giftToUpdate}) {
  const formRef = useRef(null);
  const inputNameRef = useRef(null)
  const inputPriceRef = useRef(null)
  const inputQuantityRef = useRef(null)
  const inputImageRef = useRef(null)
  const inputRecipientRef = useRef(null)

  // Reset the form
  useEffect(() => formRef.current.reset())

  const isInvalidGift = (gift) => {
    const { name, image, quantity, recipient } = gift;

    const typesError = {
      'name': 'No valid gift, already exist in the gifts list to the same recipient',
      'image': 'No valid image source, check your image input',
      'quantity': 'No valid quantity, use the range of each gift between 1 and 9'
    }

    // Valid if exists
    const existAlready = gifts.some(gift => {
      return gift.name.toLowerCase() === name.toLowerCase() && gift.recipient.toLowerCase() === recipient.toLowerCase()
    })
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
      },
      'duplicate': function() {
        this.add()
      }
    }
    actions[action]()
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const gift = {
      name: inputNameRef.current.value,
      price: inputPriceRef.current.value,
      quantity: inputQuantityRef.current.value,
      image: inputImageRef.current.value,
      recipient: inputRecipientRef.current.value
    }
    runActionGift(gift)
  }

  const handleClickGetRandomGift = () => {
    const randomGiftName = generateRandomGiftName()
    inputNameRef.current.value = randomGiftName
  }

  return (
    <form className='gifts__form' onSubmit={handleSubmit} ref={formRef}>
      <label htmlFor="gift" className='gift__label'>
        <span>Regalo:</span>
        <div className='gift__name-block'>
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
          {
            action === 'add' && (
              <button
              type='button'
              className='app__button gift__surprise'
              onClick={handleClickGetRandomGift}>
                Sorprendeme
              </button>
            )
          }
        </div>
      </label>
      <label htmlFor="price" className='gift__label'>
        <span>Precio:</span>
        <input type="number"
          className='gift__input'
          placeholder='100'
          name='price'
          id='price'
          ref={inputPriceRef}
          defaultValue={giftToUpdate?.price ?? ''}
          min={1}
          required
          tabIndex="5"
          pattern='^[1-9]\d*$'
          aria-describedby="image-validation"
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
          tabIndex="6"
          aria-describedby="image-validation"
        />
      </label>
      <label htmlFor="quantity" className='gift__label'>
        <span>Cantidad:</span>
        <input type="number"
          className='gift__input gift__input-quantity'
          name='quantity'
          id='quantity'
          ref={inputQuantityRef}
          min={1}
          defaultValue={giftToUpdate?.quantity ?? "1"}
          pattern='^[1-9]\d*$'
          tabIndex="7"
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
          tabIndex="8"
          aria-describedby="recipient-validation"
        />
      </label>
      <button type="submit"
        title='Agregar regalo'
        className='app__button gift__add'
        tabIndex="9"
      >
        {
          action === 'add' || action === 'duplicate' ? 'Agregar' : 'Editar'
        }
      </button>
    </form>
  )
}
