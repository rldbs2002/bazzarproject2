"use client";

import { ReactElement, FC, useState } from "react";
import { GetStaticProps } from "next";
import { Box, Card, Stack, Table, TableContainer, Avatar } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "../data-table/TableHeader";
import TablePagination from "../data-table/TablePagination";
import VendorDashboardLayout from "../layouts/vendor-dashboard";
import Scrollbar from "../Scrollbar";
import { H3 } from "../Typography";
import useMuiTable from "@/app/hooks/useMuiTable";
import RefundRequestRow from "../project/RefundRequestRow";
import api from "@/utils/__api__/dashboard";
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

// =============================================================================
RefundRequest.getLayout = function getLayout(page: ReactElement) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

type RefundRequestProps = { requests: any[] };

// =============================================================================

export default function RefundRequest({ requests, data }: RefundRequestProps) {
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({ listData: requests });

  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState(""); // 선택한 옵션 추가

  const handleCellClick = (itemId: string) => {
    router.push(`/mypage/${itemId}`);
  };

  const handleCheckboxChange = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
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

  const handleAddToCart = async (values: any) => {
    const requestData = {
      add_to_cart: {
        options: selectedOption,
        total_price: getTotalPrice(),
      },
      status: 2,
    };

    try {
      // 선택한 옵션을 각 선택된 항목에 대해 PUT 요청으로 전송
      for (const itemId of selectedItems) {
        const response = await fetch(`/api/request/${itemId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (response.status === 201) {
          // PUT 요청이 성공하면 추가 작업을 수행하거나 필요하다면 여기에 다른 작업을 추가합니다.
        } else {
          console.error("Error submitting data:", response.status);
        }
      }

      // 모든 선택한 항목을 처리한 후에 페이지로 이동합니다.
      router.push("/cart");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Box py={4}>
      <H3 mb={2}>My Page</H3>

      <Card>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Heading number={1} title="Order List" />
            <Scrollbar>
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
                        request={request}
                        key={index}
                        handleCheckboxChange={handleCheckboxChange}
                        isSelected={selectedItems.includes(request.request_id)}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <Stack alignItems="center" my={4}>
              <TablePagination
                onChange={handleChangePage}
                count={Math.ceil(data.length / rowsPerPage)}
              />
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item sm={6} xs={12}>
            <Heading number={2} title="Optional Service" />
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleOptionClick("ConsoliDate")}
                disabled={selectedItems.length === 0}
              >
                ConsoliDate
              </Button>
            </div>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleOptionClick("Repacking")}
                disabled={selectedItems.length === 0}
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
          </Grid>

          <Grid item sm={6} xs={12}>
            <Heading number={3} title="Add to Cart" />
            <Typography fontSize="50px" style={{ textAlign: "center" }}>
              $ {getTotalPrice()}
            </Typography>
            <Typography
              fontSize="20px"
              style={{ textAlign: "center", marginBottom: "2.5rem" }}
            >
              Option Price
            </Typography>
            <Divider
              orientation="horizontal"
              style={{ marginBottom: "2.5rem" }}
            />

            <Typography
              fontSize="20px"
              style={{ textAlign: "center", marginBottom: "1.5rem" }}
            >
              {selectedItems.length > 0 ? selectedOption : "No Selected Option"}
            </Typography>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddToCart}
                disabled={selectedItems.length === 0}
              >
                Add To Cart
              </Button>
            </div>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const requests = await api.refundRequests();
  return { props: { requests } };
};
