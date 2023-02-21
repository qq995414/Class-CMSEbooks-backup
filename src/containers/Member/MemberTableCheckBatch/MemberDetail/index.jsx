import { Dialog, DialogActions, DialogContent, Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Pagination, Stack } from '@mui/material';
import { useState } from 'react';
import { useRef, useEffect } from 'react';
import { fetchMemberData } from '../../../../api/User';
import { UPLOAD_URL } from '../../../../constants';
import { StyledFlexBox, StyledImage } from '../../../../styles/Shared.styles';
import { numberWithCommas } from '../../../../utils/util';

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

const MemberDetailCheck = ({ open, setDetailOpen, detailId }) => {
    const handleClose = () => {
        setDetailOpen(false);
    };
    const descriptionElementRef = useRef(null);
    const [detailData, setDetailData] = useState({});
    const image = detailData?.image_file || [];
    const [selected, setSelected] = useState('detail');

    useEffect(() => {
        if (open) {
            fetchMemberData({ id: detailId }).then((res) => {
                setDetailData(res.data[0]);
                console.log('res', res);
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
                <StyledFlexBox onClick={handleClose} p={10} cursor="pointer">
                    <StyledImage src="/images/icon-close.svg" />
                </StyledFlexBox>
            </DialogActions>
            <DialogContent dividers={scroll === 'paper'} sx={{ minHeight: '817px', p: '0' }}>
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
                            狀態：
                        </Grid>
                        <Grid item xs={3}>
                            Facebook綁定：
                        </Grid>
                        <Grid item xs={3}>
                            Google綁定：
                        </Grid>
                        <Grid item xs={3}>
                            Apple綁定：
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        sx={{ mt: '15.5px', color: '#7C7C7C', pb: '25px', borderBottom: 1, borderColor: '#E9E9E9', mb: '25px' }}
                    >
                        <Grid item xs={3}>
                            已訂閱
                        </Grid>
                        <Grid item xs={3}>
                            未綁定
                        </Grid>
                        <Grid item xs={3}>
                            已綁定
                        </Grid>
                        <Grid item xs={3}>
                            已綁定
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
                                <Table sx={{ minWidth: 650 }}         stickyHeader
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
                                        {rows.map((row) => (
                                            <TableRow key={row.name} sx={{ border: 0 }}>
                                                <TableCell align="left">訂閱-2023一月</TableCell>
                                                <TableCell align="left">$60</TableCell>
                                                <TableCell align="left">2022/6/1</TableCell>
                                                <TableCell align="left">信用卡</TableCell>
                                                <TableCell align="left">陳文文</TableCell>
                                                <TableCell align="left">wei213@gmail.com10</TableCell>
                                                <TableCell align="left">台北市信義區中正路33號</TableCell>
                                                <TableCell align="left">0923842931</TableCell>
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
                                <Box>顯示 2 筆資料中的 1 到 2 筆資料</Box>
                                <Box>
                                    <Pagination count={10} variant="outlined" shape="rounded" />
                                </Box>
                            </Box>
                        </>
                    ) : (
                        <>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }}         stickyHeader
        aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ backgroundColor: '#F0F1F7' }}>訂單編號</TableCell>
                                            <TableCell align="left" sx={{ backgroundColor: '#F0F1F7' }}>
                                                訂單金額123
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
                                        {rows.map((row) => (
                                            <TableRow key={row.name} sx={{ border: 0 }}>
                                                <TableCell align="left">li12jl321</TableCell>
                                                <TableCell align="left">$60</TableCell>
                                                <TableCell align="left">2022/6/1</TableCell>
                                                <TableCell align="left">信用卡</TableCell>
                                                <TableCell align="left">陳文文</TableCell>
                                                <TableCell align="left">wei213@gmail.com10</TableCell>
                                                <TableCell align="left">0923842931</TableCell>
                                                <TableCell align="left" sx={{ color: '#8C9EFF', fontWeight: '700' }}>查看詳細</TableCell>
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
                                <Box>顯示 2 筆資料中的 1 到 2 筆資料</Box>
                                <Box>
                                    <Pagination count={10} variant="outlined" shape="rounded" />
                                </Box>
                            </Box>
                        </>
                    )}
                </StyledFlexBox>
            </DialogContent>
        </Dialog>
    );
};

export default MemberDetailCheck;