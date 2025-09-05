import { ErrorPageBase } from "@/components/common/utils/no-data";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center dark:text-gray-300">
      <ErrorPageBase
        statusCode="404"
        title="Trang không tồn tại!"
        description="Opps!. Rất tiếc trang này không tồn tại! Hãy thử lại sau nhé!"
      />
    </div>
  );
}
