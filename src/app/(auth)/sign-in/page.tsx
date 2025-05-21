'use client'

import { Form } from 'antd';
import { useState } from 'react';
import { regexpValidation } from '@/features/auth/constants';
import { useRouter } from 'next/navigation';
import { handleLogin } from '@/features/auth/authHandlers';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state-management/store';
import { formItemStyle, loginFormStyles } from '@/styles/constants';
import { Input } from '@/components/ui/input';
import MagicButton from '@/components/ui/magic-button';
import Link from 'next/link';
import { ROUTE_NAMES } from '@/lib/Route_Names';

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Form
      layout="vertical"
      onFinish={(values) => handleLogin({ setLoading, values, push, dispatch })}
      form={form}
      style={loginFormStyles}
    >
      <h1 className="text-white">SIGN IN</h1>

      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Enter your email",
          },
        ]}
        style={formItemStyle}
      >
        <Input
            type="email"
            placeholder="Enter your email"
        />
      </Form.Item>

      <Form.Item
        style={formItemStyle}
        name="password"
        tooltip="Password must be min 6 max 16 characters, including one special character."
        rules={[
          {
            required: true,
            message: "Enter your password",
          },
          {
            pattern: regexpValidation,
            message: "Password is invalid",
          },
        ]}
      >
        <Input
            type="password"
            placeholder="Enter your password"
        />
      </Form.Item>

      <div className="flex items-center justify-between space-x-4 w-[100%]">
        <MagicButton 
        htmlType="submit"
        text='SIGN IN'
        loading={loading}
        />
        <Link href={ROUTE_NAMES.REGISTER} style={{color: 'white'}}>Sign Up</Link>
      </div>
    </Form>
  );
};

export default Login;