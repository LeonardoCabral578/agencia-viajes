import { CircularProgress } from "@mui/material";
import React from "react";

export interface SimpleLoaderProps {
  data: {
    data: any;
    isError: any;
    error: any;
    isLoading: any;
    isFetching: any;
  };
  children: React.ReactNode;
}

const SimpleLoader = ({ data, children }: SimpleLoaderProps) => {
  return (
    <>
      {data.isLoading || !data.data ? (
        <>
          <div className="flex items-center justify-center h-60">
            <CircularProgress />
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default SimpleLoader;
