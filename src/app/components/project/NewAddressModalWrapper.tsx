import dynamic from "next/dynamic";

const DynamicNewAddressModal = dynamic(() => import("./NewAddressModal"), {
  ssr: false, // 서버 측 렌더링 비활성화
});

const NewAddressModalWrapper = (props) => {
  return <DynamicNewAddressModal {...props} />;
};

export default NewAddressModalWrapper;
