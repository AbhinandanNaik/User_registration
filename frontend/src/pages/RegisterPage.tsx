import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Calendar, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const registerSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    dateOfBirth: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', {
        message: 'Valid date is required',
    }),
    gender: z.enum(['male', 'female', 'other']),
});

type RegisterForm = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterForm) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(data);
    };

    return (
        <Card>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Create Account
                </h1>
                <p style={{ color: 'var(--color-text-muted)' }}>
                    Join us and start your journey
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Input
                        label="First Name"
                        icon={<User size={18} />}
                        error={errors.firstName?.message}
                        {...register('firstName')}
                    />
                    <Input
                        label="Last Name"
                        icon={<User size={18} />}
                        error={errors.lastName?.message}
                        {...register('lastName')}
                    />
                </div>

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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Input
                        label="Date of Birth"
                        type="date"
                        icon={<Calendar size={18} />}
                        error={errors.dateOfBirth?.message}
                        {...register('dateOfBirth')}
                    />

                    <div className="input-group">
                        <div className="input-wrapper">
                            <select
                                className={`input-field ${errors.gender ? 'has-error' : ''}`}
                                style={{ appearance: 'none' }}
                                {...register('gender')}
                            >
                                <option value="" disabled selected>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <label className="input-label" style={{ top: '0.5rem', fontSize: '0.75rem', color: 'var(--color-primary)' }}>
                                Gender
                            </label>
                        </div>
                        {errors.gender && (
                            <span className="input-error">{errors.gender.message}</span>
                        )}
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    style={{ width: '100%', marginTop: '1rem' }}
                    isLoading={isSubmitting}
                    rightIcon={<ArrowRight size={18} />}
                >
                    Sign Up
                </Button>
            </form>

            <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Already have an account? </span>
                <Link
                    to="/login"
                    style={{
                        color: 'var(--color-primary)',
                        fontWeight: 600,
                        textDecoration: 'none'
                    }}
                >
                    Sign In
                </Link>
            </div>
        </Card>
    );
};

export default RegisterPage;
