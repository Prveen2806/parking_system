enum methods {
  "get" = "get",
  "post" = "post",
  "put" = "put",
  "delete" = "delete",
}

export type endpointType = {
  url: string;
  method: methods;
  baseURL?: string;
  withCredentials?: boolean;
};

export const endpoints={
    SCANZAPWITHURL: {
    url: "/api/vl/create/scanConfiguration",
    method: methods.post,
  },
  GET_REPORT:{
    url:'/api/vl/download',
    method:methods.get
  }
}
export type endpointsType = keyof typeof endpoints;