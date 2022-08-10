const Employee = require('../lib/employee');

describe("Employee class", () => {
    it("Stores employee data", () => {
        const employee = new Employee("Bob", "1", "bob@test.com")
        employee.getName();
        expect(employee.name).toBe("Bob");
    });
    
});