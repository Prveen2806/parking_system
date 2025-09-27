import { App as AntApp, Button, Space } from "antd";
import type { ActionButtonProps } from "./types";
import {
  CloudDownloadOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileExcelOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function ActionButton({
  searchTitle,
  addTitle,
  viewTitle,
  editTitle,
  deleteTitle,
  exportTitle,
  downloadTitle,
  onAdd,
  onView,
  onEdit,
  onDelete,
  onSearch,
  onExport,
  onDownload,
  state,
  searchDisable,
  addDisable,
  viewDisable,
  editDisable,
  deleteDisable,
  exportDisable,
  downloadDisable,
  children,
  deleteBtnProps = {},
  AddBtnProps = {},
  className,
  wrap,
}: ActionButtonProps) {
  const { modal } = AntApp.useApp();
  return (
    <Space wrap={wrap} align="end" className={className}>
      {onSearch && (
        <Button
          type="primary"
          icon={<SearchOutlined />}
          htmlType={typeof onSearch === "boolean" ? "submit" : "button"}
          onClick={(e) => {
            e.stopPropagation();
            if (typeof onSearch === "function") onSearch();
          }}
          disabled={searchDisable}
        >
          {searchTitle ?? "Search"}
        </Button>
      )}

      {onExport && (
        <Button
          icon={<FileExcelOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onExport?.();
          }}
          disabled={exportDisable}
        >
          {exportTitle ?? "Export"}
        </Button>
      )}

      {!onAdd ? null : typeof onAdd === "string" ? (
        <Link to={onAdd} state={state}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={(e) => {
              addDisable && e.stopPropagation();
            }}
            disabled={addDisable}
            {...AddBtnProps}
          >
            {addTitle ?? "Add"}
          </Button>
        </Link>
      ) : (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onAdd?.();
          }}
          disabled={addDisable}
          {...AddBtnProps}
        >
          {addTitle ?? "Add"}
        </Button>
      )}

      {!onView ? null : typeof onView === "string" ? (
        <Link to={onView} state={state}>
          <Button
            type="link"
            icon={<EyeOutlined />}
            disabled={viewDisable}
            onClick={(e) => {
              viewDisable && e.stopPropagation();
            }}
          >
            {viewTitle}
          </Button>
        </Link>
      ) : (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onView?.();
          }}
          disabled={viewDisable}
        >
          {viewTitle}
        </Button>
      )}

      {onDownload && (
        <Button
          type={downloadTitle ? "default" : "link"}
          icon={<CloudDownloadOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onDownload?.();
          }}
          disabled={downloadDisable}
        >
          {downloadTitle}
        </Button>
      )}

      {onEdit && (
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
          disabled={editDisable}
        >
          {editTitle}
        </Button>
      )}

      {onDelete && (
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            modal.confirm({
              title: "Confirm",
              content: "Are you sure you want to delete this item?",
              onOk: onDelete,
              okText: "Yes",
              cancelText: "No",
            });
          }}
          disabled={deleteDisable}
          {...deleteBtnProps}
        >
          {deleteTitle}
        </Button>
      )}
      {children}
    </Space>
  );
}
