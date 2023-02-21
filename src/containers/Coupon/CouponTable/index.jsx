import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Pagination, Stack } from "@mui/material";
import { useState } from "react";

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

const CouponTable = ({ tableData, setDetailEditorOpen, setDetailId, pageLimit, setPageNumber, pageNumber }) => {
  const { data, page } = tableData;
  const [detailOpen, setDetailOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPageNumber(value);
    setCurrentPage(value)
  };
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
            <TableCell align="center">名稱</TableCell>
            <TableCell align="center">優惠碼</TableCell>
            <TableCell align="center">已使用/總數</TableCell>
            <TableCell align="center">每人限用</TableCell>
            <TableCell align="center">優惠(百分比或金額)</TableCell>
            <TableCell align="center">使用限制</TableCell>
            <TableCell align="center">到期日</TableCell>
            <TableCell align="center">狀態</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.code}</TableCell>
              <TableCell align="center">{row.use_total}/{row.quantity}</TableCell>
              <TableCell align="center">{row.quantity_use_limit}</TableCell>
              <TableCell align="center">{row.discount > 1 ? "-" + row.discount + "元" : "*" + (row.discount * 100) + "%"}</TableCell>
              <TableCell align="center">{row.is_first_ourchase_only === true ? "僅限首次使用" : "不限首次使用"}<br />{row.spend_limit > 0 ? "滿額" + row.spend_limit + "才可使用" : ""}</TableCell>
              <TableCell align="center">{row.expiry_date}</TableCell>
              <TableCell align="center">{row.state}</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#A3D951",
                    width: 82,
                    height: 32,
                    "&:hover": {
                      background: "#92C66A",
                    },
                  }}
                  onClick={() => { setDetailEditorOpen(true), setDetailId(row.id) }}
                >
                  編輯
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
                {data && (
                  <Box>
                    顯示 {page?.page_total} 筆資料中的
                    {1 + pageLimit * (pageNumber - 1)}到
                    {pageLimit * (page?.page_number - 1) + data.length}筆資料
                  </Box>
                )}
                <Box>
                  <Pagination
                    count={Number(page?.page_last || 0)}
                    variant="outlined"
                    shape="rounded"
                    page={currentPage}
                    onChange={handlePageChange}
                  />
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CouponTable;
