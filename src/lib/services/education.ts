import { trpc } from "@/src/common/trpc";

//Not used! - Niclas
export const getEducationById = async (id: string | number | null) => {
  if (!id) {
    console.log("no id");
  }
};
