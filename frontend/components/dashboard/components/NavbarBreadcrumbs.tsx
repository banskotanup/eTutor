"use client";

import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { teacherMenu, studentMenu, adminMenu } from "@/components/dashboard/menus";
import useCurrentUser from "@/hooks/useCurrentUser";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));

export default function NavbarBreadcrumbs() {
  const pathname = usePathname() || "/";
  const user = useCurrentUser();

  if (!user) return null; // loading state

  // select menu based on role
  const menu =
    user.role === "admin"
      ? adminMenu
      : user.role === "teacher"
      ? teacherMenu
      : studentMenu;

  // find the most specific menu item matching current path
  const matchedItems = menu
    .filter((item) => pathname === item.href || pathname.startsWith(item.href))
    .sort((a, b) => b.href.length - a.href.length);

  const activeItem = matchedItems[0] || { label: "Page", href: "/" };
  const activeLabel = activeItem.label;
  const dashboardHref = menu?.[0]?.href ?? "/";

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Link href={dashboardHref} style={{ textDecoration: "none", color: "inherit" }}>
        <Typography variant="body1">Dashboard</Typography>
      </Link>

      <Typography variant="body1" sx={{ color: "text.primary", fontWeight: 600 }}>
        {activeLabel}
      </Typography>
    </StyledBreadcrumbs>
  );
}
