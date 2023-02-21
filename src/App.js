import { ResetStyle, GlobalStyle } from "./components/globalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./containers/Home";
import BookManage from "./containers/BookManage";
import { createTheme, ThemeProvider } from "@mui/material";
import BookCategory from "./containers/BookCategory";
import Opening from "./containers/Opening";
import Member from "./containers/Member";
import BatchMenber from "./containers/Member/batch";
import MemberState from "./containers/Member/MemberTableState";
import Payment from "./containers/Payment";
import Notice from "./containers/Notice";
import NoticeTableExport from "./containers/Notice/NoticeTableExport";
import Invoice from "./containers/Invoice";
import InvoiceTableExport from "./containers/Invoice/InvoiceTableExport";
import Info from "./containers/Info";
import CreateInfo from "./containers/Info/Create";
import EditorInfo from "./containers/Info/Editor";
import Coupon from "./containers/Coupon";
import DealerDiscount from "./containers/DealerDiscount";
import DealerManage from "./containers/DealerManage";
import Settings from "./containers/Settings";
import Login from "./containers/Login";
import ForgetPassword from "./containers/ForgetPassword";
import CreateBook from "./containers/BookManage/Create";
import BatchBook from "./containers/BookManage/batch";
import ModifyBook from "./containers/BookManage/modify";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

function App() {
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            border: "1px solid #fff",
            borderRadius: "100px",
            backgroundColor: "#fff",
            zIndex: -1,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            maxWidth: "fit-content",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            width: "120px",
          },
          containedPrimary: {
            backgroundColor: "#8C9EFF",
            borderRadius: "100px",
            width: 120,
            height: 40,
            fontSize: 14,
            boxShadow: "none",
            "&.Mui-disabled": {
              backgroundColor: "#D7E0FF",
              color: "#fff",
            },
          },
          outlinedPrimary: {
            color: "#A7A7A7",
            borderColor: "#A7A7A7",
          },
          outlined: {
            borderRadius: "100px",
            width: 120,
            height: 40,
            fontSize: 14,
            boxShadow: "none",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          head: {
            height: 80,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            color: "#505050",
          },
          body: {
            color: "#7C7C7C",
            height: 80,
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          colorPrimary: {
            color: "#8C9EFF",
            "&.Mui-checked": {
              color: "#8C9EFF",
            },
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            color: "#505050",
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          standard: {
            alignItems: "center",
            fontSize: "14px",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <div className="App">
          <ResetStyle />
          <GlobalStyle />
          <Router>
            <Routes>
              <Route element={<Home />} path={"/home"} />
              <Route element={<Login />} path={"/"} />
              <Route element={<ForgetPassword />} path={"/forget-password"} />
              <Route>
                <Route element={<CreateBook />} path={"/book-manage/create"} />
                <Route element={<BatchBook />} path={"/book-manage/batch"} />
                <Route element={<ModifyBook />} path={"/book-manage/modify"} />
                <Route element={<BookManage />} path={"*"} />
              </Route>
              <Route element={<BookCategory />} path={"/book-category"} />
              <Route element={<Opening />} path={"/opening"} />
              <Route>
                <Route element={<Member />} path={"/member"} />
                <Route element={<BatchMenber />} path={"/member/batch"} />
                <Route element={<MemberState />} path={"/member/MemberState"} />
              </Route>
              <Route element={<Payment />} path={"/payment"} />
              <Route>
                <Route element={<Notice />} path={"/notice"} />
                <Route element={<NoticeTableExport />} path={"/notice/Export"} />
              </Route>
              <Route>
                <Route element={<Invoice />} path={"/invoice"} />
                <Route element={<InvoiceTableExport />} path={"/invoice/Export"} />
              </Route>
              <Route element={<Info />} path={"/info"} />
              <Route>
                <Route element={<Info />} path={"/info"} />
                <Route element={<CreateInfo />} path={"/info/create"} />
                <Route element={<EditorInfo />} path={"/info/Editor"} />
              </Route>
              <Route element={<Coupon />} path={"/coupon"} />
              <Route element={<DealerDiscount />} path={"/dealer-discount"} />
              <Route element={<DealerManage />} path={"/dealer-manage"} />
              <Route element={<Settings />} path={"/settings"} />
            </Routes>
          </Router>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
