import { NextPage } from "next";
import React, { useEffect } from "react";
import "swagger-ui-react/swagger-ui.css";
import dynamic from "next/dynamic";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

const RoutesTester: NextPage = () => {
  return <SwaggerUI url="/api/openapi" />;
};

export default RoutesTester;
