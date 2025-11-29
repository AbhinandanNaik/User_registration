import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(data);
    };

    return (
        <Card>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Welcome Back
                </h1>
                <p style={{ color: 'var(--color-text-muted)' }}>
                    Sign in to access your account
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Email Address"
                    type="email"
                    icon={<Mail size={18} />}
                    error={errors.email?.message}
                    {...register('email')}
                />

                <Input
                    label="Password"
                    type="password"
                    icon={<Lock size={18} />}
                    error={errors.password?.message}
                    {...register('password')}
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                    <Link
                        to="/forgot-password"
                        style={{
                            color: 'var(--color-primary)',
                            fontSize: '0.875rem',
                            textDecoration: 'none'
                        }}
                    >
                        Forgot Password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    style={{ width: '100%' }}
                    isLoading={isSubmitting}
                    rightIcon={<ArrowRight size={18} />}
                >
                    Sign In
                </Button>
            </form>

            <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Don't have an account? </span>
                <Link
                    to="/register"
                    style={{
                        color: 'var(--color-primary)',
                        fontWeight: 600,
                        textDecoration: 'none'
                    }}
                >
                    Create Account
                </Link>
            </div>
        </Card>
    );
};

export default LoginPage;
