import {
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { Link } from "react-router-dom";
import { login } from "../../../api/Login";
import { StyledFlexBox, StyledImage } from "../../../styles/Shared.styles";
import { useState, useEffect } from "react";

const LoginForm = () => {
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    login(username, password);
    if (remember === true)
      localStorage.setItem('UserRemember', JSON.stringify(username))
    else
      localStorage.removeItem('UserRemember');
  };
  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem('UserRemember')))
  }, []);
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
        帳號
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          sx={{
            height: "40px",
          }}
          InputProps={{
            background: "transparent",
            startAdornment: (
              <InputAdornment position="start">
                <StyledImage src="/images/icon-username.svg" />
              </InputAdornment>
            ),
          }}
          startAdornment={
            <InputAdornment position="start">
              <StyledImage src="/images/icon-username.svg" />
            </InputAdornment>
          }
        />
      </FormControl>
      <StyledFlexBox
        color="#505050"
        fontSize={16}
        fontWeight={500}
        mb="4px"
        ml="8px"
        mt={16}
      >
        密碼
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
          type={showPassword ? "text" : "password"}
          id="input-with-icon-textfield"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            height: "40px",
            "&-internal-autofill-selected": { background: "transparent" },
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? (
                  <StyledImage src="/images/icon-hide.svg" />
                ) : (
                  <StyledImage src="/images/icon-unhide.svg" />
                )}
              </IconButton>
            </InputAdornment>
          }
          startAdornment={
            <InputAdornment position="start">
              <StyledImage src="/images/icon-password.svg" />
            </InputAdornment>
          }
        />
      </FormControl>
      <StyledFlexBox justifyContent="space-between">
        <StyledFlexBox color="#a7a7a7" alignItems="center">
          <Checkbox
            checked={remember}
            sx={{
              color: "#8C9EFF",
              "&.Mui-checked": {
                color: "#8C9EFF",
              },
            }}
            onClick={(e) => setRemember(e.target.checked)}
          />
          記住我
        </StyledFlexBox>
        <Link to="/forget-password">
          <Button
            variant="text"
            sx={{ color: "#8C9EFF", textDecoration: "underline" }}
          >
            忘記密碼
          </Button>
        </Link>
      </StyledFlexBox>
      <Button
        disabled={!username || !password}
        variant="contained"
        sx={{ mt: "48px", width: "336px", height: "40px" }}
        onClick={onLogin}
      >
        登入
      </Button>
    </StyledFlexBox>
  );
};

export default LoginForm;
