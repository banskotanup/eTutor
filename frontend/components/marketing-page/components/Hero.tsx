import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled, keyframes } from "@mui/material/styles";

const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// const StyledBox = styled("div")(({ theme }) => ({
//   alignSelf: "center",
//   width: "100%",
//   height: 400,
//   marginTop: theme.spacing(8),
//   borderRadius: (theme.vars || theme).shape.borderRadius,
//   outline: "6px solid",
//   outlineColor: "hsla(220, 25%, 80%, 0.2)",
//   border: "1px solid",
//   borderColor: (theme.vars || theme).palette.grey[200],
//   boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
//   backgroundImage: `url(${
//     process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
//   }/static/screenshots/material-ui/getting-started/templates/dashboard.jpg)`,
//   backgroundSize: "cover",
//   animation: `${fadeSlideUp} 1.4s ease-out`,
//   [theme.breakpoints.up("sm")]: {
//     marginTop: theme.spacing(10),
//     height: 700,
//   },
//   ...theme.applyStyles("dark", {
//     boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
//     backgroundImage: `url(${
//       process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
//     }/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg)`,
//     outlineColor: "hsla(220, 20%, 42%, 0.1)",
//     borderColor: (theme.vars || theme).palette.grey[700],
//   }),
// }));

const StyledBox = styled("div")(({ theme }) => ({
  alignSelf: "center",
  width: "100%",
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: "6px solid",
  outlineColor: "hsla(220, 25%, 80%, 0.2)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",

  // 👉 Your custom LMS image
  backgroundImage: `url("/images/lms.jpg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  animation: `${fadeSlideUp} 1.4s ease-out`,

  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(10),
    height: 700,
  },

  // Dark mode (same image but darker)
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
    backgroundImage: `url("/images/lms.jpg")`,
    filter: "brightness(0.8)",
    outlineColor: "hsla(220, 20%, 42%, 0.1)",
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={3}
          useFlexGap
          sx={{
            alignItems: "center",
            width: { xs: "100%", sm: "70%" },
            animation: `${fadeSlideUp} 1s ease-out`,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              fontSize: "clamp(2.4rem, 8vw, 3.5rem)",
            }}
          >
            Learn Smarter, Anytime, Anywhere
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                display: "block",
                mt: 1,
                fontSize: "clamp(2.4rem, 8vw, 3.8rem)",
                fontWeight: 800,
                color: "primary.main",
                ...theme.applyStyles("dark", {
                  color: "primary.light",
                }),
              })}
            >
              with Virtual Education Hub
            </Typography>
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              width: { sm: "100%", md: "75%" },
              fontSize: "1.15rem",
              animation: `${fadeSlideUp} 1.4s ease-out`,
            }}
          >
            Join our online tuition classes and get personalized learning, interactive lessons,
            and expert guidance from experienced tutors all from the comfort of your home.
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              pt: 1,
              alignItems: "center",
              animation: `${fadeSlideUp} 1.6s ease-out`,
            }}
          >
            ⭐⭐⭐⭐⭐
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              pt: 1,
              alignItems: "center",
              animation: `${fadeSlideUp} 1.6s ease-out`,
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>Loved by Students & Parents</Typography>
            <Typography color="text.secondary">Nepal</Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="center"
            sx={{
              pt: 4,
              width: "100%",
              animation: `${fadeSlideUp} 1.8s ease-out`,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: 7,
                py: 1.8,
                fontSize: "1.1rem",
                fontWeight: 600,
                borderRadius: "12px",
                textTransform: "none",
              }}
            >
              Join Now
            </Button>
          </Stack>
        </Stack>

        <StyledBox id="image" />
      </Container>
    </Box>
  );
}
