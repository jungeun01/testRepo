import { useState } from "react";

function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  // 함수 선언부에서...args는 배열
  const wrappedFunction = async (...args) => {
    // 함수 실행부에서...args는 스프레드 연산자
    try {
      setError(null);
      setPending(true);
      return await asyncFunction(...args);
    } catch (error) {
      setError(error);
      return;
    } finally {
      setPending(false);
    }
  };
  return [pending, error, wrappedFunction];
}
export default useAsync;
