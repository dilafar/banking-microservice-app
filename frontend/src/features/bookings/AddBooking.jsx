import Button from "../../ui/Button";
import CreateCabinForm from "../bookings/CreateBookingForm";
import Modal from "../../ui/Modal";

function AddBooking() {
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


export default AddBooking;
