import { useState, useEffect } from "react";
import { StyledFlexBox, StyledImage, StyledText } from "../../../styles/Shared.styles";
import {
  fetchCategorySelect,
  ModifyCategorySelect,
  DeleteCategorySelect,
  ModifySubjectSelect,
  DeleteSubjectSelect,
  fetchSubjectSelect,
  ModifyVersion,
  fetchVersionSelect,
  DeleteVersion
} from "../../../api/Category";
import {
  Alert,
  Button,
  Snackbar,
} from "@mui/material";

const BookContent = () => {
  const [selected, setSelected] = useState("PHYSICAL");
  const [data, setData] = useState([]);
  const [subId, setsubId] = useState(1);
  const [subName, setSubName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectId, setSubjectId] = useState("");

  const [versionName, setVersionName] = useState("");
  const [versionId, setVersionId] = useState("");
  const [NewSubName, setNewSubName] = useState("");
  const [newVersion, setNewVersion] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [subject, setSubject] = useState([]);
  const [version, setVersion] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [AlertMessage, setAlertMessage] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const [deleteSuccessToast, setDeleteSuccessToast] = useState(false);

  useEffect(() => {
    fetchCategorySelect({
      type: selected,
    }).then(({ data }) => {
      setData(data);
      setsubId(data[0].id)
      setSubName(data[0].name);
      updateSubject();

    });
  }, [selected]);
  useEffect(() => {
    fetchSubjectSelect({
      category_id: subId,
    }).then(({ data }) => {
      setSubject(data);
    });
    fetchVersionSelect({
      category_id: subId,
    }).then(({ data }) => {
      setVersion(data);
    });
  }, [subId]);

  const closeModal = () => {
    setModal(false);
  };
  const updateSubject = () => {
    fetchSubjectSelect({
      category_id: subId,
    }).then(({ data }) => {
      setSubject(data);
    });

    fetchVersionSelect({
      category_id: subId,
    }).then(({ data }) => {
      setVersion(data);
    });
  };

  const ITEMS = [
    {
      text: "實體書",
      value: "PHYSICAL",
    },
    {
      text: "電子書",
      value: "EBOOK",
    },
  ];

  const categoryName = (data) => {
    setSubName(data.name);
    setsubId(data.id)
  };
  const NewCategory = () => {
    ModifyCategorySelect({ type: selected, name: NewSubName }).then(({ data }) => {
      setNewSubName("");
      fetchCategorySelect({
        type: selected,
      }).then(({ data }) => {
        setData(data);
        updateSubject();
        setAlertMessage("已新增分類")
        setSuccessToast(true)
      });

      closeModal();
    });
  };
  const editorCategory = () => {
    ModifyCategorySelect({ type: selected, name: subName, id: subId }).then(({ data }) => {
      fetchCategorySelect({
        type: selected,
      }).then(({ data }) => {
        setData(data);
        updateSubject();
        setAlertMessage("已編輯此分類")
        setSuccessToast(true)
      });
      closeModal();
    });
  };
  const deleteCategory = () => {
    DeleteCategorySelect({ id: subId }).then(({ data }) => {
      fetchCategorySelect({
        type: selected,
      }).then(({ data }) => {
        setData(data);
        updateSubject();
        setDeleteSuccessToast("已刪除此分類")
        setSuccessToast(true)
      });
      closeModal();
    });
  };
  const NewSubject = () => {
    ModifySubjectSelect({ category_id: subId, name: newSubject }).then(({ data }) => {
      setNewSubject("");
      fetchCategorySelect({
        type: selected,
        category_id: subId
      }).then(({ data }) => {
        updateSubject();
        setAlertMessage("已新增此科目")
        setSuccessToast(true)
      });
      closeModal();
    });
  };
  const editorSubject = () => {
    ModifySubjectSelect({ category_id: subId, name: subjectName, id: subjectId }).then(({ data }) => {
      fetchCategorySelect({
        type: selected,
      }).then(({ data }) => {
        fetchCategorySelect({
          type: selected,
          category_id: subId
        }).then(({ data }) => {
          updateSubject();
          setAlertMessage("已編輯此科目")
          setSuccessToast(true)
        });
      });
      closeModal();
    });
  };
  const deleteSubject = () => {
    DeleteSubjectSelect({ id: subjectId }).then(({ data }) => {
      fetchCategorySelect({
        type: selected,
        category_id: subId
      }).then(({ data }) => {
        updateSubject();
        setAlertMessage("已刪除此科目")
        setDeleteSuccessToast(true)
        console.log()
      });
      closeModal();
    });
  };

  const NewVersion = () => {
    ModifyVersion({ category_id: subId, name: newVersion }).then(({ data }) => {
      setNewSubject("");
      updateSubject();
      closeModal();
      setAlertMessage("已新增此版本")
      setSuccessToast(true)
    });
  };
  const editorVersion = () => {
    ModifyVersion({ category_id: subId, name: versionName, id: versionId }).then(({ data }) => {
      updateSubject();
      closeModal();
      setAlertMessage("已編輯此版本")
      setSuccessToast(true)
    });
  };
  const deleteVersion = () => {
    DeleteVersion({ id: versionId }).then(({ data }) => {
      fetchCategorySelect({
        type: selected,
        category_id: subId
      }).then(({ data }) => {
        updateSubject();
        setAlertMessage("已刪除此分類")
        setDeleteSuccessToast(true)
        console.log()
      });
      closeModal();
    });
  };
  const openModal = (e) => {
    setModal(true);
    setModalType(e)
  }
  const openModalSubject = (e, subject) => {
    console.log(subject.name, ",", subject.id)
    setModal(true);
    setModalType(e);
    setSubjectName(subject.name)
    setSubjectId(subject.id)
  }
  const openModalVersion = (e, version) => {
    console.log(version.name, ",", version.id)
    setModal(true);
    setModalType(e);
    setVersionName(version.name)
    setVersionId(version.id)
  }
  return (
    <><StyledFlexBox p="10px" justifyContent="flex-end">
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={deleteSuccessToast}
        autoHideDuration={3000}
        onClose={() => setDeleteSuccessToast(false)}
      >
        <Alert severity="warning" sx={{ width: "100%" }}>
          {AlertMessage}
        </Alert>
      </Snackbar>
      <Button
        variant="contained"
        onClick={() => openModal("editorCategory")}
        sx={{
          backgroundColor: "#A3D951",
          ml: "24px",
          "&:hover": {
            background: "#92C66A",
          },
        }}
      >
        編輯分類
      </Button>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#8C9EFF", ml: "24px" }}
        onClick={() => openModal("newCategory")}
      >
        + 新增分類
      </Button>
    </StyledFlexBox><StyledFlexBox flexDirection="column">

        {modal === true && modalType === "editorCategory" ?
          <div style={{ position: "fixed", zIndex: "100", backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyItems: "center", left: "0px", top: "0px", width: "100vw", height: "100vh" }}>
            <div style={{ position: "fixed", backgroundColor: "#FFFFFF", width: "30%", left: "35%", top: "20%", borderRadius: "20px" }}>
              <StyledFlexBox
                justifyContent="space-between"
                px={50}
                pt={30}
                fontFamily="Noto Sans TC"
              >
                <StyledText
                  color="#252525"
                  fontSize="16px"
                  px={1}
                  py={1}
                  style={{ fontWeight: "700" }}

                >
                  編輯分類
                </StyledText>
                <StyledImage width="20px" src="/images/icon-categoryuRemove.svg" onClick={() => openModal("deleteCategory")}
                />
              </StyledFlexBox>
              <StyledFlexBox
                borderRadius="10px 10px 0px 0px"
                px={50}
                pt={40}
                fontFamily="Noto Sans TC"
              >
                <StyledText
                  color="#FB4A4A"
                  fontSize="14px"
                >
                  *
                </StyledText>
                <StyledText
                  color="#505050"
                  fontSize="14px"
                  pl={1}
                >
                  分類名稱
                </StyledText>

              </StyledFlexBox>
              <StyledFlexBox
                px={50}
                pt={10}

              >
                <input value={subName}
                  onChange={(e) => setSubName(e.target.value)}
                  style={{ border: "1px solid #E9E9E9", padding: "0.5rem 0rem 0.5rem 0.5rem", fontSize: "14px", width: "100%", borderRadius: "5px" }} />

              </StyledFlexBox>
              <StyledFlexBox
                px={50}
                pt={80}
                pb={40}
              >
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#FFFFFF", ml: "24px", color: "#A7A7A7", border: "1px solid #A7A7A7", width: "40%" }}
                  onClick={closeModal}
                >
                  取消
                </Button><Button
                  variant="contained"
                  sx={{ backgroundColor: "#8C9EFF", ml: "24px", width: "40%" }}
                  onClick={() => editorCategory()}
                >
                  儲存
                </Button>
              </StyledFlexBox>
            </div>
          </div>
          : ""}


        {modal === true && modalType === "newCategory" ?
          <div style={{ position: "fixed", zIndex: "100", backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyItems: "center", left: "0px", top: "0px", width: "100vw", height: "100vh" }}>
            <div style={{ position: "fixed", backgroundColor: "#FFFFFF", width: "30%", left: "35%", top: "20%", borderRadius: "20px" }}>
              <StyledFlexBox
                justifyContent="space-between"
                px={50}
                pt={30}
                fontFamily="Noto Sans TC"
              >
                <StyledText
                  color="#252525"
                  fontSize="16px"
                  px={1}
                  py={1}
                  style={{ fontWeight: "700" }}

                >
                  新增分類
                </StyledText>
              </StyledFlexBox>
              <StyledFlexBox
                borderRadius="10px 10px 0px 0px"
                px={50}
                pt={40}
                fontFamily="Noto Sans TC"
              >
                <StyledText
                  color="#FB4A4A"
                  fontSize="14px"
                >
                  *
                </StyledText>
                <StyledText
                  color="#505050"
                  fontSize="14px"
                  pl={1}
                >
                  分類名稱
                </StyledText>

              </StyledFlexBox>
              <StyledFlexBox
                px={50}
                pt={10}

              >
                <input value={NewSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  style={{ border: "1px solid #E9E9E9", padding: "0.5rem 0rem 0.5rem 0.5rem", fontSize: "14px", width: "100%", borderRadius: "5px" }} />

              </StyledFlexBox>
              <StyledFlexBox
                px={50}
                pt={80}
                pb={40}
              >
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#FFFFFF", ml: "24px", color: "#A7A7A7", border: "1px solid #A7A7A7", width: "40%" }}
                  onClick={closeModal}
                >
                  取消
                </Button>
                {NewSubName === "" ?
                  <Button variant="contained" sx={{ backgroundColor: "#D7E0FF", ml: "24px", width: "40%" }} >確定新增
                  </Button> :
                  <Button variant="contained" sx={{ backgroundColor: "#8C9EFF", ml: "24px", width: "40%" }} onClick={() => NewCategory()} >確定新增
                  </Button>

                }

              </StyledFlexBox>
            </div>
          </div>
          : ""}

        {modal === true && modalType === "deleteCategory" ?
          <div style={{ position: "fixed", zIndex: "100", backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyItems: "center", left: "0px", top: "0px", width: "100vw", height: "100vh" }}>
            <div style={{ position: "fixed", backgroundColor: "#FFFFFF", width: "30%", left: "35%", top: "20%", borderRadius: "20px" }}>
              <StyledFlexBox
                justifyContent="center"
                alignItems="center"
                px={50}
                pt={30}
                fontFamily="Noto Sans TC"
              >
                <StyledText
                  color="#FB4A4A"
                  fontSize="16px"
                  px={1}
                  py={1}
                  style={{ fontWeight: "700" }}

                >
                  是否刪除「{subName}」分類？
                </StyledText>
              </StyledFlexBox>
              <StyledFlexBox
                justifyContent="center"
                alignItems="center"
                px={50}
                pt={30}
                fontFamily="Noto Sans TC"
              >
                <StyledText
                  color="#7C7C7C"
                  fontSize="14px"
                  px={1}
                  py={1}
                  style={{ fontWeight: "700" }}

                >
                  確定刪除後將無法復原，是否仍執行此動作？
                </StyledText>
              </StyledFlexBox>

              <StyledFlexBox
                px={50}
                pt={80}
                pb={40}
              >
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#FFFFFF", ml: "24px", color: "#A7A7A7", border: "1px solid #A7A7A7", width: "40%" }}
                  onClick={closeModal}
                >
                  取消
                </Button><Button
                  variant="contained"
                  sx={{ backgroundColor: "#8C9EFF", ml: "24px", width: "40%" }}
                  onClick={() => deleteCategory()}
                >
                  刪除
                </Button>
              </StyledFlexBox>
            </div>
          </div>
          : ""}


        {modal === true && modalType === "newSubject" ?
          <div style={{ position: "fixed", zIndex: "100", backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyItems: "center", left: "0px", top: "0px", width: "100vw", height: "100vh" }}>
            <div style={{ position: "fixed", backgroundColor: "#FFFFFF", width: "30%", left: "35%", top: "20%", borderRadius: "20px" }}>
              <StyledFlexBox
                justifyContent="space-between"
                px={50}
                pt={30}
                fontFamily="Noto Sans TC"
              >
                <StyledText
                  color="#252525"
                  fontSize="16px"
                  px={1}
                  py={1}
                  style={{ fontWeight: "700" }}

                >
                  新增科目
                </StyledText>
              </StyledFlexBox>
              <StyledFlexBox
                borderRadius="10px 10px 0px 0px"
                px={50}
                pt={40}
                fontFamily="Noto Sans TC"
              >
                <StyledText
                  color="#FB4A4A"
                  fontSize="14px"
                >
                  *
                </StyledText>
                <StyledText
                  color="#505050"
                  fontSize="14px"
                  pl={1}
                >
                 科目名稱
                </StyledText>

              </StyledFlexBox>
              <StyledFlexBox
                px={50}
                pt={10}

              >
                <input value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  style={{ border: "1px solid #E9E9E9", padding: "0.5rem 0rem 0.5rem 0.5rem", fontSize: "14px", width: "100%", borderRadius: "5px" }} />

              </StyledFlexBox>
              <StyledFlexBox
                px={50}
                pt={80}
                pb={40}
              >
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#FFFFFF", ml: "24px", color: "#A7A7A7", border: "1px solid #A7A7A7", width: "40%" }}
                  onClick={closeModal}
                >
                  取消
                </Button>
                {newSubject === "" ?
                  <Button variant="contained" sx={{ backgroundColor: "#D7E0FF", ml: "24px", width: "40%" }} >確定新增
                  </Button> :
                  <Button variant="contained" sx={{ backgroundColor: "#8C9EFF", ml: "24px", width: "40%" }} onClick={() => NewSubject()} >確定新增
                  </Button>

                }

              </StyledFlexBox>
            </div>
          </div>
          : ""}
        {modal === true && modalType === "editorSubject" ?
          <div style={{ position: "fixed", zIndex: "100", backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyItems: "center", left: "0px", top: "0px", width: "100vw", height: "100vh" }}>
            <div style={{ position: "fixed", backgroundColor: "#FFFFFF", width: "30%", left: "35%", top: "20%", borderRadius: "20px" }}>
              <StyledFlexBox
                justifyContent="space-between"
                px={50}
                pt={30}
                fontFamily="Noto Sans TC"
              >
                <StyledText
                  color="#252525"
                  fontSize="16px"
                  px={1}
                  py={1}
                  style={{ fontWeight: "700" }}

                >
                  編輯科目
                </StyledText>
                <StyledImage width="20px" src="/images/icon-categoryuRemove.svg" onClick={() => openModal("deleteSubject")}
                />
              </StyledFlexBox>
              <StyledFlexBox
                borderRadius="10px 10px 0px 0px"
                px={50}
                pt={40}
                fontFamily="Noto Sans TC"
              >
                <StyledText
                  color="#FB4A4A"
                  fontSize="14px"
                >
                  *
                </StyledText>
                <StyledText
                  color="#505050"
                  fontSize="14px"
                  pl={1}
                >
                  科目名稱
                </StyledText>

              </StyledFlexBox>
              <StyledFlexBox
                px={50}
                pt={10}

              >
                <input value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  style={{ border: "1px solid #E9E9E9", padding: "0.5rem 0rem 0.5rem 0.5rem", fontSize: "14px", width: "100%", borderRadius: "5px" }} />

              </StyledFlexBox>
              <StyledFlexBox
                px={50}
                pt={80}
                pb={40}
              >
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#FFFFFF", ml: "24px", color: "#A7A7A7", border: "1px solid #A7A7A7", width: "40%" }}
                  onClick={closeModal}
                >
                  取消
                </Button><Button
                  variant="contained"
                  sx={{ backgroundColor: "#8C9EFF", ml: "24px", width: "40%" }}
                  onClick={() => editorSubject()}
                >
                  儲存
                </Button>
              </StyledFlexBox>
            </div>
          </div>
          : ""}
        {modal === true && modalType === "deleteSubject" ?
          <div style={{ position: "fixed", zIndex: "100", backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyItems: "center", left: "0px", top: "0px", width: "100vw", height: "100vh" }}>
            <div style={{ position: "fixed", backgroundColor: "#FFFFFF", width: "30%", left: "35%", top: "20%", borderRadius: "20px" }}>
              <StyledFlexBox
                justifyContent="center"
                alignItems="center"
                px={50}
                pt={30}
                fontFamily="Noto Sans TC"
              >
                <StyledText
                  color="#FB4A4A"
                  fontSize="16px"
                  px={1}
                  py={1}
                  style={{ fontWeight: "700" }}

                >
                  是否刪除「{subjectName}」科目？
                </StyledText>
              </StyledFlexBox>
              <StyledFlexBox
                justifyContent="center"
                alignItems="center"
                px={50}
                pt={30}
                fontFamily="Noto Sans TC"
              >
                <StyledText
                  color="#7C7C7C"
                  fontSize="14px"
                  px={1}
                  py={1}
                  style={{ fontWeight: "700" }}

                >
                  確定刪除後將無法復原，是否仍執行此動作？
                </StyledText>
              </StyledFlexBox>

              <StyledFlexBox
                px={50}
                pt={80}
                pb={40}
              >
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#FFFFFF", ml: "24px", color: "#A7A7A7", border: "1px solid #A7A7A7", width: "40%" }}
                  onClick={closeModal}
                >
                  取消
                </Button><Button
                  variant="contained"
                  sx={{ backgroundColor: "#8C9EFF", ml: "24px", width: "40%" }}
                  onClick={() => deleteSubject()}
                >
                  刪除
                </Button>
              </StyledFlexBox>
            </div>
          </div>
          : ""}

        {modal === true && modalType === "editorVersion" ?
          <div style={{ position: "fixed", zIndex: "100", backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyItems: "center", left: "0px", top: "0px", width: "100vw", height: "100vh" }}>
            <div style={{ position: "fixed", backgroundColor: "#FFFFFF", width: "30%", left: "35%", top: "20%", borderRadius: "20px" }}>
              <StyledFlexBox
                justifyContent="space-between"
                px={50}
                pt={30}
                fontFamily="Noto Sans TC"
              >
                <StyledText
                  color="#252525"
                  fontSize="16px"
                  px={1}
                  py={1}
                  style={{ fontWeight: "700" }}

                >
                  編輯版本
                </StyledText>
                <StyledImage width="20px" src="/images/icon-categoryuRemove.svg" onClick={() => openModal("deleteVersion")}
                />
              </StyledFlexBox>
              <StyledFlexBox
                borderRadius="10px 10px 0px 0px"
                px={50}
                pt={40}
                fontFamily="Noto Sans TC"
              >
                <StyledText
                  color="#FB4A4A"
                  fontSize="14px"
                >
                  *
                </StyledText>
                <StyledText
                  color="#505050"
                  fontSize="14px"
                  pl={1}
                >
                  版本名稱
                </StyledText>

              </StyledFlexBox>
              <StyledFlexBox
                px={50}
                pt={10}

              >
                <input value={versionName}
                  onChange={(e) => setVersionName(e.target.value)}
                  style={{ border: "1px solid #E9E9E9", padding: "0.5rem 0rem 0.5rem 0.5rem", fontSize: "14px", width: "100%", borderRadius: "5px" }} />

              </StyledFlexBox>
              <StyledFlexBox
                px={50}
                pt={80}
                pb={40}
              >
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#FFFFFF", ml: "24px", color: "#A7A7A7", border: "1px solid #A7A7A7", width: "40%" }}
                  onClick={closeModal}
                >
                  取消
                </Button><Button
                  variant="contained"
                  sx={{ backgroundColor: "#8C9EFF", ml: "24px", width: "40%" }}
                  onClick={() => editorVersion()}
                >
                  儲存
                </Button>
              </StyledFlexBox>
            </div>
          </div>
          : ""}
        {modal === true && modalType === "newVersion" ?
          <div style={{ position: "fixed", zIndex: "100", backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyItems: "center", left: "0px", top: "0px", width: "100vw", height: "100vh" }}>
            <div style={{ position: "fixed", backgroundColor: "#FFFFFF", width: "30%", left: "35%", top: "20%", borderRadius: "20px" }}>
              <StyledFlexBox
                justifyContent="space-between"
                px={50}
                pt={30}
                fontFamily="Noto Sans TC"
              >
                <StyledText
                  color="#252525"
                  fontSize="16px"
                  px={1}
                  py={1}
                  style={{ fontWeight: "700" }}

                >
                  新增版本
                </StyledText>
              </StyledFlexBox>
              <StyledFlexBox
                borderRadius="10px 10px 0px 0px"
                px={50}
                pt={40}
                fontFamily="Noto Sans TC"
              >
                <StyledText
                  color="#FB4A4A"
                  fontSize="14px"
                >
                  *
                </StyledText>
                <StyledText
                  color="#505050"
                  fontSize="14px"
                  pl={1}
                >
                  版本名稱
                </StyledText>

              </StyledFlexBox>
              <StyledFlexBox
                px={50}
                pt={10}

              >
                <input value={newVersion}
                  onChange={(e) => setNewVersion(e.target.value)}
                  style={{ border: "1px solid #E9E9E9", padding: "0.5rem 0rem 0.5rem 0.5rem", fontSize: "14px", width: "100%", borderRadius: "5px" }} />

              </StyledFlexBox>
              <StyledFlexBox
                px={50}
                pt={80}
                pb={40}
              >
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#FFFFFF", ml: "24px", color: "#A7A7A7", border: "1px solid #A7A7A7", width: "40%" }}
                  onClick={closeModal}
                >
                  取消
                </Button>
                {newVersion === "" ?
                  <Button variant="contained" sx={{ backgroundColor: "#D7E0FF", ml: "24px", width: "40%" }} >確定新增
                  </Button> :
                  <Button variant="contained" sx={{ backgroundColor: "#8C9EFF", ml: "24px", width: "40%" }} onClick={() => NewVersion()} >確定新增
                  </Button>

                }

              </StyledFlexBox>
            </div>
          </div>
          : ""}
        {modal === true && modalType === "deleteVersion" ?
          <div style={{ position: "fixed", zIndex: "100", backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyItems: "center", left: "0px", top: "0px", width: "100vw", height: "100vh" }}>
            <div style={{ position: "fixed", backgroundColor: "#FFFFFF", width: "30%", left: "35%", top: "20%", borderRadius: "20px" }}>
              <StyledFlexBox
                justifyContent="center"
                alignItems="center"
                px={50}
                pt={30}
                fontFamily="Noto Sans TC"
              >
                <StyledText
                  color="#FB4A4A"
                  fontSize="16px"
                  px={1}
                  py={1}
                  style={{ fontWeight: "700" }}

                >
                  是否刪除「{versionName}」版本？
                </StyledText>
              </StyledFlexBox>
              <StyledFlexBox
                justifyContent="center"
                alignItems="center"
                px={50}
                pt={30}
                fontFamily="Noto Sans TC"
              >
                <StyledText
                  color="#7C7C7C"
                  fontSize="14px"
                  px={1}
                  py={1}
                  style={{ fontWeight: "700" }}

                >
                  確定刪除後將無法復原，是否仍執行此動作？
                </StyledText>
              </StyledFlexBox>

              <StyledFlexBox
                px={50}
                pt={80}
                pb={40}
              >
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#FFFFFF", ml: "24px", color: "#A7A7A7", border: "1px solid #A7A7A7", width: "40%" }}
                  onClick={closeModal}
                >
                  取消
                </Button><Button
                  variant="contained"
                  sx={{ backgroundColor: "#8C9EFF", ml: "24px", width: "40%" }}
                  onClick={() => deleteVersion()}
                >
                  刪除
                </Button>
              </StyledFlexBox>
            </div>
          </div>
          : ""}
        <StyledFlexBox ml="4px">
          {ITEMS.map((item) => (
            <StyledFlexBox
              key={item.value}
              borderRadius="10px 10px 0px 0px"
              bg={selected === item.value ? "#8C9EFF" : "#f6f6f6"}
              color={selected === item.value ? "#fff" : "#A7A7A7"}
              width={120}
              height={40}
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              onClick={() => setSelected(item.value)}
            >
              {item.text}
            </StyledFlexBox>
          ))}
        </StyledFlexBox>
        <StyledFlexBox
          bg="#fff"
          borderRadius="10px"
          minWidth={1144}
          minHeight={736}
          py={24}
          mb={60}
        >
          <div style={{ width: "20%" }}>
            {data.map((data) => (
              <div className={data.id === subId ? "category-active" : "category"} onClick={() => categoryName(data)}>
                {data.name}
              </div>
            ))}
          </div>
          <div style={selected === "PHYSICAL" ? { width: "30%", backgroundColor: "#F5F6FD", marginTop: "2rem" } : { width: "60%", backgroundColor: "#F5F6FD", marginTop: "2rem" }}>
            <StyledFlexBox
              alignItems="center"
              justifyContent="space-between"
              color="#505050"
              pt={20}
              px={20}
              pb={20}
              mx={20}
              style={{ fontSize: "18px" }}
            >
              科目
              <Button
                variant="contained"
                sx={{ backgroundColor: "#8C9EFF", ml: "24px" }}
                onClick={() => openModal("newSubject")}
              >
                + 新增科目
              </Button>
            </StyledFlexBox>
            {subject.map((subject) => (
              <StyledFlexBox
                borderRadius="10px"
                bg="#FFFFFF"
                color="#7C7C7C"
                alignItems="center"
                justifyContent="space-between"
                px={30}
                py={10}
                mx={10}
                my={10}
                style={{ fontSize: "14px" }}>
                {subject.name}

                <Button
                  variant="contained"
                  onClick={() => openModalSubject("editorSubject", subject)}

                  sx={{
                    backgroundColor: "#A3D951",
                    width: "90px",
                    ml: "10px",
                    "&:hover": {
                      background: "#92C66A",
                    },
                  }}
                >
                  編輯
                </Button>
              </StyledFlexBox>
            ))}
          </div>
          {selected === "PHYSICAL" ? <div style={{ width: "30%", backgroundColor: "#F5F6FD", marginLeft: "10%", marginTop: "2rem" }}>
            <StyledFlexBox
              alignItems="center"
              justifyContent="space-between"
              color="#505050"
              pt={20}
              px={20}
              pb={20}
              mx={20}
              style={{ fontSize: "18px" }}
            >
              版本
              <Button
                variant="contained"
                sx={{ backgroundColor: "#8C9EFF", ml: "24px" }}
                onClick={() => openModal("newVersion")}

              >
                + 新增版本
              </Button>
            </StyledFlexBox>
            {version.map((version) => (
              <StyledFlexBox
                borderRadius="10px"
                bg="#FFFFFF"
                color="#7C7C7C"
                alignItems="center"
                justifyContent="space-between"
                px={30}
                py={10}
                mx={10}
                my={10}
                style={{ fontSize: "14px" }}>
                {version.name}
                <Button
                  variant="contained"
                  onClick={() => openModalVersion("editorVersion", version)}

                  sx={{
                    backgroundColor: "#A3D951",
                    width: "90px",
                    ml: "10px",
                    "&:hover": {
                      background: "#92C66A",
                    },
                  }}
                >
                  編輯
                </Button>
              </StyledFlexBox>
            ))}
          </div> : ""}
        </StyledFlexBox>
      </StyledFlexBox></>
  );
};

export default BookContent;
