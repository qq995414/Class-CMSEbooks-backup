import {
  Alert,
  Button,
  Snackbar,
} from "@mui/material";
import MemberStateDetail from "./MemberStateDetail";

import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../../../components/Header";
import LeftBar from "../../../components/LeftBar";
import { StyledFlexBox, StyledImage, StyledText } from "../../../styles/Shared.styles";
import fileDownload from 'js-file-download'

import ExcelFileUpload from "../../../components/ExcelUpload";
import { useEffect } from "react";
import { ModifyBookData } from "../../../api/Book";
import {
  fetchCategorySelect,
  fetchSubjectSelect,
  fetchVersionSelect,
  downloadXml,
  importBookData
} from "../../../api/Book";
import { fetchSubDealerSelect } from "../../../api/SubDealer";
import moment from "moment";
import { SUCCESS_CODE } from "../../../constants";
import MemberTableCheck from "../MemberTableCheck";
import { fetchMemberList, exportMemberData } from "../../../api/User";



const MemberState = () => {

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

  const goBack = () => {
    navigate(-1);
  };

  const getUserList = (payload) => {
    fetchMemberList({ page_number: pageNumber, page_limit: pageLimit }).then((data) => {
      setTableData(data);
    });
  }

  useEffect(() => {
    fetchMemberList({ page_number: pageNumber, page_limit: pageLimit }).then((data) => {
      setTableData(data);
    });
  }, []);
  useEffect(() => {
    fetchMemberList({ page_number: pageNumber, page_limit: pageLimit }).then((data) => {
      setTableData(data);
    });
  }, [pageNumber, pageLimit, detailOpen]);
  const importData = () => {
    /* const payload = {
       file: trialFile || null,
     };
     console.log(payload)
 */
    exportMemberData().then((res) => {
      let url = window.URL.createObjectURL(new Blob([res.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "样本信息.csv"); // 文件名
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // 下载完成移除元素
      window.URL.revokeObjectURL(url); // 释放掉blob对象

      console.log(res)
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
          批量變更狀態
        </StyledFlexBox>
        <StyledFlexBox
          mb={16}
          width={"100%"}
          justifyContent="right"
        >

          <StyledFlexBox
            mb={16}
          >

            <Button variant="contained" onClick={() => { setDetailOpen(true); setDetailOpenState(0) }}
            >批量變更會員</Button>

          </StyledFlexBox>
          <StyledFlexBox
            mb={16}
            ml={20}
          >

            <Button variant="contained" onClick={() => { setDetailOpen(true); setDetailOpenState(1) }}
            >批量變更訂閱</Button>

          </StyledFlexBox>


        </StyledFlexBox>

        <StyledText
          bg="#fff"
          borderRadius="15px"
          minWidth={1144}
          minHeight={540}
          mb={60}>
          <MemberTableCheck
            tableData={tableData}
            getUserList={getUserList}
            pageLimit={pageLimit}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            setCheckId={setCheckId}
            checkboxId={checkboxId}

          />

        </StyledText>
        <MemberStateDetail
          open={detailOpen}
          setDetailOpen={setDetailOpen}
          DetailOpenState={detailOpenState}
          detailId={detailId}
          checkboxId={checkboxId}

        />
      </StyledFlexBox >
    </>
  ); s
};

export default MemberState;
