import { Student } from "./Student";
import { Employee } from "./Employee";
import mongoose from "mongoose";

export interface Class extends mongoose.Document {
  name: string;
  students: mongoose.Types.ObjectId[] | Student[];
  teachers: mongoose.Types.ObjectId[] | Employee[];
  OrganizationId: string;
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
    },
    OrganizationId: {
        type: String,
        required: true
    }
});

export default mongoose.models.Class || mongoose.model<Class>("Class", ClassSchema);