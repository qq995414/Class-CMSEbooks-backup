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
import { DeleteNewsList } from '../../../../api/News';
import { UPLOAD_URL } from '../../../../constants';
import { StyledFlexBox, StyledImage, StyledText } from '../../../../styles/Shared.styles';
import { numberWithCommas } from '../../../../utils/util';
import { Link, useNavigate } from "react-router-dom";

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

const RemoveDetail = ({ open, setDetailOpen, detailId }) => {
    const handleClose = () => {
        setDetailOpen(false);
    };
    const navigate = useNavigate();

    const descriptionElementRef = useRef(null);
    const [detailData, setDetailData] = useState({});
    const image = detailData?.image_file || [];
    const [selected, setSelected] = useState('detail');
    const [checkType, setcheckType] = useState(0);
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
    const remove = () => {
        DeleteNewsList({ id: detailId }).then((res) => {
            navigate("/info");

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
                    <StyledFlexBox xs={12} justifyContent="center" style={{ fontSize: '16px', fontWeight: '700', color: '#FB4A4A' }}>
                        是否刪除此消息？
                    </StyledFlexBox>
                    <StyledFlexBox pt={25} justifyContent="center">
                        確定刪除後將無法復原，是否仍執行此動作？
                    </StyledFlexBox>

                    <StyledFlexBox pt={40} px={10} pb={20} cursor="pointer">
                        <Button style={{ marginLeft: "20px", marginRight: "20px", backgroundColor: "#FFFFFF", border: "1px solid #A7A7A7", color: "#A7A7A7" }} variant="contained" onClick={() => setDetailOpen(false)}
                        >取消</Button>
                        <Button style={{ backgroundColor: "#FB4A4A", marginLeft: "20px", marginRight: "20px" }} variant="contained" onClick={() => remove()}
                        >刪除</Button> :


                    </StyledFlexBox>
                </StyledFlexBox>
            </DialogContent>
        </Dialog>
    );
};

export default RemoveDetail;