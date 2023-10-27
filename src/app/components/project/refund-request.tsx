"use client";

import { ReactElement, FC, useState } from "react";
import { Box, Card, Stack, Table, TableContainer, Avatar } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "../data-table/TableHeader";
import useMuiTable from "@/app/hooks/useMuiTable";
import RefundRequestRow from "../project/RefundRequestRow";
import { FlexBox } from "../flex-box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";

// table column list
const tableHeading = [
  { id: "check", label: "Check", align: "left" },
  { id: "orderNo", label: "Order No", align: "left" },
  { id: "product", label: "Product Details", align: "left" },
  { id: "price", label: "Price", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "action", label: "Action", align: "center" },
];

type HeadingProps = { number: number; title: string };

const Heading: FC<HeadingProps> = ({ number, title }) => {
  return (
    <FlexBox gap={1.5} alignItems="center" mb={3.5}>
      <Avatar
        sx={{
          width: 32,
          height: 32,
          color: "primary.text",
          backgroundColor: "primary.main",
          margin: "0.8rem",
        }}
      >
        {number}
      </Avatar>
      <Typography fontSize="20px">{title}</Typography>
    </FlexBox>
  );
};

type RefundRequestProps = { requests?: any[]; data: any };

// =============================================================================

export default function RefundRequest({ requests, data }: RefundRequestProps) {
  const { order, orderBy, selected, handleRequestSort } = useMuiTable({
    listData: requests,
  });

  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState(""); // 선택한 옵션 추가

  const handleCheckboxChange = (_id: string) => {
    if (selectedItems.includes(_id)) {
      setSelectedItems(selectedItems.filter((id) => id !== _id));
    } else {
      setSelectedItems([...selectedItems, _id]);
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const getPricePerItem = () => {
    // 선택한 옵션에 따라 가격 계산 로직 구현
    if (selectedOption === "ConsoliDate") {
      return 20; // 한 개당 $20
    } else if (selectedOption === "Repacking") {
      return 30; // 한 개당 $30
    } else {
      return 0; // 선택한 옵션이 없으면 0
    }
  };

  const getTotalPrice = () => {
    // 선택한 항목 수와 가격을 곱하여 총 가격 계산
    const pricePerItem = getPricePerItem();
    return selectedItems.length * pricePerItem;
  };

  const handleAddToCart = async () => {
    // 모든 선택한 항목을 requestData 배열에 저장
    const requestData = selectedItems.map((itemId) => ({
      add_to_cart: {
        options: selectedOption,
        total_price: getTotalPrice(),
      },
      userRequest: itemId, // 각 요청의 _id
      status: 2,
    }));

    try {
      const cartResponse = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (cartResponse.status === 200) {
        // 장바구니에 항목을 추가한 성공적인 응답을 처리합니다.
        router.push("/cart");
      } else {
        console.error("Error submitting data to cart:", cartResponse.status);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Box py={4}>
      <Card>
        <Typography
          fontSize="40px"
          style={{ textAlign: "left", marginBottom: "1.5rem", margin: "1rem" }}
        >
          My Page
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Heading number={1} title="Order List" />
            <TableContainer sx={{ minWidth: 900 }}>
              <Table>
                <TableHeader
                  order={order}
                  hideSelectBtn
                  orderBy={orderBy}
                  heading={tableHeading}
                  rowCount={data.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {data.map((request: any, index: any) => (
                    <RefundRequestRow
                      data={request}
                      key={index}
                      handleCheckboxChange={handleCheckboxChange}
                      isSelected={selectedItems.includes(request._id)} // request._id를 사용하도록 수정
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Stack alignItems="center" my={3}></Stack>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item sm={6} xs={12}>
            <Divider />
            <Heading number={2} title="Optional Service" />
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleOptionClick("ConsoliDate")}
                disabled={selectedItems.length === 0}
                style={{ marginRight: "0.5rem", width: "120px" }}
              >
                ConsoliDate
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleOptionClick("Repacking")}
                disabled={selectedItems.length !== 1}
                style={{ marginRight: "0.5rem", width: "120px" }}
              >
                Repacking
              </Button>
              <Typography
                fontSize="13px"
                style={{ textAlign: "center", marginTop: "2.5rem" }}
              >
                *if you do not need Optional Services, add your package directly
                to the cart
              </Typography>
            </div>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <FlexBox gap={1.5} alignItems="center" mb={3.5}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    color: "primary.text",
                    backgroundColor: "primary.main",
                    margin: "0.8rem",
                  }}
                >
                  3
                </Avatar>
                <Typography fontSize="20px">Add to Cart</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleAddToCart}
                  disabled={selectedItems.length === 0}
                  style={{ marginLeft: "2rem", width: "130px" }}
                >
                  Add To Cart
                </Button>
              </FlexBox>
            </div>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Divider />
            <Typography fontSize="50px" style={{ textAlign: "center" }}>
              $ {getTotalPrice()}
            </Typography>
            <Typography
              fontSize="20px"
              style={{ textAlign: "center", marginBottom: "2.5rem" }}
            >
              Option Price
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
