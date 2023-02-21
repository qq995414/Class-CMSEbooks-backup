import { Dialog, DialogActions, DialogContent, Grid, Alert, Snackbar } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, OutlinedInput, Select, MenuItem, Checkbox } from '@mui/material';
import { useState } from 'react';
import { useRef, useEffect } from 'react';

import { StyledFlexBox, StyledImage, StyledText } from '../../../styles/Shared.styles';
import { numberWithCommas } from '../../../utils/util';
import { Link, useNavigate } from "react-router-dom";
import { fetchCouponData } from "../../../api/Coupon";
import { left } from 'styled-system';
import { fetchSubDealerSelect, ModifyDealer, fetchDealerData } from "../../../api/Dealer";


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

const DealerEditorDetail = ({ open, setDetailOpen, detailId }) => {
    const handleClose = () => {
        setDetailOpen(false);
    };
    const navigate = useNavigate();

    const descriptionElementRef = useRef(null);
    const [detailData, setDetailData] = useState({});
    const image = detailData?.image_file || [];
    const [selected, setSelected] = useState('detail');
    const [checkType, setcheckType] = useState(0);
    const [subDealer, setSubDealer] = useState([]);
    const [subDealerData, setSubDealerData] = useState([]);
    const [code, setCode] = useState("");
    const [quantity, setQuantity] = useState("");
    const [discount, setDiscount] = useState("");
    const [isFirst, setisFirst] = useState(false);
    const [isLimit, setIsLimit] = useState(false);
    const [spendLimit, setspendLimit] = useState(0);
    const [endData, setEndData] = useState("");
    const [remark, setRemark] = useState("");
    const [getData, setGetData] = useState("");
    const [successToast, setSuccessToast] = useState(false);
    const [AlertMessage, setAlertMessage] = useState("");
    const [AlertState, setAlerState] = useState("");
    useEffect(() => {

    }, []);

    useEffect(() => {
        if (open) {
            fetchSubDealerSelect({

            }).then(({ data }) => {
                console.log(data, "data")
                setSubDealerData(data)
            });

            fetchDealerData({ id: detailId }).then((res) => {
                console.log(res.data, "res")
                setCode(res.data[0].code)
                setQuantity(res.data[0].quantity)
                setDiscount(res.data[0].discount)
                setisFirst(res.data[0].is_first_purchase_only)
                setspendLimit(res.data[0].spend_limit)
                setEndData(res.data[0].expiry_date.replaceAll('/', '-'))
                setRemark(res.data[0].remark)
            });
        }
        console.log("open")
    }, [open]);
    const add = () => {
        if (isLimit === false) {
            setspendLimit(0)
        }
        const payload = {
            id: detailId,
            dealer_id: subDealer,
            code: code,
            quantity: quantity,
            discount: (discount / 100),
            is_first_purchase_only: isFirst,
            spend_limit: spendLimit,
            expiry_date: endData.replaceAll('-', '/'),
            remark: remark
        };


        ModifyDealer(payload).then(({ data }) => {
            if (data.header.code === 1) {
                setAlertMessage(data.header.message)
                setAlerState("error")
            } else {
                setAlertMessage("成功修改優惠卷")
                setAlerState("success")
            }
            setSuccessToast(true)
            setTimeout(() => {
                setDetailOpen(false)
            }, 2000);
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

            </DialogActions>
            <DialogContent dividers={scroll === 'paper'} sx={{ p: '0' }}>
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={successToast}
                    autoHideDuration={3000}
                    onClose={() => setSuccessToast(false)}
                >
                    <Alert severity={AlertState} sx={{ width: "100%" }}>
                        {AlertMessage}
                    </Alert>
                </Snackbar>
                <StyledFlexBox
                    pt={20}
                    px={56}
                    flexDirection="column"
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    <StyledFlexBox xs={12} justifyContent="left" style={{ fontSize: '16px', fontWeight: '700' }}>
                        新增經銷商
                    </StyledFlexBox>
                    <StyledFlexBox flexDirection="column" mr={75}>
                        <StyledFlexBox color="#505050" fontWeight={500} mb="8px" mt={20}>
                            <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                            經銷商
                        </StyledFlexBox>
                        <StyledFlexBox color="#505050" alignItems="center">
                            <Select
                                displayEmpty
                                value={subDealer}
                                onChange={(e) => setSubDealer(e.target.value)}
                                variant="outlined"
                                inputProps={{ "aria-label": "Without label" }}
                                sx={{
                                    fontSize: 14,
                                    height: 40,
                                    width: "100%",
                                    color: "#505050",
                                    border: "1px solid #E9E9E9",
                                }}
                            >
                                <MenuItem disabled value="">
                                    <em>請選擇經銷商</em>
                                </MenuItem>
                                {subDealerData.map((option) => (
                                    <MenuItem key={option.name} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </StyledFlexBox>
                    </StyledFlexBox>
                    <StyledFlexBox flexDirection="column" mr={75}>
                        <StyledFlexBox color="#505050" fontWeight={500} mb="8px" mt={20}>
                            <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                            優惠碼
                        </StyledFlexBox>
                        <StyledFlexBox color="#505050" alignItems="center">
                            <OutlinedInput
                                value={code}
                                placeholder="請輸入優惠碼"
                                onChange={(e) => setCode(e.target.value)}
                                type="text"
                                sx={{
                                    height: "40px",
                                    width: "350px",
                                    border: "1px solid #E9E9E9",
                                }}
                            />
                        </StyledFlexBox>
                    </StyledFlexBox>
                    <StyledFlexBox flexDirection="column" mr={75}>
                        <StyledFlexBox color="#505050" fontWeight={500} mb="8px" mt={20}>
                            <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                            優惠券數量
                        </StyledFlexBox>
                        <StyledFlexBox color="#505050" alignItems="center">
                            <OutlinedInput
                                value={quantity}
                                placeholder="請輸入數量"
                                onChange={(e) => setQuantity(e.target.value)}
                                type="text"
                                sx={{
                                    height: "40px",
                                    width: "350px",
                                    border: "1px solid #E9E9E9",
                                }}
                            />
                        </StyledFlexBox>
                    </StyledFlexBox>
                    <StyledFlexBox flexDirection="column" mr={75}>
                        <StyledFlexBox color="#505050" fontWeight={500} mb="8px" mt={20}>
                            <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                            折扣百分比
                        </StyledFlexBox>
                        <StyledFlexBox color="#505050" alignItems="center">
                            <OutlinedInput
                                value={discount}
                                placeholder="請輸入1-100"
                                onChange={(e) => setDiscount(e.target.value)}
                                type="text"
                                sx={{
                                    height: "40px",
                                    width: "350px",
                                    border: "1px solid #E9E9E9",
                                }}
                            />
                        </StyledFlexBox>
                    </StyledFlexBox>
                    <StyledFlexBox flexDirection="column" mr={75}>
                        <StyledFlexBox color="#505050" fontWeight={500} mb="8px" mt={20}>
                            <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                            使用限制
                        </StyledFlexBox>
                        <StyledFlexBox color="#505050" alignItems="center">
                            <Checkbox
                                checked={isFirst}
                                sx={{
                                    color: "#8C9EFF",
                                    "&.Mui-checked": {
                                        color: "#8C9EFF",
                                    },
                                }}
                                onClick={(e) => setisFirst(e.target.checked)}
                            /><StyledText>僅限首次購買
                            </StyledText>
                        </StyledFlexBox>
                        <StyledFlexBox color="#505050" alignItems="center">
                            <Checkbox
                                checked={isLimit}
                                sx={{
                                    color: "#8C9EFF",
                                    "&.Mui-checked": {
                                        color: "#8C9EFF",
                                    },
                                }}
                                onClick={(e) => setIsLimit(e.target.checked)}
                            /><StyledText>滿額限制：</StyledText>
                            <OutlinedInput
                                value={spendLimit}
                                placeholder="金額"
                                onChange={(e) => setspendLimit(e.target.value)}
                                type="text"
                                sx={{
                                    marginLeft: "0.5rem",
                                    height: "40px",
                                    width: "100px",
                                    border: "1px solid #E9E9E9",
                                }}
                            />
                            <StyledText>
                                元
                            </StyledText>
                            <StyledText ml={2}>
                                以上才可使用
                            </StyledText>
                        </StyledFlexBox>
                    </StyledFlexBox>
                    <StyledFlexBox flexDirection="column" mr={75}>
                        <StyledFlexBox color="#505050" fontWeight={500} mb="8px" mt={20}>
                            <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                            合作到期日
                        </StyledFlexBox>
                        <StyledFlexBox color="#505050" alignItems="center">
                            <OutlinedInput
                                value={endData}
                                placeholder="2022/06/04"
                                onChange={(e) => setEndData(e.target.value)}
                                type="date"
                                sx={{
                                    height: "40px",
                                    width: "350px",
                                    border: "1px solid #E9E9E9",
                                }}
                            />
                        </StyledFlexBox>
                    </StyledFlexBox>
                    <StyledFlexBox flexDirection="column" mr={75}>
                        <StyledFlexBox color="#505050" fontWeight={500} mb="8px" mt={20}>
                            <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                            備註
                        </StyledFlexBox>
                        <StyledFlexBox color="#505050" alignItems="center">
                            <OutlinedInput
                                value={remark}
                                placeholder="請輸入備註"
                                onChange={(e) => setRemark(e.target.value)}
                                type="text"
                                sx={{
                                    height: "40px",
                                    width: "350px",
                                    border: "1px solid #E9E9E9",
                                }}
                            />
                        </StyledFlexBox>
                    </StyledFlexBox>
                    <StyledFlexBox pt={40} px={10} pb={20} cursor="pointer" justifyContent="space-between">
                        <Button style={{ marginLeft: "20px", marginRight: "20px", backgroundColor: "#FFFFFF", border: "1px solid #A7A7A7", color: "#A7A7A7" }} variant="contained" onClick={() => setDetailOpen(false)}
                        >取消</Button>

                        <Button style={{ marginLeft: "20px", marginRight: "20px" }} variant="contained" onClick={() => add()}
                        >確定新增</Button>


                    </StyledFlexBox>
                </StyledFlexBox>
            </DialogContent>
        </Dialog>
    );
};

export default DealerEditorDetail;