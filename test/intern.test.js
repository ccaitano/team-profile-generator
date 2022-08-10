const Intern = require('../lib/intern');

describe("Intern class", () => {
    it("Stores intern's current school", () => {
        const intern = new Intern("Bob", "1", "bob@test.com", "UW")
        intern.getSchool();
        expect(intern.school).toBe("UW");
    });
});