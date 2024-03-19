import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Layouts from "../../components/layouts";
import HeroContainer from "../../components/HeroContainer";
import AddTaskForm from "../../components/AddTaskForm";
import Title from "../../components/Title";

import "../../App.css";

const queryClient = new QueryClient();

function HomePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layouts>
        <HeroContainer>
          <Title title={"Cuymodoro"} />
          <AddTaskForm />
        </HeroContainer>
      </Layouts>
    </QueryClientProvider>
  );
}

export default HomePage;
