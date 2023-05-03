import Titles from '@/components/typography/Titles';
import { formatPrice } from '@/helpers/formats';
import { addMoreItemsCart, removeMoreItemsCart } from '@/redux/slices/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const cart = () => {

  const { listCart, totalPrice } = useSelector(store => store.cart);

  const dispatch = useDispatch();

  const addMoreDishes = (id) => {
    dispatch(addMoreItemsCart(id));
  }

  const removeMoreDishes = (id) => {
    dispatch(removeMoreItemsCart(id));
  }
  return (
    <div>
      <Titles>~ Carrito ~</Titles>
      <div className='bg-tertiary-main flex flex-col border rounded-3xl py-4 px-2'>
        {listCart[0] ?
          <>
            {listCart?.map((item, index) => (
              <div key={index + item.name} className='mt-4 flex justify-between bg-tertiary-main'>
                <div className='border rounded-3xl w-2/5 h-24 '>
                  <img
                    src={item.img}
                    // src={"/logos/logo.svg"}
                    alt={item.name}
                    className="m-auto object-cover w-full h-full rounded-3xl "
                    width={100}
                    height={100}
                  />
                </div>
                <div className='flex flex-col w-1/2 justify-around'>
                  <p className='text-center font-bold'>
                    {item.name}
                  </p>
                  <div className='flex justify-evenly'>
                    <span className='bg-secondary-main p-1 rounded-lg' onClick={() => removeMoreDishes(item._id)}>
                      <i className="bi bi-dash-lg text-xl text-primary-main"></i>
                    </span>
                    <span className='text-xl'>{item.amount}</span>
                    <span className='bg-secondary-main p-1 rounded-lg' onClick={() => addMoreDishes(item._id)}>
                      <i className="bi bi-plus-lg text-xl text-primary-main"></i>
                    </span>
                  </div>
                </div>
              </div>
            ))
            }
            <p className='text-center'>Total: {formatPrice(totalPrice)}</p>
            <Link href={"/menu/cart/confirmCart"} className=' mx-auto mt-8 mb-4'>
              <button type="button" className="text-secondary-main bg-primary-main hover:text-primary-main hover:bg-secondary-main font-bold rounded-lg text-sm px-5 py-2.5 "> Confirmar Pedido</button>
            </Link>
          </>
          : <p className="flex flex-col justify-center">
            Carrito vacio
            <i className="bi bi-cart-x"></i>
          </p>}
      </div>
    </div>
  )
}

export default cart;