import {
  Avatar,
  Box,
  Container,
  createTheme,
  FormControl,
  Grid,
  styled,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "./App.css";
import Button from "@mui/material/Button";

const MyButton = styled(Button)`
  border: 2px solid red;
  color: red;
  background-color: #fff;
`;

const CustomButton = () => {};

function App() {
  const theme = createTheme();
  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <FormControl component="fieldset">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    name="email"
                    id="email"
                    label="이메일 주소"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    name="password"
                    id="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="rePassword"
                    name="rePassword"
                    id="password"
                    label="비밀번호 재입력"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                회원가입
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
