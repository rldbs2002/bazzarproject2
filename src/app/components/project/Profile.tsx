import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  Avatar,
  Typography,
} from "@mui/material";
import { FlexBetween } from "../flex-box";
import { H5 } from "../Typography";
import { signOut } from "next-auth/react";

const Profile = ({ session }: any) => {
  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // State for error message
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handlePasswordChangeClick = () => {
    setIsPasswordChangeOpen(true);
  };

  const handlePasswordChangeClose = () => {
    setIsPasswordChangeOpen(false);
    // 초기화
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setError(null); // Reset error state
  };

  const handleChangePassword = async () => {
    try {
      // Basic client-side validation
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        setError("Please fill in all fields.");
        return;
      }

      if (newPassword !== confirmNewPassword) {
        setError("New passwords do not match");
        return;
      }

      setLoading(true);
      setError(null);

      console.log(
        currentPassword,
        newPassword,
        confirmNewPassword,
        session?.user.email
      );
      const response = await fetch("/api/changepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmNewPassword,
          email: session?.user.email,
        }),
      });

      if (response.status === 200) {
        console.log("Password changed successfully!");
        // You can reset the form or perform any additional actions here

        // 로그아웃 처리
        await signOut();
      } else {
        const data = await response.json();
        setError(data.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setError("Internal Server Error");
    } finally {
      setLoading(false);
    }
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

      {/* <Button
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

          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}

          <Box mt={2}>
            <Button
              onClick={handlePasswordChangeClose}
              color="secondary"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleChangePassword}
              color="primary"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Change Password"
              )}
            </Button>
          </Box>
        </Box>
      </Modal> */}
    </>
  );
};

export default Profile;
