import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import React from "react";
const SkeletonUi = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack>
        <Skeleton
          variant="rounded"
          className="Skeleton-image"
          style={{ width: "100%" }}
        />
        <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
      </Stack>
    </Box>
  );
};
export default SkeletonUi;
