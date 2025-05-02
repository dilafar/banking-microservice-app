import Button from "../../ui/Button";
import CreateCabinForm from "./CreateAccountsForm.jsx";
import Modal from "../../ui/Modal";

function AddAccounts() {
  return (
    <div>
      <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add Account</Button>
      </Modal.Open>
      <Modal.Window  name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
      
    </Modal>
    </div>
  
  )
}


export default AddAccounts;
