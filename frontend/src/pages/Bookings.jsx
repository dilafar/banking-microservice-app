import AddBooking from "../features/bookings/AddBooking";
import BookingTable from "../features/bookings/BookingTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All Accounts</Heading>
      <p>Filter/Sort</p>
    </Row>
    <Row>
      <BookingTable />
      <AddBooking />
    </Row>
  </>
  );
}

export default Bookings;
