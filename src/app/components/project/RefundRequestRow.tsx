import { FC, useState } from "react";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import {
  StatusWrapper,
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "./StyledComponents";
import { Checkbox } from "@mui/material";

type RefundRequestRowProps = {
  request: any;
  handleCheckboxChange: (itemId: string) => void;
  isSelected: boolean;
};

// ========================================================================
type RefundRequestRowProps = { request: any };
// ========================================================================

const RefundRequestRow: FC<RefundRequestRowProps> = ({
  request,
  handleCheckboxChange,
  isSelected,
}) => {
  const { request_id, status } = request;
  const product_name = request.request_info.product_list[0].name;
  const product_price = request.request_info.product_list[0].totalValueUSD;

  return (
    <StyledTableRow tabIndex={-1} role="checkbox" selected={isSelected}>
      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        <Checkbox
          checked={isSelected}
          onChange={() => handleCheckboxChange(request_id)}
        />
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        #{request_id}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        {product_name}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        $ {product_price}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        <StatusWrapper status={status}>{status}</StatusWrapper>
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton>
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default RefundRequestRow;
