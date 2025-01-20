import Button from "../../ui/Button";
import CreateCabinForm from "../cabins/CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add Card</Button>
      </Modal.Open>
      <Modal.Window  name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
      
    </Modal>
    </div>
  
  )
}


export default AddCabin;
