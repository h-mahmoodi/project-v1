import { Paper, Skeleton } from "@mui/material";

function BeerSkeleton() {
  return (
    <Paper style={{ padding: "20px" }}>
      <Skeleton variant="text" width={400} sx={{ fontSize: "3rem" }} />
      <Skeleton variant="text" width={200} sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" width={400} sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" width={200} sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" width={300} sx={{ fontSize: "1rem" }} />
    </Paper>
  );
}

export default BeerSkeleton;
