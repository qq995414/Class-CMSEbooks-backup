import {
  Button,
  FormControl,
  Snackbar,
  InputAdornment,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";

import Header from "../../components/Header";
import LeftBar from "../../components/LeftBar";
import { StyledFlexBox, StyledImage } from "../../styles/Shared.styles";
import DealerTable from "./DealerTable";
import { fetchSubDealerList } from "../../api/Dealer";
import DealerEditorDetail from "./DealerEditorDetail";
import DealerAddDetail from "./DealerAddDetail";
const DealerManage = () => {
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];
  const [personName, setPersonName] = useState([]);
  const [data, setData] = useState([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [addDetailOpen, setAddDetailOpen] = useState(false);
  const [detailId, setDetailId] = useState("");
  const [keyWord, setKeyWord] = useState("");
  const [nowSort, setNowSort] = useState("");
  const [pageLimit, setPageLimit] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [successToast, setSuccessToast] = useState(false);
  const [AlertMessage, setAlertMessage] = useState("");
  const handleChange = () => { };
  useEffect(() => {
    fetchSubDealerList({
      "page_limit": pageLimit, "page_number": pageNumber,
    }).then(({ data }) => {
      setData(data)
    });
  }, []);
  useEffect(() => {
    fetchSubDealerList({
      "page_limit": pageLimit, "page_number": pageNumber, "query_word": keyWord
    }).then(({ data }) => {
      setData(data)

    });
  }, [detailOpen, addDetailOpen, pageNumber, keyWord, successToast]);
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
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={successToast}
          autoHideDuration={3000}
          onClose={() => setSuccessToast(false)}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            {AlertMessage}
          </Alert>
        </Snackbar>
        <StyledFlexBox fontSize={24} fontWeight={700} mb={32} color="#242731">
          經銷商管理
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
                value={personName}
                onChange={handleChange}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>選擇排序</em>;
                  }

                  return selected.join(", ");
                }}
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
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </StyledFlexBox>
          <StyledFlexBox>
            <Button variant="contained" onClick={() => { setAddDetailOpen(true) }}>+ 新增經銷商</Button>
          </StyledFlexBox>
        </StyledFlexBox>
        <DealerTable tableData={data}
          pageLimit={pageLimit}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          setDetailId={setDetailId}
          setDetailOpen={setDetailOpen} />
        <DealerEditorDetail
          open={detailOpen}
          setDetailOpen={setDetailOpen}
          detailId={detailId}
          setSuccessToast={setSuccessToast}
          setAlertMessage={setAlertMessage}
        />
        <DealerAddDetail
          open={addDetailOpen}
          setDetailOpen={setAddDetailOpen}
          setSuccessToast={setSuccessToast}
          setAlertMessage={setAlertMessage}
        />
      </StyledFlexBox>
    </>
  );
};

export default DealerManage;
