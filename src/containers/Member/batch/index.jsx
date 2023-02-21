import {
  Alert,
  Button,
  Snackbar,
} from "@mui/material";

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
import MemberTableCheck from "../MemberTableCheckBatch";
import { fetchMemberList, exportMemberData } from "../../../api/User";


const BatchMenber = () => {

  const ITEMS = [
    {
      text: "匯入",
      value: "import",
    }
  ];
  const pageLimit = 10;
  const [selected, setSelected] = useState("import");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [tableData, setTableData] = useState([]);
  const [successToast, setSuccessToast] = useState(false);
  const [checkId, setCheckId] = useState([]);

  const goBack = () => {
    navigate(-1);
  };

  const getUserList = (payload) => {
    fetchMemberList(payload).then((data) => {
      setTableData(data);
    });
  }

  useEffect(() => {
    getUserList({ sort: "date" });
  }, []);
  const importData = () => {
    /* const payload = {
       file: trialFile || null,
     };
     console.log(payload)
 */
    exportMemberData({ ids: checkId }).then((res) => {

      const url = window.URL.createObjectURL(res);
      const a = document.createElement('a');

      a.style.display = 'none';
      a.href = url;

      a.download = "member.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    });

  }
  const importPdf = () => {
    /* const payload = {
       file: trialFile || null,
     };
     console.log(payload)
 */
    exportMemberData({ ids: checkId, type: "pdf" }).then((res) => {

      const url = window.URL.createObjectURL(res);
      const a = document.createElement('a');

      a.style.display = 'none';
      a.href = url;

      a.download = "member.pdf";
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
          批量匯出
        </StyledFlexBox>
        <StyledFlexBox
          mb={16}
          width={"100%"}
          justifyContent="right"
        >
          <Button variant="contained" sx={{ mr: "24px" }} onClick={() => { importPdf() }}>
            輸出 PDF
          </Button>
          <Button variant="contained" onClick={() => { importData() }}>輸出Excel</Button>
        </StyledFlexBox>
        <StyledFlexBox ml="4px">
          {ITEMS.map((item) => (
            <StyledFlexBox
              key={item.value}
              borderRadius="10px 10px 0px 0px"
              bg={selected === item.value ? "#8C9EFF" : "#f6f6f6"}
              color={selected === item.value ? "#fff" : "#A7A7A7"}
              width={120}
              height={40}
              mr={10}
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              onClick={() => setSelected(item.value)}
            >
              匯出
            </StyledFlexBox>
          ))}
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
            setCheckId={setCheckId}
            checkboxId={checkId}
          />

        </StyledText>
      </StyledFlexBox >
    </>
  );
};

export default BatchMenber;
