import React from "react";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";

const textFieldStyle = {
  width: "100%",
  margin: "20px 0px 0px",
};

export default function Form({ data }: any) {
  return (
    <div>
      <div>
        <h1>Request List</h1>
      </div>
      <form>
        {/* "tracking_info " 섹션 */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Tracking Info</Typography>
          </AccordionSummary>
          {/* 컨테이너 추가 */}
          <Box p={2}>
            <TextField
              label="tracking_number"
              name="tracking_number"
              variant="outlined"
              style={textFieldStyle}
              value={data.request_info.tracking_info.tracking_number}
            />
            <TextField
              label="tracking_carrier"
              name="tracking_carrie"
              variant="outlined"
              style={textFieldStyle}
              value={data.request_info.tracking_info.tracking_carrier}
            />
            <TextField
              label="order_number"
              name="order_number"
              variant="outlined"
              style={textFieldStyle}
              value={data.request_info.tracking_info.order_number}
            />
            <TextField
              label="store"
              name="store"
              variant="outlined"
              style={textFieldStyle}
              value={data.request_info.tracking_info.store}
            />
          </Box>
        </Accordion>
        {data.request_info.product_list.map((product: any, index: number) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{product.name}</Typography>
            </AccordionSummary>
            <Box p={2}>
              <TextField
                label={`Product Name ${index + 1}`}
                name={`name_${index}`}
                variant="outlined"
                style={textFieldStyle}
                value={product.name}
              />
              <TextField
                label={`Product Type ${index + 1}`}
                name={`type_${index}`}
                variant="outlined"
                style={textFieldStyle}
                value={product.type}
              />
              <TextField
                label={`Product Price ${index + 1}`}
                name={`price_${index}`}
                variant="outlined"
                style={textFieldStyle}
                value={product.totalValueUSD}
              />
              <TextField
                label={`Product URL ${index + 1}`}
                name={`url_${index}`}
                variant="outlined"
                style={textFieldStyle}
                value={product.url}
              />
            </Box>
          </Accordion>
        ))}
        {/* "Arrived Info" 섹션 */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Arrived Info</Typography>
          </AccordionSummary>
          {/* 컨테이너 추가 */}
          <Box p={2}>
            <TextField
              label="First Name"
              name="firstname"
              variant="outlined"
              style={textFieldStyle}
              value={data.request_info.arrived_info.firstname}
            />
            <TextField
              label="Last Name"
              name="lastname"
              variant="outlined"
              style={textFieldStyle}
              value={data.request_info.arrived_info.lastname}
            />
            <TextField
              label="Country"
              name="country"
              variant="outlined"
              style={textFieldStyle}
              value={data.request_info.arrived_info.country.label}
            />
            <TextField
              label="Address"
              name="address"
              variant="outlined"
              style={textFieldStyle}
              value={data.request_info.arrived_info.address}
            />
            <TextField
              label="City"
              name="city"
              variant="outlined"
              style={textFieldStyle}
              value={data.request_info.arrived_info.city}
            />
            <TextField
              label="State"
              name="state"
              variant="outlined"
              style={textFieldStyle}
              value={data.request_info.arrived_info.state}
            />
            <TextField
              label="Postal Code"
              name="postal_code"
              variant="outlined"
              style={textFieldStyle}
              value={data.request_info.arrived_info.postal_code}
            />
            <TextField
              label="Phone"
              name="phone"
              variant="outlined"
              style={textFieldStyle}
              value={data.request_info.arrived_info.phone}
            />
          </Box>
        </Accordion>
      </form>
    </div>
  );
}
