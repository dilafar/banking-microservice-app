package com.assignment.accounts.controller;

import com.assignment.accounts.dto.CustomerDetailsDto;
import com.assignment.accounts.dto.ErrorResponseDto;
import com.assignment.accounts.service.ICustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Pattern;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(
        name = "CRUD REST APIs for Accounts in Bank",
        description = "CRUD REST APIs in Bank to CREATE,UPDATE,FETCH AND DELETE account details"
)
//@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api",produces = {MediaType.APPLICATION_JSON_VALUE})
@Validated
public class CustomerController {

    private static final Logger logger = LoggerFactory.getLogger(CustomerController.class);

    private final ICustomerService iCustomerService;

    public CustomerController(ICustomerService iCustomerService){
        this.iCustomerService = iCustomerService;
    }

    @Operation(
            summary = "Update Account REST API",
            description = "REST API to update Customer & Account inside bank"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "HTTP Status OK"
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "HTTP Status Internal Server Error",
                    content = @Content(
                            schema = @Schema(implementation = ErrorResponseDto.class)
                    )
            )
    }
    )
    @GetMapping("/fetchCustomerDetails")
    public ResponseEntity<CustomerDetailsDto> fetchCustomerDetails(@RequestHeader("bank-correlation-id") String  correlationId , @RequestParam
                                                                   @Pattern(regexp = "(^$|[0-9]{10})",message = "Mobile number must be 10 digits")
                                                                       String mobileNumber){
        logger.debug("correlation ID : ",correlationId);
        CustomerDetailsDto customerDetailsDto = iCustomerService.fetchCustomerDetails(mobileNumber,correlationId);

        return ResponseEntity.status(HttpStatus.OK).body(customerDetailsDto);

    }

    @Operation(
            summary = "get all Customer datails REST API",
            description = "REST API to update Customer & Account inside bank"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "HTTP Status OK"
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "HTTP Status Internal Server Error",
                    content = @Content(
                            schema = @Schema(implementation = ErrorResponseDto.class)
                    )
            )
    }
    )
    @GetMapping("/fetchallCustomerDetails")
    public ResponseEntity<List<CustomerDetailsDto>> fetchAllCustomerDetails(@RequestHeader("bank-correlation-id") String  correlationId){
        logger.debug("correlation ID : ",correlationId);
        List<CustomerDetailsDto> customerDetailsDtos = iCustomerService.fetchAllCustomerDetails(correlationId);

        return ResponseEntity.status(HttpStatus.OK).body(customerDetailsDtos);

    }
}
