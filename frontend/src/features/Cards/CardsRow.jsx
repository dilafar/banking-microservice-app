/* eslint-disable react/prop-types */
import styled from 'styled-components';
import CreateCardsForm from './CreateCardsForm.jsx';
import { HiTrash } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import { useDeleteCard } from '../../hooks/cards/useDeleteCards';


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
function CardsRow({ card }) {
  const {isDeleting , deleteCard} = useDeleteCard();
  const {mobileNumber: Id} = card;
 
  return (

      <TableRow role="row">
        <Cabin>{card.cardNumber}</Cabin>
        <Cabin>{card.cardType}</Cabin>
        <Cabin>{card.totalLimit}</Cabin>
        <Cabin>{card.amountUsed}</Cabin>
        <Cabin>{card.availableAmount}</Cabin>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={Id}/>
              <Menus.List id={Id}>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />} >Delete</Menus.Button>
                </Modal.Open>
           
          </Menus.List>
      

          <Modal.Window name="edit">
            <CreateCardsForm cabinToEdit={card}/>
          </Modal.Window>
       
          <Modal.Window name="delete">
            <ConfirmDelete 
              resourceName='employee'
              disabled={isDeleting}
              onConfirm={() =>  deleteCard(Id) }
            />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      
    </div>
       
      </TableRow>
   
  );
}
export default CardsRow



