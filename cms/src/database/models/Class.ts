import mongoose from "mongoose";
import { Employee } from "./Employee"
import {Student} from "./Student"


export interface Class extends mongoose.Document {
    name: string;
    students: Student[] | null
    teachers: Employee[] | null
}

const ClassSchema = new mongoose.Schema<Class>({
    name: {
        type: String,
        required: [true, "Please provide a name for this class."],
        maxlength: [60, "Name cannot be more than 60 characters"],
    },
    students: {
        type: [{ type: mongoose.Types.ObjectId, ref: "Student" }],
    },
    teachers: {
        type: [{ type: mongoose.Types.ObjectId, ref: "Employee" }],
    }
});

export default mongoose.models.Class || mongoose.model<Class>("Class", ClassSchema);