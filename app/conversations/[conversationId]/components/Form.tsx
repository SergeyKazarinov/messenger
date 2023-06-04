'use client';

import useConversation from '@/app/hooks/useConversation';
import axios from 'axios';
import { FC, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPaperAirplane } from 'react-icons/hi2';
import * as LR from '@uploadcare/blocks';
import MessageInput from './MessageInput';

LR.registerBlocks(LR);

interface FormProps {

}

const Form: FC<FormProps> = () => {
  const { conversationId } = useConversation();

  const {
    register, handleSubmit, setValue, formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });

  const uploadFile = (e: any) => {
    axios.post('/api/messages', {
      image: `https://ucarecdn.com/${e.detail.data[0].uuid}/`,
      conversationId,
    });
  };

  useEffect(() => {
    window.addEventListener('LR_UPLOAD_FINISH', uploadFile);

    return () => {
      window.removeEventListener('LR_UPLOAD_FINISH', uploadFile);
    };
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });

    axios.post('/api/messages', {
      ...data,
      conversationId,
    });
  };

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <lr-file-uploader-regular
        css-src="https://esm.sh/@uploadcare/blocks@0.22.3/web/file-uploader-regular.min.css"
        ctx-name="my-uploader"
        class="my-config"
      >
      </lr-file-uploader-regular>
      {/* <HiPhoto size={30} className='text-sky-500 cursor-pointer'/> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex items-center gap-2 lg:gap-4 w-full'
      >
        <MessageInput id="message" register={register} errors={errors} required placeholder="Write a message" />
        <button type='submit' className='rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition'>
          <HiPaperAirplane size={18} className='text-white'/>
        </button>
      </form>
    </div>
  );
};

export default Form;
