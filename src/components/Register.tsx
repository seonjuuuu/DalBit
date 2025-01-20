"use client";
import { useForm } from "react-hook-form";
import styles from "./Register.module.scss";
import { useRegisterUser } from "@/api/userMutation";
import { useRouter } from "next/navigation";

type FormData = {
  loginId: string;
  name: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();
  const { mutate, isPending } = useRegisterUser();
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    mutate(
      {
        loginId: data.loginId,
        name: data.name,
        password: data.password
      },
      {
        onSuccess: () => {
          alert("회원가입 승인이 완료되었습니다.");
          router.push("/login");
        },
        onError: (error) => {
          console.error("회원가입 실패:", error);
          alert("회원가입 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
      }
    );
  };

  return (
    <div className={styles.register}>
      <h2 className={styles.title}>회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.inputWrap}>
        <label className={styles.inputBox}>
          <span>아이디</span>
          <input
            type="text"
            {...register("loginId", {
              required: "아이디를 입력해주세요.",
              minLength: {
                value: 3,
                message: "아이디는 3자 이상이어야 합니다."
              }
            })}
          />
        </label>
        {errors.loginId && (
          <p className={styles.error}>{errors.loginId.message}</p>
        )}
        <label className={styles.inputBox}>
          <span>닉네임</span>
          <input
            type="text"
            {...register("name", {
              required: "닉네임을 입력해주세요."
            })}
          />
        </label>
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        <label className={styles.inputBox}>
          <span>비밀번호</span>
          <input
            type="password"
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              minLength: {
                value: 6,
                message: "비밀번호는 6자 이상이어야 합니다."
              }
            })}
          />
        </label>
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
        <label className={styles.inputBox}>
          <span>비밀번호 확인</span>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "비밀번호 확인을 입력해주세요."
            })}
          />
        </label>
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword.message}</p>
        )}
        <div className={styles.btnWrap}>
          <button
            type="submit"
            className={styles.registerBtn}
            disabled={isPending}
          >
            {isPending ? "처리 중..." : "회원가입"}
          </button>
          <button className={styles.loginBtn}>로그인하기</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
