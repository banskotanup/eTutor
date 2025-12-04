// components/dashboard/NavbarBreadcrumbs.js
"use client";

import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { teacherMenu, studentMenu, adminMenu } from "@/components/dashboard/menus";

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

export default function NavbarBreadcrumbs({ role = "admin" }) {
  const pathname = usePathname() || "/";
  // choose menu based on role
  const menu =
    role === "admin" ? adminMenu : role === "teacher" ? teacherMenu : studentMenu;

  // Matching strategies:
  // 1) exact match
  let activeItem = menu.find((item) => item.href === pathname);

  // 2) startsWith match (good for nested routes, e.g. /admin/subjects/123)
  if (!activeItem) {
    activeItem = menu.find((item) => pathname.startsWith(item.href));
  }

  // 3) longest href match among those that startWith pathname (prefer most specific)
  if (!activeItem) {
    const starts = menu.filter((item) => pathname.startsWith(item.href));
    if (starts.length > 0) {
      // pick the longest href (most specific)
      starts.sort((a, b) => b.href.length - a.href.length);
      activeItem = starts[0];
    }
  }

  // 4) fallback to first menu entry (so it never shows "Unknown Page")
  if (!activeItem && menu.length > 0) {
    activeItem = menu[0];
  }

  const activeLabel = activeItem?.label ?? "Page";
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
