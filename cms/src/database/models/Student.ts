import mongoose from "mongoose";

//TODO:Update model to allow for tracking of student results

export interface Student extends mongoose.Document {
    _id: string,
    name:string,
    result:null

}

const StudentSchema = new mongoose.Schema<Student>({
    name: {
        type: String,
        required: [true, "Please provide a name for this student."],
        maxlength: [60, "Name cannot be more than 60 characters"],
    },
    result:{
        type: mongoose.Schema.Types.Mixed,
        default: null
    }

});

export default mongoose.models.Student || mongoose.model<Student>("Student", StudentSchema);