"use client";
import { useForm } from "react-hook-form";

import styles from "./Login.module.scss";
import { LoginParams, useLoginUser } from "@/api/userMutation";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginParams>();
  const { mutate, isPending, error } = useLoginUser();

  const router = useRouter();

  const onSubmit = (data: LoginParams) => {
    mutate(
      {
        loginId: data.loginId,
        password: data.password
      },
      {
        onSuccess: (response) => {
          Cookies.set("jwtToken", response.token, { expires: 7 });
          alert("로그인 성공");
          router.push("/");
        },
        onError: (error) => {
          console.error("로그인실패", error);
          alert("로그인 실패하였습니다. 다시 시도해주세요");
        }
      }
    );
  };
  return (
    <div className={styles.login}>
      <h2 className={styles.title}>로그인</h2>
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
        <div className={styles.btnWrap}>
          <button
            type="submit"
            className={styles.loginBtn}
            disabled={isPending}
          >
            {isPending ? "처리 중..." : "로그인"}
          </button>
          <button
            type="button"
            className={styles.registerBtn}
            onClick={() => router.push("/register")}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
