/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, RotateCcw, Trash2, UserRoundPen } from "lucide-react";
import { LoadingSpinner } from "../utils/loading";
import { IDeleteOptionType } from "@/types/global";
import { DELETE_OPTION } from "@/data/constants/global";
import ImageBase from "../image-base/image-base";

interface IProps<T> {
  headers: string[];
  data: T[];
  renderCells: (row: T, rowIndex: number) => React.ReactNode;
  onDetails?: (id: string, row?: T) => void;
  onUpdate?: (id: string, row?: T) => void;
  onDelete?: (id: string, options: IDeleteOptionType, row: T) => void;
  onRestore?: (id: string, row?: T) => void;
  renderActions?: (row: T) => React.ReactNode;
  isLoading?: boolean;
  isNo?: boolean;
  customStyles?: string;
  icons?: {
    details?: React.ReactNode;
    update?: React.ReactNode;
    delete?: React.ReactNode;
    restore?: React.ReactNode;
  };
}

const DataTableComponent = <T extends Record<string, any>>({
  headers,
  data,
  onDetails,
  onUpdate,
  onDelete,
  onRestore,
  customStyles,
  isLoading = false,
  isNo = true,
  renderCells,
  icons,
  renderActions,
}: IProps<T>) => {
  const colSpanRender = headers?.length + (isNo ? 1 : 0) + 1;
  const renderLoading = () => (
    <tr>
      <td colSpan={colSpanRender} className="py-[180px] px-6 text-center">
        <div className="flex justify-center items-center w-full">
          <LoadingSpinner />
        </div>
      </td>
    </tr>
  );

  const renderNoData = () => (
    <tr>
      <td
        colSpan={colSpanRender}
        className="py-6 px-6 text-center text-text-secondary"
      >
        <div className="w-full flex flex-col items-center justify-center">
          <ImageBase
            width={200}
            height={200}
            src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/no-data-2.jpg`}
            alt="no-data-img"
            className=""
          />
          <p className="text-md font-semibold">Opps! Chưa có dữ liệu!</p>
        </div>
      </td>
    </tr>
  );

  const renderTable = () => (
    <table className="w-full">
      <thead>
        <tr className="bg-primary-active text-left text-sm text-primary dark:bg-gray-800 dark:text-white">
          {isNo && <th className="py-5 px-6 text-center max-w-20">STT</th>}
          {headers?.map((item, index) => (
            <th key={index} className="py-5 px-6  border border-gray-50">
              {item}
            </th>
          ))}
          {(onDetails ||
            onDelete ||
            onUpdate ||
            onRestore ||
            renderActions) && (
            <th className="py-5 px-6 text-sm text-center ">Thao tác</th>
          )}
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-800 dark:text-white">
        {isLoading
          ? renderLoading()
          : !data || data?.length <= 0
          ? renderNoData()
          : data?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-200 hover:bg-slate-100 transition-all text-sm text-text-main text-left"
              >
                {/* Render order */}
                {isNo && (
                  <td className="py-3 px-6 font-semibold text-center">
                    {rowIndex + 1}
                  </td>
                )}
                {/* Render cell */}
                {renderCells(row, rowIndex)}
                {/* Render actions */}
                {row?.status === "REMOVED" && onRestore && onDelete ? (
                  <td className="py-3 px-6">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => onRestore(row["_id"] as string, row)}
                        className="text-main hover:text-info-dark"
                        title="Restore button"
                      >
                        <RotateCcw size={24} />
                      </button>
                      <button
                        onClick={() =>
                          onDelete(
                            row["_id"] as string,
                            DELETE_OPTION.HARD,
                            row
                          )
                        }
                        className="text-error hover:text-accent-dark"
                        title="Delete button"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </td>
                ) : onDetails || onDelete || onUpdate || renderActions ? (
                  <td className="py-3 px-6">
                    <div className="flex justify-center gap-3">
                      {onDetails && (
                        <>
                          <button
                            onClick={() => onDetails(row["id"] as string, row)}
                            className="text-text-secondary hover:text-info-dark"
                            title="Details button"
                          >
                            {icons && icons.details ? (
                              icons.details
                            ) : (
                              <Eye size={24} />
                            )}
                          </button>
                        </>
                      )}
                      {onUpdate && (
                        <>
                          <button
                            onClick={() => onUpdate(row["id"] as string, row)}
                            className="text-green-500 hover:text-main-dark"
                            title="Edit button"
                          >
                            {icons && icons.update ? (
                              icons.update
                            ) : (
                              <UserRoundPen size={24} />
                            )}
                          </button>
                        </>
                      )}
                      {onDelete && (
                        <button
                          onClick={() =>
                            onDelete(
                              row["id"] as string,
                              DELETE_OPTION.SOFT,
                              row
                            )
                          }
                          className="text-error-light hover:text-accent-dark"
                          title="Delete button"
                        >
                          {icons && icons.delete ? (
                            icons.delete
                          ) : (
                            <Trash2 size={24} />
                          )}
                        </button>
                      )}
                      {renderActions && renderActions(row)}
                    </div>
                  </td>
                ) : (
                  <></>
                )}
              </tr>
            ))}
      </tbody>
    </table>
  );

  return (
    <div
      className={`overflow-x-auto rounded-xl shadow-lg border ${customStyles}`}
    >
      {renderTable()}
    </div>
  );
};

export default DataTableComponent;
