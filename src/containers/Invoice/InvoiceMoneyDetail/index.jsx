import { Dialog, DialogActions, DialogContent, Grid } from '@mui/material';

import { Box, Button, OutlinedInput, Select, MenuItem, Checkbox } from '@mui/material';
import { useState } from 'react';
import { useRef, useEffect } from 'react';

import { StyledFlexBox, StyledImage, StyledText } from '../../../styles/Shared.styles';
import { Link, useNavigate } from "react-router-dom";
import { fetchRequestPaymentAccountModify, fetchRequestPaymentAccountData } from "../../../api/RequestPaymentAccount";

import { left } from 'styled-system';


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

const InvoiceMoneyDetail = ({ setSuccessToast, open, setDetailOpen, detailId, DetailMoneyUser, DetailMoneyMoney, DetailMoneyOpen }) => {
    const handleClose = () => {
        setDetailOpen(false);
    };
    const navigate = useNavigate();

    const descriptionElementRef = useRef(null);
    const [detailData, setDetailData] = useState({});


    const change = () => {

        fetchRequestPaymentAccountModify({ request_status: "CHECK", id: detailId }).then((data) => {

            setDetailOpen(false);
            setSuccessToast(true)
        });

    }
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
                <StyledFlexBox
                    pt={20}
                    px={56}
                    flexDirection="column"
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    <StyledFlexBox color='#8C9EFF' xs={12} justifyContent="center" style={{ fontSize: '16px', fontWeight: '700' }}>
                        確認已撥款到經銷商的帳戶嗎？
                    </StyledFlexBox>
                    <StyledFlexBox mt={4} xs={12} pb={4} justifyContent="left" style={{ fontSize: '14px', maxWidth: "400px", lineHeight: "24px" }}>

                        確定後，系統將通知「{DetailMoneyUser}」你已將訂單編號「{detailId}」的款項 ${DetailMoneyMoney} 元撥款至其帳戶。
                    </StyledFlexBox>
                    <StyledFlexBox mt={4} xs={12} pb={4} justifyContent="left" style={{ fontSize: '14px', maxWidth: "400px", lineHeight: "24px" }}>

                        <Button style={{ marginLeft: "20px", marginRight: "20px", backgroundColor: "#FFFFFF", border: "1px solid #A7A7A7", color: "#A7A7A7" }} variant="contained" onClick={() => setDetailOpen(false)}
                        >取消</Button>


                        <Button variant="contained" sx={{ backgroundColor: "#8C9EFF", ml: "24px", width: "40%" }} onClick={() => change()} >確定新增
                        </Button>

                    </StyledFlexBox>

                </StyledFlexBox>
            </DialogContent>
        </Dialog>
    );
};

export default InvoiceMoneyDetail;