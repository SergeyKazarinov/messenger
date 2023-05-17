'use client';

import Button from '@/app/components/Button';
import Input from '@/app/components/input/Input';
import { FC, useCallback, useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';

type TVariant = 'LOGIN' | 'REGISTER';

interface AuthFormProps {

}

const AuthForm: FC<AuthFormProps> = () => {
  const [variant, setVariant] = useState<TVariant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {

    }

    if (variant === 'LOGIN') {

    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
  };

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md '>
      <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        <form
          className='space-y-6'
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === 'REGISTER' && (
            <Input
              id="name"
              label="name"
              register={register}
              errors={errors}
            />
          )}
          <Input
            id="Email"
            label="Email address"
            type="email"
            register={register}
            errors={errors}
          />
          <Input
            id="password"
            label="password"
            type="password"
            register={register}
            errors={errors}
          />

          <div>
            <Button
              disables={isLoading}
              fullWidth
              type='submit'
            >
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AuthForm;
