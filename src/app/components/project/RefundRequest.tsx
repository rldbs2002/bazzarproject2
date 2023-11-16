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
  TableRow,
  TableCell,
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

  console.log(filteredData);

  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedAction, setSelectedAction] = useState("");

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

  const handleAction = async (action: string) => {
    // 선택된 액션을 설정합니다
    setSelectedAction(action);

    // 선택된 아이템이 있는 경우에만 액션을 수행합니다
    if (selectedItems.length > 0) {
      // 서버로 전송할 데이터를 준비합니다
      const requestData = selectedItems.map((itemId) => ({
        options: action,
        requestId: itemId,
        status: 2,
      }));

      try {
        const response = await fetch(`/api/${action}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (response.status === 200) {
          // 성공적인 응답을 처리합니다
          console.log(`${action} 작업 성공`);
          router.push(`/${action}`); // 필요한 경우 성공 페이지로 이동합니다
        } else {
          console.error("데이터 제출 오류:", response.status);
        }
      } catch (error) {
        console.error("데이터 제출 오류:", error);
      }
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
                  {filteredData.length === 0 ||
                  !filteredData.some((item) => item.options) ? (
                    <TableRow>
                      <TableCell
                        colSpan={tableHeading.length + 1}
                        align="center"
                      >
                        Data가 없습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredData
                      .filter((item) => !item.options) // options가 없는 항목만 필터링
                      .sort((a, b) => b.request_id.localeCompare(a.request_id)) // Sort by request_id in descending order
                      .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                      .map((request: any, index: any) => (
                        <RefundRequestRow
                          data={request}
                          key={index}
                          handleCheckboxChange={handleCheckboxChange}
                          isSelected={selectedItems.includes(request._id)}
                        />
                      ))
                  )}
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
                onClick={() => handleAction("shipping")}
                disabled={selectedItems.length <= 1}
                style={{ marginRight: "0.5rem", width: "120px" }}
              >
                Shipping
              </Button>

              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleAction("consolidate")}
                disabled={selectedItems.length <= 1}
                style={{ marginRight: "0.5rem", width: "120px" }}
              >
                Consolidate
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleAction("repacking")}
                disabled={selectedItems.length !== 1}
                style={{ marginRight: "0.5rem", width: "120px" }}
              >
                Repacking
              </Button>
            </div>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}