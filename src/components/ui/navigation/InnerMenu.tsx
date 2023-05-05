import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { User } from "lucide-react";

type Props = {
  educationName: string;
};

const InnerMenu = ({ educationName }: Props) => {
  const [hasCourse, setHasCourse] = useState<boolean>(true);
  const router = useRouter();

  //change menuItems depending on which route the user is
  useEffect(() => {
    if (router.query.course === undefined) {
      setHasCourse(false);
    }
  }, [router.query.course]);

  return (
    <nav className="w-full flex justify-between items-center border-b mb-4">
      {hasCourse ? (
        <div className="flex gap-2">
          {/* Routes has to be dynamic */}
          <Link
            className="hover:text-primary"
            href={`/dashboard/${router.query.course}`}
          >
            <h2>Uppgifter</h2>
          </Link>
          <Link
            className="hover:text-primary"
            href={`/dashboard/${router.query.course}/students`}
          >
            <h2>Personer</h2>
          </Link>
          <Link
            className="hover:text-primary"
            href={`/dashboard/${router.query.course}/course-info`}
          >
            <h2>Kursinformation</h2>
          </Link>
        </div>
      ) : (
        <h2>
          <span className="font-medium">{educationName} &gt; </span>Kurser
        </h2>
      )}

      {/* Profile icon + text */}
      <div className="flex items-center gap-2">
        <div className=" border-[1px] rounded-full p-1">
          <User height="24px" width="24px" strokeWidth="1" />
        </div>
        <div>
          <p className="text-sm font-medium">John Doe</p>
          <span className="text-xs">Student</span>
        </div>
      </div>
    </nav>
  );
};

export default InnerMenu;
