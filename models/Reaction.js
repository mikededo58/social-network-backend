const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    salary: Number,
  });

  //reaction schema