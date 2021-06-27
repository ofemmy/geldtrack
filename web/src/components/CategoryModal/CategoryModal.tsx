import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import CategoryForm from '../CategoryForm/CategoryForm'
const CategoryModal = ({ isOpen, onClose, userId, refetch }) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CategoryForm
            onClose={onClose}
            userId={userId}
            refetchOnQueryComplete={refetch}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CategoryModal
