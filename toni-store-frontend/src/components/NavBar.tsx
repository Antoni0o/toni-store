import { Flex, Heading, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiShoppingCart } from 'react-icons/fi'
import CartItemBox from "./CartItemBox";
import { api } from "@/api";

type Item = {
  id: string;
  name: string;
  price: string;
  amount: number;
}

export default function NavBar() {
  const [cart, setCart] = useState<Item[]>([]);
  const [totalPrice, setTotalPrice] = useState('');

  useEffect(() => {
    if (localStorage.getItem('@tonistore:cartid')) {
      const cartId = localStorage.getItem('@tonistore:cartid')

      api.get(`/carts/${cartId}`)
        .then(res => {
          setCart(res.data.products)
          setTotalPrice(res.data.totalPrice)
        });
    }
  }, []);

  return (
    <Flex
      bg='teal.600'
      p='2'
      justifyContent='space-between'
    >
      <Heading textColor='white'>ToniStore</Heading>
      <Flex gap='2' overflowX='hidden'>
        <Popover preventOverflow>
          <PopoverTrigger>
            <IconButton colorScheme='teal' aria-label='Carrinho' icon={<FiShoppingCart />} />
          </PopoverTrigger>
          <PopoverContent bg='white' maxW={['full', '2xl']} w={['full', '100%']}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader><Heading fontSize='xl'>Carrinho</Heading></PopoverHeader>
            <PopoverBody display='flex' flexDir='column' gap='2'>
              {!cart[0] ?
                ("Seu carrinho está vazio!")
                :
                (
                  cart.map((item, i) => (<CartItemBox key={i} id={item.id} name={item.name} amount={item.amount} price={item.price} />))
                )
              }
            </PopoverBody>
            <PopoverFooter borderTop='1px' fontWeight='bold' textColor='teal.400'>
              {Number(totalPrice).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  )
}