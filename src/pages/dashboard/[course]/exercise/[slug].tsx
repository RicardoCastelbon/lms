import React from "react";
import UserLayout from "@/src/components/ui/UserLayout";
import { ArrowLeft, ArrowRight } from "lucide-react";
type Props = {};

const ExercisePage = (props: Props) => {
  return (
    <UserLayout>
      <div className="flex">
        <div className="w-1/4 bg-violet-200 p-5">
          <div className="flex">
            <ArrowLeft />
            <h1 className="text-xl font-semibold mb-5">
              React / Skapa ett project i React
            </h1>
            <ArrowRight />
          </div>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In sunt at
            blanditiis illo dignissimos explicabo beatae error corrupti vero
            dolorem impedit aliquam suscipit, aspernatur enim eligendi?
            Cupiditate impedit fugit distinctio delectus repellat possimus,
            quam, molestias consequuntur fugiat dicta officia tenetur.
          </p>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In sunt at
            blanditiis illo dignissimos explicabo beatae error corrupti vero
            dolorem impedit aliquam suscipit, aspernatur enim eligendi?
            Cupiditate impedit fugit distinctio delectus repellat possimus,
            quam, molestias consequuntur fugiat dicta officia tenetur.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In sunt at
            blanditiis illo dignissimos explicabo beatae error corrupti vero
            dolorem impedit aliquam suscipit, aspernatur enim eligendi?
            Cupiditate impedit fugit distinctio delectus repellat possimus,
            quam, molestias consequuntur fugiat dicta officia tenetur.
          </p>
        </div>
        <div className="w-9/12 h-screen bg-gray-500"></div>
      </div>
    </UserLayout>
  );
};

/* getServerSideProps */
export default ExercisePage;
