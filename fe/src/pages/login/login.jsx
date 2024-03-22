import React from "react";
import Layout from "../../components/Layout";
import HeroContainer from "../../components/HeroContainer";
import Title from "../../components/Title";
import { Form, Link } from "react-router-dom";
import useNotification from "../../hooks/useNotification";
import Notify from "../../components/Notify";

function Login() {
  const { notify, notifyMessage } = useNotification();
  return (
    <Layout>
      <HeroContainer>
        {notify && <Notify message={notifyMessage} />}
        <Title title={"Login Akun"} />
        <Form method="post" action="/">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="username"
              placeholder="username"
              className="input input-bordered w-full rounded-md"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="******"
              className="input input-bordered w-full rounded-md"
              required
            />
            <button type="submit" className="btn btn-primary rounded-md">
              Login
            </button>
          </div>
        </Form>
        <Link to={"/register"} className="text-center">
          Or Register Here
        </Link>
      </HeroContainer>
    </Layout>
  );
}

export default Login;
