"use client";

import React from "react";
import { Grid, Container, Box, Typography } from "@mui/material";
import Card1 from "../Card1";
import { useSession } from "next-auth/react";
import { H2 } from "../Typography";

const EventWrapper = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ backgroundColor: "grey.100" }}>
          <Container sx={{ py: 6, maxWidth: "80%" }}>
            <H2
              fontSize={36}
              textAlign="center"
              fontWeight="700"
              color="secondary.main"
              mb={5}
              textTransform="uppercase"
            >
              event
            </H2>
          </Container>
        </Box>
        <Container sx={{ my: "5rem", maxWidth: "80%", mx: "auto" }}>
          <Card1>
            <Typography
              sx={{
                fontSize: "2rem",
                textAlign: "center",
                fontWeight: 700,
                color: "secondary.main",
                mb: 5,
                textTransform: "uppercase",
              }}
            >
              Celebrate Christmas with KGOODS! 🎁
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "1.3rem" }}>
              This is the season for giving, and we’re spreading the joy at
              KGOODS! Join our Christmas event and have the chance to win 10%
              Discount Coupont for FREE!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "1.3rem" }}>
              <strong>Event Dates:</strong> December 8th, 2023 – December 25th,
              2023
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "1.3rem" }}>
              <strong>How to Participate:</strong> Spin the wheel for a chance
              to win an exclusive $10 DK Point promo code. Use it on your next
              shipment and make your holiday shopping even more delightful!
              Everyone has a chance to win, so don’t miss out!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "1.3rem" }}>
              <strong>Limited Time Only! ⏰</strong> This festive event is
              available for a limited time, so take the opportunity to win now.
              The clock is ticking!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "1.3rem" }}>
              <strong>Important:</strong>
              <ul>
                <li>
                  📅 Expiration Date: Promo codes expire on January 25th, 2024.
                </li>
                <li>
                  🔐 Register your promo code before it expires to unlock your
                  holiday savings.
                </li>
              </ul>
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "1.3rem" }}>
              Spread the holiday cheer and spin to win!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "1.3rem" }}>
              Happy holidays!
            </Typography>
          </Card1>
        </Container>
      </Grid>
    </Grid>
  );
};

export default EventWrapper;
