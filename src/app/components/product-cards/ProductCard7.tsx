import { Button, Card, IconButton, styled } from "@mui/material";
import { Span } from "../Typography";
import { FlexBox } from "../flex-box";
import { notFound } from "next/navigation";

// styled components
const Wrapper = styled(Card)(({ theme }) => ({
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  position: "relative",
  borderRadius: "10px",
  marginBottom: "1.5rem",
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,

  "@media only screen and (max-width: 425px)": {
    flexWrap: "wrap",
    img: { height: "auto", minWidth: "100%" },
  },
}));

const ProductCard7 = async ({ status, params }: any) => {
  return (
    <Wrapper>
      <FlexBox
        p={2}
        columnGap={10}
        width="100%"
        flexDirection="row"
        alignItems="center"
      >
        <Span fontWeight="600" fontSize={18} style={{ width: "60px" }}>
          {data.request_id}
        </Span>

        <Span
          ellipsis
          fontWeight="600"
          fontSize={15}
          style={{ width: "150px" }}
        >
          {}
        </Span>

        <Span fontWeight={600} color="primary.main" style={{ width: "60px" }}>
          $ {}
        </Span>

        <Span mx={1} fontWeight={600} fontSize={15} style={{ width: "80px" }}>
          Status: {status}
        </Span>
      </FlexBox>
    </Wrapper>
  );
};

export default ProductCard7;
