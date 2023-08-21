import { api } from "@/api";
import { Button, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";

type IEditProductProps = {
  id: string;
  oldName: string;
  oldPrice: string;
  oldPromotion?: string;
}

export default function EditProduct({ id, oldName, oldPrice, oldPromotion }: IEditProductProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState(oldName);
  const [price, setPrice] = useState(oldPrice);
  const [promotion, setPromotion] = useState(oldPromotion);

  return (
    <>
      <IconButton aria-label='Editar' onClick={onOpen} variant='outline' colorScheme='teal' icon={<BiEdit />} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Produto</ModalHeader>
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
                value={promotion}
                onChange={(e) => setPromotion(e.target.value)}
              >
                <option value="Nenhuma">Nenhuma</option>
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
                api.patch(`/products/${id}`, {
                  name,
                  price: Number(price),
                }).then(() => { window.location.reload() })
              } else {
                api.patch(`/products/${id}`, {
                  name,
                  price: Number(price),
                  promotion
                }).then(() => { window.location.reload() })
              }
            }}>
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}