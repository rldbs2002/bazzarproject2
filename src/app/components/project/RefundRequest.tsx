"use client";

import { FC, useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import {
  Box,
  Stack,
  Avatar,
  Typography,
  Grid,
  Button,
  Divider,
  Pagination,
  Select,
  MenuItem,
  InputBase,
  styled,
  Tooltip,
} from "@mui/material";
import RefundRequestRow from "./RefundRequestRow";
import { FlexBox } from "../flex-box";
import { useRouter } from "next/navigation";
import { getAllRequestData } from "@/app/lib/data";
import { Paragraph } from "../Typography";
import Card1 from "../Card1";

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

export default function RefundRequest() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllRequestData();

        setData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("requestId"); // 검색 카테고리 추가 (기본값: productName)

  // 검색어를 기반으로 데이터 필터링
  const filteredData = data.filter((item: any) => {
    if (searchCategory === "productName") {
      // `product_list` 배열 내에서 `name`으로 검색
      const productNames = item.request_info.product_list.map(
        (product: any) => product.name
      );
      return productNames.some((productName: any) =>
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
  const [rowsPerPage, setRowsPerPage] = useState(5); // Add state for rows per page

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
        status: 3,
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
      <Card1 sx={{ mb: 4 }}>
        <Paragraph
          style={{
            margin: "2rem",
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          Request
        </Paragraph>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Heading number={1} title="Order List" />

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
                mb: 2,
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
              sx={{
                height: 44,
                fontSize: 14,
                padding: "0 1rem",
                borderRadius: "8px",
                width: { xs: "100%", sm: 250 },
                mb: { xs: 3, sm: 0 },
                mx: { xs: "auto", sm: 0 },
              }}
            />

            <Table>
              <Thead className="thead-style">
                <Tr>
                  <Th>Check</Th>
                  <Th>Request ID</Th>
                  <Th>Product Name</Th>
                  <Th>Price</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredData.length === 0 ? (
                  <Tr>
                    <Td align="center">Data가 없습니다.</Td>
                  </Tr>
                ) : (
                  filteredData
                    .filter((item: any) => !item.options) // options가 없는 항목만 필터링
                    .sort((a: any, b: any) =>
                      b.request_id.localeCompare(a.request_id)
                    )
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
              </Tbody>
            </Table>

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
              <Tooltip title="Shipping is to deliver the product as it was received.">
                <span>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleAction("shipping")}
                    disabled={
                      selectedItems.length !== 1 && selectedItems.length <= 1
                    }
                    sx={{
                      marginRight: "0.5rem",
                      width: { xs: "40%", sm: "120px" }, // 모바일 환경에서는 너비 100%
                      marginBottom: { xs: 2, sm: 0 }, // 모바일 환경에서는 하단 마진 추가
                    }}
                  >
                    Shipping
                  </Button>
                </span>
              </Tooltip>

              <Tooltip
                title="Repacking is packing your items from one single package into smaller box
or bubble-mailer. This may reduce shipping costs if the original box is too
large for the product it contains."
              >
                <span>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleAction("repacking")}
                    disabled={selectedItems.length !== 1}
                    sx={{
                      marginRight: "0.5rem",
                      width: { xs: "40%", sm: "120px" }, // 모바일 환경에서는 너비 100%
                      marginBottom: { xs: 2, sm: 0 }, // 모바일 환경에서는 하단 마진 추가
                    }}
                  >
                    Repacking
                  </Button>
                </span>
              </Tooltip>

              <Tooltip
                title="Consolidation is combining multiple packages into one box, 
so you can ship your items together and save money."
              >
                <span>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleAction("consolidate")}
                    disabled={selectedItems.length <= 1}
                    sx={{
                      marginRight: "0.5rem",
                      width: { xs: "40%", sm: "120px" }, // 모바일 환경에서는 너비 100%
                      marginBottom: { xs: 2, sm: 0 }, // 모바일 환경에서는 하단 마진 추가
                    }}
                  >
                    Consolidate
                  </Button>
                </span>
              </Tooltip>
            </div>
          </Grid>
        </Grid>
      </Card1>
    </Box>
  );
}
