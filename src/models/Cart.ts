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
    cart_id: {
      type: String,
      unique: true, // Set this to true to enforce uniqueness
      // ... other options ...
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // 사용자 모델을 참조합니다.
    },
    items: [CartItemSchema], // 각각의 CartItem을 배열로 가집니다.
    status: Number,

    arrived_info: {
      firstname: String,
      lastname: String,
      country: {},
      address: String,
      city: String,
      state: String,
      postal_code: String,
      phone: String,
    },

    // 2: Add to Cart( before calculated)
    // 3: price calculate (calculated)
    // ---yes or no----
    // 4: check out ( yes )
    // 5: arrived
    // 6. repacking
    // 7: shipping
    // 8: end

    options: String,
    cart_total_price: Number,
    price_confirm: Boolean,

    price_calculate: {
      submitted_at: Date, // 가격 확인이 제출된 시간
      repacking_price: Number,
      abroad_shipping_fee: Number,
      total_price: Number, //
    },
    arrived: {
      arrived_images: [],
      arrived_at: Date,
      arrived_completed: Boolean, // Boolean flag to indicate if the upload is completed
    },

    repacking: {
      repacking_images: [],
      repacking_at: Date,
      repacking_completed: Boolean, // Boolean flag to indicate if the upload is completed
    },
    shipping: {
      shipping_carrier: String,
      shipping_number: String,
      shipping_images: [],
      shipping_completed: Boolean,
      shipping_at: Date,
    },
  },

  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
