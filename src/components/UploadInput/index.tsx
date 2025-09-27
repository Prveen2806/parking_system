import { CloudDownloadOutlined, InboxOutlined } from "@ant-design/icons";
import useAxios from "@service";
import { App, message, Upload, type UploadFile } from "antd";
import { useMemo } from "react";

type doc = {
  id: number;
  fileName?: string;
  content?: string;
  [key: string]: any;
};

export default function UploadInput({
  value,
  onChange,
  maxCount = 1,
  accept,
  disabled,
  fieldKey,
  fetchUrl,
  fetchDocKey,
  onDelete,
  maxFileSize = 2,
  raw = false,
}: {
  value?: doc[];
  onChange?: (value: doc[]) => void;
  maxCount?: number;
  accept?: string;
  disabled?: boolean;
  fieldKey?: { fileName?: string; content?: string };
  fetchUrl?: string;
  fetchDocKey?: string;
  onDelete?: (id: UploadFile<any>) => void;
  maxFileSize?: number;
  raw?: boolean;
}) {
  const { modal } = App.useApp();
  const [request, , ] = useAxios<any>({});
  const uploader = useMemo(
    () => (
      <Upload.Dragger
        disabled={disabled || (value?.length ?? 0) > maxCount}
        accept={accept}
        maxCount={maxCount}
        multiple={false}
        customRequest={() => {}}
        onRemove={onDelete}
        onChange={async ({ fileList }: any) => {
          const files: doc[] = [];
          for (const file of fileList) {
            if (file?.originFileObj?.size > maxFileSize * 1024 * 1024) {
              return message.error(
                `File size must be less than ${maxFileSize}MB`
              );
            }
            const content = file?.content
              ? file?.content
              : await new Promise<string | ArrayBuffer | null>((resolve) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file.originFileObj);
                  reader.onload = () => resolve(reader.result);
                  reader.onerror = () => resolve(null);
                });
            if (content) {
              const result = {
                id: file?.id || 0,
                [fieldKey?.fileName || "fileName"]: file.name,
                [fieldKey?.content || "content"]: content,
              };
              if (raw) {
                result["file"] = file.originFileObj;
              }
              files.push(result);
            }
          }

          onChange?.(files);
        }}
        fileList={
          value
            ?.filter((e) => e) // removes null/undefined
            .map((e, i) => ({
              id: e.id ?? 0,
              uid: (e[fieldKey?.fileName || "fileName"] || "") + i,
              name: e[fieldKey?.fileName || "fileName"] || "",
              status: "done",
              content: e[fieldKey?.content || "content"] || "",
              url: e[fieldKey?.content || "content"] || "",
            })) || []
        }
        listType="picture"
        onPreview={async (file: any) => {
          let url = file.url; // Assuming file.url already contains the base64 string
          if (!url && fetchUrl) {
            try {
              const res = await request({ url: fetchUrl + file.id });
              url = (res?.[0] || res)[
                fetchDocKey || "content"
              ]; // Assuming content is already base64
            } catch (error) {
              message.error("Failed to fetch file");
            }
          }
          const isImage = /\.(jpeg|jpg|png|gif|bmp|webp|svg)$/i.test(file.name);
          modal.confirm({
            icon: null,
            closable: true,
            maskClosable: true,
            title: `Preview ${file.name}`,
            width: isImage ? 800 : 1080,
            centered: true,
            content: (
              <div
                style={{ maxHeight: 1250, height: "80vh", textAlign: "center" }}
              >
                {isImage ? (
                  <img
                    src={url ?? ""}
                    alt={file.name}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                ) : (
                  <iframe
                    src={url ?? ""}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                  />
                )}
              </div>
            ),
            okText: "Download",
            okButtonProps: {
              icon: <CloudDownloadOutlined />,
            },
            cancelText: "Close",
            onOk() {
              const link = document.createElement("a");
              link.href = url ?? "";
              link.download = file.name;
              link.click();
              link.remove();
            },
          });
        }}
      >
        {disabled ? (
          <span>File upload disabled</span>
        ) : (
          <>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload. Max {maxCount} file
              {maxCount > 1 ? "s" : ""} allowed
            </p>
          </>
        )}
      </Upload.Dragger>
    ),
    [value, disabled]
  );

  return (
    <>
      {uploader}
      {/* < loading={loading} /> */}
    </>
  );
}
