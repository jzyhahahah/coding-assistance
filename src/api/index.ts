/**
 * 错误处理函数
 */
export const useErrorHandler = (params?: { path: string }) => {
  return (error: any) => console.log(params?.path, error);
};
