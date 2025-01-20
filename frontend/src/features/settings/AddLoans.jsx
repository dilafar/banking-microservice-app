import Button from "../../ui/Button";
import CreateCabinForm from "../settings/CreateLoansForm";
import Modal from "../../ui/Modal";

function AddLoans() {
  return (
    <div>
      <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add Loan</Button>
      </Modal.Open>
      <Modal.Window  name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
      
    </Modal>
    </div>
  
  )
}

export default AddLoans;