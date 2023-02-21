import { Dialog, DialogActions, DialogContent, Grid } from '@mui/material';

import { Box, Button, OutlinedInput, Select, MenuItem, Checkbox } from '@mui/material';
import { useState } from 'react';
import { useRef, useEffect } from 'react';

import { StyledFlexBox, StyledImage, StyledText } from '../../../styles/Shared.styles';
import { Link, useNavigate } from "react-router-dom";
import { fetchRequestPaymentAccountData } from "../../../api/RequestPaymentAccount";

import { left } from 'styled-system';
import { UPLOAD_URL } from "../../../constants";


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

const InvoiceDetail = ({ open, setDetailOpen, detailId }) => {
    const handleClose = () => {
        setDetailOpen(false);
    };
    const navigate = useNavigate();

    const descriptionElementRef = useRef(null);
    const [detailData, setDetailData] = useState([]);


    useEffect(() => {

    }, []);

    useEffect(() => {
        if (open) {
            fetchRequestPaymentAccountData({ id: detailId }).then((res) => {
                setDetailData(res.data[0]);
                console.log(res.data)
            });
        }
        console.log("open")
    }, [open]);

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
            <DialogContent dividers={scroll === 'paper'} sx={{ paddingBottom: "2rem" }}>
                {detailData !== [] ?
                    <StyledFlexBox
                        pt={20}
                        px={56}
                        flexDirection="column"
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <StyledFlexBox xs={12} justifyContent="left" style={{ fontSize: '28px', fontWeight: '700', minWidth: "700px" }}>
                            訂單編號 {detailData.order_id}
                        </StyledFlexBox>
                        <StyledFlexBox bg={"#F6F6F6"} mt={4} xs={12} pb={4} justifyContent="left" style={{ fontSize: '16px' }}>
                            <div>
                                <StyledFlexBox pl={4} pt={4} xs={12} justifyContent="left" color='#7C7C7C' style={{ fontSize: '16px' }}>
                                    {detailData.request_status}
                                </StyledFlexBox>
                                <StyledFlexBox pl={4} pt={4} xs={12} justifyContent="left" color='#505050' style={{ fontSize: '16px' }}>
                                    經銷商：{detailData.request_status}
                                </StyledFlexBox>
                                <StyledFlexBox pl={4} pt={4} xs={12} justifyContent="left" color='#505050' style={{ fontSize: '16px' }}>
                                    請款日期：{detailData.request_date && detailData.request_date.substr(0, 10)}
                                </StyledFlexBox>
                                <StyledFlexBox pl={4} pt={4} xs={12} justifyContent="left" color='#505050' style={{ fontSize: '16px' }}>
                                    銀行代號： {detailData.bank_code}
                                </StyledFlexBox>
                                <StyledFlexBox pl={4} pt={4} xs={12} justifyContent="left" color='#505050' style={{ fontSize: '16px' }}>
                                    銀行帳號：{detailData.bank_account && detailData.bank_account.substr(0, 3)}****{detailData.bank_account && detailData.bank_account.substr(4, 50)}
                                </StyledFlexBox>
                            </div>

                        </StyledFlexBox>
                        <div>
                            <StyledFlexBox pl={4} pt={4} xs={12} justifyContent="left" color='#7C7C7C' style={{ fontSize: '16px' }}>
                                {detailData.request_status}
                            </StyledFlexBox>
                            <StyledFlexBox pl={4} pt={4} xs={12} justifyContent="left" color='#505050' style={{ fontSize: '16px' }}>
                                姓名：{detailData.delivery_name}
                            </StyledFlexBox>
                            <StyledFlexBox pl={4} pt={4} xs={12} justifyContent="left" color='#505050' style={{ fontSize: '16px' }}>
                                Email：{detailData.delivery_email}
                            </StyledFlexBox>
                            <StyledFlexBox pl={4} pt={4} xs={12} justifyContent="left" color='#505050' style={{ fontSize: '16px' }}>
                                聯絡電話：{detailData.delivery_phone}
                            </StyledFlexBox>
                            <StyledFlexBox pl={4} pt={4} xs={12} justifyContent="left" color='#505050' style={{ fontSize: '16px' }}>
                                配送方式：{detailData.delivery_method}
                            </StyledFlexBox>
                            <StyledFlexBox pl={4} pt={4} xs={12} justifyContent="left" color='#505050' style={{ fontSize: '16px' }}>
                                收件地址：{detailData.delivery_address}
                            </StyledFlexBox>
                        </div>
                        <StyledFlexBox mt={4} py={12} px={25} ml={20} color="#505050" fontSize={16} border="1px solid #E9E9E9"
                        >
                            <StyledFlexBox width={"40%"} justifyContent="center">
                                商品
                            </StyledFlexBox>
                            <StyledFlexBox width={"20%"} justifyContent="center">
                                價格
                            </StyledFlexBox>
                            <StyledFlexBox width={"20%"} justifyContent="center">
                                數量
                            </StyledFlexBox>
                            <StyledFlexBox width={"20%"} justifyContent="center">
                                小計
                            </StyledFlexBox>
                        </StyledFlexBox>
                        {detailData.books && detailData.books.map((books) => {
                            console.log(books)
                            return (<>
                                <StyledFlexBox py={12} px={25} ml={20} color="#505050" fontSize={16} border="1px solid #E9E9E9" alignItems="center"
                                >
                                    <StyledFlexBox width={"15%"} justifyContent="center">
                                        <img src={UPLOAD_URL + books.image} style={{ height: "100px" }} alt="" />
                                    </StyledFlexBox>
                                    <StyledFlexBox width={"25%"} justifyContent="left">
                                        {books.book_name}
                                    </StyledFlexBox>
                                    <StyledFlexBox width={"20%"} justifyContent="center">
                                        ${parseInt(books.book_price)}

                                    </StyledFlexBox>
                                    <StyledFlexBox width={"20%"} justifyContent="center">
                                        {books.quantity}
                                    </StyledFlexBox>
                                    <StyledFlexBox width={"20%"} justifyContent="center">
                                        {books.quantity * books.book_price}

                                    </StyledFlexBox>

                                </StyledFlexBox>

                            </>)
                        })}
                    </StyledFlexBox> : ""}
            </DialogContent>
        </Dialog>
    );
};

export default InvoiceDetail;