import Spinner from '../../ui/Spinner';
import CabinRow from './BookingRow';
import { useEmployees } from '../../hooks/useEmployees';
import Empty from '../../ui/Empty';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';


function BookingTable() {
  const {isLoading , cabins} = useEmployees();
  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty  resourceName="employees" />;

  return (
      <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={cabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>   
      </Menus>
  )
}

export default BookingTable

