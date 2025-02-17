import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
//import AddCabin from "../features/cabins/AddCabin";

function Cabins() {


  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Cards</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </>
    
  );
}

export default Cabins;
