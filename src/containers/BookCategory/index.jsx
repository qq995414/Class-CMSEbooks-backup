import { Button } from "@mui/material";
import { useState,useEffect } from "react";

import Header from "../../components/Header";
import LeftBar from "../../components/LeftBar";
import { StyledFlexBox, StyledImage } from "../../styles/Shared.styles";
import BookContent from "./BookContent";

const BookCategory = () => {

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
          圖書分類設定
        </StyledFlexBox>
        
        <BookContent />
      </StyledFlexBox>
    </>
  );
};

export default BookCategory;
