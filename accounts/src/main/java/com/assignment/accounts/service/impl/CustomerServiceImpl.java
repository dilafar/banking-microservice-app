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

import java.util.ArrayList;
import java.util.List;

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
        if(null != cardDetails){
            customerDetailsDto.setCardsDto(cardDetails.getBody());
        }

        ResponseEntity<LoansDto> loanDetails = loansFeignClient.fetchLoanDetails(correlationId,mobileNumber);
        if(null != loanDetails){
            customerDetailsDto.setLoansDto(loanDetails.getBody());
        }

        return customerDetailsDto;
    }

    /**
     * @param correlationId
     * @return
     */
    @Override
    public List<CustomerDetailsDto> fetchAllCustomerDetails(String  correlationId) {
        List<Customer> customers = customerRepository.findAll();
        List<CustomerDetailsDto> customerDetailsDtos = new ArrayList<>();
        if (customers.isEmpty()){
            throw new ResourceNotFoundException("Customer", "Customers", "[]");
        }
        for (Customer customer: customers){
            Accounts accounts = accountsRepository.findByCustomerId(customer.getCustomerId()).orElseThrow(
                    () -> new ResourceNotFoundException("Accounts","customerId",customer.getCustomerId().toString())
            );
            CustomerDetailsDto customerDetailsDto = CustomerMapper.mapToCustomerDetailsDto(customer,new CustomerDetailsDto());
            customerDetailsDto.setAccountsDto(AccountsMapper.mapToAccountsDto(accounts,new AccountsDto()));
            ResponseEntity<CardsDto> cardDetails = cardsFeignClient.fetchCardDetails(correlationId,customer.getMobileNumber());
            if(null != cardDetails){
                customerDetailsDto.setCardsDto(cardDetails.getBody());
            }
            if(cardDetails == null){
                CardsDto cardsDto = new CardsDto();
                cardsDto.setMobileNumber(customer.getMobileNumber());
                cardsDto.setCardNumber("not added");
                cardsDto.setCardType("not added");
                cardsDto.setTotalLimit(0);
                cardsDto.setAmountUsed(0);
                cardsDto.setAvailableAmount(0);
                customerDetailsDto.setCardsDto(cardsDto);
            }


            ResponseEntity<LoansDto> loanDetails = loansFeignClient.fetchLoanDetails(correlationId,customer.getMobileNumber());
            if(null != loanDetails){
                customerDetailsDto.setLoansDto(loanDetails.getBody());
            }
            if(loanDetails == null){
                LoansDto loansDto = new LoansDto();
                loansDto.setMobileNumber(customer.getMobileNumber());
                loansDto.setLoanNumber("not added");
                loansDto.setLoanType("not added");
                loansDto.setTotalLoan(0);
                loansDto.setAmountPaid(0);
                loansDto.setOutstandingAmount(0);
                customerDetailsDto.setLoansDto(loansDto);
            }
            customerDetailsDtos.add(customerDetailsDto);
        }
        return customerDetailsDtos;
    }
}