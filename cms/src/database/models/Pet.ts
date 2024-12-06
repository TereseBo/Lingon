import mongoose from "mongoose";

export interface Pets extends mongoose.Document {
  name: string;
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const PetSchema = new mongoose.Schema<Pets>({
  name: {
    /* The name of this pet */

    type: String,
    required: [true, "Please provide a name for this pet."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
});

export default mongoose.models.Pet || mongoose.model<Pets>("Pet", PetSchema);