'use client';

import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Image from 'next/image';
import * as LR from '@uploadcare/blocks';
import Modal from '../Modal';
import Input from '../input/Input';
import Button from '../Button';

LR.registerBlocks(LR);

interface SettingsModalProps {
  isOpen: boolean;
  currentUser: User;
  onClose: () => void;
}

const SettingsModal: FC<SettingsModalProps> = ({ isOpen, currentUser, onClose }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSetIsLoading = () => {
    setIsLoading(false);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch('image');

  const handleError = () => {
    toast.error('Something went wrong!');
  };

  const handleUpload = (result: any) => {
    setValue('image', `https://ucarecdn.com/${result.detail.data[0].uuid}/`, { shouldValidate: true });
  };

  useEffect(() => {
    window.addEventListener('LR_UPLOAD_FINISH', handleUpload);

    return () => {
      window.removeEventListener('LR_UPLOAD_FINISH', handleUpload);
    };
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/settings', data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(handleError)
      .finally(handleSetIsLoading);
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Profile
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Edit your public information.
            </p>
            <div className='mt-10 flex flex-col gap-y-8'>
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label className='block text-sm font-medium leading-6 text-gray-900'>
                  Photo
                </label>
                <div className='mt-2 flex items-center gap-x-3'>
                  <Image
                    width='48'
                    height='48'
                    className='rounded-full'
                    src={image || currentUser?.image || '/images/placeholder.jpg'}
                    alt='Avatar'
                  />
                  <lr-file-uploader-regular
                    css-src="https://esm.sh/@uploadcare/blocks@0.22.3/web/file-uploader-regular.min.css"
                    ctx-name="my-uploader"
                    class="my-config"
                  >
                  </lr-file-uploader-regular>

                </div>
              </div>
            </div>
          </div>
          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <Button
              disables={isLoading}
              secondary
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              disables={isLoading}
              type='submit'
              onClick={onClose}
            >
              Save
            </Button>
          </div>

        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
