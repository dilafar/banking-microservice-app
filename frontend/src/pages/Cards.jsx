import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CardsTable from "../features/Cards/CardsTable.jsx";
//import AddCards from "../features/cabins/AddCards";

function Cards() {


  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Cards</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row>
        <CardsTable />
      </Row>
    </>
    
  );
}

export default Cards;
