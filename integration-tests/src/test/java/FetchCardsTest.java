import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.core.IsNull.notNullValue;

public class FetchCardsTest {

    @BeforeAll
    static void setUp(){
        RestAssured.baseURI = "http://localhost:8072/qncbank";
    }

    @Test
    public void returnUserCardDetails() {
        given()
                .when()
                .get("cards/api/fetch?mobileNumber=0782873111")
                .then()
                .statusCode(200)
                .body("mobileNumber", notNullValue())
                .body("cardNumber", notNullValue())
                .body("cardType", notNullValue());
    }
}
