"use client";

import * as React from "react";
import MuiAvatar from "@mui/material/Avatar";
import MuiListItemAvatar from "@mui/material/ListItemAvatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
import Select, { SelectChangeEvent, selectClasses } from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

export default function SelectContent() {
  // Default selection: eTutor Platform
  const [selection, setSelection] = React.useState("lms-platform");

  const handleChange = (event: SelectChangeEvent) => {
    setSelection(event.target.value as string);
  };

  return (
    <Select
      labelId="course-select"
      id="course-simple-select"
      value={selection}
      onChange={handleChange}
      displayEmpty
      inputProps={{ "aria-label": "Select course or platform" }}
      fullWidth
      sx={{
        maxHeight: 56,
        width: 215,
        "&.MuiList-root": { p: "8px" },
        [`& .${selectClasses.select}`]: { display: "flex", alignItems: "center", gap: "2px", pl: 1 },
      }}
    >
      <ListSubheader sx={{ pt: 0 }}>Production</ListSubheader>
      <MenuItem value="web-development">
        <ListItemAvatar>
          <Avatar alt="Web Development">
            <DevicesRoundedIcon sx={{ fontSize: "1rem" }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Web Development" secondary="Frontend & Backend" />
      </MenuItem>
      <MenuItem value="mobile-development">
        <ListItemAvatar>
          <Avatar alt="Mobile Development">
            <SmartphoneRoundedIcon sx={{ fontSize: "1rem" }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Mobile Development" secondary="Android & iOS" />
      </MenuItem>
      <MenuItem value="lms-platform">
        <ListItemAvatar>
          <Avatar alt="eTutor Platform">
            <SchoolRoundedIcon sx={{ fontSize: "1rem" }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="eTutor Platform" secondary="Online Learning" />
      </MenuItem>

      <ListSubheader>Development</ListSubheader>
      <MenuItem value="ai-ml">
        <ListItemAvatar>
          <Avatar alt="AI & ML">
            <ConstructionRoundedIcon sx={{ fontSize: "1rem" }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="AI & ML" secondary="Machine Learning & AI" />
      </MenuItem>

      <Divider sx={{ mx: -1 }} />
      <MenuItem value="add-course">
        <ListItemIcon>
          <AddRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Add new course/module" />
      </MenuItem>
    </Select>
  );
}
