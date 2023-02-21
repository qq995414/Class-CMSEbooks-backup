import { StyledFlexBox } from "../../styles/Shared.styles";

const Alert = ({ children }) => {
  return (
    <StyledFlexBox
      width="100%"
      height="100vh"
      position="fixed"
      zIndex={10}
      bg="rgba(37, 37, 37, 0.4)"
      top={0}
      left={0}
    >
      <StyledFlexBox
        bg="#fff"
        borderRadius="4px"
        boxShadow="0px 2px 20px rgba(0, 0, 0, 0.05)"
        p="9px 16px"
        color="#505050"
        lineHeight="20px"
        height="fit-content"
        mt={300}
        mx="auto"
      >
        {children}
      </StyledFlexBox>
    </StyledFlexBox>
  );
};

export default Alert;
