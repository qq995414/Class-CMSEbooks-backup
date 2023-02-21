import * as React from "react";
import MemberDetail from "./MemberDetail";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Pagination, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import IOSSwitch from "../../../components/IOSSwitch";

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

const MemberTable = ({ tableData, getBookList, pageLimit, setPageNumber, pageNumber }) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState([]);
  const [detailId, setDetailId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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
            <TableCell align="center">姓名</TableCell>
            <TableCell align="center">手機</TableCell>
            <TableCell align="center">帳號(Email)</TableCell>
            <TableCell align="center">訂閱狀態</TableCell>
            <TableCell align="center">會員狀態</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((data) => (
            <TableRow
              key={data.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >

              <TableCell component="th" scope="row" align="center">
                {data.id}
              </TableCell>
              <TableCell align="center">{data.name}</TableCell>
              <TableCell align="center">{data.phone}</TableCell>
              <TableCell align="center">{data.email}</TableCell>
              <TableCell align="center">{data.subscription_state}</TableCell>
              <TableCell align="center">{data.chaoyang_state}</TableCell>
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
                  onClick={() => onDetailOpen(data.id)}
                >
                  查看詳細
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
                  />                </Box>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <MemberDetail
        open={detailOpen}
        setDetailOpen={setDetailOpen}
        detailId={detailId}
      />
    </TableContainer>
  );
};

export default MemberTable;