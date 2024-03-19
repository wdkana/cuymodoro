import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useActionData } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import HeroContainer from "../../components/HeroContainer";
import AddTaskForm from "../../components/AddTaskForm";
import Title from "../../components/Title";
import Notify from "../../components/Notify";

import "../../App.css";

const queryClient = new QueryClient();

function HomePage() {
  const actionData = useActionData();
  const [notify, setNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState(false);

  useEffect(() => {
    localStorage.setItem("username", "admin");
    if (actionData?.data?.id) {
      setNotify(true);
      setNotifyMessage(actionData?.data?.message);
    }
  }, [actionData]);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <HeroContainer>
          {notify && <Notify message={notifyMessage} />}
          <Title title={"Cuymodoro"} />
          <AddTaskForm />
        </HeroContainer>
      </Layout>
    </QueryClientProvider>
  );
}

export default HomePage;
