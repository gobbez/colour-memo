import { useState } from "react";
import { Button, Card, Flex, Input } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster"
import { Field } from "@/components/ui/field";
import { useAuth } from "../AuthContext";

function Login() {
  const { setUserToken } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      toaster.error({
        title: "Errore",
        description: "Write both username and password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/get/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ask: "login",
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toaster.create({
          title: "Login",
          description: "Login successful!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // Pass login token via cookie to Auth
        setUserToken("logged_in");
      } else {
        toaster.error({
          title: "Login Error",
          description: data.message || "Wrong credentials! New user? Please register",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toaster.error({
        title: "Connection Error",
        description: "Failed to contact the server. Try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRegister = async () => {
    if (!username || !password) {
      toaster.error({
        title: "Errore",
        description: "Write both username and password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/get/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ask: "createuser",
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toaster.create({
          title: "Register",
          description: "You have registered!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toaster.error({
          title: "Register Error",
          description: data.message || "Registration failed.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toaster.error({
        title: "Connection Error",
        description: "Failed to contact the server. Try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Card.Root width="320px">

      {/* Show Login form */}
      {!isRegister ? (
        <div>
          <Card.Body gap="2">
          <Flex justify="center">
            <Card.Title mt="2">Login</Card.Title>
          </Flex>
          <Card.Description>
            <Field errorText="This field is required">
              <Input
                placeholder="Write username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Write password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
          </Card.Description>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button variant="outline" onClick={() => setIsRegister(true)}>Register</Button>
            <Button onClick={handleLogin}>Login</Button>
          </Card.Footer>
        </div>
      ) : (
        <div>
          {/* Show Register form */}
          <Card.Body gap="2">
          <Flex justify="center">
            <Card.Title mt="2">Register</Card.Title>
          </Flex>
          <Card.Description>
            <Field errorText="This field is required">
              <Input
                placeholder="Register username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Register password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
          </Card.Description>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button variant="outline" onClick={() => setIsRegister(false)}>Login</Button>
            <Button onClick={handleRegister}>Register</Button>
          </Card.Footer>
        </div>
      )}
      
    </Card.Root>
  );
}

export default Login;
