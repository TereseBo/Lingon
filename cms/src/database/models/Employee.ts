import mongoose from "mongoose";

export interface Employee extends mongoose.Document {
    firstName:string,
    lastName:string
}

const EmployeeSchema = new mongoose.Schema<Employee>({
    firstName: {
        type: String,
        required: [true, "Please provide a first name."],
        maxlength: [60, "Name cannot be more than 60 characters"],
    },
    lastName: {
        type: String,
        required: [true, "Please provide a last name."],
        maxlength: [60, "Name cannot be more than 60 characters"],
    },
});

export default mongoose.models.Employee || mongoose.model<Employee>("Employee", EmployeeSchema);