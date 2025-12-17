export interface UseFetchResultInterface<T> {
  response: T | null;
  error: Error | null;
  loading: boolean;
  resendRequest: () => void;
}