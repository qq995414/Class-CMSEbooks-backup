import * as React from "react";
import MemberDetail from "./MemberDetail";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Checkbox, Pagination, Stack } from "@mui/material";
import { useState, useEffect, Fragment } from "react";
import { fetchOrderList, fetchOrderListPage } from "../../../api/Order";


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

const InvoiceTableCheck = ({ pageLimit, setCheckId, tableData, setPageNumber, pageNumber, checkboxId }) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const [allCheckbox, setAllCheckbox] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, page } = tableData;

  const checkBoxId = (check, id) => {
    console.log(check, ",", id)

    if (check === true) {
      checkboxId.push(parseInt(id))
      console.log(checkboxId)
    }
    else {

      checkboxId.map((item, index) => {
        if (item == id) {
          checkboxId.splice(index, 1)
        }
      })
    }

  }
  const handlePageChange = (event, value) => {
    setPageNumber(value);
    setCurrentPage(value)
  };
  const allCheck = (check) => {
    if (check === true) {
      setAllCheckbox(true);

      checkboxId.length = 0;
      for (let i = 0; i < data.length; i++) {
        checkboxId.push(data[i].id)
        console.log(checkboxId)
      }
    } else {
      setAllCheckbox(false);
      checkboxId.length = 0;

    }

  }
  useEffect(() => {
    setCheckId(checkboxId)
  });
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
            <TableCell align="center"><input type="checkbox" onChange={(e) => allCheck(e.target.checked)}  ></input></TableCell>
            <TableCell align="center">訂單編號</TableCell>
            <TableCell align="center">訂單請款金額</TableCell>
            <TableCell align="center">經銷商</TableCell>
            <TableCell align="center">請款日期</TableCell>
            <TableCell align="center">銀行代號</TableCell>
            <TableCell align="center">銀行帳號</TableCell>
            <TableCell align="center">狀態</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((data) => (
            <TableRow
              key={data.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {allCheckbox === true ?
                <TableCell align="center"><input checked="checked" type="checkbox" value={data.order_id} ></input></TableCell>
                : <TableCell align="center"><input type="checkbox" value={data.id} onChange={(e) => checkBoxId(e.target.checked, e.target.value)}></input></TableCell>
              }
              <TableCell component="th" scope="row" align="center">
                {data.order_id}
              </TableCell>
              <TableCell align="center">${data.request_amount}</TableCell>
              <TableCell align="center">{data.delaer_name}</TableCell>
              <TableCell align="center">{data.request_date.substr(0, 10)}</TableCell>
              <TableCell align="center">{data.bank_code}</TableCell>
              <TableCell align="center">{data.bank_account.substr(0, 3)}****{data.bank_account.substr(7, data.bank_account.length)}</TableCell>
              <TableCell align="center">{data.request_status}</TableCell>
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

export default InvoiceTableCheck;