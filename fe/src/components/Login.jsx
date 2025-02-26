import { useState } from "react";
import { Button, Card, Flex, Input } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster"
import { Field } from "@/components/ui/field";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      toaster.error({
        title: "Errore",
        description: "Inserisci username e password.",
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
          ask: "checkuser",
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toaster.create({
          title: "Login effettuato",
          description: "Accesso riuscito!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toaster.error({
          title: "Errore di login",
          description: data.message || "Credenziali non valide.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
        console.log(error);
      toaster.error({
        title: "Errore di connessione",
        description: "Impossibile contattare il server.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Card.Root width="320px">
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
        <Button variant="outline">Register</Button>
        <Button onClick={handleLogin}>Login</Button>
      </Card.Footer>
    </Card.Root>
  );
}

export default Login;
