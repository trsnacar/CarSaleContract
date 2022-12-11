const CarSale = artifacts.require("CarSale");

contract("CarSale", async accounts => {
    let carSale;

    before(async () => {
        // Kontratı deploy edelim
        carSale = await CarSale.new("Ford", "Mustang", 2020, 10000, accounts[0]);
    });

    // Test 1: Araba satılırken alıcı ve satış fiyatı bilgileri doğru bir şekilde güncelleniyor mu?
    it("should sell car and update buyer and price", async () => {
        await carSale.sellCar(accounts[1], 15000, { from: accounts[0] });

        assert.equal(await carSale.buyer(), accounts[1]);
        assert.equal(await carSale.carPrice(), 15000);
    });

    // Test 2: Yalnızca satıcının araba satabildiği kontrol ediliyor mu?
    it("should only allow seller to sell car", async () => {
        try {
            await carSale.sellCar(accounts[1], 15000, { from: accounts[2] });
            assert.fail();
        } catch (err) {
            assert.ok(err.message.match(/revert/));
        }
    });

    // Test 3: Satış fiyatı minimum araba fiyatı olması gerektiği kontrol ediliyor mu?
    it("should only allow sale price greater than or equal to car price", async () => {
        try {
            await carSale.sellCar(accounts[1], 9000, { from: accounts[0] });
            assert.fail();
        } catch (err) {
            assert.ok(err.message.match(/revert/));
        }
    });
});
