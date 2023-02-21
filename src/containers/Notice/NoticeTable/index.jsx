import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Pagination } from "@mui/material";
import { Fragment, useState,useEffect } from "react";
import NoticeDetail from "./NoticeDetail";

const NoticeTable = ({ tableData, pageLimit, setPageNumber, pageNumber, getTableData }) => {
  const { data, page } = tableData;
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const onDetailOpen = (id) => {
    setDetailId(id);
    setDetailOpen(true);
  };
  const handlePageChange = (event, value) => {
    setPageNumber(value);
    setCurrentPage(value)
  };
  useEffect(() => {
    getTableData();
  }, [detailOpen]);


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
            <TableCell align="center">訂單金額</TableCell>
            <TableCell align="center">會員姓名</TableCell>
            <TableCell align="center">會員編號</TableCell>
            <TableCell align="center">付款方式</TableCell>
            <TableCell align="center">付款狀態</TableCell>
            <TableCell align="center">付款日期</TableCell>
            <TableCell align="center">出貨狀態</TableCell>
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
                {row.member_order_id}
              </TableCell>
              <TableCell align="center">{row.total}</TableCell>
              <TableCell align="center">{row.member_name}</TableCell>
              <TableCell align="center">{row.member_id}</TableCell>
              <TableCell align="center">{row.payment}</TableCell>
              <TableCell align="center">{row.payment_status}</TableCell>
              <TableCell align="center">{row.payment_date !== null ? row.payment_date.substr(0, 10) : "尚未付款"}</TableCell>
              <TableCell align="center">
                {row.dealers.map((dealer) => (
                  <Fragment key={dealer.id}>
                    {dealer.dealer_name}({dealer.delivery_status})
                    <br />
                  </Fragment>
                ))}
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  onClick={() => onDetailOpen(row.member_order_id)}
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
      <NoticeDetail
        open={detailOpen}
        setDetailOpen={setDetailOpen}
        detailId={detailId}
      />
    </TableContainer>
  );
};

export default NoticeTable;
