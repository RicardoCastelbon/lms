// pages/401.tsx
import { useRouter } from "next/router";

const Unauthorized: React.FC = () => {
  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-2xl font-semibold mb-4'>401 - Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <button
        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'
        onClick={() => router.push("/")}
      >
        Go back to Home
      </button>
    </div>
  );
};

export default Unauthorized;
