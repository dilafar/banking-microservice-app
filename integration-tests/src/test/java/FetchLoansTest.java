import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.core.IsNull.notNullValue;

public class FetchLoansTest {

    @BeforeAll
    static void setUp(){
        RestAssured.baseURI = "http://localhost:8072/qncbank";
    }

    @Test
    public void returnLoanDetails() {
        given()
                .when()
                .get("loans/api/fetch?mobileNumber=0782873111")
                .then()
                .statusCode(200)
                .body("mobileNumber", notNullValue())
                .body("loanNumber", notNullValue())
                .body("loanType", notNullValue());
    }
}
