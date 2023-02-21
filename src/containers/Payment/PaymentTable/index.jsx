import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Pagination, Stack } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const PaymentTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 650,
          borderRadius: "10px",
          borderColor: "transparent",
          fontSize: "14px",
        }}
                stickyHeader
        aria-label="sticky table"
      >
        <TableHead>
          <TableRow sx={{ color: "#505050" }}>
            <TableCell align="center">編號</TableCell>
            <TableCell align="center">付款名稱</TableCell>
            <TableCell align="center">付款金額</TableCell>
            <TableCell align="center">會員姓名</TableCell>
            <TableCell align="center">會員編號</TableCell>
            <TableCell align="center">付款方式</TableCell>
            <TableCell align="center">付款日期</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {index + 1}
              </TableCell>
              <TableCell align="center">訂閱-2023一月</TableCell>
              <TableCell align="center">$60</TableCell>
              <TableCell align="center">陳文文</TableCell>
              <TableCell align="center">1234</TableCell>
              <TableCell align="center">信用卡</TableCell>
              <TableCell align="center">2022/6/1</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#A3D951",
                    height: 32,
                    "&:hover": {
                      background: "#92C66A",
                    },
                  }}
                >
                  查看明細
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={10}>
              <Box
                sx={{
                  display: "flex",
                  fontSize: 12,
                  color: "#8c9eff",
                  mt: "60px",
                  mb: "20px",
                  ml: "24px",
                  justifyContent: "space-between",
                }}
              >
                <Box>顯示 2 筆資料中的 1 到 2 筆資料</Box>
                <Box>
                  <Pagination count={10} variant="outlined" shape="rounded" />
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentTable;
