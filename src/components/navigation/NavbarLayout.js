import { getAmountCart } from "@/redux/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NavbarLayout = () => {
  const [navMobile, setNavMobile] = useState(true);

  const { amountCart, listCart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  // const amount = () => {
  //   // let amount = 0;
  //   let total = 0;
  //   // listCart.forEach((item) => {
  //   //   amount += item.amount;
  //   //   total += item.price;
  //   // })

  //   listCart.forEach((item) => {
  //     total += item.amount
  //   })
  //   console.log(total);
  // }
  // amount()

  const pages = [
    {
      name: "Menu",
      path: "/menu/",
    },
    {
      name: `Carrito ${amountCart}`,
      path: "/menu/cart",
    },
    {
      name: "Pedidos",
      path: "/menu/orders",
    },
    {
      name: "Agregar Platos",
      path: "/menu/crud",
    },
    // {
    //   name: "Nosotros",
    //   path: "/about_us"
    // },
  ];

  useEffect(() => {
    dispatch(getAmountCart());
  }, [listCart]);

  return (
    <nav className="px-2 sm:px-4 bg-secondary-main fixed w-full z-20">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Image
          src="/logos/logo.svg"
          alt="Restaurant Wings VED"
          className="mr-3 sm:h-9"
          width={30}
          height={30}
        />
        <button
          onClick={() => setNavMobile(!navMobile)}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <i className="bi bi-list"></i>
        </button>
        <div
          className={`${navMobile && "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="flex flex-col p-4 mt-4  border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium ">
            {pages.map((item, index) => (
              <li key={index + item.name}>
                <Link
                  href={item.path}
                  onClick={() => setNavMobile(true)}
                  className="block py-2 pl-3 pr-4 rounded border-secondary-main text-white hover:bg-primary-main focus:bg-primary-main hover:text-secondary-main focus:text-secondary-main"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLayout;
