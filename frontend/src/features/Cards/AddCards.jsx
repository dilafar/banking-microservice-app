import Button from "../../ui/Button";
import CreateCardsForm from "./CreateCardsForm.jsx";
import Modal from "../../ui/Modal";

function AddCards() {
  return (
    <div>
      <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add Card</Button>
      </Modal.Open>
      <Modal.Window  name="cabin-form">
        <CreateCardsForm />
      </Modal.Window>
      
    </Modal>
    </div>
  
  )
}


export default AddCards;
