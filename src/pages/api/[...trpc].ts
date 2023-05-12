import { NextApiRequest, NextApiResponse } from "next";
import { createOpenApiNextHandler } from "trpc-openapi";

import { serverRouter } from "../../server/routers/index";
import { createContext } from "../../server/context";
import SuperJSON from "superjson";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Handle incoming OpenAPI requests
  return createOpenApiNextHandler({
    router: serverRouter,
    createContext,
  })(req, res);
};

export default handler;
