import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import "./style/login.style.css";
import { loginWithEmail, loginWithGoogle } from "../../features/user/userSlice";
import { clearErrors } from "../../features/user/userSlice";
import Loading from "../../common/component/Loading";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  // state을 받아오면 redirect 해줄 링크
  const from = location.state?.from?.pathname || "/";

  const { user, loginError, loading } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (loginError) {
      dispatch(clearErrors());
    }
  }, [navigate]);

  const handleLoginWithEmail = (event) => {
    event.preventDefault();
    dispatch(loginWithEmail({ email, password }));
  };

  const handleGoogleLogin = async (googleData) => {
    //구글 로그인 하기
    dispatch(loginWithGoogle(googleData.credential));
  };

  // 유저 값이 있다면 로그인 페이지를 스킵한다
  useEffect(() => {
    if (user) {
      navigate(from);
    }
  }, [user, navigate, from]);

  return (
    <>
      <Container className="login-area">
        {loading && <Loading />}
        {loginError && (
          <div className="error-message">
            <Alert variant="danger">{loginError}</Alert>
          </div>
        )}
        <Form className="login-form" onSubmit={handleLoginWithEmail}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <div className="display-space-between login-button-area">
            <Button variant="danger" type="submit">
              Login
            </Button>
            <div>
              Don't have an account? <Link to="/register">Sign up</Link>
            </div>
          </div>

          <div className="text-align-center mt-2">
            <p>Log in with other method</p>
            <div className="display-center">
              {/* 
              1. Oauth로그인을 위해서 google api 사이트에 가입하고 클라이언트키, 시크릿키 받아오기
              2. 구글 로그인 버튼 가져오기
              3. 로그인
              4. 백엔드에서 로그인하기
                a. 이미 로그인을 한적이 있는 유저 => 로그인시키고 토큰값 주면 끝
                b. 처음 로그인 시도를 한 유저 => 유저정보 먼저 새로 생성 => 토큰값
              */}
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Login;
