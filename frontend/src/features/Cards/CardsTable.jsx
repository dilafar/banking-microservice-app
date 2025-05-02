import Spinner from '../../ui/Spinner';
import CardsRow from './CardsRow.jsx';
import { useCards } from '../../hooks/cards/useCards';
import Empty from '../../ui/Empty';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';


function CardsTable() {
  const {isLoading,cards} = useCards();
  if (isLoading) return <Spinner />;
  if (!cards.length) return <Empty  resourceName="employees" />;

  return (
      <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>CardNumber</div>
          <div>CardType</div>
          <div>TotalLimit</div>
          <div>AmountUsed</div>
          <div>availableAmount</div>
          <div>Action</div>
        </Table.Header>
        <Table.Body data={cards}
          render={(card) => <CardsRow card={card} key={card.id} />}
        />
      </Table>   
      </Menus>
  )
}


export default CardsTable
