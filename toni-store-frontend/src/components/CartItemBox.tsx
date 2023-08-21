import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex, IconButton, Select, Text, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import DeleteAlert from "./DeleteAlert";
import { api } from "@/api";

type ICartItemProps = {
  id: string;
  name: string;
  price: string;
  amount: number;
}

export default function CartItemBox({ id, name, price, amount }: ICartItemProps) {
  const amounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [currentAmount, setCurrentAmount] = useState(amount);

  return (
    <>
      <Flex
        bg='teal.50'
        p='2'
        gap='4'
        justifyContent='space-between'
        alignItems='center'
        borderRadius='lg'
      >
        <Text w={['24', '28', '30']} noOfLines={1} fontWeight='bold'>{name}</Text>
        <Select
          value={currentAmount}
          w={['18', '20', '22']}
          onChange={(e) => {
            setCurrentAmount(Number(e.target.value))
            api.patch(`/items/${id}/${e.target.value}`).then(() => window.location.reload());
          }}
        >
          {amounts.map((amount, i) => {
            return (<option key={i} value={amount}>
              {amount}
            </option>)
          })}
        </Select>
        <Text color='teal.600' w={['22', '24', '28']} >{Number(price).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })}</Text>
        <Flex
          alignItems='flex-end'
          justifyContent='flex-end'
        >
          <DeleteAlert domain='items' id={id} />
        </Flex>
      </Flex >
    </>
  )
}