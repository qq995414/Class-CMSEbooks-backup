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
import { useEffect, useState } from "react";
import { fetchOrderList } from "../../api/Order";
import { Link, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import LeftBar from "../../components/LeftBar";
import { StyledFlexBox, StyledImage } from "../../styles/Shared.styles";
import NoticeTable from "./NoticeTable";
import { fetchMemberList } from "../../api/User";
import DatePicker from "react-datepicker";


const Notice = () => {
  const sort = [
    "金額 :由大到小",
    "金額 :由小到大",
    "付款日期 :由近到遠",
    "付款日期 :由遠到近"
  ];
  const sort_value = [
    "total_desc",
    "total_asc",
    "date_desc",
    "date_asc",
  ];
  const [personName, setPersonName] = useState([]);
  const [tableData, setTableData] = useState({});
  const [pageLimit, setPageLimit] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [keyWord, setKeyWord] = useState("");
  const [nowSort, setNowSort] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const getTableData = () => {
    fetchOrderList({
      page_number: pageNumber,
      query_word: keyWord,
      page_limit: pageLimit,
      sort: nowSort,
      filter_start_date: startDate && startDate.getFullYear() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getDate(),
      filter_end_date: endDate && endDate.getFullYear() + "/" + (endDate.getMonth() + 1) + "/" + (endDate.getDate()+1)
    }).then((data) => {
      setTableData(data);
    });
  };
  useEffect(() => {
    getTableData();
  }, []);
  useEffect(() => {
    getTableData();
  }, [pageNumber, keyWord, dateRange, nowSort]);
  const handleChange = () => { };

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
          新進訂單通知
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
                inputProps={{ "aria-label": "搜尋" }}
                value={keyWord}
                onChange={(e) => { setKeyWord(e.target.value) }}
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
            <FormControl>
              <DatePicker
                placeholderText="篩選日期"
                dateFormat="yyyy/MM/dd"
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                isClearable={true}
              />
            </FormControl>
          </StyledFlexBox>
          <StyledFlexBox>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#5055D6", mr: "24px" }}
            >
              <Link to="/notice/Export">批量匯出</Link>
            </Button>
          </StyledFlexBox>
        </StyledFlexBox>
        <NoticeTable
          tableData={tableData}
          pageLimit={pageLimit}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          getTableData={getTableData}
        />
      </StyledFlexBox>
    </>
  );
};

export default Notice;
