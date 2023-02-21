import { Dialog, DialogActions, DialogContent, Alert, Snackbar } from '@mui/material';

import { Box, Button, OutlinedInput, Select, MenuItem, Checkbox } from '@mui/material';
import { useState } from 'react';
import { useRef, useEffect } from 'react';

import { StyledFlexBox, StyledImage, StyledText } from '../../../styles/Shared.styles';
import { numberWithCommas } from '../../../utils/util';
import { Link, useNavigate } from "react-router-dom";
import { left } from 'styled-system';
import { fetchCouponData } from "../../../api/Coupon";
import { ModifyCouponData } from "../../../api/Coupon";


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

const CouponEditorDetail = ({ open, setDetailOpen, detailId }) => {
    const handleClose = () => {
        setDetailOpen(false);
    };
    const navigate = useNavigate();

    const descriptionElementRef = useRef(null);
    const [detailData, setDetailData] = useState({});
    const image = detailData?.image_file || [];
    const [selected, setSelected] = useState('detail');
    const [name, setName] = useState("");
    const [subDealer, setSubDealer] = useState([]);
    const [quantityLimit, setQuantityLimit] = useState([]);
    const [code, setCode] = useState("");
    const [quantity, setQuantity] = useState("");
    const [isFirst, setisFirst] = useState(false);
    const [isLimit, setIsLimit] = useState(false);
    const [spendLimit, setspendLimit] = useState(0);
    const [endData, setEndData] = useState("");
    const [remark, setRemark] = useState("");
    const [discountMoneyCheck, setDiscountMoneyCheck] = useState(false);
    const [discountMoney, setDiscountMoney] = useState("");
    const [discountCheck, setDiscountCheck] = useState(false);
    const [discount, setDiscount] = useState("");
    const [dataId, setDataId] = useState("");
    const [successToast, setSuccessToast] = useState(false);
    const [AlertMessage, setAlertMessage] = useState("");
    const [AlertState, setAlerState] = useState("");
    const [discountApi, setDiscountApi] = useState("");



    useEffect(() => {

    }, []);

    useEffect(() => {
        setDataId("")
        setCode("")
        setQuantity("")
        setDiscount("")
        setisFirst("")
        setspendLimit("")
        setEndData("")
        setRemark("")
        setName("")
        setQuantityLimit("")
        fetchCouponData({ id: detailId }).then((res) => {
            console.log("res", res.data.data[0])
            setDataId(res.data.data[0].id)
            setCode(res.data.data[0].code)
            setQuantity(res.data.data[0].quantity)
            setDiscount(res.data.data[0].discount)
            if (res.data.data[0].discount > 1) {
                setDiscountMoneyCheck(true)
                setDiscountMoney(res.data.data[0].discount)
            } else {
                setDiscountCheck(true)
                setDiscount(res.data.data[0].discount * 100)
            }
            setisFirst(res.data.data[0].is_first_purchase_only)
            setspendLimit(res.data.data[0].spend_limit)
            setEndData(res.data.data[0].expiry_date.replaceAll('/', '-'))
            setRemark(res.data.data[0].remark)
            setName(res.data.data[0].name)
            setQuantityLimit(res.data.data[0].quantity_use_limit)
            if (res.data.data[0].spend_limit > 1) {
                setIsLimit(true)
            }
        });
    }, [open]);
    const add = () => {
        if (isLimit === false) {
            setspendLimit(0)
        }
        let payload = {}
        if (discountMoneyCheck === true) {
            payload = {
                id: detailId,
                code: code,
                name: name,
                quantity: quantity,
                discount: discountMoney,
                quantity_use_limit: quantityLimit,
                is_first_purchase_only: isFirst,
                spend_limit: spendLimit,
                expiry_date: endData.replaceAll('-', '/'),
                remark: remark
            };
        } else if (discountCheck === true) {
            payload = {
                id: detailId,
                code: code,
                name: name,
                quantity: quantity,
                discount: (discount / 100),
                quantity_use_limit: quantityLimit,
                is_first_purchase_only: isFirst,
                spend_limit: spendLimit,
                expiry_date: endData.replaceAll('-', '/'),
                remark: remark
            };
        }

        ModifyCouponData(payload).then(({ data }) => {
            if (data.header.code === 1) {
                setAlertMessage(data.header.message)
                setAlerState("error")
            } else {
                setAlertMessage("成功新增優惠卷")
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
                            名稱
                        </StyledFlexBox>
                        <StyledFlexBox color="#505050" alignItems="center">
                            <OutlinedInput
                                value={name}
                                placeholder="請輸入名稱"
                                onChange={(e) => setName(e.target.value)}
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
                                disabled={isFirst}

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
                            每人限用數量
                        </StyledFlexBox>
                        <StyledFlexBox color="#505050" alignItems="center">
                            <OutlinedInput
                                value={quantityLimit}
                                placeholder="請輸入數量"
                                onChange={(e) => setQuantityLimit(e.target.value)}
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
                            優惠內容
                        </StyledFlexBox>

                        <StyledFlexBox mt={10} color="#505050" alignItems="center">
                            <Checkbox
                                checked={discountMoneyCheck}
                                value={discountMoneyCheck}

                                sx={{
                                    color: "#8C9EFF",
                                    "&.Mui-checked": {
                                        color: "#8C9EFF",
                                    },
                                }}
                                onClick={(e) => { setDiscountMoneyCheck(true), setDiscountCheck(false) }}
                            /><StyledText mr={10}>折價

                            </StyledText>
                            <OutlinedInput
                                disabled={!discountMoneyCheck}

                                value={discountMoney}
                                placeholder="請輸入金額"
                                onChange={(e) => setDiscountMoney(e.target.value)}
                                type="text"
                                sx={{
                                    height: "40px",
                                    width: "280px",
                                    border: "1px solid #E9E9E9",
                                }}
                            />
                        </StyledFlexBox>
                        <StyledFlexBox mt={10} color="#505050" alignItems="center">
                            <Checkbox
                                checked={discountCheck}
                                value={discountCheck}
                                sx={{
                                    color: "#8C9EFF",
                                    "&.Mui-checked": {
                                        color: "#8C9EFF",
                                    },
                                }}
                                onClick={(e) => { setDiscountCheck(true), setDiscountMoneyCheck(false) }}
                            /><StyledText mr={10}> 折扣

                            </StyledText>
                            <OutlinedInput
                                disabled={!discountCheck}
                                value={discount}
                                placeholder="請輸入1-100"
                                onChange={(e) => setDiscount(e.target.value)}
                                type="text"
                                ml={10}
                                sx={{
                                    height: "40px",
                                    width: "260px",
                                    border: "1px solid #E9E9E9",
                                }}
                            />
                            <div style={{ marginLeft: "0.5rem" }}>%</div>
                        </StyledFlexBox>
                        <StyledFlexBox mt={10} ml={10} color="#A7A7A7" style={{ lineHeight: "20px" }} width={"350px"} alignItems="center">
                            註：折價為直接折抵相對應金額，折扣為商品價格折抵的比例(ex.80%代表商品價格*80%)
                        </StyledFlexBox>
                    </StyledFlexBox>

                    <StyledFlexBox flexDirection="column" mr={75}>
                        <StyledFlexBox color="#505050" fontWeight={500} mb="8px" mt={20}>
                            <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                            使用限制
                        </StyledFlexBox>
                        <StyledFlexBox color="#505050" alignItems="center">
                            {isFirst ?
                                <Checkbox
                                    checked={isFirst}
                                    value={isFirst}
                                    sx={{
                                        color: "#8C9EFF",
                                        "&.Mui-checked": {
                                            color: "#8C9EFF",
                                        },
                                    }}
                                    onClick={(e) => { setisFirst(false), setQuantityLimit(1) }}
                                /> :
                                <Checkbox
                                    checked={isFirst}
                                    value={isFirst}
                                    sx={{
                                        color: "#8C9EFF",
                                        "&.Mui-checked": {
                                            color: "#8C9EFF",
                                        },
                                    }}
                                    onClick={(e) => { setisFirst(true), setQuantityLimit(1) }}
                                />}
                            <StyledText>僅限首次購買
                            </StyledText>
                        </StyledFlexBox>
                        <StyledFlexBox color="#505050" alignItems="center">
                            {isLimit ? <Checkbox
                                checked={isLimit}
                                value={isLimit}

                                sx={{
                                    color: "#8C9EFF",
                                    "&.Mui-checked": {
                                        color: "#8C9EFF",
                                    },
                                }}
                                onClick={(e) => { setIsLimit(false) }}
                            />
                                :
                                <Checkbox
                                    checked={isLimit}
                                    value={isLimit}

                                    sx={{
                                        color: "#8C9EFF",
                                        "&.Mui-checked": {
                                            color: "#8C9EFF",
                                        },
                                    }}
                                    onClick={(e) => { setIsLimit(true) }}
                                />

                            }
                            <StyledText>滿額限制：</StyledText>
                            <OutlinedInput
                                value={spendLimit}
                                disabled={!isLimit}

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
                                placeholder="請輸入優惠碼"
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

export default CouponEditorDetail;