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

import Header from "../../components/Header";
import LeftBar from "../../components/LeftBar";
import { StyledFlexBox, StyledImage } from "../../styles/Shared.styles";
import SettingsTable from "./SettingsTable";
import SettingsPremissionTable from "./SettingsPremissionTable";
import { fetchUserList, fetchUserGroupList } from "../../api/User";
import SettingsDetail from "./SettingsDetail";
import SettingsUser from "./SettingsUser";
import SettingsUserEditor from "./SettingsUserEditor";
import SettingsEditorDetail from "./SettingsEditorDetail";

const Settings = () => {
  const sort = [
    "編號:大至小",
    "編號:小至大",
    "創建日期:近到遠",
    "創建日期:遠到近"
  ];
  const sort_value = [
    "id_most",
    "id_least",
    "date_newest",
    "date_oldest"
  ];
  const [personName, setPersonName] = useState([]);
  const [data, setData] = useState([]);
  const [list, setList] = useState("username");
  const [detailOpen, setDetailOpen] = useState(false);
  const [userDetailOpen, setUserDetailOpen] = useState(false);
  const [userDetailEditorOpen, setUserDetailEditorOpen] = useState(false);
  const [detailId, setDetailId] = useState("");
  const [detailEditorOpen, setDetailEditorOpen] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [nowSort, setNowSort] = useState("");
  const [pageLimit, setPageLimit] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);


  const handleChange = () => { };

  useEffect(() => {
    setData([])
    if (list === "username")
      fetchUserList({ page_number: pageNumber, page_limit: pageLimit, sort: nowSort, query_work: keyWord }).then((res) => {
        setData(res.data)
      });
    else if (list === "permission") {
      fetchUserGroupList({ page_number: pageNumber, page_limit: pageLimit, sort: nowSort, query_work: keyWord }).then((res) => {
        setData(res.data)
      });
    }

  }, [open, detailOpen, detailEditorOpen, list, userDetailOpen, keyWord, nowSort]);
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
          後台管理設定
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
            {list === "username" ? <Button variant="contained" onClick={() => { setDetailOpen(true) }}>+ 新增帳號</Button> : ""}
            {list === "permission" ? <Button variant="contained" onClick={() => { setUserDetailOpen(true) }}>+ 新增權限</Button> : ""}

          </StyledFlexBox>
        </StyledFlexBox>
        {list === "username" ? <SettingsTable
          setList={setList}
          tableData={data}
          setDetailId={setDetailId}
          setDetailOpen={setDetailEditorOpen}
          pageLimit={pageLimit}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
        /> : ""}
        {list === "permission" ? <SettingsPremissionTable
          setList={setList}
          tableData={data}
          setDetailId={setDetailId}
          setDetailOpen={setUserDetailEditorOpen}
          pageLimit={pageLimit}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
        /> : ""}
        <SettingsUser
          open={userDetailOpen}
          setDetailOpen={setUserDetailOpen}
        />
        <SettingsUserEditor
          open={userDetailEditorOpen}
          setDetailOpen={setUserDetailEditorOpen}
          detailId={detailId}
        />
        <SettingsDetail
          open={detailOpen}
          setDetailOpen={setDetailOpen}
        />
        <SettingsEditorDetail
          open={detailEditorOpen}
          setDetailOpen={setDetailEditorOpen}
          detailId={detailId}
        />
      </StyledFlexBox>
    </>
  );
};

export default Settings;
