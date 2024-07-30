import "react-toastify/dist/ReactToastify.min.css";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { HomePage, NotFoundPage } from "./pages/index";
import routes from "./routes";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

let stripePromise: Promise<Stripe | null>;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const App: FC = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Header />
        <Elements stripe={stripePromise}>
          <div className="max-w-screen-xl m-auto ">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {routes.map((route) => (
                <Route
                  path={route.path}
                  element={route.element}
                  key={route.id}
                />
              ))}
              <Route path={"/*"} element={<NotFoundPage />} />
            </Routes>
          </div>
        </Elements>
        <ToastContainer autoClose={8000} position={toast.POSITION.TOP_RIGHT} />
      </div>
    </QueryClientProvider>
  );
};

export default App;
