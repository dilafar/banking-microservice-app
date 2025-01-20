import Spinner from '../../ui/Spinner';
import { useLoans } from '../../hooks/loans/useLoans';
import Empty from '../../ui/Empty';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import LoansRow  from "./LoansRow"
import { useAccounts } from '../../hooks/accounts/useAccounts';
import { useCards } from '../../hooks/cards/useCards';


function LoansTable() {
  const {isLoading, loans} = useLoans();
  const {users} = useAccounts();
  console.log(users);
  const {cards} = useCards();
  console.log(cards);
  if (isLoading) return <Spinner />;
  if (!loans.length) return <Empty  resourceName="loans" />;

  return (
      <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          
          <div>loanNumber</div>
          <div>mobileNumber</div>
          <div>loanType</div>
          <div>totalLoan</div>
          <div>amountPaid</div>
          <div>outstandingAmount</div>
          <div>Action</div>
        </Table.Header>
        <Table.Body data={loans}
          render={(loan) => <LoansRow loan={loan} key={loan.loanNumber} />}
        />
      </Table>   
      </Menus>
  )
}

export default LoansTable

