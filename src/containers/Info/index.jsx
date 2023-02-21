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
import { Link, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import LeftBar from "../../components/LeftBar";
import { StyledFlexBox, StyledImage } from "../../styles/Shared.styles";
import InfoTable from "./InfoTable";
import { fetchNewsList } from "../../api/News";

const Info = () => {
  const sort = [
    "發布日期:最新",
    "發布日期:最舊"
  ];
  const sort_value = [
    "newest",
    "oldest"
  ];
  const [personName, setPersonName] = useState([]);
  const [data, setData] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [nowSort, setNowSort] = useState("");
  const [pageLimit, setPageLimit] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchNewsList({
      sort: nowSort, "page_limit": pageLimit, "page_number": pageNumber,
    }).then((data) => {
      setData(data)
    });
  }, [pageNumber, nowSort, keyWord]);

  useEffect(() => {
    fetchNewsList({
      sort: nowSort, "page_limit": pageLimit, "page_number": pageNumber,
    }).then((data) => {
      setData(data)
    });
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
          消息管理
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
            <Link to="/Info/create">
              <Button variant="contained">+ 新增消息</Button>
            </Link>

          </StyledFlexBox>
        </StyledFlexBox>
        <InfoTable tableData={data}
          pageLimit={pageLimit}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber} />
      </StyledFlexBox>
    </>
  );
};

export default Info;
