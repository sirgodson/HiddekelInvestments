import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense, useState, useEffect } from "react";

// Components
import Layout from "@/components/Layout";
import Preloader from "@/components/Preloader";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Stands from "@/pages/Stands";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";

// Admin Pages
import AdminLayout from "@/pages/admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import ManageStands from "@/pages/admin/ManageStands";
import ManageBlog from "@/pages/admin/ManageBlog";
import ManageGallery from "@/pages/admin/ManageGallery";
import ViewMessages from "@/pages/admin/ViewMessages";
import AdminLogin from "@/pages/admin/Login";

import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/stands" component={Stands} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/contact" component={Contact} />
      <Route path="/blog" component={Blog} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" nest>
        <AdminLayout>
          <Route path="/" component={Dashboard} />
          <Route path="/stands" component={ManageStands} />
          <Route path="/blog" component={ManageBlog} />
          <Route path="/gallery" component={ManageGallery} />
          <Route path="/messages" component={ViewMessages} />
        </AdminLayout>
      </Route>
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for preloader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Layout>
          <Suspense fallback={<Preloader />}>
            <Router />
          </Suspense>
        </Layout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
