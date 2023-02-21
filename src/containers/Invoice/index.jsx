import {
  Button,
  Alert,
  FormControl,
  InputAdornment,
  InputBase,
  MenuItem,
  Paper,
  Snackbar,
  Select,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import Header from "../../components/Header";
import LeftBar from "../../components/LeftBar";
import { StyledFlexBox, StyledImage } from "../../styles/Shared.styles";
import InvoiceTable from "./InvoiceTable";
import { fetchRequestPaymentAccountList } from "../../api/RequestPaymentAccount";
import { fetchSubDealerSelect } from "../../api/data";

import InvoiceDetail from "./InvoiceDetail";
import InvoiceMoneyDetail from "./InvoiceMoneyDetail";
import DatePicker from "react-datepicker";

const Invoice = () => {
  const sort = [
    "金額 :由大到小",
    "金額 :由小到大",
    "付款日期 :由近到遠",
    "付款日期 :由遠到近"
  ];
  const sort_value = [
    "amount_desc",
    "amount_asc",
    "date_desc",
    "date_asc",
  ];
  const [personName, setPersonName] = useState([]);
  const pageLimit = 10;
  const [keyWord, setKeyWord] = useState("");
  const [nowSort, setNowSort] = useState("");
  const [tableData, setTableData] = useState([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const [detailMoneyOpen, setDetailMoneyOpen] = useState(false);
  const [detailMoneyId, setDetailMoneyId] = useState("");
  const [detailMoneyUser, setDetailMoneyUser] = useState("");
  const [detailMoneyMoney, setDetailMoneyMoney] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [successToast, setSuccessToast] = useState(false);
  const [dealerSelect, setSelect] = useState([]);
  const [dealerFilter, setDealerFilter] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const getList = () => {
    fetchRequestPaymentAccountList({ page_number: pageNumber, page_limit: pageLimit, sort: nowSort, query_word: keyWord, }).then((data) => {
      setTableData(data);
    });
  }

  useEffect(() => {
    fetchRequestPaymentAccountList({
      page_number: pageNumber, page_limit: pageLimit, sort: nowSort, query_word: keyWord, sort: nowSort, dealer_filter: dealerFilter,
      filter_start_date: startDate && startDate.getFullYear() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getDate(), filter_end_date: endDate && endDate.getFullYear() + "/" + (endDate.getMonth() + 1) + "/" + (endDate.getDate() + 1)
    }).then((data) => {
      setTableData(data);
    });
  }, [nowSort, keyWord, pageLimit, pageNumber, detailOpen, detailMoneyOpen, detailMoneyId, detailId, successToast, dealerFilter, dateRange]);


  useEffect(() => {
    getList();

    fetchSubDealerSelect().then((data) => {
      setSelect(data.data)
    });
  }, []);
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
          請款申請管理
        </StyledFlexBox>
        <StyledFlexBox
          justifyContent="space-between"
          alignItems="center"
          mb={24}
        >
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={successToast}
            autoHideDuration={3000}
            onClose={() => setSuccessToast(false)}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              已成功修改
            </Alert>
          </Snackbar>
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
                value={dealerFilter}
                onChange={(e) => { setDealerFilter(e.target.value) }}

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
                <MenuItem value="">
                  <em>所有書商</em>
                </MenuItem>
                {dealerSelect && dealerSelect.map((sort, Index) => (
                  <MenuItem key={sort.id} value={sort.id}>
                    {sort.name}
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
              <Link to="/Invoice/Export">批量匯出</Link>
            </Button>
          </StyledFlexBox>
        </StyledFlexBox>
        <InvoiceTable
          tableData={tableData}
          pageLimit={pageLimit}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          setDetailId={setDetailId}
          setDetailOpen={setDetailOpen}
          setDetailMoneyId={setDetailMoneyId}
          setDetailMoneyUser={setDetailMoneyUser}
          setDetailMoneyMoney={setDetailMoneyMoney}
          setDetailMoneyOpen={setDetailMoneyOpen}

        />

        <InvoiceDetail
          open={detailOpen}
          setDetailOpen={setDetailOpen}
          detailId={detailId}

        />
        <InvoiceMoneyDetail
          setSuccessToast={setSuccessToast}
          open={detailMoneyOpen}
          setDetailOpen={setDetailMoneyOpen}
          detailId={detailMoneyId}
          DetailMoneyUser={detailMoneyUser}
          DetailMoneyMoney={detailMoneyMoney}
          DetailMoneyOpen={detailMoneyOpen}
        />
      </StyledFlexBox>
    </>
  );
};

export default Invoice;
