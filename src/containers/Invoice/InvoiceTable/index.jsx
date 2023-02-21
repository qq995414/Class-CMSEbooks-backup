import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Pagination, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchRequestPaymentAccountModify } from "../../../api/RequestPaymentAccount";


function createData(name, calories, fat, carbs, protein, setDetailOpen) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const InvoiceTable = ({ tableData, setDetailOpen, getBookList, pageLimit, setPageNumber, pageNumber, setDetailId, setDetailMoneyId, setDetailMoneyUser, setDetailMoneyMoney, setDetailMoneyOpen }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(tableData)
  const onDetailOpen = (id) => {
    setDetailOpen(true);
    setDetailId(id);

  };
  const handlePageChange = (event, value) => {
    setPageNumber(value);
    setCurrentPage(value);
    console.log(data)
  };
  useEffect(() => {
    setData(tableData.data)
    setPage(tableData.page)
  }, [tableData]);
  const change = (id, user, money) => {

    /*fetchRequestPaymentAccountModify({ request_status: "CHECK", id: e }).then((data) => {
    });*/
    setDetailMoneyId(id)
    setDetailMoneyUser(user)
    setDetailMoneyMoney(money)
    setDetailMoneyOpen(true)

  }
  const check = (e) => {
    setDetailId(e);
    setDetailOpen(true)
  }
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
            <TableCell align="center">訂單編號</TableCell>
            <TableCell align="center">訂單請款金額</TableCell>
            <TableCell align="center">經銷商</TableCell>
            <TableCell align="center">請款日期</TableCell>
            <TableCell align="center">銀行代號</TableCell>
            <TableCell align="center">銀行帳號</TableCell>
            <TableCell align="center">狀態</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((data, index) => (
            <TableRow
              key={data.order_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {data.order_id}
              </TableCell>
              <TableCell align="center">${data.request_amount}</TableCell>
              <TableCell align="center">{data.delaer_name}</TableCell>
              <TableCell align="center">{data.request_date.substr(0, 10)}</TableCell>
              <TableCell align="center">{data.bank_code}</TableCell>
              <TableCell align="center">{data.bank_account.substr(0, 3)}****{data.bank_account.substr(7, data.bank_account.length)}</TableCell>
              <TableCell align="center">{data.request_status}</TableCell>
              <TableCell align="center">
                {data.request_status === "經銷商確認中" ? "" : <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#8C9EFF",
                    height: 32,
                    color: "#8C9EFF",
                    mr: "16px",
                  }}
                  onClick={() => { change(data.id, data.delaer_name, data.request_amount) }}
                >
                  確認撥款
                </Button>}

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#A3D951",
                    height: 32,
                    "&:hover": {
                      background: "#92C66A",
                    },
                  }}
                  onClick={() => { check(data.id) }}
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
                {data ? <><Box>
                  顯示 {page?.page_total} 筆資料中的
                  {1 + pageLimit * (pageNumber - 1)}到
                  {pageLimit * (page?.page_number - 1) + data.length}筆資料
                </Box><Box>
                    <Pagination
                      count={Number(page?.page_last || 0)}
                      variant="outlined"
                      shape="rounded"
                      page={currentPage}
                      onChange={handlePageChange} />
                  </Box></>
                  : ""} </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceTable;
