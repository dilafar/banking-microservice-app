/* eslint-disable react/prop-types */
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteEmployee } from '../../hooks/useDeleteEmployee';
import { HiTrash } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';


 const TableRow = styled.div`
   display: grid;
   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
   column-gap: 1.9rem;
   align-items: center;
   padding: 1.1rem 2.2rem;

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

//const Price = styled.div`
 // font-family: 'Sono';
  //font-weight: 600;
//`;

//const Discount = styled.div`
 // font-family: 'Sono';
 // font-weight: 500;
 // color: var(--color-green-700); 
//`;
//isLoading,
function CabinRow({ cabin }) {
  const {isDeleting, deleteEmployee} = useDeleteEmployee();
  const {id: employeeId} = cabin;
 
  return (

      <TableRow role="row">
        <Cabin>{cabin.cardsDto.cardNumber}</Cabin>
        <Cabin>{cabin.cardsDto.cardType}</Cabin>
        <Cabin>{cabin.cardsDto.totalLimit}</Cabin>
        <Cabin>{cabin.cardsDto.amountUsed}</Cabin>
        <Cabin>{cabin.cardsDto.availableAmount}</Cabin>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={employeeId}/>
              <Menus.List id={employeeId}>
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

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    id:  PropTypes.number,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
  }).isRequired,
};

export default CabinRow



