import {
  Button,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputBase,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
} from "@mui/material";
import { useState } from "react";

import Header from "../../components/Header";
import LeftBar from "../../components/LeftBar";
import { StyledFlexBox, StyledImage } from "../../styles/Shared.styles";
import PaymentTable from "./PaymentTable";

const Payment = () => {
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];
  const [personName, setPersonName] = useState([]);

  return (
    <>
      <Header />
      <LeftBar />
      <StyledFlexBox
        top={50}
        left={180}
        pt={40}
        px={50}
        flexDirection="column"
        maxWidth="calc(100% - 180px)"
        maxHeight="calc(100vh - 50px)"
        overflowX="auto"
        overflowY="auto"
      >
        <StyledFlexBox fontSize={24} fontWeight={700} mb={32} color="#242731">
          訂閱付款管理
        </StyledFlexBox>
        <StyledFlexBox
          justifyContent="space-between"
          alignItems="center"
          mb={24}
        >
          <StyledFlexBox alignItems="center">
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 268,
                height: 40,
                borderRadius: "100px",
                boxShadow: 0,
                fontSize: 14,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, fontSize: 14 }}
                placeholder="搜尋"
                inputProps={{ "aria-label": "搜尋" }}
                startAdornment={
                  <InputAdornment position="start">
                    <StyledImage src="/images/icon-search.svg" />
                  </InputAdornment>
                }
              />
            </Paper>
            <FormControl
              sx={{
                width: 120,
                height: 40,
                m: 1,
              }}
              variant="standard"
            >
              <Select
                displayEmpty
                value={personName}
                onChange={handleChange}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>選擇排序</em>;
                  }

                  return selected.join(", ");
                }}
                // MenuProps={MenuProps}
                variant="outlined"
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  fontSize: 14,
                  width: 120,
                  height: 40,
                  color: "#505050",
                }}
              >
                <MenuItem disabled value="">
                  <em>選擇排序</em>
                </MenuItem>
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </StyledFlexBox>
          <StyledFlexBox>
            <Button
              variant="contained"
              sx={{ mr: "24px", backgroundColor: "#5055D6" }}
            >
              批量匯出
            </Button>
            <Button variant="contained">訂閱金額設定</Button>
          </StyledFlexBox>
        </StyledFlexBox>
        <PaymentTable />
      </StyledFlexBox>
    </>
  );
};

export default Payment;
