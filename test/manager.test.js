const Manager = require('../lib/manager');

describe("Manager class", () => {
    it("Stores manager office number", () => {
        const manager = new Manager("Bob", "1", "bob@test.com", "100")
        manager.getOfficeNumber();
        expect(manager.officeNumber).toBe("100");
    });
});