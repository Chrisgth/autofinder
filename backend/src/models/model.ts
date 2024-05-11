import { InferSchemaType, Schema, model } from "mongoose";

const modelSchema = new Schema(
  {
    makeDataValue: { type: String, default: null },
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

export type Model = InferSchemaType<typeof modelSchema>;

export default model<Model>("models", modelSchema);
