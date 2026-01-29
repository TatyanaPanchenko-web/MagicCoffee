import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/store";

export default function Redirect({ children }: { children: JSX.Element }) {
  const { userInfo, loadingStatus } = useAppSelector((state) => state.user);

  if (!loadingStatus) return;

  if (!userInfo) {
    return <Navigate to="/" replace />;
  }

  return children;
}
