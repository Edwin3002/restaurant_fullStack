import { Schema, model, models } from "mongoose";
const ordersSchema = new Schema({
  nameCustomer: {
    type: String,
    required: true,
    trim: true
  },
  tableOrder: {
    type: String,
    required: true,
    trim: true
  },
  amountOrder: {
    type: Number,
    required: true,
  },
  totalPriceOrder: {
    type: Number,
    required: true,
    trim: true
  },
  stateOrder: {
    type: String,
    default: "creado"
  },
  listOrder: {
    type: Array,
    required: true,
  },
},
{
  timestamps: true
});

export default models.orders || model("orders", ordersSchema);