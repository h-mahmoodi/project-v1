import { Skeleton } from "@mui/material";

type propsType = {
  count: number;
};
function BeerListItemSkeleton({ count }: propsType) {
  const counter = Array.from({ length: count });
  return (
    <div>
      {counter.map((item, i) => (
        <Skeleton
          key={i}
          variant="text"
          width="300px"
          sx={{ fontSize: "1.8rem", marginLeft: "2rem" }}
        />
      ))}
    </div>
  );
}

export default BeerListItemSkeleton;
