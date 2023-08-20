import { RouterProvider } from "react-router-dom";
import Routers from "./Router/Routers";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

// Create a client
const queryClient = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={Routers} />
            </QueryClientProvider>
        </>
    );
}

export default App;
