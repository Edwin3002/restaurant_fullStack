import { yupConfirmCart } from '@/validators/yupConfirmCart';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateOrderMutation } from '@/apiRtk/apis/ordersApi';
import { toast } from 'react-hot-toast';
import { resetCart } from '@/redux/slices/cartSlice';
import { useRouter } from 'next/router';

const confirmCart = () => {

  const [valoresIniciales, setValoresIniciales] = useState({ nameCustomer: "", tableOrder: "" });
  const dispatch = useDispatch();
  const router = useRouter();
  const { amountCart, listCart, totalPrice } = useSelector(store => store.cart);

  const [createOrder, { data: dataCreateOrder, error: errorCreateOrder, isLoading: isLoadingCreateOrder }] = useCreateOrderMutation();

  const { register, handleSubmit, watch, formState: { errors }, } = useForm({ resolver: yupResolver(yupConfirmCart), values: valoresIniciales });

  const onSubmit = dataForm => {
    const newData = { ...dataForm, amountOrder: amountCart, totalPriceOrder: totalPrice, listOrder: listCart };
    createOrder(newData);
    // const newMessage = {
    //   body: dataForm,
    //   from: "Me",
    // };
    // socket.emit("message", newMessage.body);
  };

  useEffect(() => {
    if (dataCreateOrder) {
      toast.success(dataCreateOrder);
      dispatch(resetCart());
      router.push("/menu");
    };
    if (errorCreateOrder?.msg) {
      toast.error(errorCreateOrder?.msg);
    } else {
      errorCreateOrder?.errors?.map(item => toast.error(item.msg));
    }
  }, [dataCreateOrder, errorCreateOrder]);

  // <p onClick={() => setValoresIniciales({ nameCustomer: "qweqwe", tableOrder: 2 })}>reset</p>

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-3/4 m-auto flex flex-col'>
      <div className="my-6">
        <label htmlFor="success" className="block mt-4 text-sm font-medium">Nombre</label>
        <input type="text" {...register("nameCustomer", { required: "Campo requerido", maxLength: 20 })} id="success" className={`my-2 bg-tertiary-main border   text-sm rounded-lg  block w-full p-2.5 ${errors.nameCustomer && "placeholder-red-500 border-red-500"}`} placeholder="Nombre*" />
        <p className="mb-4 text-sm text-red-600">{errors.nameCustomer?.message}</p>
        <label htmlFor="error" className="block mb-2 text-sm font-medium">Mesa</label>
        <input type="number" {...register("tableOrder")} id="success" className={`my-2 bg-tertiary-main border   text-sm rounded-lg  block w-full p-2.5 ${errors.nameCustomer && "placeholder-red-500 border-red-500"}`} placeholder="Mesa*" />
        <p className="mb-4 text-sm text-red-600">{errors.tableOrder?.message}</p>
      </div>
      <button disabled={isLoadingCreateOrder} type="submit" className="text-white bg-secondary-main hover:bg-secondary-light focus:ring-4 focus:outline-none focus:ring-tertiary-main font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mx-auto">Campo requerido</button>
    </form >
  )
}

export default confirmCart