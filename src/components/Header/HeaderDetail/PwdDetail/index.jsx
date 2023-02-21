import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { useState } from "react";
import { useRef, useEffect } from "react";
import { StyledFlexBox } from "../../../../styles/Shared.styles";
import { modifyPassword } from "../../../../api/User";
import { OutlinedInput, Button } from '@mui/material';

const PwdDetail = ({ open, setDetailOpen, detailId }) => {
  const handleClose = () => {
    setDetailOpen(false);
  };
  const descriptionElementRef = useRef(null);
  const [detailData, setDetailData] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const update = () => {
    if (newPassword === rePassword)
      modifyPassword({ old_password: oldPassword, password: newPassword }).then((res) => {
        setDetailOpen(false)
      });
  }


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogActions>
        <StyledFlexBox onClick={handleClose} cursor="pointer">
        </StyledFlexBox>
      </DialogActions>
      <DialogContent dividers={scroll === "paper"} >
        <StyledFlexBox
          py={12}
          px={56}
          flexDirection="column"
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <StyledFlexBox xs={12} mb={10} justifyContent="left" style={{ fontSize: '16px', fontWeight: '700' }}>
            重設密碼
          </StyledFlexBox>
          <StyledFlexBox color="#505050" fontWeight={500} mb="8px" mt={20}>
            <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
            舊密碼
          </StyledFlexBox>
          <StyledFlexBox color="#505050" alignItems="center">
            <OutlinedInput
              placeholder="請輸入舊密碼"
              value={oldPassword}
              onChange={(e) => { setOldPassword(e.target.value) }}
              type="password"
              sx={{
                height: "40px",
                width: "350px",
                border: "1px solid #E9E9E9",
              }}
            />
          </StyledFlexBox>
          <StyledFlexBox color="#505050" fontWeight={500} mb="8px" mt={20}>
            <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
            新密碼
          </StyledFlexBox>
          <StyledFlexBox color="#505050" alignItems="center">
            <OutlinedInput
              placeholder="請輸入新密碼"
              value={newPassword}
              onChange={(e) => { setNewPassword(e.target.value) }}
              type="password"
              sx={{
                height: "40px",
                width: "350px",
                border: "1px solid #E9E9E9",
              }}
            />
          </StyledFlexBox>
          <StyledFlexBox color="#505050" fontWeight={500} mb="8px" mt={20}>
            <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
            確認新密碼
          </StyledFlexBox>
          <StyledFlexBox color="#505050" alignItems="center">
            <OutlinedInput
              placeholder="請再次輸入新密碼"
              value={rePassword}
              onChange={(e) => { setRePassword(e.target.value) }}
              type="password"
              sx={{
                height: "40px",
                width: "350px",
                border: "1px solid #E9E9E9",
              }}
            />
          </StyledFlexBox>
          <StyledFlexBox pt={40} px={10} pb={20} cursor="pointer" justifyContent="space-between">
            <Button style={{ marginLeft: "20px", marginRight: "20px", backgroundColor: "#FFFFFF", border: "1px solid #A7A7A7", color: "#A7A7A7" }} variant="contained" onClick={() => setDetailOpen(false)}
            >取消</Button>

            <Button style={{ marginLeft: "20px", marginRight: "20px" }} variant="contained" onClick={() => add()}
            >確定</Button>


          </StyledFlexBox>
        </StyledFlexBox>
      </DialogContent>
    </Dialog>
  );
};

export default PwdDetail;
