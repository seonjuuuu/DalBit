import Login from "@/components/Login";
import styles from "./page.module.scss";
import AuthPageLayout from "@/components/common/AuthPageLayout";

const LoginPage = () => {
  return (
    <AuthPageLayout>
      <Login />
    </AuthPageLayout>
  );
};

export default LoginPage;
