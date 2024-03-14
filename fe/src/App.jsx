import "./App.css";
import Hero from "./components/hero";
import Layouts from "./components/layouts";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layouts>
        <Hero />
      </Layouts>
    </QueryClientProvider>
  );
}

export default App;
