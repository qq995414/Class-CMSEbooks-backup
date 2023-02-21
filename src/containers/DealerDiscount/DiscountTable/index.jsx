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
import { fetchDealerList } from "../../../api/Dealer";

const DiscountTable = ({ setDetailOpen, setDetailId, keyWord }) => {
  const [data, setData] = useState([]);
  const [header, setHeader] = useState([]);
  const [page, setPage] = useState(1);
  const handleOrderPageChange = (event, value) => {
    setPage(value)
  };
  useEffect(() => {
    fetchDealerList({
      "page_limit": "10", "page_number": page, query_word: keyWord
    }).then(({ data }) => {
      setData(data.data)
      setHeader(data.page)
    });
  }, [page, keyWord]);
  useEffect(() => {
    fetchDealerList({
      "page_limit": "10", "page_number": page, query_word: keyWord
    }).then(({ data }) => {
      setData(data.data)
      setHeader(data.page)
    });
  }, []);
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
            <TableCell align="center">經銷商名稱</TableCell>
            <TableCell align="center">優惠碼</TableCell>
            <TableCell align="center">已使用/總數</TableCell>
            <TableCell align="center">折扣(百分比)</TableCell>
            <TableCell align="center">使用限制</TableCell>
            <TableCell align="center">合作到期日</TableCell>
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
                {row.dealer_name}
              </TableCell>
              <TableCell align="center">{row.code}</TableCell>
              <TableCell align="center">{row.spend_limit}/{row.quantity}</TableCell>
              <TableCell align="center">{row.discount > 1 ? "-" + row.discount + "元" : "*" + (row.discount * 100) + "%"}</TableCell>
              <TableCell align="center">{row.is_first_purchase_only === true ? "僅限首次購買" : "不限制"}<br />{row.spend_limit > 0 ? "滿額" + row.spend_limit + "才可使用" : ""}</TableCell>
              <TableCell align="center">{row.expiry_date}</TableCell>
              <TableCell align="center">{row.remark}</TableCell>
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
                  onClick={() => { setDetailOpen(true), setDetailId(row.id) }}
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
                  display: 'flex',
                  fontSize: 12,
                  color: '#8c9eff',
                  mt: '60px',
                  mb: '20px',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  顯示
                  {header.page_total && header.page_total !== 0 ? header.page_total : 0}
                  筆資料中的
                  {header.page_limit && header.page_limit !== 0 ? 1 + (10 * (header.page_number - 1)) : 0}
                  到
                  {header.page_limit && header.page_limit !== 0 ? parseFloat(header.page_number * (header.page_number - 1)) + parseFloat(header.page_limit) : ""}筆資料
                </Box>{page}
                <Box>
                  <Pagination
                    count={Number(header.page_last || 0)}
                    variant="outlined"
                    shape="rounded"
                    page={page}
                    onChange={handleOrderPageChange}
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

export default DiscountTable;
