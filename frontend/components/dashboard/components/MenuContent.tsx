"use client";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Next.js 13 hook
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";

interface MenuItem {
  label: string;
  href: string;
}

interface MenuContentProps {
  menu?: MenuItem[];
}

const iconMap: Record<string, React.ReactNode> = {
  Home: <HomeRoundedIcon />,
  "My Subjects": <AnalyticsRoundedIcon />,
  "My Courses": <SchoolRoundedIcon />,
  Assignments: <AssignmentRoundedIcon />,
  "Live Classes": <PeopleRoundedIcon />,
  Attendance: <AnalyticsRoundedIcon />,
  Users: <PeopleRoundedIcon />,
  Subjects: <SettingsRoundedIcon />,
  Payments: <PaymentRoundedIcon />,
  Salaries: <InfoRoundedIcon />,
  Settings: <SettingsRoundedIcon />,
  About: <InfoRoundedIcon />,
  Feedback: <HelpRoundedIcon />,
};

export default function MenuContent({ menu = [] }: MenuContentProps) {
  const pathname = usePathname(); // current route

  const mainListItems = menu;
  const secondaryListItems = [
    { label: "Settings", href: "/settings" },
    { label: "About", href: "/about" },
    { label: "Feedback", href: "/feedback" },
  ];

  // Function to check if a menu item is active
  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      {/* Main Menu */}
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <Link
              href={item.href}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton selected={isActive(item.href)}>
                {iconMap[item.label] && (
                  <ListItemIcon>{iconMap[item.label]}</ListItemIcon>
                )}
                <ListItemText primary={item.label} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

      {/* Secondary Menu */}
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <Link
              href={item.href}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton selected={isActive(item.href)}>
                {iconMap[item.label] && (
                  <ListItemIcon>{iconMap[item.label]}</ListItemIcon>
                )}
                <ListItemText primary={item.label} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
