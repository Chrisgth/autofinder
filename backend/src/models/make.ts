import { InferSchemaType, Schema, model } from "mongoose";

const makeSchema = new Schema(
  {
    value: { type: String, default: null },
    dataValue: { type: String, default: null },
    count: { type: Number, default: null },
    dataSite: { type: Number, default: null },
    commonValue: { type: String, default: null },
    primary: { type: Boolean, default: null },
    visible: { type: Boolean, default: null },
  },
  { timestamps: false }
);

export type Make = InferSchemaType<typeof makeSchema>;

export default model<Make>("makes", makeSchema);
