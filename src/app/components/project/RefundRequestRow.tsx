"use client";
import { FC, useState } from "react";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import {
  StatusWrapper,
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "./StyledComponents";
import { Checkbox } from "@mui/material";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type RefundRequestRowProps = {
  request: any;
  handleCheckboxChange: (itemId: string) => void;
  isSelected: boolean;
};

// ========================================================================
// ========================================================================

const RefundRequestRow: FC<RefundRequestRowProps> = ({
  data,
  handleCheckboxChange,
  isSelected,
}) => {
  const { _id, status, request_id } = data;
  const product_list = data.request_info.product_list;
  const maxCharacters = 20;
  let product_name = "";

  for (const product of product_list) {
    const truncatedName = product.name.slice(0, maxCharacters);
    if (product_name.length + truncatedName.length <= maxCharacters) {
      if (product_name.length > 0) {
        product_name += ", "; // 구분 문자열을 추가합니다.
      }
      product_name += truncatedName;
    } else {
      break;
    }
  }

  const product_price = data.request_info.product_list.reduce(
    (total, product): any => total + product.totalValueUSD,
    0
  );

  const router = useRouter();

  const [isDeleted, setIsDeleted] = useState(false);

  const handleCellClick = (itemId: string) => {
    router.push(`/mypage/${itemId}`);
  };

  const handleDeleteClick = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      // 서버에 DELETE 요청을 보냅니다.
      fetch(`/api/request/${_id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // 삭제 성공 시 Toastify 메시지를 표시하고 페이지를 리로드합니다.
            toast.success("요청이 성공적으로 삭제되었습니다.");
            setIsDeleted(true);
          } else {
            // 삭제 실패
            console.error("요청 삭제에 실패했습니다.");
          }
        })
        .catch((error) => {
          console.error("요청 삭제 중 오류 발생: ", error);
        });
    }
  };

  return isDeleted ? null : ( // 요청이 삭제되면 컴포넌트를 렌더링하지 않습니다.
    <StyledTableRow tabIndex={-1} role="checkbox" selected={isSelected}>
      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        <Checkbox
          checked={isSelected}
          onChange={() => handleCheckboxChange(_id)}
        />
      </StyledTableCell>

      <StyledTableCell
        align="left"
        sx={{ fontWeight: 400, cursor: "pointer" }}
        onClick={() => handleCellClick(_id)}
      >
        #{request_id}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        {product_name || "No Data"}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        $ {product_price}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        <StatusWrapper status={status}>{status}</StatusWrapper>
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton>
          <Edit onClick={() => handleCellClick(_id)} />
        </StyledIconButton>

        <StyledIconButton>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete onClick={handleDeleteClick} />
        </StyledIconButton>
      </StyledTableCell>
      <ToastContainer position="bottom-right" />
    </StyledTableRow>
  );
};

export default RefundRequestRow;
