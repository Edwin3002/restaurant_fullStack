import CardMenu from '@/components/containers/CardMenu'
import Carousel from '@/components/imgs/Carousel'
import Titles from '@/components/typography/Titles'
import Link from 'next/link'
import React from 'react'

const index = () => {

  const carouselData = [
    {
      img: "/carousel/carousel-1.svg",
      name: "carousel-1"
    },
    {
      img: "/logos/logo.svg",
      name: "logo"
    },
  ]

  const menuData = [
    {
      img: "/menu/menu-1.svg",
      name: "comidas_rapidas"
    },
    {
      img: "/menu/menu-2.svg",
      name: "bebidas"
    },
    {
      img: "/menu/menu-3.svg",
      name: "carnes"
    },
  ]

  return (
    <main>
      <Titles>~ Menú ~</Titles>
      <Carousel data={carouselData} />
      <div className='flex w-4/5 justify-around flex-wrap m-auto'>
        {menuData.map((item, index) => (
          <Link key={index + item.name} href={`/menu/${item.name}`}>
            <CardMenu >
              <img
                src={item.img}
                alt={item.name}
                className="m-auto object-cover w-full h-full rounded-3xl "
                width={100}
                height={100}
              />
              <p className="text-center text-4xl uppercase font-semibold">{item.name}</p>
            </CardMenu>
          </Link>
        ))
        }
      </div>
    </main>
  )
}

export default index;