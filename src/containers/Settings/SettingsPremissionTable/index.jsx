import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Pagination, Stack } from "@mui/material";
import { StyledFlexBox, StyledText } from "../../../styles/Shared.styles";

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

const SettingsPremissionTable = ({ tableData, setDetailId, setDetailOpen, setList, pageLimit, setPageNumber, pageNumber }) => {
  const { data, page } = tableData;
  const [selected, setSelected] = useState("permission");
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPageNumber(value);
    setCurrentPage(value)
  };
  const ITEMS = [
    {
      text: "帳號",
      value: "username",
    },
    {
      text: "權限",
      value: "permission",
    },
  ];
  const go = (e) => {
    setDetailId(e)
    setDetailOpen(true)
  };
  return (
    <>
      <StyledFlexBox ml="4px">
        {ITEMS.map((item) => (
          <StyledFlexBox
            key={item.value}
            borderRadius="10px 10px 0px 0px"
            bg={selected === item.value ? "#8C9EFF" : "#f6f6f6"}
            color={selected === item.value ? "#fff" : "#A7A7A7"}
            width={120}
            height={40}
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            onClick={() => { setSelected(item.value), setList(item.value) }}
          >
            {item.text}
          </StyledFlexBox>
        ))}
      </StyledFlexBox>
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
              <TableCell align="center">角色</TableCell>
              <TableCell align="left">權限</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.name}
                </TableCell>
                <TableCell align="center"><StyledFlexBox>{row.permission !== undefined && row.permission.map((show, index) => (<StyledText>{show},</StyledText>))}</StyledFlexBox> </TableCell>
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
                    onClick={() => { go(row.id) }}
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
    </>
  );
};

export default SettingsPremissionTable;
