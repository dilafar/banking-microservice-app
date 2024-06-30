package com.assignment.accounts.service.impl;

import com.assignment.accounts.dto.AccountsDto;
import com.assignment.accounts.dto.CardsDto;
import com.assignment.accounts.dto.CustomerDetailsDto;
import com.assignment.accounts.dto.LoansDto;
import com.assignment.accounts.entity.Accounts;
import com.assignment.accounts.entity.Customer;
import com.assignment.accounts.exception.ResourceNotFoundException;
import com.assignment.accounts.mapper.AccountsMapper;
import com.assignment.accounts.mapper.CustomerMapper;
import com.assignment.accounts.repository.AccountsRepository;
import com.assignment.accounts.repository.CustomerRepository;
import com.assignment.accounts.service.ICustomerService;
import com.assignment.accounts.service.client.CardsFeignClient;
import com.assignment.accounts.service.client.LoansFeignClient;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CustomerServiceImpl implements ICustomerService {

    private AccountsRepository accountsRepository;
    private CustomerRepository customerRepository;
    private CardsFeignClient cardsFeignClient;
    private LoansFeignClient loansFeignClient;

    @Override
    public CustomerDetailsDto fetchCustomerDetails(String mobileNumber , String  correlationId) {
        Customer customer = customerRepository.findByMobileNumber(mobileNumber).orElseThrow(
                () -> new ResourceNotFoundException("Customer","mobileNumber",mobileNumber)
        );
        Accounts accounts = accountsRepository.findByCustomerId(customer.getCustomerId()).orElseThrow(
                () -> new ResourceNotFoundException("Accounts","customerId",customer.getCustomerId().toString())
        );
       CustomerDetailsDto customerDetailsDto = CustomerMapper.mapToCustomerDetailsDto(customer,new CustomerDetailsDto());
       customerDetailsDto.setAccountsDto(AccountsMapper.mapToAccountsDto(accounts,new AccountsDto()));

       ResponseEntity<CardsDto> cardDetails = cardsFeignClient.fetchCardDetails(correlationId,mobileNumber);
       customerDetailsDto.setCardsDto(cardDetails.getBody());

       ResponseEntity<LoansDto> loanDetails = loansFeignClient.fetchLoanDetails(correlationId,mobileNumber);
       customerDetailsDto.setLoansDto(loanDetails.getBody());

        return customerDetailsDto;
    }
}
