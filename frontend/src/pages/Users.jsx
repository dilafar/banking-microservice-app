import UserTable from "../features/users/UserTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function NewUsers() {
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">Users</Heading>
      <p>Filter/Sort</p>
    </Row>
    <Row>
      <UserTable />
    </Row>
  </>
  )
}

export default NewUsers;
