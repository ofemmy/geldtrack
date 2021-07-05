import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import BudgetCell from 'src/components/BudgetCell'
import Button from 'src/components/Button/Button'
import BudgetForm from '../../components/BudgetForm/BudgetForm'
import { extractCategories } from '../../utils/UtilFunctions'
const BudgetPage = () => {
  const { currentUser } = useAuth()
  const categoryNames = extractCategories(currentUser.profile)

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div className="">
      <div className="">
        <Button color="yellow" onClick={onOpen}>
          Add Budget
        </Button>
      </div>
      <BudgetModal
        isOpen={isOpen}
        onClose={onClose}
        categoryNames={categoryNames}
        currency={currentUser.profile.currency}
        userId={currentUser.sub}
      />
      {/* <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
        {[1, 2, 3].map((num) => (
          <BudgetCard key={num} />
        ))}
      </div> */}
      <BudgetCell id={currentUser.sub} />
    </div>
  )
}
export function BudgetModal({
  isOpen,
  onClose,
  categoryNames,
  currency,
  userId,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="light" color="blue.500">
          Create New Budget
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <BudgetForm
            categoryNames={categoryNames}
            currency={currency}
            onClose={onClose}
            userId={userId}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default BudgetPage
