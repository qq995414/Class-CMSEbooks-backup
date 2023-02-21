import {
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Select,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Fragment, useState } from "react";
import { useRef, useEffect } from "react";
import { fetchOrderData, modifyOrderData } from "../../../../api/Order";
import { SUCCESS_CODE, UPLOAD_URL } from "../../../../constants";
import { StyledFlexBox, StyledImage } from "../../../../styles/Shared.styles";
import { numberWithCommas } from "../../../../utils/util";
import {
  Alert,
  Button,
  Snackbar,
} from "@mui/material";
const STATUS_OPTIONS = [
  { value: "ARRIVE", text: "已送達" },
  { value: "ORDER", text: "未出貨" },
];

const NoticeDetail = ({ open, setDetailOpen, detailId }) => {
  const handleClose = () => {
    setDetailOpen(false);
  };
  const descriptionElementRef = useRef(null);
  const [detailData, setDetailData] = useState({});
  const [status, setStatus] = useState([]);
  const [successToast, setSuccessToast] = useState(false);
  const [AlertMessage, setAlertMessage] = useState("");

  const onStatusChanage = ({ index, currentStatus, id }) => {
    let tmp = status;
    tmp[index].delivery_status = currentStatus;
    setStatus([...tmp]);
    modifyOrderData({
      id,
      delivery_status: currentStatus,
    }).then(({ header }) => {
      setSuccessToast(true)
      if (currentStatus == "ARRIVE")
        setAlertMessage("已變更狀態為已送達")
      else
        setAlertMessage("已變更狀態為待出貨")

      fetchOrderData({ id: detailId }).then((res) => {
        setDetailData(res.data[0]);
        const statusData =
          res.data[0].dealers &&
          res.data[0].dealers.map((item) => {
            let statusValue = STATUS_OPTIONS.find(
              (optionItem) => optionItem.text === item.delivery_status
            ).value;
            return {
              id: item.order_dealer_id,
              delivery_status: statusValue,
            };
          });
        setStatus(statusData);
      });


      if (header.code !== SUCCESS_CODE) {

      }
    });
  };

  useEffect(() => {
    if (open) {
      fetchOrderData({ id: detailId }).then((res) => {
        { console.log(res) }
        setDetailData(res.data[0]);
        const statusData =
          res.data[0].dealers &&
          res.data[0].dealers.map((item) => {
            let statusValue = STATUS_OPTIONS.find(
              (optionItem) => optionItem.text === item.delivery_status
            ).value;
            return {
              id: item.order_dealer_id,
              delivery_status: statusValue,
            };
          });
        setStatus(statusData);
      });
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogActions >
        <StyledFlexBox onClick={handleClose} p={10} cursor="pointer">
          <StyledImage src="/images/icon-close.svg" />
        </StyledFlexBox>
      </DialogActions>
      {detailData &&
        <DialogContent dividers={scroll === "paper"} sx={{ minHeight: "817px" }} style={{ overflowY: "visible" }}>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={successToast}
            autoHideDuration={3000}
            onClose={() => setSuccessToast(false)}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              {AlertMessage}
            </Alert>
          </Snackbar>
          <StyledFlexBox
            width={732}
            px={56}
            flexDirection="column"
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            color="#505050"
            pb={30}
          >
            <StyledFlexBox fontSize={28} fontWeight={500} mb={24}>
              訂單編號 {detailData.member_order_id && detailData.member_order_id}
            </StyledFlexBox>
            <StyledFlexBox mb={16} color="#7c7c7c">
              {detailData.date !== null ? <>於{detailData.date && detailData.date.substr(0, 10)}付款</> : "尚未付款"}
            </StyledFlexBox>
            <StyledFlexBox mb={16} fontWeight={500}>
              付款金額：${detailData.total && numberWithCommas(detailData.total)}
            </StyledFlexBox>
            <StyledFlexBox mb={16} fontWeight={500}>
              付款方式：{detailData.payment && detailData.payment}
            </StyledFlexBox>
            <StyledFlexBox mb={16} fontWeight={500}>
              會員姓名：{detailData.member_name && detailData.member_name}
            </StyledFlexBox>
            <StyledFlexBox mb={16} fontWeight={500}>
              會員編號：{detailData.member_id && detailData.member_id}
            </StyledFlexBox>
            <StyledFlexBox mb={16} fontWeight={500}>
              發票開立方式：{detailData.invoice_type && detailData.invoice_type}
            </StyledFlexBox>
            <StyledFlexBox mb={16} fontWeight={500}>
              發票編號：{detailData.invoice_type && detailData.invoice_type}
            </StyledFlexBox>
            {/* divider */}
            <StyledFlexBox width="100%" height="1px" bg="#e9e9e9" my={24} />
            <StyledFlexBox mb={16} color="#7c7c7c" fontSize={16}>
              收件人資訊
            </StyledFlexBox>
            <StyledFlexBox mb={16} fontWeight={500}>
              姓名：{detailData.delivery_name && detailData.delivery_name}
            </StyledFlexBox>
            <StyledFlexBox mb={16} fontWeight={500}>
              Email：{detailData.delivery_email && detailData.delivery_email}
            </StyledFlexBox>
            <StyledFlexBox mb={16} fontWeight={500}>
              聯絡電話：{detailData.delivery_phone && detailData.delivery_phone}
            </StyledFlexBox>
            <StyledFlexBox mb={16} fontWeight={500}>
              配送方式：{detailData.delivery_method && detailData.delivery_method}
            </StyledFlexBox>
            <StyledFlexBox mb={16} fontWeight={500}>
              收件地址：{detailData.delivery_address && detailData.delivery_address}
            </StyledFlexBox>
            {detailData?.dealers &&
              detailData.dealers?.map((dealer, index) => (
                <Fragment key={dealer.order_dealer_id}>
                  {/* divider */}
                  <StyledFlexBox width="100%" height="1px" bg="#e9e9e9" my={24} />
                  <StyledFlexBox>
                    <StyledFlexBox alignItems="center" mb={16}>
                      <StyledFlexBox
                        width={50}
                        height={23}
                        borderRadius="4px"
                        bg="#8c9eff"
                        color="#fff"
                        alignItems="center"
                        justifyContent="center"
                        mr="16px"
                        fontSize={12}
                      >
                        書商
                      </StyledFlexBox>
                      <StyledFlexBox fontSize={16}>
                        {dealer.dealer_name}
                      </StyledFlexBox>
                    </StyledFlexBox>
                  </StyledFlexBox>
                  {dealer.delivery_status && <Select
                    displayEmpty
                    value={dealer.delivery_status === "未出貨" ? "ORDER" : "ARRIVE"}
                    onChange={(e) =>
                      onStatusChanage({
                        index,
                        id: dealer.order_dealer_id,
                        currentStatus: e.target.value,
                      })
                    }
                    variant="outlined"
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      fontSize: 14,
                      width: 262,
                      height: 40,
                      color: "#505050",
                      border: "1px solid #E9E9E9",
                      marginBottom: "16px",
                    }}
                  >
                    {STATUS_OPTIONS && STATUS_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.text}
                      </MenuItem>
                    ))}
                  </Select>}

                  <TableContainer component={Paper}>
                    <Table stickyHeader
                      aria-label="sticky table">
                      <TableHead sx={{ ".MuiTableRow-head": { height: 42 } }}>
                        <TableRow>
                          <TableCell align="center">商品</TableCell>
                          <TableCell align="center">價格</TableCell>
                          <TableCell align="center">數量</TableCell>
                          <TableCell align="center">小計</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dealer.books?.map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="center">
                              <StyledFlexBox
                                justifyContent="center"
                                alignItems="center"
                              >
                                <StyledImage
                                  src={`${UPLOAD_URL}${row.image}`}
                                  width={80}
                                  maxHeight={100}
                                  style={{ objectFit: "contain" }}
                                />
                                <StyledFlexBox textAlign="initial">
                                  {row.book_name} <br />
                                  {row.book_id}
                                </StyledFlexBox>
                              </StyledFlexBox>
                            </TableCell>
                            <TableCell align="center">
                              ${parseInt(row.book_price)}
                            </TableCell>
                            <TableCell align="center">{row.quantity}</TableCell>
                            <TableCell align="center">
                              $
                              {numberWithCommas(
                                Number(row.quantity) * Number(row.book_price)
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Fragment>
              ))}
          </StyledFlexBox>
        </DialogContent>}
    </Dialog>
  );
};

export default NoticeDetail;
