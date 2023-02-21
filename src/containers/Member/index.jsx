import {
  Button,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputBase,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import LeftBar from "../../components/LeftBar";
import { StyledFlexBox, StyledImage } from "../../styles/Shared.styles";
import MemberTable from "./MemberTable";
import { fetchMemberList } from "../../api/User";

const Member = () => {
  const sort = [
    "創建日期:近到遠",
    "創建日期:遠到近"
  ];
  const sort_value = [
    "id_most",
    "id_least",
  ];
  const [personName, setPersonName] = useState([]);
  const pageLimit = 10;
  const [keyWord, setKeyWord] = useState("");
  const [nowSort, setNowSort] = useState("");
  const [tableData, setTableData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const getUserList = (payload) => {
    fetchMemberList({ page_number: pageNumber, page_limit: pageLimit, sort: nowSort, query_word: keyWord }).then((data) => {
      setTableData(data);
    });
  }

  useEffect(() => {
    getUserList();
  }, [nowSort, keyWord, pageLimit, pageNumber]);

  useEffect(() => {
    getUserList();
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
          會員管理
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
            <Link to="/member/MemberState">
              <Button variant="contained" sx={{ mr: "24px" }}>
                批量變更狀態
              </Button>
            </Link>
            <Link to="/member/batch">
              <Button variant="contained">批量匯出</Button>
            </Link>
          </StyledFlexBox>
        </StyledFlexBox>
        <MemberTable
          tableData={tableData}
          getUserList={getUserList}
          pageLimit={pageLimit}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber} />
      </StyledFlexBox>
    </>
  );
};

export default Member;
