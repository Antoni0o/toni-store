import { api } from "@/api";
import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useState } from 'react';

export default function CreateProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [promotion, setPromotion] = useState('');

  return (
    <>
      <Flex p='2' justifyContent='flex-end' borderTop='1px' borderColor='teal.400'>
        <Button onClick={onOpen} colorScheme='teal'>
          Criar Produto
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar Produto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              mb={{
                sm: '0.4rem',
                md: '0.6rem',
                lg: '0.6rem',
                xl: '0.8rem',
              }}
            >
              <FormLabel
                opacity="66%"
              >
                Nome do produto:
              </FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                variant="outline"
                focusBorderColor="teal.600"
              />
            </FormControl>
            <FormControl
              mb={{
                sm: '0.4rem',
                md: '0.6rem',
                lg: '0.6rem',
                xl: '0.8rem',
              }}
            >
              <FormLabel
                opacity="66%"
              >
                Preço do produto:
              </FormLabel>
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                variant="outline"
                focusBorderColor="teal.300"
              />
            </FormControl>
            <FormControl
              mb={{
                sm: '0.4rem',
                md: '0.6rem',
                lg: '0.6rem',
                xl: '0.8rem',
              }}
            >
              <FormLabel
                opacity="66%"
              >
                Promoção:
              </FormLabel>
              <Select
                placeholder="Nenhuma"
                value={promotion}
                onChange={(e) => setPromotion(e.target.value)}
              >
                <option value="Leve 2 e Pague 1">Leve 2 e Pague 1</option>
                <option value="3 por 10 reais">3 por 10 reais</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme='teal' onClick={() => {
              if (promotion == '') {
                api.post('/products', {
                  name,
                  price: Number(price),
                }).then(() => { window.location.reload() })
              } else {
                api.post('/products', {
                  name,
                  price: Number(price),
                  promotion
                }).then(() => { window.location.reload() })
              }
            }}>Enviar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

  )
}