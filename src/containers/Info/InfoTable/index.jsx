import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Pagination, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



const InfoTable = ({ tableData, pageLimit, setPageNumber, pageNumber }) => {
  const { data, page } = tableData;
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailId, setDetailId] = useState(null);
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
            <TableCell align="center">序號</TableCell>
            <TableCell align="center">公告標題</TableCell>
            <TableCell align="center">發佈時間</TableCell>
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
                {row.id}
              </TableCell>
              <TableCell align="center">
                {row.title}
              </TableCell>
              <TableCell align="center">{row.release_date}</TableCell>
              <TableCell align="center">{row.state}</TableCell>
              <TableCell align="center">
                <Link to={"/info/editor/?#id=" + row.id}>
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
                  >
                    編輯
                  </Button>
                </Link>

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

export default InfoTable;
