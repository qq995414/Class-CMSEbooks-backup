import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { useState } from "react";
import { useRef, useEffect } from "react";
import { fetchBookDetail } from "../../../../api/Book";
import { UPLOAD_URL } from "../../../../constants";
import { StyledFlexBox, StyledImage } from "../../../../styles/Shared.styles";
import { numberWithCommas } from "../../../../utils/util";

const BookDetail = ({ open, setDetailOpen, detailId }) => {
  const handleClose = () => {
    setDetailOpen(false);
  };
  const descriptionElementRef = useRef(null);
  const [detailData, setDetailData] = useState({});
  const image = detailData?.image_file || [];
  const [selected, setSelected] = useState("detail");

  useEffect(() => {
    if (open) {
      fetchBookDetail({ id: detailId }).then((res) => {
        setDetailData(res.data[0]);
        console.log("res", res)
      });
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth
      maxWidth="xs"
    >
      <DialogActions>
        <StyledFlexBox onClick={handleClose} p={10} cursor="pointer">
          <StyledImage src="/images/icon-close.svg" />
        </StyledFlexBox>
      </DialogActions>
      <DialogContent dividers={scroll === "paper"} sx={{ minHeight: "817px" }}>
        <StyledFlexBox
          py={24}
          px={56}
          flexDirection="column"
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <StyledFlexBox>
            {detailData.image && <StyledImage
              src={UPLOAD_URL + "/Upload/IMAGE/" + detailData.image[0]?.name}
              borderRadius="8px"
              width={281}
              height={348}
              mr={64}
              style={{ objectFit: "contain" }}
            />}

            <div>
              <StyledFlexBox
                color="#505050"
                fontSize={28}
                fontWeight={500}
                mb={24}
                maxWidth={"500px"}

              >
                {detailData?.name}
              </StyledFlexBox>
              <StyledFlexBox
                color="#7c7c7c"
                fontSize={16}
                fontWeight={400}
                mb={60}
                lineHeight="24px"
              >
                {/* TODO: 收藏數 */}
                {detailData?.grade}★&nbsp;&nbsp;
                {detailData?.evaluation_total !== 0 && detailData?.evaluation_total !== null ? numberWithCommas(detailData?.evaluation_total) : "尚無評價"}
                <br />
                <br />
                科目｜{detailData?.subject}
                <br />
                <br />
                版本｜{detailData?.version}
                <br />
                <br />
                出版日期｜{detailData?.publish_date}
                <br />
                <br />
                書籍款式｜{detailData?.type}
                <br />
                <br />
                價格｜原價${detailData?.origin_price}、成本價$
                {detailData?.cost_price}、批發價${detailData?.whosale_price}
                <br />
                <br />
                經銷商｜{detailData?.dealer_name}
              </StyledFlexBox>
            </div>
          </StyledFlexBox>
          <StyledFlexBox width={872} borderBottom="1px solid #e9e9e9" mb={64}>
            <StyledFlexBox
              borderBottom={
                selected === "detail"
                  ? "2px solid #5055d6"
                  : "2px solid #505050"
              }
              color={selected === "detail" ? "#5055D6" : "#505050"}
              width={108}
              height={40}
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              onClick={() => setSelected("detail")}
              style={{ opacity: selected === "detail" ? 1 : 0.3 }}
            >
              詳細資訊
            </StyledFlexBox>
            <StyledFlexBox
              borderBottom={
                selected === "score" ? "2px solid #5055d6" : "2px solid #505050"
              }
              color={selected === "score" ? "#5055D6" : "#505050"}
              width={108}
              height={40}
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              onClick={() => setSelected("score")}
              style={{ opacity: selected === "score" ? 1 : 0.3 }}
            >
              評價
            </StyledFlexBox>
          </StyledFlexBox>
          {selected === "detail" ? (
            <>
              <StyledFlexBox
                color="#32324D"
                fontSize={24}
                fontWeight={700}
                mb={26}
              >
                關於本書
              </StyledFlexBox>
              <StyledFlexBox color="#505050" fontSize={16} mb={54} maxWidth={"800px"}
              >
                <div dangerouslySetInnerHTML={{ __html: detailData?.about }} />
              </StyledFlexBox>
              <StyledFlexBox
                color="#32324D"
                fontSize={24}
                fontWeight={700}
                mb={26}
              >
                目錄
              </StyledFlexBox>
              <StyledFlexBox color="#505050" fontSize={16} mb={54}>
                <div
                  dangerouslySetInnerHTML={{ __html: detailData?.contents }}
                />
              </StyledFlexBox>
            </>
          ) : (
            <div>
              <StyledFlexBox
                color="#32324D"
                fontSize={24}
                fontWeight={700}
                mb={26}
              >
                總評價
              </StyledFlexBox>
            </div>
          )}
        </StyledFlexBox>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetail;
