// Define the product type
type Product = {
  name: string;
  type: string;
  priceKRW: number;
  priceUSD: number;
  quantity: number;
  totalValueUSD: number;
  url: string;
};

// Define the tracking information type
type TrackingInfo = {
  tracking_number: string;
  tracking_carrier: string;
  order_number?: string;
  store: string;
};

// Define the user request info type
type UserRequestInfo = {
  tracking_info: TrackingInfo;
  product_list: Product[];
};

// Define the price calculate type
type PriceCalculate = {
  submitted_at: Date;
  repacking_price: number;
  abroad_shipping_fee: number;
  total_price: number;
};

// Define the main user request type
type UserRequest = {
  user: string;
  request_id: string;
  status: number;
  request_info: UserRequestInfo;
  request_submitted_at: Date;
  options: string;
  price_calculate?: PriceCalculate;
  user_confirm?: UserConfirm;
};

type AddressType = {
  _id: string;
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  phone: string;
};

// Export the types
export {
  Product,
  TrackingInfo,
  UserRequestInfo,
  PriceCalculate,
  UserRequest,
  AddressType,
};
