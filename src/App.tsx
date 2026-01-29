import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

// Owner Portal
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import Tenants from "./pages/owner/Tenants";
import TenantDetail from "./pages/owner/TenantDetail";
import OwnerLicenses from "./pages/owner/OwnerLicenses";
import OwnerGames from "./pages/owner/OwnerGames";
import OwnerReports from "./pages/owner/OwnerReports";
import OwnerSurveys from "./pages/owner/OwnerSurveys";
import OwnerAudit from "./pages/owner/OwnerAudit";

// Admin Portal
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLearners from "./pages/admin/AdminLearners";
import AdminLicenses from "./pages/admin/AdminLicenses";
import AdminGames from "./pages/admin/AdminGames";
import AdminSurveys from "./pages/admin/AdminSurveys";
import AdminReports from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";

// Learner Portal
import LearnerHome from "./pages/learner/LearnerHome";
import PreGameSurvey from "./pages/learner/PreGameSurvey";
import GameLaunch from "./pages/learner/GameLaunch";
import PostGameSurvey from "./pages/learner/PostGameSurvey";
import LearnerResults from "./pages/learner/LearnerResults";
import LearnerProfile from "./pages/learner/LearnerProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          {/* Owner Portal Routes */}
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/owner/tenants" element={<Tenants />} />
          <Route path="/owner/tenants/:id" element={<TenantDetail />} />
          <Route path="/owner/licenses" element={<OwnerLicenses />} />
          <Route path="/owner/games" element={<OwnerGames />} />
          <Route path="/owner/reports" element={<OwnerReports />} />
          <Route path="/owner/surveys" element={<OwnerSurveys />} />
          <Route path="/owner/audit" element={<OwnerAudit />} />
          
          {/* Admin Portal Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/learners" element={<AdminLearners />} />
          <Route path="/admin/licenses" element={<AdminLicenses />} />
          <Route path="/admin/games" element={<AdminGames />} />
          <Route path="/admin/surveys" element={<AdminSurveys />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* Learner Portal Routes */}
          <Route path="/learner" element={<LearnerHome />} />
          <Route path="/learner/pre-survey" element={<PreGameSurvey />} />
          <Route path="/learner/game" element={<GameLaunch />} />
          <Route path="/learner/post-survey" element={<PostGameSurvey />} />
          <Route path="/learner/results" element={<LearnerResults />} />
          <Route path="/learner/profile" element={<LearnerProfile />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
