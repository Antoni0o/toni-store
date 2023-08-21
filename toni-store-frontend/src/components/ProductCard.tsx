import { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Badge, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { BiEdit, BiTrash } from 'react-icons/bi'
import { FiAlertOctagon, FiShoppingCart } from "react-icons/fi";
import { api } from "@/api";
import EditProduct from "./EditProduct";
import DeleteAlert from "./DeleteAlert";

type IProductCardProps = {
  id: string;
  imageUrl: string;
  name: string;
  price: string;
  promotion?: string;
}


export default function ProductCard({ id, imageUrl, name, price, promotion }: IProductCardProps) {
  return (
    <>
      <Card bg='teal.50' shadow='lg'>
        {promotion &&
          <Badge position='absolute' top='1' left='1' colorScheme='orange'><Flex gap='2' p='1.5' alignItems='center' borderRadius='xl'><FiAlertOctagon />{promotion}</Flex></Badge>
        }
        <Image
          src={imageUrl}
          alt='Green double couch with wooden legs'
          borderRadius='lg'
          h={48}
        />
        <CardBody p='1.5'>
          <Stack mt='6' spacing='3'>
            <Heading size='lg'>{name}</Heading>
            <Text color='teal.600' fontSize='2xl'>
              {Number(price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter p='1.5' display='flex' justifyContent='center'>
          <ButtonGroup spacing={1}>
            <Button
              variant='ghost'
              colorScheme='teal'
              leftIcon={<FiShoppingCart />}
              px='2'
              onClick={() => {
                if (!localStorage.getItem('@tonistore:cartid')) {
                  api.post(`/carts/${id}`).then((res) => {
                    localStorage.setItem('@tonistore:cartid', res.data.id);
                    window.location.reload();
                  })
                } else {
                  api.patch(`/carts/${localStorage.getItem('@tonistore:cartid')}`, [id]).then(() => {
                    window.location.reload();
                  })
                }
              }}
            >
              Adicionar ao carrinho
            </Button>
            <EditProduct id={id} oldName={name} oldPrice={price} oldPromotion={promotion} />
            <DeleteAlert domain='products' id={id} />
          </ButtonGroup>
        </CardFooter>
      </Card >
    </>
  )
}