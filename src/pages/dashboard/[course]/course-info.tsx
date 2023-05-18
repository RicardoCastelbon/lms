import { nextAuthOptions } from "@/src/common/auth";
import UserLayout from "@/src/components/ui/UserLayout";
import { serverRouter } from "@/src/server/routers";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { createContext } from "@/src/server/context";
import { Course } from "@prisma/client";
import parse from "html-react-parser";

type Props = {
  course: Course;
};

const CourseInfo = ({ course }: Props) => {
  console.log(course);

  return (
    <>
      <UserLayout>
        <div className="flex flex-col-reverse lg:flex lg:flex-row justify-between ">
          <div className="course-info-wrapper">
            {course && parse(course.content)}
          </div>
          <div>
            <h3 className="font-semibold text-xl mr-5">Poäng</h3>
            {course && <span>{course.points}</span>}
          </div>
        </div>
      </UserLayout>
    </>
  );
};

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
  const slug = String(context.params.course);

  //fetch the course from params to get the courseId
  const course = await helpers.course.getCourseBySlug.fetch({
    courseSlug: slug,
  });

  const courseData = JSON.parse(JSON.stringify(course));

  return {
    props: {
      session: currentSession,
      course: courseData.course,
    },
  };
};

export default CourseInfo;
