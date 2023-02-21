import { StyledFlexBox, StyledImage } from "../../styles/Shared.styles";
import { useEffect, useState } from "react";
import HeaderDetail from "./HeaderDetail";

const Header = () => {
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <StyledFlexBox
      bg="#fff"
      justifyContent="space-between"
      px={24}
      height={52}
      position="fixed"
      width="100%"
    >
      <HeaderDetail
        open={detailOpen}
        setDetailOpen={setDetailOpen}
      />
      <StyledImage src="/images/logo.svg" width={126} />
      <StyledFlexBox alignItems="center" onClick={() => { setDetailOpen(true) }}>
        <StyledImage borderRadius="50%" width={32} height={32} mr="8px" />
        <div>
          <StyledFlexBox
            fontSize={12}
            color="#505050"
            fontWeight={500}
            mb="2px"
            fontFamily="Noto Sans TC"
          >
            Admin
          </StyledFlexBox>
          <StyledFlexBox fontSize={12} color="#A7a7a7" fontWeight={500}>
            管理員
          </StyledFlexBox>
        </div>
      </StyledFlexBox>
    </StyledFlexBox>
  );
};

export default Header;
