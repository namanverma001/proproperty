import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdminStore, ADMIN_ROUTE } from "@/store/adminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, AlertCircle, User } from "lucide-react";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAdminStore();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || `${ADMIN_ROUTE}/dashboard`;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Simulate a small delay for security
        setTimeout(() => {
            const success = login(username, password);
            if (success) {
                navigate(from, { replace: true });
            } else {
                setError("Invalid username or password. Please try again.");
                setPassword("");
            }
            setIsLoading(false);
        }, 500);
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
                            <Label htmlFor="username">Admin ID</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter admin ID"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="text-lg py-6 pl-10"
                                    autoComplete="username"
                                    autoFocus
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
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-6 text-lg"
                            disabled={isLoading || !username || !password}
                        >
                            {isLoading ? "Verifying..." : "Login"}
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
