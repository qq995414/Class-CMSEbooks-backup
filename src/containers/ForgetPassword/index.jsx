import { StyledFlexBox, StyledImage } from "../../styles/Shared.styles";
import EmailForm from "./EmailForm";

const ForgetPassword = () => {
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
        忘記密碼
      </StyledFlexBox>
      <StyledFlexBox
        mt={34}
        lineHeight="26px"
        fontSize={16}
        color="#505050"
        fontWeight={500}
        width={336}
      >
        輸入你的帳號(Email)，系統將會發送重設密碼信件至信箱中。
      </StyledFlexBox>
      <EmailForm />
    </StyledFlexBox>
  );
};
export default ForgetPassword;
