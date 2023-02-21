import { Dialog, DialogActions, DialogContent, Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Pagination, Stack } from '@mui/material';
import { Fragment, useState } from "react";
import { useRef, useEffect } from 'react';
import { fetchMemberData } from '../../../../api/User';
import { StyledFlexBox, StyledImage } from '../../../../styles/Shared.styles';
import { numberWithCommas } from '../../../../utils/util';
import { fetchOrderData, modifyOrderData } from "../../../../api/Order";
import { SUCCESS_CODE, UPLOAD_URL } from "../../../../constants";

import {
    Alert,
    Snackbar,
    Select,
    MenuItem
} from "@mui/material";
const STATUS_OPTIONS = [
    { value: "ARRIVE", text: "已送達" },
    { value: "ORDER", text: "未出貨" },
];
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const MemberDetail = ({ open, setDetailOpen, detailId }) => {
    const handleClose = () => {
        setDetailOpen(false);
        setOrder(false)
    };
    const descriptionElementRef = useRef(null);
    const [detailData, setDetailData] = useState({});
    const [orderData, setOrderData] = useState({});
    const image = detailData?.image_file || [];
    const [selected, setSelected] = useState('detail');
    const [SubPageLimit, setSubPageLimit] = useState(10);
    const [SubPageNumber, setSubPageNumber] = useState(1);
    const [orderPageLimit, setOrderPageLimit] = useState(10);
    const [orderPageNumber, setOrderPageNumber] = useState(1);
    const [order, setOrder] = useState(false);
    const [status, setStatus] = useState([]);
    const [successToast, setSuccessToast] = useState(false);
    const [AlertMessage, setAlertMessage] = useState("");
    const [orderId, setOrderId] = useState("");
    useEffect(() => {
        if (open) {
            fetchMemberData({ id: detailId }).then((res) => {
                setDetailData(res.data[0]);
                console.log('res', res);
            });
        }
        console.log("open")
    }, [open]);
    const handleSubPageChange = (event, value) => {
        setSubPageNumber(value)
    };
    const handleOrderPageChange = (event, value) => {
        setOrderPageNumber(value)
    };
    const getData = (id) => {
        setOrderId(id)
        fetchOrderData({ id: id }).then((res) => {
            setOrderData(res.data[0]);
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
            setOrder(true)
        });
    };

    const onStatusChanage = ({ index, currentStatus, id }) => {
        let tmp = status;
        tmp[index].delivery_status = currentStatus;
        setStatus([...tmp]);
        modifyOrderData({
            id,
            delivery_status: currentStatus,
        }).then(({ header }) => {
            setSuccessToast(true)
            getData(orderId)

            if (currentStatus == "ARRIVE")
                setAlertMessage("已變更狀態為已送達")
            else {
                setAlertMessage("已變更狀態為待出貨")
            }

            if (header.code !== SUCCESS_CODE) {

            }
        });
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogActions>
                <StyledFlexBox onClick={handleClose} p={10} cursor="pointer">
                    <StyledImage src="/images/icon-close.svg" />
                </StyledFlexBox>
            </DialogActions>
            {order === false ? <DialogContent dividers={scroll === 'paper'} sx={{ minHeight: '817px', p: '0' }}>
                <StyledFlexBox
                    py={0}
                    px={56}
                    flexDirection="column"
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    <Grid xs={12} sx={{ fontSize: '16px', fontWeight: '700', color: '#252525' }}>
                        會員詳細資料
                    </Grid>
                    <Grid container sx={{ mt: '24px', color: '#505050' }}>
                        <Grid item xs={3}>
                            姓名：
                        </Grid>
                        <Grid item xs={3}>
                            帳號(手機)：
                        </Grid>
                        <Grid item xs={3}>
                            Email：
                        </Grid>
                        <Grid item xs={3}>
                            專屬企業：
                        </Grid>
                    </Grid>
                    <Grid container sx={{ mt: '15.5px', color: '#7C7C7C' }}>
                        <Grid item xs={3}>
                            {detailData.name}
                        </Grid>
                        <Grid item xs={3}>
                            {detailData.phone}
                        </Grid>
                        <Grid item xs={3}>
                            {detailData.email}
                        </Grid>
                        <Grid item xs={3}>
                            {detailData.name}

                        </Grid>
                    </Grid>
                    <Grid container sx={{ mt: '35.5px', color: '#505050' }}>
                        <Grid item xs={3}>
                            訂閱狀態：
                        </Grid>
                        <Grid item xs={3}>
                            會員狀態：
                        </Grid>
                        <Grid item xs={3}>
                            Facebook綁定：
                        </Grid>
                        <Grid item xs={3}>
                            Google綁定：
                        </Grid>

                    </Grid>
                    <Grid
                        container
                        sx={{ mt: '15.5px', color: '#7C7C7C', pb: '25px', borderBottom: 1, borderColor: '#E9E9E9', mb: '25px' }}
                    >
                        <Grid item xs={3}>
                            {detailData.subscription_state}
                        </Grid>
                        <Grid item xs={3}>
                            {detailData.chaoyang_state}
                        </Grid>
                        <Grid item xs={3}>
                            {detailData.facebook_bind ? "已榜定" : "未榜定"}
                        </Grid>
                        <Grid item xs={3}>
                            {detailData.google_bind ? "已榜定" : "未榜定"}

                        </Grid>
                    </Grid>

                    <StyledFlexBox width={872}>
                        <StyledFlexBox
                            borderBottom={selected === 'detail' ? '2px solid #5055d6' : '2px solid #505050'}
                            color={selected === 'detail' ? '#5055D6' : '#505050'}
                            width={108}
                            height={40}
                            justifyContent="center"
                            alignItems="center"
                            cursor="pointer"
                            onClick={() => setSelected('detail')}
                            style={{ opacity: selected === 'detail' ? 1 : 0.3 }}
                        >
                            訂閱付款紀錄
                        </StyledFlexBox>
                        <StyledFlexBox
                            borderBottom={selected === 'score' ? '2px solid #5055d6' : '2px solid #505050'}
                            color={selected === 'score' ? '#5055D6' : '#505050'}
                            width={108}
                            height={40}
                            justifyContent="center"
                            alignItems="center"
                            cursor="pointer"
                            onClick={() => setSelected('score')}
                            style={{ opacity: selected === 'score' ? 1 : 0.3 }}
                        >
                            付款紀錄
                        </StyledFlexBox>
                    </StyledFlexBox>
                    {selected === 'detail' ? (
                        <>
                            <TableContainer component={Paper}>
                                <Table
                                    sx={{ minWidth: 650 }} stickyHeader
                                    aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ backgroundColor: '#F0F1F7' }}>付款名稱</TableCell>
                                            <TableCell align="left" sx={{ backgroundColor: '#F0F1F7' }}>
                                                付款金額
                                            </TableCell>
                                            <TableCell align="left" sx={{ backgroundColor: '#F0F1F7' }}>
                                                付款日期
                                            </TableCell>
                                            <TableCell align="left" sx={{ backgroundColor: '#F0F1F7' }}>
                                                付款方式
                                            </TableCell>
                                            <TableCell align="left" sx={{ backgroundColor: '#F0F1F7' }}>
                                                付款人姓名
                                            </TableCell>
                                            <TableCell align="left" sx={{ backgroundColor: '#F0F1F7' }}>
                                                Email
                                            </TableCell>
                                            <TableCell align="left" sx={{ backgroundColor: '#F0F1F7' }}>
                                                通訊地址
                                            </TableCell>
                                            <TableCell align="left" sx={{ backgroundColor: '#F0F1F7' }}>
                                                聯絡電話
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {detailData.subscription_list && detailData.subscription_list.length !== 0 ? detailData.subscription_list.map((row) => (
                                            <TableRow key={row.name} sx={{ border: 0 }}>
                                                <TableCell align="left">{detailData.subscription_list}</TableCell>
                                                <TableCell align="left">$60</TableCell>
                                                <TableCell align="left">2022/6/1</TableCell>
                                                <TableCell align="left">信用卡</TableCell>
                                                <TableCell align="left">陳文文</TableCell>
                                                <TableCell align="left">wei213@gmail.com10</TableCell>
                                                <TableCell align="left">台北市信義區中正路33號</TableCell>
                                                <TableCell align="left">0923842931</TableCell>
                                            </TableRow>
                                        )) :
                                            ""}
                                    </TableBody>
                                </Table>

                            </TableContainer>

                            <Box
                                sx={{
                                    display: 'flex',
                                    fontSize: 12,
                                    color: '#8c9eff',
                                    mt: '60px',
                                    mb: '20px',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box>
                                    顯示
                                    {detailData.subscription_list && detailData.subscription_list.length !== 0 ? detailData.subscription_list.length : 0}
                                    筆資料中的
                                    {detailData.subscription_list && detailData.subscription_list.length !== 0 ? 1 + SubPageLimit * (SubPageNumber - 1) : 0}
                                    到
                                    {detailData.subscription_list && detailData.subscription_list.length !== 0 ? SubPageLimit * (SubPageNumber - 1) + detailData.subscription_list.length : ""}筆資料
                                </Box>
                                <Box>
                                    <Pagination
                                        count={Number(detailData.subscription_list && detailData.subscription_list.length !== 0 ? detailData.subscription_list.length : 0)}
                                        variant="outlined"
                                        shape="rounded"
                                        page={SubPageNumber}
                                        onChange={handleSubPageChange}
                                    />
                                </Box>
                            </Box>
                        </>
                    ) : (
                        <>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} stickyHeader
                                    aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ backgroundColor: '#F0F1F7' }}>訂單編號</TableCell>
                                            <TableCell align="left" sx={{ backgroundColor: '#F0F1F7' }}>
                                                訂單金額
                                            </TableCell>
                                            <TableCell align="left" sx={{ backgroundColor: '#F0F1F7' }}>
                                                購買日期
                                            </TableCell>
                                            <TableCell align="left" sx={{ backgroundColor: '#F0F1F7' }}>
                                                付款方式
                                            </TableCell>
                                            <TableCell align="left" sx={{ backgroundColor: '#F0F1F7' }}>
                                                付款人姓名
                                            </TableCell>
                                            <TableCell align="left" sx={{ backgroundColor: '#F0F1F7' }}>
                                                Email
                                            </TableCell>
                                            <TableCell align="left" sx={{ backgroundColor: '#F0F1F7' }}>
                                                聯絡電話
                                            </TableCell>
                                            <TableCell align="left" sx={{ backgroundColor: '#F0F1F7' }}>

                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {detailData.order_list.map((row) => (
                                            <TableRow key={row.name} sx={{ border: 0 }}>
                                                <TableCell align="left">{row.id}</TableCell>
                                                <TableCell align="left">${row.total}</TableCell>
                                                <TableCell align="left">{row.date}</TableCell>
                                                <TableCell align="left">{row.payment}</TableCell>
                                                <TableCell align="left">{row.name}</TableCell>
                                                <TableCell align="left">{row.email}</TableCell>
                                                <TableCell align="left">{row.phone}</TableCell>
                                                <TableCell onClick={() => getData(row.id)} align="left" sx={{ color: '#8C9EFF', fontWeight: '700' }}>查看詳細</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box
                                sx={{
                                    display: 'flex',
                                    fontSize: 12,
                                    color: '#8c9eff',
                                    mt: '60px',
                                    mb: '20px',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box>
                                    顯示
                                    {detailData.order_list && detailData.order_list.length !== 0 ? detailData.order_list.length : 0}
                                    筆資料中的
                                    {detailData.order_list && detailData.order_list.length !== 0 ? 1 + SubPageLimit * (SubPageNumber - 1) : 0}
                                    到
                                    {detailData.order_list && detailData.order_list.length !== 0 ? SubPageLimit * (SubPageNumber - 1) + detailData.order_list.length : ""}筆資料
                                </Box>
                                <Box>
                                    <Pagination
                                        count={Number(detailData.order_list && detailData.order_list.length !== 0 ? detailData.order_list.length : 0)}
                                        variant="outlined"
                                        shape="rounded"
                                        page={orderPageNumber}
                                        onChange={handleOrderPageChange}
                                    />
                                </Box>
                            </Box>
                        </>
                    )}
                </StyledFlexBox>
            </DialogContent> :
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
                            訂單編號 {orderData.member_order_id && orderData.member_order_id}
                        </StyledFlexBox>
                        <StyledFlexBox mb={16} color="#7c7c7c">
                            於 {/*orderData.data.substr(0, 8)*/} 付款
                        </StyledFlexBox>
                        <StyledFlexBox mb={16} fontWeight={500}>
                            付款金額：${orderData.total && numberWithCommas(orderData.total)}
                        </StyledFlexBox>
                        <StyledFlexBox mb={16} fontWeight={500}>
                            付款方式：{orderData.payment && orderData.payment}
                        </StyledFlexBox>
                        <StyledFlexBox mb={16} fontWeight={500}>
                            會員姓名：{orderData.member_name && orderData.member_name}
                        </StyledFlexBox>
                        <StyledFlexBox mb={16} fontWeight={500}>
                            會員編號：{orderData.member_id && orderData.member_id}
                        </StyledFlexBox>
                        <StyledFlexBox mb={16} fontWeight={500}>
                            發票開立方式：{orderData.invoice_type && orderData.invoice_type}
                        </StyledFlexBox>
                        <StyledFlexBox mb={16} fontWeight={500}>
                            發票編號：{orderData.invoice_type && orderData.invoice_type}
                        </StyledFlexBox>
                        {/* divider */}
                        <StyledFlexBox width="100%" height="1px" bg="#e9e9e9" my={24} />
                        <StyledFlexBox mb={16} color="#7c7c7c" fontSize={16}>
                            收件人資訊
                        </StyledFlexBox>
                        <StyledFlexBox mb={16} fontWeight={500}>
                            姓名：{orderData.delivery_name && orderData.delivery_name}
                        </StyledFlexBox>
                        <StyledFlexBox mb={16} fontWeight={500}>
                            Email：{orderData.delivery_email && orderData.delivery_email}
                        </StyledFlexBox>
                        <StyledFlexBox mb={16} fontWeight={500}>
                            聯絡電話：{orderData.delivery_phone && orderData.delivery_phone}
                        </StyledFlexBox>
                        <StyledFlexBox mb={16} fontWeight={500}>
                            配送方式：{orderData.delivery_method && orderData.delivery_method}
                        </StyledFlexBox>
                        <StyledFlexBox mb={16} fontWeight={500}>
                            收件地址：{orderData.delivery_address && orderData.delivery_address}
                        </StyledFlexBox>
                        {orderData?.dealers &&
                            orderData.dealers?.map((dealer, index) => (
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

export default MemberDetail;