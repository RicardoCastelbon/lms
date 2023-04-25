// import { NextApiResponse, NextApiRequest,NextApiHandler } from "next";
// import { getSession } from "next-auth/react";
// import { TRPCError } from "@trpc/server";
// import { Role } from "@prisma/client";

// export const isAdminMiddleware = (handler: NextApiHandler): NextApiHandler => {
//   return async (req: NextApiRequest, res: NextApiResponse) => {
//     const session = await getSession({ req });

//     if (!session || session.user.role !== Role.ADMIN) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     return handler(req, res);
//   };
// };
import React from 'react'

function adminMiddleware() {
  return (
    <div>adminMiddleware</div>
  )
}

export default adminMiddleware