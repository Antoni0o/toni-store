import { api } from "@/api";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, IconButton, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import { BiTrash } from "react-icons/bi";

type IDeleteAlertProps = {
  id: string;
  domain: string;
}

export default function DeleteAlert({ domain, id }: IDeleteAlertProps) {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  return (
    <>
      <IconButton aria-label='Remover' onClick={onOpen} variant='outline' colorScheme='red' icon={<BiTrash />} />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Deletar {domain == 'items' ? 'Item' : 'Produto'}
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja deletar esse {domain == 'items' ? 'item' : 'produto'}? Essa ação não é reversível.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  api
                    .delete(`/${domain}/${id}`)
                    .then(() => {
                      window.location.reload();
                    })
                }}
                ml={3}
              >
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}