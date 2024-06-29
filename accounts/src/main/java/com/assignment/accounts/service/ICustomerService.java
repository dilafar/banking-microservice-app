package com.assignment.accounts.service;

import com.assignment.accounts.dto.CustomerDetailsDto;

public interface ICustomerService {
    CustomerDetailsDto fetchCustomerDetails(String mobileNumber);
}
