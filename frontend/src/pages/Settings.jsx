import LoansTable from "../features/settings/LoansTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Settings() {
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">Accounts</Heading>
      <p>Filter/Sort</p>
    </Row>
    <Row>
      <LoansTable />
    </Row>
  </>
  );
}

export default Settings;
