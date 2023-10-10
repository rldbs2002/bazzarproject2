import mongoose from "mongoose";
const { Schema } = mongoose;

const productListSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  shipping_fee: {
    type: String,
    required: true,
  },
  delivery_request: {
    type: String,
    required: true,
  },
});

const imageSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  width: {
    type: Number, // 가로 크기를 숫자로 저장한다고 가정합니다.
    required: true,
  },
  height: {
    type: Number, // 세로 크기를 숫자로 저장한다고 가정합니다.
    required: true,
  },
});

const CompanyRequestSchema = new Schema(
  {
    user_id: {},
    id: {},
    status: {
      price_check: {}, // 가격 확인 정보
      arrived: {}, // 도착 정보
      repacking: {}, // 리패킹 정보
      shipping: {}, // 배송 정보
      canceled: {}, // 취소 정보
    },
    product_list: [productListSchema],
    arrived: {
      images: [imageSchema],
    },
    repacking: {
      images: [imageSchema],
    },
    shipping: {
      date: {},
      images: [imageSchema],
    },
  },
  { timestamps: true }
);

export default mongoose.models.CompanyRequest ||
  mongoose.model("CompanyRequest", CompanyRequestSchema);
