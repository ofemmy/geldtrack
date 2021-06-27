import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import {
  Form,
  Label,
  SelectField,
  DateField,
  NumberField,
  RadioField,
  FieldError,
  TextField,
  Submit,
  FormError,
} from '@redwoodjs/forms'

import { useAuth } from '@redwoodjs/auth'
import BudgetCell from 'src/components/BudgetCell'
import Button from 'src/components/Button/Button'
import { extractCategories } from '../../utils/UtilFunctions'
const BudgetPage = () => {
  const { currentUser } = useAuth()
  const categoryNames = extractCategories(currentUser.profile)

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div className="">
      <div className="flex justify-between">
        <p className="text-xs text-gray-500">
          Running Budget is the accumulation that results from the rollover of
          unused budget from previous months
        </p>
        <Button color="yellow" onClick={onOpen}>
          Add Budget
        </Button>
      </div>
      <BudgetModal
        isOpen={isOpen}
        onClose={onClose}
        categoryNames={categoryNames}
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
function BudgetModal({ isOpen, onClose, categoryNames }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="light" color="blue.500">
          Create New Budget
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Form onSubmit={() => {}}>
            <FormError error={null} />
            <div className="space-y-8">
              <div>
                <Label
                  name="category"
                  className="block text-sm font-medium text-blue-900"
                >
                  Category
                </Label>
                <div className="mt-1">
                  <SelectField
                    name="category"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    errorClassName="text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-red-300 mt-1 pl-3 pr-10 py-2"
                  >
                    <option>Please select a category</option>
                    {categoryNames.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </SelectField>
                </div>
              </div>
              <div>
                <Label
                  name="title"
                  className="block text-sm font-medium text-blue-900"
                >
                  Title
                </Label>
                <div className="mt-1">
                  <TextField
                    name="title"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    errorClassName="text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 block w-full rounded-md sm:text-sm border-red-300"
                    placeholder="Entry Title"
                  />
                </div>
                <FieldError
                  name="title"
                  className="mt-2 text-sm text-red-600"
                />
              </div>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="blue" classes="mr-4">
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BudgetPage
