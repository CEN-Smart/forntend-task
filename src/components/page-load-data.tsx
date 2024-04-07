import { FadeLoader } from 'react-spinners';
const PageLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <FadeLoader color="#2563EB" />
    </div>
  );
};

export default PageLoading;
