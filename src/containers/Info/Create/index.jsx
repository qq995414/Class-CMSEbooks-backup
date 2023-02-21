import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { useState, useCallback } from "react";
import "braft-editor/dist/index.css";

import Header from "../../../components/Header";
import LeftBar from "../../../components/LeftBar";
import { StyledFlexBox, StyledImage } from "../../../styles/Shared.styles";
import BraftEditor from "braft-editor";

import { useNavigate } from "react-router-dom";
import FileUpload from "../../../components/FileUpload";
import { useEffect } from "react";

import moment from "moment";
import { SUCCESS_CODE } from "../../../constants";
import { border } from "styled-system";
import { modifyNewsList } from "../../../api/News";


const EDITOR_CONTROLS = [
  "line-height",
  "letter-spacing",
  "separator",
  "bold",
  "italic",
  "underline",
  "strike-through",
  "separator",
  "headings",
  "list-ul",
  "list-ol",
  "blockquote",
  "code",
  "separator",
  "link",
  "separator",
  "hr",
  "separator",
  "media",
];

const CreateInfo = () => {
  const GRADE_OPTIONS = [
    { value: "ONE", text: "一年級" },
    { value: "TWO", text: "二年級" },
    { value: "THREE", text: "三年級" },
    { value: "FOUR", text: "四年級" },
    { value: "FIVE", text: "五年級" },
    { value: "SIX", text: "六年級" },
  ];
  const navigate = useNavigate();

  const [about, setAbout] = useState("");
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState("");

  const [nowTime, setNowTime] = useState(moment().format("YYYY-MM-DD"));
  const [successToast, setSuccessToast] = useState(false);
  const goBack = () => {
    navigate(-1);
  };
  const [imageFile, setImageFile] = useState([]);

  const thumbs = imageFile.map((file, index) => (
    <StyledFlexBox
      border="1px dashed #E9E9E9"
      borderRadius="6px"
      width={171}
      height={200}
      justifyContent="center"
      alignItems="center"
      key={file.name}
      overflow="hidden"
      ml={index !== 0 ? "10px" : 0}
    >
      <StyledImage
        height={200}
        maxWidth={171}
        style={{ objectFit: "scale-down" }}
        src={file.preview}
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
      <StyledImage
        src="/images/icon-cancel.svg"
        position="absolute"
        top="5px"
        right="8px"
        cursor="pointer"
        onClick={() => {
          let tmp = [...imageFile];
          tmp.splice(index, 1);
          setImageFile(tmp);
        }}
      />
    </StyledFlexBox>
  ));


  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles, "123")

    setImageFile(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const onCreateInfo = () => {
    const payload = {
      title: title,
      releaseDate: nowTime.replaceAll('-', '/'),
      content: about && about.toHTML(),
      imageFile: imageFile,
      preview: preview
    };
    modifyNewsList(payload).then(({ header }) => {
      if (header.code === SUCCESS_CODE) {
        setSuccessToast(true);
        setTimeout(() => {
          navigate("/Info");
        }, 1000);
      } else {
        alert(header.message);
      }
    });
    navigate(-1);

  };

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
          已完成新增消息
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
          mb={32}
          color="#242731"
          alignItems="center"
          onClick={goBack}
          cursor="pointer"
          width="fit-content"
        >
          <StyledImage src="/images/icon-left.svg" mr="12px" />
          新增消息
        </StyledFlexBox>
        <StyledFlexBox
          bg="#fff"
          width={1144}
          borderRadius="10px"
          boxShadow="0px 2px 20px rgba(0, 0, 0, 0.05)"
          flexDirection="column"
        >
          <StyledFlexBox
            width="100%"
            height={60}
            bg="#8C9EFF"
            color="#fff"
            fontSize={20}
            fontWeight={500}
            alignItems="center"
            pl={24}
            borderRadius="10px 10px 0 0"
            mb={32}
          >
            消息內容
          </StyledFlexBox>
          <StyledFlexBox px={40} flexDirection="column">
            <StyledFlexBox style={{ letterSpacing: "0.1em" }} color="#505050">
              封面圖片上傳
            </StyledFlexBox>
            <StyledFlexBox pt={2}>
              {imageFile.length > 0 ? (
                thumbs
              ) : (
                <FileUpload
                  accept={{
                    "image/*": [".png", ".jpg"],
                  }}
                  onDrop={onDrop}
                >
                  <p>
                    請將檔案拖曳至此
                    <br />
                    或點擊此處上傳圖片
                  </p>
                </FileUpload>
              )}
            </StyledFlexBox>
            <StyledFlexBox style={{ letterSpacing: "0.1em" }} color="#505050">
              發布時間
            </StyledFlexBox>
            <StyledFlexBox>
              <input value={nowTime} onChange={(e) => { setNowTime(e.target.value) }}
                type="date" style={{ width: "100%", padding: "1rem 1rem 1rem 1rem", border: "1px solid #E9E9E9", borderRadius: "10px", marginTop: "1rem" }}></input>
            </StyledFlexBox>
            <StyledFlexBox pt={30} style={{ letterSpacing: "0.1em" }} color="#505050">
              消息標題
            </StyledFlexBox>
            <StyledFlexBox>
              <input value={title} onChange={(e) => { setTitle(e.target.value) }}
                type="text" style={{ width: "100%", padding: "1rem 1rem 1rem 1rem", border: "1px solid #E9E9E9", borderRadius: "10px", marginTop: "1rem" }}></input>
            </StyledFlexBox>
            <StyledFlexBox pt={30} style={{ letterSpacing: "0.1em" }} color="#505050">
              消息預覽
            </StyledFlexBox>
            <StyledFlexBox>
              <input value={preview} onChange={(e) => { setPreview(e.target.value) }} maxLength={25}
                type="text" style={{ width: "100%", padding: "1rem 1rem 1rem 1rem", border: "1px solid #E9E9E9", borderRadius: "10px", marginTop: "1rem" }}></input>
            </StyledFlexBox>
            <StyledFlexBox pt={30} style={{ letterSpacing: "0.1em" }} color="#505050">
              消息內文
            </StyledFlexBox>
            <StyledFlexBox pt={20}>
              <BraftEditor
                value={about}
                onChange={(value) => setAbout(value)}
                language="zh-hant"
                style={{
                  borderRadius: "6px",
                  border: "1px solid #e9e9e9",
                }}
              />
            </StyledFlexBox>
            <StyledFlexBox pt={40} px={10} pb={20} cursor="pointer" justifyContent="end">
              <Link to="/Info">
                <Button style={{ marginLeft: "20px", marginRight: "10px", backgroundColor: "#FFFFFF", border: "1px solid #A7A7A7", color: "#A7A7A7" }} variant="contained" onClick={() => setDetailOpen(false)}
                >取消</Button></Link>
              <Button style={{ marginLeft: "20px", marginRight: "10px" }} variant="contained" onClick={() => onCreateInfo()}
              >確定新增</Button>

            </StyledFlexBox>
          </StyledFlexBox>
        </StyledFlexBox>
      </StyledFlexBox>
    </>
  );
};

export default CreateInfo;
