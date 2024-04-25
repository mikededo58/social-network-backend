const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // This will add a single subdocument to include the manager's information
    manager: managerSchema,
    // This will include an array that holds all the employees' information
    employees: [employeeSchema], // use this syntax
    lastAccessed: { type: Date, default: Date.now },
  });

  // relate to the reaction schema