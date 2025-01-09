import Register from "@/components/Register";
import styles from "./page.module.scss";
import AuthPageLayout from "@/components/common/AuthPageLayout";

const RegisterPage = () => {
  return (
    <AuthPageLayout>
      <Register />
    </AuthPageLayout>
  );
};

export default RegisterPage;
