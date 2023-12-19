import { useCreateMenuMutation } from '@/apiRtk/apis/menuApi';
import Titles from '@/components/typography/Titles';
import { convertToBase64 } from '@/constants/inputs';
import { formatPrice } from '@/helpers/formats';
import { uploadImage } from '@/helpers/uploadImage';
import { yupMenuCrud } from '@/validators/yupMenuCrud';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const crud = () => {

  const [valueFile, setValueFile] = useState(null);
  const [disabledButton, setDisabledButton] = useState(0)
  const [valoresIniciales, setValoresIniciales] = useState({ name: "", description: "", price: "", img: "" });

  const [createMenu, { data: dataCreateMenu, error: errorCreateMenu, isLoading: isLoadingCreateMenu }] = useCreateMenuMutation();

  const { register, handleSubmit, formState: { errors }, setValue, reset, getValues } = useForm({ resolver: yupResolver(yupMenuCrud), values: valoresIniciales });

  const onSubmit = async dataForm => {
    setDisabledButton(1);
    try {
      const imgCloudinary = await uploadImage(dataForm.img);
      const newData = await { ...dataForm, img: imgCloudinary?.url };
      console.log(await newData);
      createMenu(await newData);
    } catch (error) {
      toast.error("Fallo, la carga de imagen")
      console.log(error, "error de cargar de imagen");
    }
    setTimeout(() => {
      setDisabledButton(0);
    }, 10000);
  };

  useEffect(() => {
    if (dataCreateMenu) {
      toast.success(dataCreateMenu);
      reset();
      setValueFile(null);
    };
    if (errorCreateMenu?.msg) {
      toast.error(errorCreateMenu?.msg);
    } else {
      errorCreateMenu?.errors?.map(item => toast.error(item.msg));
    }
    setDisabledButton(0);
  }, [dataCreateMenu, errorCreateMenu]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-3/4 mx-auto mb-4 flex flex-col'>
    <Titles>~ Agregar platos al menú ~</Titles>
      <div className="my-4">
        <label htmlFor="name" className="block mt-4 text-sm font-medium">Nombre</label>
        <input type="text" {...register("name", { required: "Campo requerido", maxLength: 20 })} id="name" className={`my-2 bg-tertiary-main border   text-sm rounded-lg  block w-full p-2.5 ${errors.name && "placeholder-red-500 border-red-500"}`} placeholder="Nombre*" />
        <p className="mb-4 text-sm text-red-600">{errors.name?.message}</p>
        <label htmlFor="description" className="block mb-2 text-sm font-medium">Descripción</label>
        <textarea type="" {...register("description")} id="description" className={`my-2 bg-tertiary-main border   text-sm rounded-lg  block w-full p-2.5 ${errors.description && "placeholder-red-500 border-red-500"}`} placeholder="Descripción*" />
        <p className="mb-4 text-sm text-red-600">{errors.description?.message}</p>
        <label htmlFor="price" className="block mb-2 text-sm font-medium">Precio</label>
        <input type="number" {...register("price")} id="price" className={`my-2 bg-tertiary-main border   text-sm rounded-lg  block w-full p-2.5 ${errors.price && "placeholder-red-500 border-red-500"}`} placeholder="Precio*" />
        <p className="mb-4 text-sm text-red-600">{errors.price?.message}</p>
        <div className='flex flex-col md:flex-row gap-4'>
          <section className='w-full md:w-3/4 '>
            <label htmlFor="img" className="block mb-2 text-sm font-medium">Imagen</label>
            <input type="file" accept="image/png, image/jpg, image/jpeg" onChange={async (e) => { setValueFile(await convertToBase64(e.target.files[0], "img", setValue)) }} id="img" className={`my-2 bg-tertiary-main border   text-sm rounded-lg  block w-full p-2.5 ${errors.img && "placeholder-red-500 border-red-500"}`} placeholder='asd' />
            <p className="mb-4 text-sm text-red-600">{errors.img?.message}</p>
          </section>
          <section className='w-full md:w-1/4 relative'>
            {valueFile ?
              <>
                <p onClick={() => {setValueFile(null), setValue("img", null)}} className='absolute right-0'>X</p>
                <img src={valueFile} className='w-full h-72 md:h-48 object-scale-down' />
              </>
              : null}
          </section>
        </div>
        <label htmlFor="category" className="block mb-2 text-sm font-medium">Categoría</label>
        {/* <input  {...register("category")} id="category" className={`my-2 bg-tertiary-main border   text-sm rounded-lg  block w-full p-2.5 ${errors.category && "placeholder-red-500 border-red-500"}`} placeholder="Categoría*" /> */}
        <select  {...register("category")} id="category" className={`my-2 bg-tertiary-main border   text-sm rounded-lg  block w-full p-2.5 ${errors.category && "placeholder-red-500 border-red-500"}`} placeholder="Categoría*">
          <option value="">Selecciona una opción</option>
          <option value={"carnes"}>Carnes</option>
          <option value={"bebidas"}>Bebidas</option>
          <option value={"comidas_rapidas"}>Comidas rapidas</option>
        </select>
        <p className="mb-4 text-sm text-red-600">{errors.category?.message}</p>
      </div>
      <button disabled={disabledButton} type="submit" className="text-white disabled:bg-gray-700 bg-secondary-main hover:bg-secondary-light focus:ring-4 focus:outline-none focus:ring-tertiary-main font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mx-auto">Confirmar pedido</button>
    </form >
  )
}

export default crud
