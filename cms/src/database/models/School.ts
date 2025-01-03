import mongoose from "mongoose";
import { Employee } from "./Employee"


export interface School extends mongoose.Document {
    name: string;
    classes: number[] | null
    teachers: Employee[] | null
    admins: Employee[] | null
}

const SchoolSchema = new mongoose.Schema<School>({
    name: {
        type: String,
        required: [true, "Please provide a name for this school."],
        maxlength: [60, "Name cannot be more than 60 characters"],
    },
    classes: {
        type: [{ type: Number }]
    },
    teachers: {
        type: [{ type: mongoose.Types.ObjectId, ref: "Employee" }],
    },
    admins: {
        type: [{ type: mongoose.Types.ObjectId, ref: "Employee" }],
    }
});

export default mongoose.models.School || mongoose.model<School>("School", SchoolSchema);