"use client";

import { Alert, Button, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import InputGroupText from "react-bootstrap/InputGroupText";
import { authenticate } from "@/lib/action";
import { useFormState, useFormStatus } from "react-dom";

export default function Login() {
  const [error, dispatch] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();
  return (
    <>
      <Alert variant="danger" show={error !== undefined}  dismissible>
        {error}
      </Alert>
      <Form action={dispatch}>
        <InputGroup className="mb-3">
          <InputGroupText>
            <FontAwesomeIcon icon={faUser} fixedWidth />
          </InputGroupText>
          <FormControl
            name="username"
            required
            disabled={pending}
            placeholder="Username"
            aria-label="Username"
            defaultValue="Username"
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroupText>
            <FontAwesomeIcon icon={faLock} fixedWidth />
          </InputGroupText>
          <FormControl
            type="password"
            name="password"
            required
            disabled={pending}
            placeholder="Password"
            aria-label="Password"
            defaultValue="Password"
          />
        </InputGroup>

        <Row className="align-items-center">
          <Col xs={6}>
            <Button className="px-4" variant="primary" type="submit" disabled={pending}>
              Login
            </Button>
          </Col>
          <Col xs={6} className="text-end">
            <Link className="px-0" href="#">
              Forgot password?
            </Link>
          </Col>
        </Row>
      </Form>
    </>
  );
}
