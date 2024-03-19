import React from "react";
import Layout from "../../components/Layout";
import HeroContainer from "../../components/HeroContainer";
import Title from "../../components/Title";
import { Form } from "react-router-dom";

function Login() {
  return (
    <Layout>
      <HeroContainer>
        <Title title={"Login Akun"} />
        <Form method="post" action="/">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="username"
              placeholder="username"
              className="input input-bordered w-full rounded-md"
            />
            <input
              type="password"
              name="password"
              placeholder="******"
              className="input input-bordered w-full rounded-md"
            />
            <button type="submit" className="btn btn-primary rounded-md">
              Login
            </button>
          </div>
        </Form>
      </HeroContainer>
    </Layout>
  );
}

export default Login;
