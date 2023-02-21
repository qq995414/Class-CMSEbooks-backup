import { Dialog, DialogActions, DialogContent, Grid } from '@mui/material';

import { Box, Button, Pagination, Stack } from '@mui/material';
import { useState } from 'react';
import { useRef, useEffect } from 'react';
import { fetchMemberData } from '../../../../api/User';
import { UPLOAD_URL } from '../../../../constants';
import { StyledFlexBox, StyledImage, StyledText } from '../../../../styles/Shared.styles';
import { numberWithCommas } from '../../../../utils/util';
import { ModifyMemberList } from "../../../../api/User";
import {
    Alert,
    Snackbar,
} from "@mui/material";
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

const MemberStateDetail = ({ open, setDetailOpen, detailId, checkboxId, DetailOpenState }) => {
    const handleClose = () => {
        setDetailOpen(false);
    };
    const descriptionElementRef = useRef(null);
    const [detailData, setDetailData] = useState({});
    const image = detailData?.image_file || [];
    const [selected, setSelected] = useState('detail');
    const [checkType, setcheckType] = useState(0);
    const [successToast, setSuccessToast] = useState(false);

    useEffect(() => {
        if (open) {
            fetchMemberData({ id: detailId }).then((res) => {
                setDetailData(res.data[0]);

                console.log('res', res);
            });
        }
        console.log("open")
    }, [open]);

    const changeState = () => {
        ModifyMemberList({ "members": checkboxId, "member_state": checkType }).then((res) => {
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
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={successToast}
                    autoHideDuration={3000}
                    onClose={() => setSuccessToast(false)}
                >
                    <Alert severity="success" sx={{ width: "100%" }}>
                        已完成批量修改
                    </Alert>
                </Snackbar>
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
                    <Grid xs={12} sx={{ fontSize: '16px', fontWeight: '700', color: '#252525' }}>
                        要將選取的會員變更為何種狀態？
                    </Grid>

                    {DetailOpenState === 0 ?
                        <><StyledFlexBox pt={25}>
                            <input type="checkbox" onChange={() => { setcheckType("DISABLE"); }} checked={checkType === "DISABLE" ? "checked" : ""} />
                            <StyledText pl={15}>未啟用
                            </StyledText>
                        </StyledFlexBox><StyledFlexBox pt={25}>
                                <input type="checkbox" onChange={() => { setcheckType("CHAOYANG"); }} checked={checkType === "CHAOYANG" ? "checked" : ""} />
                                <StyledText pl={15}>朝陽</StyledText>

                            </StyledFlexBox></> : ""
                    }
                    {DetailOpenState === 1 ? <><StyledFlexBox pt={25}>
                        <input type="checkbox" onChange={() => { setcheckType("UNSUBSCRIPTION"); }} checked={checkType === "UNSUBSCRIPTION" ? "checked" : ""} />
                        <StyledText pl={15}>未訂閱</StyledText>

                    </StyledFlexBox><StyledFlexBox pt={25}>
                            <input type="checkbox" onChange={() => { setcheckType("SUBSCRIPTION"); }} checked={checkType === "SUBSCRIPTION" ? "checked" : ""} />
                            <StyledText pl={15}>已訂閱</StyledText>

                        </StyledFlexBox></> : ""}


                    <StyledFlexBox pt={40} px={10} pb={20} cursor="pointer">
                        <Button style={{ marginLeft: "20px", marginRight: "20px", backgroundColor: "#FFFFFF", border: "1px solid #A7A7A7", color: "#A7A7A7" }} variant="contained" onClick={() => setDetailOpen(false)}
                        >取消</Button>
                        {checkType !== 0 ?
                            <Button style={{ marginLeft: "20px", marginRight: "20px" }} variant="contained" onClick={() => { setDetailOpen(true), changeState() }}
                            >確定變更</Button> :
                            <Button style={{ marginLeft: "20px", marginRight: "20px", backgroundColor: "#D7E0FF", border: "1px solid #D9E0FF", color: "#FFFFFF" }} variant="contained" onClick={() => setDetailOpen(true)}
                            >確定變更</Button>
                        }


                    </StyledFlexBox>
                </StyledFlexBox>
            </DialogContent>
        </Dialog>
    );
};

export default MemberStateDetail;