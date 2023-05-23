import React, { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Oval } from 'react-loader-spinner';
import Image from 'next/image';

import CloudIcon from './ui/icons/CloudIcon';

export default function Upload() {
  const [dragging, setDragging] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const session = useSession();
  const user = session?.data?.user;

  const router = useRouter();

  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;

    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = () => {
    if (!file || !user) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', textRef.current?.value ?? '');

    fetch('/api/posts/', { method: 'POST', body: formData }) //
      .then((res) => {
        return res.ok
          ? router.push(`/user/${user.username}`)
          : setError(`${res.status} ${res.statusText}`);
      })
      .catch((error) => setError(error.toString()))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center p-4 border-b">
        <h1 className="font-semibold">Created new post</h1>
      </div>

      <div
        className={`p-4 grow flex flex-col text-center justify-center items-center ${
          dragging && 'bg-neutral-100'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {error && (
          <p className="p-2 bg-red-100 text-red-600 w-full mb-2 text-left text-sm">
            {error}
          </p>
        )}
        {file ? (
          <div className="flex flex-col gap-4 w-full h-full">
            <div className="relative aspect-square w-full h-auto">
              <Image
                src={URL.createObjectURL(file)}
                sizes="340px"
                alt="file"
                fill
              />
            </div>
            <textarea
              ref={textRef}
              className="w-full grow p-2 outline-none resize-none"
              rows={5}
              name="text"
              placeholder="Write a caption"
            />
            <button
              disabled={loading}
              className="relative bg-[#0095f6] px-4 py-2 text-sm text-white rounded-md font-semibold mt-auto disabled:opacity-50"
              onClick={handleSubmit}
            >
              <p className={`${loading ? 'invisible' : 'visible'}`}>Publish</p>
              <div className="position-center">
                {loading && (
                  <Oval
                    color="#fff"
                    width={20}
                    height={20}
                    strokeWidth={4}
                    secondaryColor="#d9d9d9"
                  />
                )}
              </div>
            </button>
          </div>
        ) : (
          <>
            <CloudIcon dragging={dragging} />
            <p className="text-lg mt-2">Drag photos and videos here</p>
            <input
              type="file"
              id="upload"
              name="input"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
            <label
              htmlFor="upload"
              className="bg-[#0095f6] px-4 py-2 text-sm text-white rounded-md font-semibold cursor-pointer mt-4"
            >
              Select from computer
            </label>
          </>
        )}
      </div>
    </div>
  );
}
