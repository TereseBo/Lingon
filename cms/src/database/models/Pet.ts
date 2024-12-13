import mongoose from "mongoose";

export interface Pet extends mongoose.Document {
  name: string;
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const PetSchema = new mongoose.Schema<Pet>({
  name: {
    /* The name of this pet */

    type: String,
    required: [true, "Please provide a name for this pet."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
});

export default mongoose.models.Pet || mongoose.model<Pet>("Pet", PetSchema);