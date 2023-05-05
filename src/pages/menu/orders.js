import { useGetOrdersQuery } from '@/apiRtk/apis/ordersApi';
import Titles from '@/components/typography/Titles';
import { formatPrice } from '@/helpers/formats';
import React, { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client';

const orders = () => {

  const [openAccordion, setOpenAaccordion] = useState(null);
  const [orders, setOrders] = useState([]);
  // const socket = io("http://localhost:4000");

  const { data: dataGetOrders, error: errorGetOrders } = useGetOrdersQuery();

  // useEffect(() => {
  //   socket.on("message", (mse) => setOrders(mse));

  //   return () => {
  //     socket.off("message", (mse) => setOrders(mse));
  //   };
  // }, []);

  useEffect(() => {
    if (dataGetOrders) setOrders(dataGetOrders);
  }, [dataGetOrders])

  return (
    <div>
      <Titles>~ Pedidos ~</Titles>
      {orders?.map((item, index) => (
        <table key={index + item.nameCustomer} className="w-full font-medium text-left  border border-b-0 border-gray-200  dark:border-gray-700 ">
          <thead className="  text-xs" onClick={() => setOpenAaccordion(openAccordion == index ? null : index)}>
            <tr className=' flex justify-between'>
              <th rowSpan={1} className="px-6 py-3 w-3/12">
                {item.nameCustomer}
              </th>
              <th rowSpan={1} className="px-6 py-3 w-2/12">
                Mesa: {item.tableOrder}
              </th>
              <th className="px-6 py-3 w-3/12">
                Cantidad total: {item.amountOrder}
              </th>
              <th className="px-6 py-3 w-3/12">
                Precio total: {formatPrice(item.totalPriceOrder)}
              </th>
              <th className="px-6 py-3 w-1/12 flex flex-row-reverse">
                <svg data-accordion-icon className={`w-6 h-6shrink-0${openAccordion == index ? " rotate-180 " : ""}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </th>
            </tr>
          </thead>
          <tbody className={openAccordion == index ? "" : "hidden"}>
            {
              item.listOrder?.map((item2, index) => (
                <tr className='w-full flex justify-between' key={index + item2.name}>
                  <td rowSpan={1} className="px-6 py-3 w-3/12 ">
                    {item2.name}
                  </td>
                  <td className="px-6 py-3 w-2/12">
                    <img
                      src={item2.img}
                      className='object-cover flex w-24 h-14'
                    />
                  </td>
                  <td colSpan={1} className="px-6 py-3 w-3/12 ">
                    N. platos: {item2.amount}
                  </td>
                  <td className="px-6 py-3 w-2/12">
                    Precio: {formatPrice(item2.price)}
                  </td>
                  <td className="px-6 py-3 w-2/12 flex ">
                    {item2.category}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      )
      )}
    </div >
  )
}

export default orders;