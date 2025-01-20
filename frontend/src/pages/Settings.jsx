import AddLoans from "../features/settings/AddLoans";
import LoansTable from "../features/settings/LoansTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Settings() {
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All Accounts</Heading>
      <p>Filter/Sort</p>
    </Row>
    <Row>
      <LoansTable />
      <AddLoans />
    </Row>
  </>
  );
}

export default Settings;
