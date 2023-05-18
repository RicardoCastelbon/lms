import React, { useEffect, useState } from "react";
import UserLayout from "@/src/components/ui/UserLayout";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/src/common/auth";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { serverRouter } from "@/src/server/routers";
import { createContext } from "@/src/server/context";
import { Exercise } from "@prisma/client";
import parse from "html-react-parser";
import Link from "next/link";
import { useRouter } from "next/router";
type Props = {
  exercise: Exercise;
};

const ExercisePage = ({ exercise }: Props) => {
  const [desktopVersion, setdesktopVersion] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState<number>();
  const router = useRouter();

  useEffect(() => {
    if (window.innerWidth > 1023) {
      setdesktopVersion(true);
    } else {
      setdesktopVersion(false);
    }
  }, []);

  useEffect(() => {
    function getScreenSize() {
      if (typeof window !== "undefined") {
        if (window.innerWidth > 1023) {
          setdesktopVersion(true);
        } else {
          setdesktopVersion(false);
        }
      }
    }
    window.addEventListener("resize", getScreenSize);

    return () => {
      window.removeEventListener("resize", getScreenSize);
    };
  }, [screenWidth]);

  return (
    <UserLayout>
      <div className="flex">
        <div className="lg:w-1/4 bg-violet-200 p-5">
          <div className="flex justify-between">
            <Link href={`/dashboard/${router.query.course}`}>
              <div className="hover:text-indigo-400">
                <ArrowLeft />
              </div>
            </Link>
            {exercise && (
              <h1 className="text-xl font-semibold mb-5">{exercise.title}</h1>
            )}
            <ArrowRight />
          </div>
          {exercise && <div>{parse(exercise.content)} </div>}
        </div>
        {desktopVersion && (
          <div className="lg:w-9/12 bg-slate-300">
            <h1 className="text-2xl mt-10 text-center">HERE GOES THE TEST</h1>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

/* getServerSideProps */

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const currentSession = await getServerSession(
    context.req,
    context.res,
    nextAuthOptions
  );

  //Set up a trpc helper, needed for serverSide fetching
  const helpers = createServerSideHelpers({
    router: serverRouter,
    ctx: await createContext(context),
  });
  //might have to cast context to string
  const slug = String(context.params.slug);

  //fetch the exercise by slug
  const res = await helpers.exercise.getExerciseBySlug.fetch({
    exerciseSlug: slug,
  });

  //Needed to serialize Date objects for createdAt + updatedAt otherwise error is thrown
  const exercise = JSON.parse(JSON.stringify(res.exercise));

  console.log(typeof exercise.content);

  return {
    props: {
      session: currentSession,
      exercise: exercise,
    },
  };
};

export default ExercisePage;
