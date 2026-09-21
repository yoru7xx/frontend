import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Profil from "./pages/Profil";
import Akademik from "./pages/Akademik";
import Ekstrakurikuler from "./pages/Ekstrakurikuler";
import Fasilitas from "./pages/Fasilitas";
import AdminLogin from "./pages/AdminLogin";
import ArticleCreation from "./pages/ArticleCreation";
import ArticleDetail from "./pages/ArticleDetail";
import AdminDashboard from "./pages/AdminDashboard";
import { useGsapAnimations } from "./hooks/useGsapAnimations";
import { useEffect } from "react";
import { SplashProvider } from "./contexts/SplashContext";

function Router() {
  // Call animations hook here so it runs on every route change
  useGsapAnimations();
  const [location] = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/berita"} component={Articles} />
      <Route path={"/profil"} component={Profil} />
      <Route path={"/akademik"} component={Akademik} />
      <Route path={"/ekstrakurikuler"} component={Ekstrakurikuler} />
      <Route path={"/fasilitas"} component={Fasilitas} />
      <Route path={"/admin/login"} component={AdminLogin} />
      <Route path={"/admin/dashboard"} component={AdminDashboard} />
      <Route path={"/admin/create-article"} component={ArticleCreation} />
      <Route path={"/article/:id"} component={ArticleDetail} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <SplashProvider>
        <ThemeProvider
          defaultTheme="light"
        >
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </SplashProvider>
    </ErrorBoundary>
  );
}

export default App;
