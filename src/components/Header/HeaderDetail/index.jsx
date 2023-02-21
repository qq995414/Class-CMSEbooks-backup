import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { useState } from "react";
import { useRef, useEffect } from "react";
import { fetchBookData } from "../../../api/Book";
import { UPLOAD_URL } from "../../../constants";
import { StyledFlexBox, StyledImage } from "../../../styles/Shared.styles";
import { numberWithCommas } from "../../../utils/util";
import PwdDetail from "./PwdDetail";


const HeaderDetail = ({ open, setDetailOpen, detailId }) => {
  const handleClose = () => {
    setDetailOpen(false);
  };
  const descriptionElementRef = useRef(null);
  const [detailData, setDetailData] = useState({});
  const image = detailData?.image_file || [];
  const [selected, setSelected] = useState("detail");
  const [pwdDetailOpen, setPwdDetailOpen] = useState(false);

  useEffect(() => {
    if (open) {
      fetchBookData({ id: detailId }).then((res) => {
        setDetailData(res.data[0]);
        console.log("res", res)
      });
    }
  }, [open]);
  const logOut = () => {
    localStorage.clear();
    window.location = "/";
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      sx={{
        '& .MuiDialog-container': {
          justifyContent: 'flex-end',
          alignItems: 'flex-start'
        }
      }}
      PaperProps={{ sx: { top: 40, left: 10, m: 2 } }}
      BackdropProps={{ style: { backgroundColor: "transparent" } }}
    >

      <DialogContent dividers={scroll === "paper"} >
        <StyledFlexBox
          onClick={() => { setPwdDetailOpen(true) }}
        >
          重設密碼
        </StyledFlexBox>
        <StyledFlexBox
          pt={3}
          color="#FB4A4A "
          onClick={() => { logOut() }}
        >
          登出
        </StyledFlexBox>
        <PwdDetail
          open={pwdDetailOpen}
          setDetailOpen={setPwdDetailOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default HeaderDetail;
