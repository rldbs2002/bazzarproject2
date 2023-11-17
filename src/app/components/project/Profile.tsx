import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  Avatar,
  Typography,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { FlexBetween, FlexBox } from "../flex-box";
import { H5 } from "../Typography";
import { currency } from "@/lib";

const Profile = ({ session }: any) => {
  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handlePasswordChangeClick = () => {
    setIsPasswordChangeOpen(true);
  };

  const handlePasswordChangeClose = () => {
    setIsPasswordChangeOpen(false);
    // 초기화
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const handlePasswordChange = () => {
    // 여기에서 패스워드 변경 로직을 구현하세요.
    // currentPassword, newPassword, confirmNewPassword를 사용하여 처리
    console.log("Changing password...");
    // 초기화
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setIsPasswordChangeOpen(false);
  };
  return (
    <>
      <Box mb={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card
              sx={{
                display: "flex",
                p: "14px 32px",
                height: "100%",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ height: 64, width: 64 }} />

              <Box ml={1.5} flex="1 1 0">
                <FlexBetween flexWrap="wrap">
                  <div>
                    <H5 my="0px">{session?.user.email}</H5>
                  </div>

                  <Typography color="grey.600" letterSpacing="0.2em">
                    {session?.user.role}
                  </Typography>
                </FlexBetween>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Button
        color="primary"
        sx={{ bgcolor: "primary.light", px: 4 }}
        onClick={handlePasswordChangeClick}
      >
        Change Password
      </Button>

      <Modal
        open={isPasswordChangeOpen}
        onClose={handlePasswordChangeClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            minWidth: 300,
          }}
        >
          <Typography variant="h6" id="modal-modal-title" gutterBottom>
            Change Password
          </Typography>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            margin="normal"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <Button onClick={handlePasswordChangeClose}>Cancel</Button>
          <Button onClick={handlePasswordChange}>Change Password</Button>
        </Box>
      </Modal>
    </>
  );
};

export default Profile;
