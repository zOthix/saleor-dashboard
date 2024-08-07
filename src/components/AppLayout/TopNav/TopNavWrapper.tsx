import { Box } from "@saleor/macaw-ui-next";
import React from "react";

import { topBarHeight, direction } from "../consts";

export const TopNavWrapper: React.FC<{ withoutBorder?: boolean }> = ({
  children,
  withoutBorder,
}) => {
  const locale = localStorage.getItem("locale");

  return (
    <Box
      display="flex"
      alignItems="center"
      paddingX={6}
      paddingY={5}
      borderBottomWidth={withoutBorder ? 0 : 1}
      borderBottomStyle="solid"
      borderColor="default1"
      position="relative"
      data-test-id="page-header"
      __height={topBarHeight}
      // __flexDirection={locale === "ar" ? direction : "row"}
      gridColumn="8"
      gridRowStart="1"
      backgroundColor="default1"
    >
      {children}
    </Box>
  );
};
