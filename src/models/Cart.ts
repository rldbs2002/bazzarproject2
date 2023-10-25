import mongoose from "mongoose";
const { Schema } = mongoose;

const CartItemSchema = new Schema({
  userRequest: {
    type: Schema.Types.ObjectId,
    ref: "UserRequest", // UserRequest 모델을 참조합니다.
  },
});

const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // 사용자 모델을 참조합니다.
    },
    items: [CartItemSchema], // 각각의 CartItem을 배열로 가집니다.
  },
  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
