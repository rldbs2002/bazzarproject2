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
  request_id: String,

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

    arrived_info: {
      firstname: String,
      lastname: String,
      country: {},
      address_line1: String,
      address_line2: String,
      city: String,
      state: String,
      postal_code: String,
      phone: String,
    },
  },

  request_submitted_at: Date, // "request_submit"의 제출 시간

  add_to_cart: {
    options: {
      type: String,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
  },

  price_calculate: {
    submitted_at: Date, // 가격 확인이 제출된 시간
    repacking_price: Number,
    abroad_shipping_fee: Number,
    purchase_agent_price: Number, //구매대행비용
    total_price: Number, //
  },

  user_confirm: {
    submitted_at: Date, // 사용자의 가격 동의가 제출된 시간
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
    shipping_images: [],
    shipping_at: Date,
    shipping_completed: Boolean, // Boolean flag to indicate if the upload is completed
  },
});

export default mongoose.models.UserRequest ||
  mongoose.model("UserRequest", requestSchema);
