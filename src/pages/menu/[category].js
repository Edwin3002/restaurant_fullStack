import { useGetMenusQuery } from '@/apiRtk/apis/menuApi';
import Titles from '@/components/typography/Titles';
import { formatPrice } from '@/helpers/formats';
import { addItemCart } from '@/redux/slices/cartSlice';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const menus = ({ da }) => {
  const router = useRouter();
  const { category } = router.query;
  const dispatch = useDispatch();
  const [pageMenu, setPageMenu] = useState(1);

  const { data: dataGetMenu, error: errorGetMenu, isLoading: isLoadingGetMenu } = useGetMenusQuery({ category: category, page: pageMenu });

  const addDish = (_id, name, price, img, category) => {
    dispatch(addItemCart({ _id, name, price, img, category }));
  }

  return (
    <div>
      <Titles>~ Menú ~</Titles>
      <div className='bg-tertiary-main border rounded-3xl py-4 px-2'>
        {dataGetMenu?.map((item, index) => (
          <div key={index + item._id} className='mt-4 flex justify-between bg-tertiary-main'>
            <div className='border rounded-3xl w-2/5 h-24 '>
              <Image
                src={item.img}
                alt={item.name}
                loading="lazy"
                className="m-auto object-cover w-full h-full rounded-3xl "
                width={100}
                height={100}
              />
            </div>
            <div className='flex flex-col w-1/2'>
              <p className='text-center font-bold'>
                {item.name}
              </p>
              <p className='text-justify'>{item.description}</p>
              <div className='flex justify-around'>
                <span className='font-bold flex items-center'>
                  {formatPrice(item.price)}
                </span>
                <span className='bg-secondary-main p-1 rounded-lg' onClick={() => addDish(item._id, item.name, item.price, item.img, item.category)}>
                  <i className="bi bi-plus-lg text-xl text-primary-main"></i>
                </span>
              </div>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  )
}


export async function getServerSideProps() {
  // const res = await fetch(`http://localhost:3000/api/menus/carnes/1`);
  // const data = await res.json();
  // console.log(data);
  return {
    props: {}
  }
}

export default menus