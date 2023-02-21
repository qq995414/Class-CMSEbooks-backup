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
import { fetchUserGroupList, modifyUserList, featchUserData } from "../../../api/User";

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

const SettingsEditorDetail = ({ open, setDetailOpen, detailId }) => {
    const handleClose = () => {
        setDetailOpen(false);
    };
    const navigate = useNavigate();

    const descriptionElementRef = useRef(null);
    const [detailData, setDetailData] = useState({});
    const image = detailData?.image_file || [];
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [groupUser, setGroupUser] = useState("");
    const [groupUserId, setGroupUserId] = useState("");
    const [name, setName] = useState("");
    const [SelectList, setSelectList] = useState([]);
    const [dataId, setDataId] = useState("");

    useEffect(() => {
        fetchUserGroupList({

        }).then(({ data }) => {
            setSelectList(data.data)
        });

        featchUserData({
            id: detailId
        }).then((data) => {
            setEmail(data.data[0].email)
            setName(data.data[0].name)
            setDataId(data.data[0].id)
            setGroupUser(data.data[0].user_group_name)
            setGroupUserId(data.data[0].user_group_id)
        });


    }, [detailId]);
    /*
       useEffect(() => {
           if (open) {
               fetchMemberData({ id: detailId }).then((res) => {
                   setDetailData(res.data[0]);
                   console.log('res', res);
               });
           }
           console.log("open")
       }, [open]);*/
    const add = () => {

        const payload = {
            name: name,
            email: email,
            user_group: groupUserId,
            id: detailId
        };
        modifyUserList(payload).then(({ header }) => {
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

            </DialogActions>
            <DialogContent dividers={scroll === 'paper'} sx={{ p: '0' }}>
                <StyledFlexBox
                    pt={20}
                    px={56}
                    flexDirection="column"
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    <StyledFlexBox xs={12} justifyContent="left" style={{ fontSize: '16px', fontWeight: '700' }}>
                        編輯經銷商
                    </StyledFlexBox>
                    <StyledFlexBox flexDirection="column" mr={75}>
                        <StyledFlexBox color="#505050" fontWeight={500} mb="8px" mt={20}>
                            <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                            名稱
                        </StyledFlexBox>
                        <StyledFlexBox color="#505050" alignItems="center">
                            <OutlinedInput
                                value={name}
                                placeholder="請輸入帳戶名稱"
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
                            帳號
                        </StyledFlexBox>
                        <StyledFlexBox color="#505050" alignItems="center">
                            <OutlinedInput
                                value={email}
                                placeholder="請輸入Email"
                                onChange={(e) => setEmail(e.target.value)}
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
                            權限
                        </StyledFlexBox>
                        <StyledFlexBox color="#505050" alignItems="center">
                            <Select
                                displayEmpty
                                value={groupUserId}
                                onChange={(e) => setGroupUserId(e.target.value)}
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
                                {SelectList.map((option) => (
                                    <MenuItem key={option.name} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </Select>

                        </StyledFlexBox>
                    </StyledFlexBox>
                    <StyledFlexBox pt={40} px={10} pb={20} cursor="pointer" justifyContent="space-between">
                        <Button style={{ marginLeft: "20px", marginRight: "20px", backgroundColor: "#FFFFFF", border: "1px solid #A7A7A7", color: "#A7A7A7" }} variant="contained" onClick={() => setDetailOpen(false)}
                        >取消</Button>

                        <Button style={{ marginLeft: "20px", marginRight: "20px" }} variant="contained" onClick={() => add()}
                        >確定修改</Button>


                    </StyledFlexBox>
                </StyledFlexBox>
            </DialogContent>
        </Dialog >
    );
};

export default SettingsEditorDetail;