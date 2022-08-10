const Engineer = require('../lib/engineer');

describe("Engineer class", () => {
    it("Stores engineer github username", () => {
        const engineer = new Engineer("Bob", "1", "bob@test.com", "btest")
        engineer.getGithub();
        expect(engineer.github).toBe("btest");
    });
});