import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Layout from "../../components/Layout";
import HeroContainer from "../../components/HeroContainer";
import AddTaskForm from "../../components/AddTaskForm";
import Title from "../../components/Title";
import Notify from "../../components/Notify";
import useNotification from "../../hooks/useNotification";

import "../../App.css";

const queryClient = new QueryClient();

function HomePage() {
  const { notify, notifyMessage } = useNotification();

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
