import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.core.IsNull.notNullValue;

public class FetchAccountTest {

    @BeforeAll
    static void setUp(){
        RestAssured.baseURI = "http://localhost:8072/qncbank";
    }

    @Test
    public void returnUserAccount() {
        given()
                .when()
                .get("accounts/api/fetch?mobileNumber=0782873111")
                .then()
                    .statusCode(200)
                    .body("accountsDto", notNullValue())
                    .body("accountsDto.accountNumber", notNullValue())
                    .body("accountsDto.accountType", notNullValue())
                    .body("accountsDto.branchAddress", notNullValue());
    }
}
