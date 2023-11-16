import { InferSchemaType, Schema, model } from "mongoose";

const searchSchema = new Schema(
  {
    make: { type: String, default: null },
    model: { type: String, default: null },
    yearFrom: { type: Number, default: null },
    yearTo: { type: Number, default: null },
  },
  { timestamps: true }
);

type Search = InferSchemaType<typeof searchSchema>;

export default model<Search>("searches", searchSchema);
