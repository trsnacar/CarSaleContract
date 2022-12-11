pragma solidity ^0.4.24;

contract CarSale {
    // Araba bilgileri
    string public carMake;
    string public carModel;
    uint public carYear;
    uint public carPrice;

    // Satıcı ve alıcı bilgileri
    address public seller;
    address public buyer;

    // Kontrat oluşturulduğunda satıcı ve araba bilgilerini tanımlayalım
    constructor(string _carMake, string _carModel, uint _carYear, uint _carPrice, address _seller) public {
        carMake = _carMake;
        carModel = _carModel;
        carYear = _carYear;
        carPrice = _carPrice;
        seller = _seller;
    }

    // Araba satılırken alıcı ve satış fiyatı bilgilerini güncelleyelim
    function sellCar(address _buyer, uint _price) public payable {
        require(msg.sender == seller); // Yalnızca satıcı araba satabilir
        require(_price >= carPrice); // Satış fiyatı minimum araba fiyatı olmalı

        buyer = _buyer;
        carPrice = _price;

        // Para işlemlerini gerçekleştirelim
        seller.transfer(carPrice);
        buyer.transfer(carPrice);
    }
}
