'use client'

import { useState } from "react";
import { Form } from 'antd';
import { regexpValidation, ROUTE_NAMES } from "@/lib/constants";
import { handleRegister } from "@/features/auth/authHandlers";
import { useRouter } from "next/navigation";
import { formItemStyle } from "@/styles/constants";
import MagicButton from "@/components/ui/magic-button";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  return (
    <Form
      onFinish={(values) => handleRegister({ values, setLoading, push })}
      layout="vertical"
      form={form}
      style={formItemStyle}
    >
      <h1 className="gradient-text">SIGN UP</h1>

      <Form.Item
        style={formItemStyle}
        name="firstName"
        rules={[{ required: true, message: "Please input your first name" }]}
      >
        <Input
            type="text"
            placeholder="First name"
        />
      </Form.Item>

      <Form.Item
        style={formItemStyle}
        name="lastName"
        rules={[{ required: true, message: "Please input your last name" }]}
      >
        <Input
            type="text"
            placeholder="Last name"
        />
      </Form.Item>

      <Form.Item
        style={formItemStyle}
        name="email"
        rules={[{ required: true, message: "Please input your email" }]}
      >
        <Input
            type="email"
            placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        style={formItemStyle}
        name="password"
        rules={[
          { required: true, message: "Please input your password" },
          {
            pattern: regexpValidation,
            message:
              "The password must contain 6-16 characters, including at least one digit and one special character (!@#$%^&*).",
          },
        ]}
      >
        <Input
            type="password"
            placeholder="Password"
        />
      </Form.Item>

      <Form.Item
        style={formItemStyle}
        name="confirm"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || value === getFieldValue("password")) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The passwords you entered do not match")
              );
            },
          }),
        ]}
      >
        <Input
            type="password"
            placeholder="Confirm Password"
        />
      </Form.Item>

      <div className="flex items-center justify-between space-x-4 w-[100%]">
        <MagicButton
            htmlType="submit"
            loading={loading}
            text="SIGN UP"
        />

        <Link href={ROUTE_NAMES.LOGIN} style={{color: 'white'}}>SING IN</Link>
      </div>
    </Form>
  );
};

export default Register;