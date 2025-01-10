package com.assignment.cards.service.impl;

import com.assignment.cards.constants.CardsConstants;
import com.assignment.cards.dto.CardsDto;
import com.assignment.cards.entity.Cards;
import com.assignment.cards.exception.CardAlreadyExistsException;
import com.assignment.cards.exception.ResourceNotFoundException;
import com.assignment.cards.mapper.CardsMapper;
import com.assignment.cards.repository.CardsRepository;
import com.assignment.cards.service.ICardsService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.Callable;

@Service
@AllArgsConstructor
public class CardsServiceImpl implements ICardsService {

    private CardsRepository cardsRepository;
    /**
     * @param mobileNumber - Mobile Number of the Customer
     */
    @Override
    public void createCard(String mobileNumber) {
        Optional<Cards> optionalCards = cardsRepository.findByMobileNumber(mobileNumber);
        if(optionalCards.isPresent()){
            throw new CardAlreadyExistsException("Card already registered with given mobileNumber "+mobileNumber);
        }
        cardsRepository.save(createNewCard(mobileNumber));

    }
    private Cards createNewCard(String mobileNumber){
        Cards cards = new Cards();
        long randomCardNumber = 100000000000L + new Random().nextInt(900000000);
        cards.setCardNumber(Long.toString(randomCardNumber));
        cards.setMobileNumber(mobileNumber);
        cards.setCardType(CardsConstants.CREDIT_CARD);
        cards.setTotalLimit(CardsConstants.NEW_CARD_LIMIT);
        cards.setAmountUsed(0);
        cards.setAvailableAmount(CardsConstants.NEW_CARD_LIMIT);
        return cards;
    }

    /**
     * @param mobileNumber - Input mobile Number
     * @return Card Details based on a given mobileNumber
     */
    @Override
    public CardsDto fetchCard(String mobileNumber) {
        if (cardsRepository.findByMobileNumber(mobileNumber).isEmpty()){
            CardsDto cardsDto = new CardsDto();
            cardsDto.setMobileNumber(mobileNumber);
            cardsDto.setCardNumber("not added");
            cardsDto.setCardType("not added");
            cardsDto.setTotalLimit(0);
            cardsDto.setAmountUsed(0);
            cardsDto.setAvailableAmount(0);
            return cardsDto;
        }
        Cards cards = cardsRepository.findByMobileNumber(mobileNumber).orElseThrow(
                ()-> new ResourceNotFoundException("Card", "mobileNumber", mobileNumber)
        );
        return CardsMapper.mapToCardsDto(cards,new CardsDto());
    }

    /**
     * @param cardsDto - CardsDto Object
     * @return boolean indicating if the update of card details is successful or not
     */
    @Override
    public boolean updateCard(CardsDto cardsDto) {
        Cards cards = cardsRepository.findByCardNumber(cardsDto.getCardNumber()).orElseThrow(
                ()-> new ResourceNotFoundException("Card", "CardNumber", cardsDto.getCardNumber())
        );

        CardsMapper.mapToCards(cardsDto,cards);
        cardsRepository.save(cards);
        return true;
    }

    /**
     * @param mobileNumber - Input Mobile Number
     * @return boolean indicating if the delete of card details is successful or not
     */
    @Override
    public boolean deleteCard(String mobileNumber) {
      Cards cards = cardsRepository.findByMobileNumber(mobileNumber).orElseThrow(
              ()-> new ResourceNotFoundException("Card", "mobileNumber", mobileNumber)
      );
      cardsRepository.deleteById(cards.getCardId());
        return true;
    }

    /**
     * @return list of cards details
     */
    @Override
    public List<CardsDto> fetchCards() {
        List<Cards> cards = cardsRepository.findAll();
        List<CardsDto> cardsDtos = new ArrayList<>();
        if (cards.isEmpty()){
            throw new ResourceNotFoundException("Card", "mobileNumber", "[]");
        }
        for (Cards cards1: cards){
           CardsDto cardsDto = CardsMapper.mapToCardsDto(cards1,new CardsDto());
           cardsDtos.add(cardsDto);
        }

        return cardsDtos;
    }
}
