import React from "react";
import {
  useRouterContext,
  TitleProps,
  useLink,
  useRouterType,
} from "@refinedev/core";

import logo from "../../../src/assets/logo.svg";
import record from "../../../src/assets/record.png";
import { Box, Button } from "@mui/material";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  return (
    <Button fullWidth variant="text" disableRipple>
      
      <ActiveLink to="/">
        {collapsed ? (
          <img
            src={logo}
            alt="Record"
            width="28px"
            style={{ maxHeight: "28px" }}
          />
        ) : (
          <img src={record} alt="Record" width="140px" />
        )}
      </ActiveLink>
    </Button >
  );
};
