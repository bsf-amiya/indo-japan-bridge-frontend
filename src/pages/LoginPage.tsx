import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
        const response = await fetch(
          "http://187.127.135.180:1881/users/login",
          // "http://localhost:1881/users/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          }
        );

      const data = await response.json();

      if (data.status === 1) {
        localStorage.setItem("token", data.data.jwtToken);
        alert("Login Successful");
        window.location.href = "/";
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4 max-w-md">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2 text-center">
              Welcome Back
            </h2>

            <p className="text-muted-foreground text-center mb-8">
              Sign in to continue to Indo-Japan Business Bridge
            </p>

            <div className="space-y-4">

              <div>
                <Label>Username</Label>
                <Input
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                className="w-full bg-accent text-accent-foreground hover:bg-saffron-light gap-2"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Login"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-sm text-center text-muted-foreground mt-6">
              Don’t have an account?{" "}
              <span
                className="text-accent cursor-pointer"
                onClick={() => (window.location.href = "/register")}
              >
                Register here
              </span>
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;