package com.assignment.loans.service.impl;

import com.assignment.loans.constants.LoansConstants;
import com.assignment.loans.dto.LoansDto;
import com.assignment.loans.entity.Loans;
import com.assignment.loans.exception.LoanAlreadyExistsException;
import com.assignment.loans.exception.ResourceNotFoundException;
import com.assignment.loans.mapper.LoansMapper;
import com.assignment.loans.repository.LoansRepository;
import com.assignment.loans.service.ILoansService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@AllArgsConstructor
public class LoansServiceImpl implements ILoansService {

    private LoansRepository loansRepository;

    /**
     * @param mobileNumber - Mobile Number of the Customer
     */
    @Override
    public void createLoan(String mobileNumber) {
        Optional<Loans> optionalLoans = loansRepository.findByMobileNumber(mobileNumber);
        if(optionalLoans.isPresent()){
            throw new LoanAlreadyExistsException("Loan already registered with given mobileNumber "+mobileNumber);
        }
        loansRepository.save(createNewLoan(mobileNumber));

    }

    private Loans createNewLoan(String mobileNumber){
        Loans newLoan = new Loans();
        long randomLoanNumber = 100000000000L + new Random().nextInt(900000000);
        newLoan.setLoanNumber(Long.toString(randomLoanNumber));
        newLoan.setMobileNumber(mobileNumber);
        newLoan.setLoanType(LoansConstants.HOME_LOAN);
        newLoan.setTotalLoan(LoansConstants.NEW_LOAN_LIMIT);
        newLoan.setAmountPaid(0);
        newLoan.setOutstandingAmount(LoansConstants.NEW_LOAN_LIMIT);
        return newLoan;
    }

    /**
     * @param mobileNumber - Input mobile Number
     * @return Loan Details based on a given mobileNumber
     */
    @Override
    public LoansDto fetchLoan(String mobileNumber) {
        if (loansRepository.findByMobileNumber(mobileNumber).isEmpty()){
            LoansDto loansDto = new LoansDto();
            loansDto.setMobileNumber(mobileNumber);
            loansDto.setLoanNumber("not added");
            loansDto.setLoanType("not added");
            loansDto.setTotalLoan(0);
            loansDto.setAmountPaid(0);
            loansDto.setOutstandingAmount(0);
            return loansDto;
        }
        Loans loans = loansRepository.findByMobileNumber(mobileNumber).orElseThrow(
                ()-> new ResourceNotFoundException("Loan", "mobileNumber", mobileNumber)
        );

        return LoansMapper.mapToLoansDto(loans,new LoansDto());
    }

    /**
     * @param loansDto - LoansDto Object
     * @return boolean indicating if the update of card details is successful or not
     */
    @Override
    public boolean updateLoan(LoansDto loansDto) {
        Loans loans = loansRepository.findByLoanNumber(loansDto.getLoanNumber()).orElseThrow(
                ()-> new ResourceNotFoundException("Loan", "LoanNumber", loansDto.getLoanNumber())
        );
        LoansMapper.mapToLoans(loansDto,loans);
        loansRepository.save(loans);
        return true;
    }

    /**
     * @param mobileNumber - Input Mobile Number
     * @return boolean indicating if the delete of loan details is successful or not
     */
    @Override
    public boolean deleteLoan(String mobileNumber) {
        Loans loans = loansRepository.findByMobileNumber(mobileNumber).orElseThrow(
                ()-> new ResourceNotFoundException("Loan", "mobileNumber", mobileNumber)
        );
        loansRepository.deleteById(loans.getLoanId());
        return true;
    }

    /**
     * @return Loan details list
     */
    @Override
    public List<LoansDto> fetchLoans() {
        List<Loans> loans = loansRepository.findAll();
        List<LoansDto> loansDtos = new ArrayList<>();
        if(loans.isEmpty()){
            throw new ResourceNotFoundException("Loan", "LoanNumber", "[]");
        }
        for(Loans loans1: loans){
            LoansDto loansDto = LoansMapper.mapToLoansDto(loans1, new LoansDto());
            loansDtos.add(loansDto);
        }
        return loansDtos;
    }
}
