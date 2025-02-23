import Skeleton from "@mui/material/Skeleton";

export default function BlogSkeleton() {
  return (
    <div className="flex flex-col mr-1 p-2 border border-slate-300 rounded-md max-w-full min-h-[30%] ">
      <div className="flex gap-2 items-center h-full ">
        <Skeleton variant="circular" sx={{ width: "3rem", height: "3rem" }} />
        <div className="flex flex-col w-full">
          <Skeleton animation="wave" className="w-3/4 sm:w-2/4" />
          <Skeleton animation="wave" className="w-1/4 sm:w-1/4" />
        </div>
      </div>
      <Skeleton animation="wave" className="w-full" sx={{ height: "3rem" }} />
      <Skeleton animation="wave" className="w-full" sx={{ height: "3rem" }} />
      <Skeleton animation="wave" className="w-full" sx={{ height: "3rem" }} />
    </div>
  );
}
