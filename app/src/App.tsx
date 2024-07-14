import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import "./App.css";
import Rotas from "./rotas";

import { createBrowserHistory } from "history";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const history = createBrowserHistory({ window });

const queryCliente = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryCliente}>
      <HistoryRouter history={history}>
        <Rotas />
      </HistoryRouter>
    </QueryClientProvider>
  );
}

export default App;
