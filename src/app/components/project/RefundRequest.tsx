"use client";

import { ReactElement, FC, useState, useEffect } from "react";
import {
  Box,
  Card,
  Stack,
  Table,
  TableContainer,
  Avatar,
  Typography,
  Grid,
  Button,
  Divider,
  Pagination, // Import TablePagination
  TextField,
  Select,
  MenuItem,
  InputBase,
  styled,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "../data-table/TableHeader";
import useMuiTable from "@/app/hooks/useMuiTable";
import RefundRequestRow from "./RefundRequestRow";
import { FlexBox } from "../flex-box";
import { useRouter } from "next/navigation";
import { statusNames } from "@/constants";

// table column list
const tableHeading = [
  { id: "check", label: "Check", align: "left" },
  { id: "requestId", label: "Request ID", align: "left" },
  { id: "product", label: "Product Name", align: "left" },
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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  height: 44,
  fontSize: 14,
  width: "100%",
  maxWidth: 350,
  fontWeight: 500,
  padding: "0 1rem",
  borderRadius: "8px",
  color: theme.palette.grey[600],
  backgroundColor: theme.palette.grey[200],
  [theme.breakpoints.down("sm")]: { maxWidth: "100%" },
  "::placeholder": { color: theme.palette.text.disabled },
}));

// =============================================================================

export default function RefundRequest({ requests, data }: RefundRequestProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("requestId"); // 검색 카테고리 추가 (기본값: productName)

  const { order, orderBy, selected, handleRequestSort } = useMuiTable({
    listData: requests,
  });

  // 검색어를 기반으로 데이터 필터링
  const filteredData = data.filter((item) => {
    if (searchCategory === "productName") {
      // `product_list` 배열 내에서 `name`으로 검색
      const productNames = item.request_info.product_list.map(
        (product) => product.name
      );
      return productNames.some((productName) =>
        productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (searchCategory === "requestId") {
      return item.request_id.toString().includes(searchQuery);
    }
    return false; // 다른 경우에는 false를 반환하여 해당 항목을 건너뜁니다.
  });

  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState(""); // 선택한 옵션 추가

  console.log(selectedItems);

  const [page, setPage] = useState(0); // Add state for page number
  const [rowsPerPage, setRowsPerPage] = useState(10); // Add state for rows per page

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleCheckboxChange = (_id: string) => {
    if (selectedItems.includes(_id)) {
      // 이미 선택된 아이템을 다시 클릭하면 선택 해제
      setSelectedItems(selectedItems.filter((id) => id !== _id));
    } else {
      // 선택되지 않은 아이템을 클릭하면 선택 추가
      setSelectedItems([...selectedItems, _id]);
    }
  };

  const handleAddToCart = async () => {
    // 모든 선택한 항목을 requestData 배열에 저장
    const requestData = selectedItems.map((itemId) => ({
      add_to_cart: {
        options: selectedOption,
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

  // 각 항목에 대한 옵션을 가져오는 함수
  const getOptionForItem = (itemId) => {
    // 여기에서 itemId에 기반한 옵션을 가져오는 로직을 추가하세요.
    // 예를 들어, 상수 "Consolidate"를 반환하도록 하거나, 다른 로직을 적용하세요.
    return "Consolidate";
  };

  const handleConsolidate = async () => {
    // 모든 선택한 항목을 requestData 배열에 저장
    const requestData = selectedItems.map((itemId) => ({
      userRequest: itemId, // 각 요청의 _id
      options: getOptionForItem(itemId),
    }));

    try {
      const response = await fetch("/api/consolidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.status === 200) {
        // 성공적인 응답을 처리합니다.
        // 여기서 추가적인 로직을 수행할 수 있습니다.
        console.log("Consolidate operation successful");
        router.push("/consolidate");
      } else {
        console.error("Error submitting data:", response.status);
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

            {/* 검색 카테고리를 선택할 수 있는 드롭다운 메뉴 추가 */}
            <Select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              variant="outlined"
              sx={{
                height: 44,
                fontSize: 14,
                width: "100%",
                maxWidth: 150,
                fontWeight: 500,
                borderRadius: "8px",
                margin: "1rem",
              }}
            >
              <MenuItem value="requestId">Request ID</MenuItem>
              <MenuItem value="productName">Product Name</MenuItem>
            </Select>

            {/* 검색 필드 추가 */}
            <StyledInputBase
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "250px" }}
            />

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
                  {filteredData
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((request: any, index: any) => (
                      <RefundRequestRow
                        data={request}
                        key={index}
                        handleCheckboxChange={handleCheckboxChange}
                        isSelected={selectedItems.includes(request._id)}
                      />
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Stack alignItems="center" my={3} margin="1rem">
              <Pagination
                count={Math.ceil(data.length / rowsPerPage)}
                page={page + 1}
                color="primary"
                onChange={(event, newPage) => {
                  handleChangePage(null, newPage - 1);
                }}
              />
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Divider />
            <Heading number={2} title="Choose Service" />
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleConsolidate}
                disabled={selectedItems.length <= 1}
                style={{ marginRight: "0.5rem", width: "120px" }}
              >
                ConsoliDate
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                disabled={selectedItems.length !== 1}
                style={{ marginRight: "0.5rem", width: "120px" }}
              >
                Repacking
              </Button>

              <Button
                variant="outlined"
                color="primary"
                disabled={selectedItems.length <= 1}
                style={{ marginRight: "0.5rem", width: "120px" }}
              >
                Shipping
              </Button>

              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddToCart}
                style={{ marginLeft: "2rem", width: "130px" }}
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
