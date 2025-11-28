import Link from "next/link";
import Button from "@mui/material/Button";

export default function SignInSideFooter() {
  return (
    <Link href="/">
      <Button variant="outlined" sx={{ mt: 2 }}>
        Back to Landing Page
      </Button>
    </Link>
  );
}