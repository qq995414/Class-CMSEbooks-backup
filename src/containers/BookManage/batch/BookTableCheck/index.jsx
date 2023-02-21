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
import { useState, useEffect } from "react";
import { UPLOAD_URL } from "../../../../constants";

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

const BookTableCheck = ({ pageLimit, setCheckId, tableData, setPageNumber, pageNumber, checkboxId }) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const [allCheckbox, setAllCheckbox] = useState(false);
  const { data, page } = tableData;
  const [currentPage, setCurrentPage] = useState(1);

  const onDetailOpen = (id) => {
    setDetailOpen(true);
    setDetailId(id);

  };

  const checkBoxId = (check, id) => {
    if (check === true) {
      checkboxId.push(parseInt(id))
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
            <TableCell align="center">編號</TableCell>
            <TableCell align="center">圖片</TableCell>
            <TableCell align="center">書籍款式</TableCell>
            <TableCell align="center">教材種類</TableCell>
            <TableCell align="center">經銷商</TableCell>
            <TableCell align="center">收藏數</TableCell>
            <TableCell align="center">評分</TableCell>
            <TableCell align="center">狀態</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.data && tableData.data.map((data) => (
            <TableRow
              key={data.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {allCheckbox === true ? <TableCell align="center"><input checked="checked" type="checkbox" value={data.id} ></input></TableCell>
                : <TableCell align="center"><input type="checkbox" value={data.id} onChange={(e) => checkBoxId(e.target.checked, e.target.value)}></input></TableCell>
              }

              <TableCell component="th" scope="row" align="center">
                {data.id}
              </TableCell>
              <TableCell align="center"><img style={{ height: "100px" }} src={UPLOAD_URL + data.image} /></TableCell>
              <TableCell align="center">{data.model}</TableCell>
              <TableCell align="center">{data.type}</TableCell>
              <TableCell align="center">{data.dealer}</TableCell>
              <TableCell align="center">{data.collect}</TableCell>
              <TableCell align="center">{data.score}</TableCell>
              {data.is_enable === "true" ? <TableCell align="center">以啟用</TableCell> : <TableCell align="center">未啟用</TableCell>}

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
                <Box>
                  顯示 {page?.page_total} 筆資料中的
                  {1 + pageLimit * (pageNumber - 1)}到
                  {pageLimit * (page?.page_number - 1) + data.length}筆資料
                </Box>
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

export default BookTableCheck;