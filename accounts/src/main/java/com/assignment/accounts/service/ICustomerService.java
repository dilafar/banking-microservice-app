package com.assignment.accounts.service;

import com.assignment.accounts.dto.CustomerDetailsDto;

import java.util.List;

public interface ICustomerService {
    CustomerDetailsDto fetchCustomerDetails(String mobileNumber, String  correlationId);
    List<CustomerDetailsDto> fetchAllCustomerDetails(String  correlationId);
}
