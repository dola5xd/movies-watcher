import Spinner from "./_components/Spinner";

function Loading() {
  return (
    <span className="fixed inset-0 w-full h-screen z-50 flex items-center justify-center bg-background ">
      <Spinner />
    </span>
  );
}

export default Loading;
