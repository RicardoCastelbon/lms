// pages/401.tsx
import { useRouter } from "next/router";
import Image from "next/image";
import img from "../assets/images/404.png";

const NotFound: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image src={img} width={600} alt="not found" />
      <button
        className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-200 hover:text-primary"
        onClick={() => router.push("/")}
      >
        Go back to Home
      </button>
    </div>
  );
};

export default NotFound;
