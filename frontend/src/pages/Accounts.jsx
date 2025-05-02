import AddAccounts from "../features/Accounts/AddAccounts.jsx";
import AccountsTable from "../features/Accounts/AccountsTable.jsx";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Accounts() {
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">Accounts</Heading>
      <p>Filter/Sort</p>
    </Row>
    <Row>
      <AccountsTable />
      <AddAccounts />
    </Row>
  </>
  );
}

export default Accounts;
