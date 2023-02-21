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
import { fetchUserGroupData, modifyUserList, ModifyUserGroup } from "../../../api/User";



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

const SettingsEditorUser = ({ open, setDetailOpen, detailId }) => {
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
    const [groupData, setGroupData] = useState([]);
    const [name, setName] = useState("");
    const [SelectList, setSelectList] = useState([]);

    useEffect(() => {
        fetchUserGroupData({
            id: detailId
        }).then(({ data }) => {
            console.log(data, "gogo")
        });
    }, []);
    useEffect(() => {
        fetchUserGroupData({
            id: detailId
        }).then(({ data }) => {
            setName(data[0].name)
        });
    }, [detailId]);
    /*
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
            permission: groupData,
            name: name,
            id: detailId

        };
        ModifyUserGroup(payload).then(({ header }) => {
            setDetailOpen(false)
        });

    }

    const addArray = (data, checked) => {
        if (checked === true) {
            groupData.push(data)
            console.log(groupData)

        } else {
            groupData.map((show, Index) => {
                if (data === show)
                    groupData.splice(Index, 1)
            })
        }
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
                        修改權限
                    </StyledFlexBox>
                    <StyledFlexBox flexDirection="column" mr={75}>
                        <StyledFlexBox color="#505050" fontWeight={500} mb="8px" mt={20}>
                            <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                            角色
                        </StyledFlexBox>
                        <StyledFlexBox color="#505050" alignItems="center">
                            <OutlinedInput
                                value={name}
                                placeholder="請輸入角色名稱"
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                sx={{
                                    height: "40px",
                                    width: "250px",
                                    border: "1px solid #E9E9E9",
                                }}
                            />
                        </StyledFlexBox>
                    </StyledFlexBox>
                    <StyledFlexBox flexDirection="column" mr={75}>
                        <StyledFlexBox color="#505050" fontWeight={500} mb="8px" mt={20}>
                            <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                            總後台權限
                        </StyledFlexBox>
                        <StyledFlexBox justifyContent="space-between">
                            <StyledFlexBox width={"50%"} color="#505050" alignItems="center">
                                <Checkbox
                                    sx={{
                                        color: "#8C9EFF",
                                        "&.Mui-checked": {
                                            color: "#8C9EFF",
                                        },
                                    }}
                                    onClick={(e) => { addArray("PORTAL_OVERVIEW", e.target.checked) }}
                                />總覽
                            </StyledFlexBox>
                            <StyledFlexBox width={"50%"} color="#505050" alignItems="center">
                                <Checkbox
                                    sx={{
                                        color: "#8C9EFF",
                                        "&.Mui-checked": {
                                            color: "#8C9EFF",
                                        },
                                    }}
                                    onClick={(e) => { addArray("PORTAL_BOOK", e.target.checked) }}
                                />圖書管理
                            </StyledFlexBox>
                        </StyledFlexBox>
                        <StyledFlexBox justifyContent="space-between">
                            <StyledFlexBox width={"50%"} color="#505050" alignItems="center">
                                <Checkbox
                                    sx={{
                                        color: "#8C9EFF",
                                        "&.Mui-checked": {
                                            color: "#8C9EFF",
                                        },
                                    }}
                                    onClick={(e) => { addArray("PORTAL_BOOK_TYPE", e.target.checked) }}
                                />圖書分類設定
                            </StyledFlexBox>
                            <StyledFlexBox width={"50%"} color="#505050" alignItems="center">
                                <Checkbox
                                    sx={{
                                        color: "#8C9EFF",
                                        "&.Mui-checked": {
                                            color: "#8C9EFF",
                                        },
                                    }}
                                    onClick={(e) => { addArray("PORTAL_OPEN", e.target.checked) }}
                                />教材開放設定
                            </StyledFlexBox>
                        </StyledFlexBox>
                        <StyledFlexBox justifyContent="space-between">
                            <StyledFlexBox width={"50%"} color="#505050" alignItems="center">
                                <Checkbox
                                    sx={{
                                        color: "#8C9EFF",
                                        "&.Mui-checked": {
                                            color: "#8C9EFF",
                                        },
                                    }}
                                    onClick={(e) => { addArray("PORTAL_MEMBER", e.target.checked) }}
                                />會員管理
                            </StyledFlexBox>
                            <StyledFlexBox width={"50%"} color="#505050" alignItems="center">
                                <Checkbox
                                    sx={{
                                        color: "#8C9EFF",
                                        "&.Mui-checked": {
                                            color: "#8C9EFF",
                                        },
                                    }}
                                    onClick={(e) => { addArray("PORTAL_SUBSCRIPTION", e.target.checked) }}
                                />訂閱付款管理
                            </StyledFlexBox>
                        </StyledFlexBox>
                        <StyledFlexBox justifyContent="space-between">
                            <StyledFlexBox width={"50%"} color="#505050" alignItems="center">
                                <Checkbox
                                    sx={{
                                        color: "#8C9EFF",
                                        "&.Mui-checked": {
                                            color: "#8C9EFF",
                                        },
                                    }}
                                    onClick={(e) => { addArray("PORTAL_BUY", e.target.checked) }}
                                />購買訂單管理
                            </StyledFlexBox>
                            <StyledFlexBox width={"50%"} color="#505050" alignItems="center">
                                <Checkbox
                                    sx={{
                                        color: "#8C9EFF",
                                        "&.Mui-checked": {
                                            color: "#8C9EFF",
                                        },
                                    }}
                                    onClick={(e) => { addArray("PORTAL_PAYMENT", e.target.checked) }}
                                />請款申請管理
                            </StyledFlexBox>
                        </StyledFlexBox>
                        <StyledFlexBox justifyContent="space-between">
                            <StyledFlexBox width={"50%"} color="#505050" alignItems="center">
                                <Checkbox
                                    sx={{
                                        color: "#8C9EFF",
                                        "&.Mui-checked": {
                                            color: "#8C9EFF",
                                        },
                                    }}
                                    onClick={(e) => { addArray("PORTAL_NEWS", e.target.checked) }}
                                />消息管理
                            </StyledFlexBox>
                            <StyledFlexBox width={"50%"} color="#505050" alignItems="center">
                                <Checkbox
                                    sx={{
                                        color: "#8C9EFF",
                                        "&.Mui-checked": {
                                            color: "#8C9EFF",
                                        },
                                    }}
                                    onClick={(e) => { addArray("PORTAL_COUPON", e.target.checked) }}
                                />優惠券管理
                            </StyledFlexBox>
                        </StyledFlexBox>
                        <StyledFlexBox justifyContent="space-between">
                            <StyledFlexBox width={"50%"} color="#505050" alignItems="center">
                                <Checkbox
                                    sx={{
                                        color: "#8C9EFF",
                                        "&.Mui-checked": {
                                            color: "#8C9EFF",
                                        },
                                    }}
                                    onClick={(e) => { addArray("PORTAL_DEALER_COUPON", e.target.checked) }}
                                />經銷商優惠
                            </StyledFlexBox>
                            <StyledFlexBox width={"50%"} color="#505050" alignItems="center">
                                <Checkbox
                                    sx={{
                                        color: "#8C9EFF",
                                        "&.Mui-checked": {
                                            color: "#8C9EFF",
                                        },
                                    }}
                                    onClick={(e) => { addArray("PORTAL_MANAGE", e.target.checked) }}
                                />後台管理設定
                            </StyledFlexBox>
                        </StyledFlexBox>

                    </StyledFlexBox>

                    <StyledFlexBox pt={40} px={10} pb={20} cursor="pointer" justifyContent="space-between">
                        <Button style={{ marginLeft: "10px", marginRight: "10px", backgroundColor: "#FFFFFF", border: "1px solid #A7A7A7", color: "#A7A7A7" }} variant="contained" onClick={() => setDetailOpen(false)}
                        >取消</Button>

                        <Button style={{ marginLeft: "10px", marginRight: "10px" }} variant="contained" onClick={() => add()}
                        >確定修改</Button>


                    </StyledFlexBox>
                </StyledFlexBox>
            </DialogContent>
        </Dialog >
    );
};

export default SettingsEditorUser;