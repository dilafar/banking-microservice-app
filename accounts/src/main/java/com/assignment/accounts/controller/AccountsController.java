package com.assignment.accounts.controller;

import com.assignment.accounts.constants.AccountsConstants;
import com.assignment.accounts.dto.AccountsContactInfo;
import com.assignment.accounts.dto.CustomerDto;
import com.assignment.accounts.dto.ErrorResponseDto;
import com.assignment.accounts.dto.ResponseDto;
import com.assignment.accounts.service.IAccountsService;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "CRUD REST APIs for Accounts in Bank",
        description = "CRUD REST APIs in Bank to CREATE,UPDATE,FETCH AND DELETE account details"
)
//@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api",produces = {MediaType.APPLICATION_JSON_VALUE})
@Validated
public class AccountsController {

    private final IAccountsService iAccountsService;

    private final Environment environment;


    private final AccountsContactInfo accountsContactInfo;
    @Autowired
    public AccountsController(IAccountsService iAccountsService,
                              AccountsContactInfo accountsContactInfo,
                              Environment environment) {
        this.iAccountsService = iAccountsService;
        this.accountsContactInfo = accountsContactInfo;
        this.environment = environment;
    }

    @Operation(
            summary = "Create Account REST API",
            description = "REST API to create new Customer & Account inside bank"
    )
    @ApiResponse(
            responseCode = "201",
            description = "HTTP Status CREATED"
    )
    @PostMapping("/create")
    public ResponseEntity<ResponseDto> createAccount(@Valid @RequestBody CustomerDto customerDto){
        iAccountsService.createAccount(customerDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseDto(AccountsConstants.STATUS_201,AccountsConstants.MESSAGE_201));
    }

    @Operation(
            summary = "Fetch Account REST API",
            description = "REST API to fetch Customer & Account inside bank"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status OK"
    )
    @GetMapping("/fetch")
    public ResponseEntity<CustomerDto>fetchAccountDetails(@RequestParam
                                                              @Pattern(regexp = "(^$|[0-9]{10})",message = "Mobile number must be 10 digits")
                                                              String mobileNumber){
        CustomerDto customerDto = iAccountsService.fetchAccount(mobileNumber);
        return ResponseEntity.status(HttpStatus.OK).body(customerDto);
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
                    responseCode = "417",
                    description = "Exception Failed"
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
    @PutMapping("/update")
    public ResponseEntity<ResponseDto> updateAccountsDetails(@Valid @RequestBody CustomerDto customerDto){
        boolean isUpdated = iAccountsService.updateAccount(customerDto);
        if(isUpdated){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto(AccountsConstants.STATUS_200,AccountsConstants.MESSAGE_200)
            );
        }else{
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                    new ResponseDto(AccountsConstants.STATUS_417,AccountsConstants.MESSAGE_417_UPDATE)
            );
        }
    }

    @Operation(
            summary = "Delete Account REST API",
            description = "REST API to delete Customer & Account inside bank"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "HTTP Status OK"
            ),
            @ApiResponse(
                    responseCode = "417",
                    description = "Exception Failed"
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
    @DeleteMapping("/delete")
    public ResponseEntity<ResponseDto> deleteAccountsDetails(@RequestParam
                                                                 @Pattern(regexp = "(^$|[0-9]{10})",message = "Mobile number must be 10 digits")
                                                                 String mobileNumber){
        boolean isUpdated = iAccountsService.deleteAccount(mobileNumber);
        if(isUpdated){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto(AccountsConstants.STATUS_200,AccountsConstants.MESSAGE_200)
            );
        }else{
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                    new ResponseDto(AccountsConstants.STATUS_417,AccountsConstants.MESSAGE_417_DELETE)
            );
        }
    }
    @Operation(
            summary = "Fetch Account REST API",
            description = "REST API to fetch Customer & Account inside bank"
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


    @GetMapping("/java-version")
    public ResponseEntity<String> getJavaVersion(){
        return ResponseEntity.status(HttpStatus.OK).body(environment.getProperty("JAVA_HOME"));
    }

    public ResponseEntity<String> getJavaVersionFallback(Throwable throwable){
        return ResponseEntity.status(HttpStatus.OK).body("JAVA17");
    }


    @Operation(
            summary = "Fetch Account REST API",
            description = "REST API to fetch Customer & Account inside bank"
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
    @GetMapping("/accounts-info")
    public ResponseEntity<AccountsContactInfo> getAccountsInfo(){
        return ResponseEntity.status(HttpStatus.OK).body(accountsContactInfo);
    }





}
