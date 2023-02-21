import { Dialog, DialogActions, DialogContent, Grid } from '@mui/material';
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
import { fetchSubDealerData, ModifySubDealerData } from "../../../api/SubDealer";
import { DeleteSubDealer } from "../../../api/data";
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

const DealerEditorDetail = ({ open, setDetailOpen, detailId, setAlertMessage, setSuccessToast }) => {
    const handleClose = () => {
        setDetailOpen(false);
        setMail(false)

    };
    const navigate = useNavigate();

    const descriptionElementRef = useRef(null);
    const [selected, setSelected] = useState('detail');
    const [dataId, setDataId] = useState("");
    const [name, setName] = useState("");
    const [account, setAccount] = useState("");
    const [remark, setRemark] = useState("");
    const [mail, setMail] = useState(true);
    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        getData(detailId)
    }, []);
    useEffect(() => {
        getData(detailId)
    }, [detailId]);
    const getData = (id) => {

        fetchSubDealerData({ id: id }).then(({ data }) => {
            setDataId(data[0].id)
            setName(data[0].name)
            setAccount(data[0].email)
            setRemark(data[0].remark)
        });
        console.log(id, "id")
    }
    const add = () => {
        if (!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(account))) {
            setMail(false)
        } else {
            const payload = {
                id: dataId,
                name: name,
                email: account,
                remark: remark
            };
            ModifySubDealerData(payload).then(({ header }) => {
                setDetailOpen(false)
                setAlertMessage("已編輯「" + name + "」的帳號")
                setSuccessToast(true)
            })
        }
    }
    const Delete = () => {

        DeleteSubDealer({ id: dataId }).then(({ header }) => {
            setDetailOpen(false)
            setAlertMessage("已刪除「" + name + "」的帳號")
            setSuccessToast(true)
            setDeleteModal(false)
        })

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
                {!deleteModal ?
                    <StyledFlexBox
                        pt={20}
                        px={56}
                        flexDirection="column"
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                        maxWidth={"400px"}
                    >
                        <StyledFlexBox xs={12} justifyContent="space-between" style={{ fontSize: '16px', fontWeight: '700' }} >
                            編輯經銷商

                            <StyledImage width="20px" src="/images/icon-categoryuRemove.svg" onClick={() => { setDeleteModal(true) }}
                            />
                        </StyledFlexBox>

                        <StyledFlexBox flexDirection="column" >
                            <StyledFlexBox color="#505050" fontWeight={500} mb="8px" mt={20}>
                                <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                                經銷商名稱
                            </StyledFlexBox>

                            <StyledFlexBox color="#505050" alignItems="center">
                                <OutlinedInput
                                    value={name}
                                    placeholder="請輸入經銷商名稱"
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    sx={{
                                        height: "40px",
                                        width: "400px",
                                        border: "1px solid #E9E9E9",
                                    }}
                                />
                            </StyledFlexBox>
                        </StyledFlexBox>
                        <StyledFlexBox flexDirection="column">
                            <StyledFlexBox color="#505050" fontWeight={500} mb="8px" mt={20}>
                                <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                                帳號
                            </StyledFlexBox>
                            <StyledFlexBox color="#505050" alignItems="center">
                                <OutlinedInput
                                    value={account}
                                    placeholder="請輸入Email"
                                    onChange={(e) => setAccount(e.target.value)}
                                    type="text"
                                    sx={{
                                        height: "40px",
                                        width: "100%",
                                        border: "1px solid #E9E9E9",
                                    }}
                                />
                            </StyledFlexBox>

                        </StyledFlexBox>

                        <StyledFlexBox flexDirection="column">
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

                            <Button
                                disabled={!account || !name}
                                style={{ marginLeft: "20px", marginRight: "20px" }} variant="contained" onClick={() => add()}
                            >確定新增</Button>


                        </StyledFlexBox>
                    </StyledFlexBox> : <StyledFlexBox
                        pt={20}
                        px={56}
                        flexDirection="column"
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <StyledFlexBox xs={12} justifyContent="center" style={{ fontSize: '16px', fontWeight: '700', color: '#FB4A4A' }}>
                            是否刪除「{name}」經銷商？
                        </StyledFlexBox>
                        <StyledFlexBox pt={25} justifyContent="center" color='#7C7C7C' fontWeight="500">
                            確定刪除後將無法復原，是否仍執行此動作？
                        </StyledFlexBox>

                        <StyledFlexBox pt={40} px={10} pb={20} cursor="pointer">
                            <Button style={{ marginLeft: "20px", marginRight: "20px", backgroundColor: "#FFFFFF", border: "1px solid #A7A7A7", color: "#A7A7A7" }} variant="contained" onClick={() => { setDetailOpen(false), setDeleteModal(false) }}
                            >取消</Button>
                            <Button style={{ backgroundColor: "#FB4A4A", marginLeft: "20px", marginRight: "20px" }} variant="contained" onClick={() => Delete()}
                            >刪除</Button> :


                        </StyledFlexBox>
                    </StyledFlexBox>}

            </DialogContent>
        </Dialog >
    );
};

export default DealerEditorDetail;