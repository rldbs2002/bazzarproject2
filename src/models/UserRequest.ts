import mongoose from "mongoose";
const { Schema } = mongoose;

const productListSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  priceKRW: {
    type: Number,
    required: true,
  },
  priceUSD: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalValueUSD: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const requestSchema = new Schema({
  // Request를 생성한 사용자를 참조합니다.
  user: {
    type: String,
    ref: "User",
  },

  request_id: {
    type: String,
    unique: true, // Set this to true to enforce uniqueness
    // ... other options ...
  },

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

  request_info: {
    tracking_info: {
      tracking_number: {
        type: String,
        required: true,
      },
      tracking_carrier: {
        type: String,
        required: true,
      },
      order_number: {
        type: String,
      },
      store: {
        type: String,
        required: true,
      },
    },

    product_list: [productListSchema],
  },

  request_submitted_at: Date, // "request_submit"의 제출 시간

  options: String,

  price_calculate: {
    submitted_at: Date, // 가격 확인이 제출된 시간
    repacking_price: Number,
    abroad_shipping_fee: Number,
    total_price: Number, //
  },

  user_confirm: {
    submitted_at: Date, // 사용자의 가격 동의가 제출된 시간
  },
});

export default mongoose.models.UserRequest ||
  mongoose.model("UserRequest", requestSchema);
