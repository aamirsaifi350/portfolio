import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { AdminLayout } from "@/components/admin/AdminLayout";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Skills from "@/pages/Skills";
import Components from "@/pages/Components";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProjects from "@/pages/admin/AdminProjects";
import AdminComponents from "@/pages/admin/AdminComponents";
import AdminAbout from "@/pages/admin/AdminAbout";
import AdminMessages from "@/pages/admin/AdminMessages";
import AdminMedia from "@/pages/admin/AdminMedia";
import AdminSettings from "@/pages/admin/AdminSettings";

const queryClient = new QueryClient();

function PortfolioRouter() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/projects" component={Projects} />
        <Route path="/projects/:id" component={ProjectDetail} />
        <Route path="/skills" component={Skills} />
        <Route path="/components" component={Components} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function AdminRouter() {
  return (
    <Switch>
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin">
        {() => (
          <ProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/projects">
        {() => (
          <ProtectedRoute>
            <AdminLayout>
              <AdminProjects />
            </AdminLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/components">
        {() => (
          <ProtectedRoute>
            <AdminLayout>
              <AdminComponents />
            </AdminLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/about">
        {() => (
          <ProtectedRoute>
            <AdminLayout>
              <AdminAbout />
            </AdminLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/messages">
        {() => (
          <ProtectedRoute>
            <AdminLayout>
              <AdminMessages />
            </AdminLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/media">
        {() => (
          <ProtectedRoute>
            <AdminLayout>
              <AdminMedia />
            </AdminLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/settings">
        {() => (
          <ProtectedRoute>
            <AdminLayout>
              <AdminSettings />
            </AdminLayout>
          </ProtectedRoute>
        )}
      </Route>
    </Switch>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/admin/login" component={AdminLogin} />

      <Route path="/admin">
        {() => (
          <ProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/admin/projects">
        {() => (
          <ProtectedRoute>
            <AdminLayout>
              <AdminProjects />
            </AdminLayout>
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/admin/components">
        {() => (
          <ProtectedRoute>
            <AdminLayout>
              <AdminComponents />
            </AdminLayout>
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/admin/about">
        {() => (
          <ProtectedRoute>
            <AdminLayout>
              <AdminAbout />
            </AdminLayout>
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/admin/messages">
        {() => (
          <ProtectedRoute>
            <AdminLayout>
              <AdminMessages />
            </AdminLayout>
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/admin/media">
        {() => (
          <ProtectedRoute>
            <AdminLayout>
              <AdminMedia />
            </AdminLayout>
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/admin/settings">
        {() => (
          <ProtectedRoute>
            <AdminLayout>
              <AdminSettings />
            </AdminLayout>
          </ProtectedRoute>
        )}
      </Route>

      <Route>
        <PortfolioRouter />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminAuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </AdminAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
