import {
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Button,
  FormControl,
  InputAdornment,
  InputBase,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../../../components/Header";
import LeftBar from "../../../components/LeftBar";
import { StyledFlexBox, StyledImage, StyledText } from "../../../styles/Shared.styles";
import { useEffect } from "react";
import NoticeTableCheck from "../NoticeTableCheck";
import { fetchOrderList, fetchOrderListPage, fetchOrderExport } from "../../../api/Order";

const NoticeTableExport = () => {
  const ITEMS = [
    {
      text: "匯入",
      value: "import",
    }
  ];
  const [pageLimit, setPageLimit] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  const [selected, setSelected] = useState("import");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [tableData, setTableData] = useState([]);
  const [successToast, setSuccessToast] = useState(false);
  const [checkId, setCheckId] = useState([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailOpenState, setDetailOpenState] = useState(0);
  const [detailId, setDetailId] = useState(null);
  const [checkboxId, setCheckboxId] = useState([]);
  const [keyWord, setKeyWord] = useState("");

  const goBack = () => {
    navigate(-1);
  };

  const getUserList = (payload) => {
    fetchOrderList({ page_number: pageNumber, page_limit: pageLimit, query_word: keyWord }).then((data) => {
      setTableData(data);
    });
  }

  useEffect(() => {
    fetchOrderList({ page_number: pageNumber, page_limit: pageLimit, query_word: keyWord }).then((data) => {
      setTableData(data);
    });
  }, []);
  useEffect(() => {
    fetchOrderList({ page_number: pageNumber, page_limit: pageLimit, query_word: keyWord }).then((data) => {
      setTableData(data);
    });
  }, [pageNumber, pageLimit, keyWord]);


  const outputExcel = () => {
    /* const payload = {
       file: trialFile || null,
     };
     console.log(payload)
 */
    fetchOrderExport({ ids: checkboxId }).then((res) => {

      const url = window.URL.createObjectURL(res);
      const a = document.createElement('a');

      a.style.display = 'none';
      a.href = url;

      a.download = "notice.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    });

  }


  const outputPdf = () => {
    /* const payload = {
       file: trialFile || null,
     };
     console.log(payload)
 */
    fetchOrderExport({ ids: checkboxId, type: "pdf" }).then((res) => {

      const url = window.URL.createObjectURL(res);
      const a = document.createElement('a');

      a.style.display = 'none';
      a.href = url;

      a.download = "notice.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    });

  }

  return (
    <>
      <Header />
      <LeftBar />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={successToast}
        autoHideDuration={3000}
        onClose={() => setSuccessToast(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          已新增「{name}」書籍
        </Alert>
      </Snackbar>
      <StyledFlexBox
        top={50}
        left={180}
        py={40}
        px={50}
        flexDirection="column"
        maxWidth="calc(100% - 180px)"
        maxHeight="calc(100vh - 50px)"
        overflowX="auto"
        overflowY="auto"
      >
        <StyledFlexBox

          fontSize={24}
          fontWeight={700}
          mb={16}
          color="#242731"
          alignItems="center"
          onClick={goBack}
          cursor="pointer"
          width="fit-content"
        >
          <StyledImage src="/images/icon-left.svg" mr="12px" />
          新進訂單通知
        </StyledFlexBox>
        <StyledFlexBox alignItems="center" justifyContent="space-between"
          mb={20}
        >
          <StyledFlexBox alignItems="center"
          >
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
          </StyledFlexBox>
          <StyledFlexBox alignItems="center"
          >
            <Button variant="contained" sx={{ mr: "24px" }} onClick={() => { outputPdf() }}>
              輸出 PDF
            </Button>
            <Button variant="contained" onClick={() => { outputExcel() }}>輸出Excel</Button>
          </StyledFlexBox>
        </StyledFlexBox>

        <StyledText
          bg="#fff"
          borderRadius="15px"
          minWidth={1144}
          minHeight={540}
          mb={60}>
          <NoticeTableCheck
            tableData={tableData}
            pageLimit={pageLimit}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            setCheckId={setCheckId}
            checkboxId={checkboxId}
          />

        </StyledText>

      </StyledFlexBox >
    </>
  ); s
};

export default NoticeTableExport;
