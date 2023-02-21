import { StyledFlexBox, StyledImage } from "../../styles/Shared.styles";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <StyledFlexBox
      width={448}
      height={613}
      mx="auto"
      pt={64}
      bg="#fff"
      flexDirection="column"
      alignItems="center"
      mt="calc(50vh - 300px)"
      boxShadow="0px 2px 20px rgba(0, 0, 0, 0.05)"
      borderRadius="16px"
    >
      <StyledImage
        src="/images/logo-admin.png"
        width={110}
        height={110}
        mb={27}
      />
      <StyledFlexBox
        lineHeight="36px"
        fontSize={24}
        color="#8c9eff"
        fontWeight={700}
      >
        Ebook電子書管理後台
      </StyledFlexBox>
      <LoginForm />
    </StyledFlexBox>
  );
};
export default Login;
