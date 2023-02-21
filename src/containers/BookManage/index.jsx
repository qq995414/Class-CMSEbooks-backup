import {
  Button,
  FormControl,
  InputAdornment,
  InputBase,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchBookList } from "../../api/Book";

import Header from "../../components/Header";
import LeftBar from "../../components/LeftBar";
import { StyledFlexBox, StyledImage } from "../../styles/Shared.styles";
import BookTable from "./BookTable";

const BookManage = () => {
  const sort = [
    "上架：新到舊",
    "上架：舊到新",
    "評分:高至低",
    "評分:低至高",
    "收藏:多至少",
    "收藏:少至多"
  ];
  const sort_value = [
    "no_desc",
    "no_asc",
    "rank_most",
    "rank_least",
    "collect_most",
    "collect_least"
  ];
  const [personName, setPersonName] = useState("");
  const [tableData, setTableData] = useState({});
  const [keyWord, setKeyWord] = useState("");
  const [nowSort, setNowSort] = useState("");
  const [pageLimit, setPageLimit] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const getBookList = (payload) => {
    fetchBookList({ page_number: pageNumber, page_limit: pageLimit, sort: nowSort, query_word: keyWord }).then((data) => {
      setTableData(data.data);
    });
  }
  useEffect(() => {
    getBookList();
  }, [nowSort, keyWord, pageLimit, pageNumber, personName]);
  useEffect(() => {
    getBookList({ page_number: pageNumber, page_limit: pageLimit, sort: nowSort, query_word: keyWord });
  }, []);
 
  return (
    <>
      <Header />
      <LeftBar />
      <StyledFlexBox
        top={50}
        left={180}
        pt={40}
        px={50}
        flexDirection="column"
        maxWidth="calc(100% - 180px)"
        maxHeight="calc(100vh - 50px)"
        overflowX="auto"
        overflowY="auto"
      >
        <StyledFlexBox fontSize={24} fontWeight={700} mb={32} color="#242731">
          圖書管理
        </StyledFlexBox>
        <StyledFlexBox
          justifyContent="space-between"
          alignItems="center"
          mb={24}
        >
          <StyledFlexBox alignItems="center">
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 268,
                height: 40,
                borderRadius: "100px",
                boxShadow: 0,
                fontSize: 14,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, fontSize: 14 }}
                placeholder="搜尋"
                value={keyWord}
                onChange={(e) => { setKeyWord(e.target.value) }}
                inputProps={{ "aria-label": "搜尋" }}
                startAdornment={
                  <InputAdornment position="start">
                    <StyledImage src="/images/icon-search.svg" />
                  </InputAdornment>
                }
              />
            </Paper>
            <FormControl
              sx={{
                width: 120,
                height: 40,
                m: 1,
              }}
              variant="standard"
            >
              <Select
                displayEmpty
                value={nowSort}
                onChange={(e) => { setNowSort(e.target.value) }}

                // MenuProps={MenuProps}
                variant="outlined"
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  fontSize: 14,
                  width: 120,
                  height: 40,
                  color: "#505050",
                }}
              >
                <MenuItem disabled value="">
                  <em>選擇排序</em>
                </MenuItem>
                {sort.map((sort, Index) => (
                  <MenuItem key={sort_value[Index]} value={sort_value[Index]}>
                    {sort}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </StyledFlexBox>
          <StyledFlexBox>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#5055D6", mr: "24px" }}
            >
              <Link to="/book-manage/batch">批量匯入/出</Link>
            </Button>
            <Button variant="contained">
              <Link to="/book-manage/create">+ 新增書籍</Link>
            </Button>
          </StyledFlexBox>
        </StyledFlexBox>
        <BookTable
          tableData={tableData}
          getBookList={getBookList}
          pageLimit={pageLimit}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          setPersonName={setPersonName}
        />
      </StyledFlexBox>
    </>
  );
};

export default BookManage;
