import { message } from "antd";
import dayjs from "dayjs";
import xlsx from "json-as-xlsx";

export default function exportJson<T = any>(
  fileName: string,
  sheets: {
    sheet?: string;
    columns: {
      label: string;
      value: string | ((row: T) => any);
      format?: string;
    }[];
    content: T[];
  }[]
) {
  xlsx(
    sheets as any,
    {
      fileName: `${fileName}_${dayjs().format("YYYY_MM_DD_hh:mm:ss")}`,
      writeMode: "writeFile",
    },
    () => message.success("Exported successfully")
  );
}
