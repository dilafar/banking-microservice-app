/* eslint-disable react/prop-types */
import styled from 'styled-components';
import CreateCabinForm from './CreateBookingForm';
import { useDeleteEmployee } from '../../hooks/useDeleteEmployee';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';


 const TableRow = styled.div`
   display: grid;
   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
   column-gap: 2.4rem;
   align-items: center;
   padding: 1.4rem 2.4rem;

   &:not(:last-child) {
     border-bottom: 1px solid var(--color-grey-100);
   }
`

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700); 
`;
//isLoading,
function BookingRow({ cabin }) {
  const {isDeleting, deleteEmployee} = useDeleteEmployee();
  const {id: employeeId} = cabin;
 
  return (

      <TableRow role="row">
        <Cabin>{cabin.name}</Cabin>
        <Cabin>{cabin.email}</Cabin>
        <div>fit to maximum</div>
        <Price>{cabin.phone}</Price>
        <Discount>{cabin.jobTitle}</Discount>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={employeeId}/>
              <Menus.List id={employeeId}>
                <Modal.Open opens="edit">
                   <Menus.Button icon={<HiPencil />} >Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />} >Delete</Menus.Button>
                </Modal.Open>
           
          </Menus.List>
      

          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin}/>
          </Modal.Window>
       
          <Modal.Window name="delete">
            <ConfirmDelete 
              resourceName='employee'
              disabled={isDeleting}
              onConfirm={() =>  deleteEmployee(employeeId) }
            />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      
    </div>
       
      </TableRow>
   
  );
}
export default BookingRow



