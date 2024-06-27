package com.assignment.accounts.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
@Schema(
        name = "Accounts",
        description = "Schema to hold Accounts information"
)
public class AccountsDto {

    @Schema(
            description = "Accounts Number of Eazy Bank account",example = "3454433243"
    )
    @NotEmpty(message = "Account number can not be a null or empty")
    @Pattern(regexp = "(^$|[0-9]{10})",message = "Account number must be 10 digits")
    private Long accountNumber;

    @Schema(
            description = "Account type of Eazy Bank account",example = "Savings"
    )
    @NotEmpty(message = "Account Type can not be a null or empty")
    private String accountType;

    @Schema(
            description = "Eazy Bank branch address",example = "123 New York"
    )
    @NotEmpty(message = "Branch Address can not be a null or empty")
    private String branchAddress;
}
