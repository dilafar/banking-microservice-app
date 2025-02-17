import Spinner from '../../ui/Spinner';
import CabinRow from './BookingRow';
import { useAccounts } from '../../hooks/accounts/useAccounts';
import Empty from '../../ui/Empty';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';


function BookingTable() {
  const {isLoading,users} = useAccounts();
  if (isLoading) return <Spinner />;
  if (!users.length) return <Empty  resourceName="employees" />;

  return (
      <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Email</div>
          <div>AccountNumber</div>
          <div>AccountType</div>
          <div>branchAddress</div>
          <div>Action</div>
        </Table.Header>
        <Table.Body data={users}
          render={(customer) => <CabinRow customer={customer} key={customer.id} />}
        />
      </Table>   
      </Menus>
  )
}

export default BookingTable

