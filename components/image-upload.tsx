"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    disabled,
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative cursor-pointer rounded-lg border-2 border-dashed p-6
        ${isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/25"}
        ${disabled ? "cursor-not-allowed opacity-60" : "hover:border-primary/50"}
      `}
    >
      <input {...getInputProps()} />
      
      {value ? (
        <img
          src={value}
          alt="Uploaded vehicle"
          className="mx-auto max-h-[300px] rounded-lg object-cover"
        />
      ) : (
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <ImageIcon className="h-8 w-8 text-muted-foreground/60" />
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </div>
          <div className="text-xs text-muted-foreground/60">
            JPG, JPEG, PNG (max. 10MB)
          </div>
        </div>
      )}
    </div>
  );
}