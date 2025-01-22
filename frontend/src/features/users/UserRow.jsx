/* eslint-disable react/prop-types */
import styled from 'styled-components';


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

//const Price = styled.div`
 // font-family: 'Sono';
 // font-weight: 600;
//`/;

//const Discount = styled.div`
//  font-family: 'Sono';
//  font-weight: 500;
//  color: var(--color-green-700); 
//`;
//isLoading,
function UserRow({ cabin }) {
 
  return (

      <TableRow role="row">
        <Cabin>{cabin.name}</Cabin>
        <Cabin>{cabin.email}</Cabin>
        <Cabin>{cabin.loansDto.loanNumber}</Cabin>
        <Cabin>{cabin.cardsDto.cardNumber}</Cabin>
        <Cabin>{cabin.accountsDto.accountNumber}</Cabin>
      </TableRow>
   
  );
}
export default UserRow



