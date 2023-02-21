import {
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import Alert from "../../../components/Alert";
import { useState } from "react";
import { Link } from "react-router-dom";
import { StyledFlexBox } from "../../../styles/Shared.styles";

const EmailForm = () => {
  const [email, setEmail] = useState("");
  return (
    <StyledFlexBox flexDirection="column">
      <StyledFlexBox
        color="#505050"
        fontSize={16}
        fontWeight={500}
        mb="4px"
        ml="8px"
        mt={36}
      >
        Email
      </StyledFlexBox>
      <FormControl
        sx={{
          m: 1,
          width: "336px",
          border: "1px solid #E9E9E9",
          padding: 0,
          borderRadius: "6px",
        }}
        variant="outlined"
      >
        <OutlinedInput
          hiddenLabel
          placeholder="請輸入Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            height: "40px",
          }}
        />
      </FormControl>

      <Button
        variant="contained"
        sx={{ mt: "48px", width: "336px", height: "40px" }}
      >
        發送
      </Button>
      <StyledFlexBox mx="auto" mt={28}>
        <Link to="/login">
          <Button
            variant="text"
            sx={{ color: "#8C9EFF", textDecoration: "underline" }}
          >
            回登入
          </Button>
        </Link>
      </StyledFlexBox>
      <Alert>已發送重設密碼信至「test123@gmail.com」</Alert>
    </StyledFlexBox>
  );
};

export default EmailForm;
