import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdminStore, ADMIN_ROUTE } from "@/store/adminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, AlertCircle, Mail, Loader2 } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, clearError, isAuthenticated } =
    useAdminStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || `${ADMIN_ROUTE}/dashboard`;

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log("[AdminLogin] Already authenticated, redirecting to:", from);
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!email || !password) {
      return;
    }

    console.log("[AdminLogin] Submitting login form");
    const success = await login(email, password);

    if (success) {
      console.log("[AdminLogin] Login successful, navigating to:", from);
      navigate(from, { replace: true });
    } else {
      console.log("[AdminLogin] Login failed");
      setPassword(""); // Clear password on failed login
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <CardDescription>
            Enter your admin credentials to access the control panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@proproperty.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-lg py-6 pl-10"
                  autoComplete="email"
                  autoFocus
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-lg py-6 pl-10"
                  autoComplete="current-password"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-lg"
              disabled={isLoading || !email || !password}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            This is a secure admin area. Unauthorized access is prohibited.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
