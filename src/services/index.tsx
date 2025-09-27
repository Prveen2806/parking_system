import type { AxiosError, AxiosRequestConfig } from "axios";
import { endpoints, type endpointsType, type endpointType } from "./endpoints";
import axios from "axios";
import { useRef, useState } from "react";
import { App as AntApp } from "antd";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
export interface axiosConfig<R> extends AxiosRequestConfig<any> {
  path?: string;
  data?: R | FormData;
}

export default function useAxios<T = undefined, R = undefined>({
  endpoint,
  showSuccessMsg = false,
  hideErrorMsg = false,
  successMsg = "",
  initialData,
  initialLoading = false,
  successStatusCode = 200,
  payload,
  successCb,
}: {
  endpoint?: endpointsType;
  showSuccessMsg?: boolean;
  hideErrorMsg?: boolean;
  successMsg?: string;
  initialData?: T;
  initialLoading?: boolean;
  successStatusCode?: number;
  payload?: R | FormData;
  successCb?: () => void;
}) {
  const { message } = AntApp.useApp();
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState(initialLoading);
  const controller = useRef<AbortController | null>(null);
  const { url, method } = endpoint
    ? (endpoints[endpoint] as endpointType)
    : {};
  const request = async (config?: axiosConfig<R> & { rawResponse?: boolean }, cb?: (resData: T) => void) => {
    try {
      if (controller.current) {
        controller.current.abort();
      }
      setLoading(() => true);
      controller.current = new AbortController();
      const signal = controller.current.signal;
      const res = await axios.request({
        method: config?.method || method,
        url: url + (config?.path ?? ""),
        data: config?.data || payload,
        timeout: 1 * 60000,
        headers: {
          ...(config?.data instanceof FormData || payload instanceof FormData
            ? {}
            : { "Content-Type": "application/json" }),
          ...(config?.headers || {}),
        },
        signal, // Add the signal to the request config
        ...config,
      })
      if (
        res.status === successStatusCode &&
        (res.data?.success ?? res?.data?.result?.success) !== false
      ) {
        successCb?.();
        (cb ? cb : setData)(res?.data || null);
        showSuccessMsg &&
          message.success(
            (res?.data?.message ?? res?.data?.result?.message) || successMsg,
            10
          );
      } else {
        const errorMessage =
          (res?.data?.message ?? res?.data?.result?.message) ||
          "Internal error";
        if (!hideErrorMsg) {
          message.error(errorMessage, 10);
        }
      }
      setLoading(() => false);
      return config?.rawResponse ? res : (res.data as T);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request cancelled", err.message);
      } else {
        const axiosErr = err as AxiosError<any>;
        const errorMessage =
          axiosErr.response?.data?.message ||
          axiosErr.message ||
          "Something went wrong";
        if (!hideErrorMsg) {
          message.error(errorMessage);
        }
      }
      setLoading(() => false);
    }
    setLoading(() => false);
  }
  return [request, data, loading, setData, setLoading] as const;

}