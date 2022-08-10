const Employee = require('../lib/employee');

describe("Employee class", () => {
    it("Stores employee github username", () => {
        const employee = new Employee("Bob", "1", "bob@test.com")
        employee.getName();
        expect(employee.name).toBe("Bob");
    });
    it("Stores employee id", () => {
        const employee = new Employee("Bob", "1", "bob@test.com")
        employee.getId();
        expect(employee.id).toBe("1");
    });
    it("Stores employee e-mail", () => {
        const employee = new Employee("Bob", "1", "bob@test.com")
        employee.getEmail();
        expect(employee.email).toBe("bob@test.com");
    });
});