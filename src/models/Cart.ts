import mongoose from "mongoose";
const { Schema } = mongoose;

const CartItemSchema = new Schema({
  userRequest: {
    type: Schema.Types.ObjectId,
    ref: "UserRequest", // UserRequest 모델을 참조합니다.
  },
  add_to_cart: {
    options: {
      type: String,
    },
    total_price: {
      type: Number,
    },
  },
});

const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // 사용자 모델을 참조합니다.
    },
    items: [CartItemSchema], // 각각의 CartItem을 배열로 가집니다.
    status: Number,
    // 0: 임시저장
    // 1: request submit
    // 2: Add to Cart
    // 3: price calculate
    // 4: check out
    // 5: arrived
    // 6. repacking
    // 7: shipping
    // 8: end

    options: String,
    cart_total_price: Number,

    price_calculate: {
      submitted_at: Date, // 가격 확인이 제출된 시간
      repacking_price: Number,
      abroad_shipping_fee: Number,
      total_price: Number, //
    },
  },
  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
