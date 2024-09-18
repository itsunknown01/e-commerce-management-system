import { X } from "lucide-react"; // Make sure to install lucide-react if not already installed
import React, { useRef, useState } from "react";
import {
  useSingleUploadMutation,
  useMultipleUploadMutation,
} from "../../services/uploads";
import { Button } from "../ui/button";

interface ImageUploadProps {
  onValueChange: (value: string | string[]) => void;
  value: string | string[];
  multiple?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onValueChange,
  value,
  multiple = false,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadSingle, { isSuccess: singleSuccess }] =
    useSingleUploadMutation();
  const [uploadMultiple, { isSuccess: multiSuccess }] =
    useMultipleUploadMutation();

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleUpload = async () => {
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append(`images`, file);
      });

      try {
        if (multiple) {
          const result = await uploadMultiple(formData).unwrap();
          onValueChange([...((value as string[]) || []), ...result.imageUrls]);
        } else {
          const result = await uploadSingle(formData).unwrap();
          onValueChange(
            multiple
              ? [...(value as string[]), result.imageUrl]
              : result.imageUrl
          );
        }
        setSelectedFiles([]);
        setPreviewUrls([]);
      } catch (error) {
        console.error("Error uploading image(s):", error);
      }
    }
  };

  const handleDelete = (index: number) => {
    if (multiple) {
      const newValue = Array.isArray(value)
        ? value.filter((_, i) => i !== index)
        : [];
      onValueChange(newValue);
    } else {
      onValueChange("");
    }

    const newPreviews = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(newPreviews);

    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderImages = () => {
    const existingImages = multiple
      ? Array.isArray(value)
        ? value
        : []
      : typeof value === "string" && value !== ""
      ? [value]
      : [];

    return [...existingImages, ...previewUrls].map((url, index) => (
      <div key={index} className="mb-4 relative inline-block mr-2">
        <img
          src={url}
          alt={`Selected image ${index + 1}`}
          className="w-40 h-40 rounded-lg object-cover"
        />
        <button
          onClick={() => handleDelete(index)}
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
          type="button"
        >
          <X size={16} />
        </button>
      </div>
    ));
  };

  return (
    <div className="mt-4">
      {renderImages()}
      <div>
        {value == "" && (
          <Button onClick={() => fileInputRef.current?.click()} type="button">
            {(Array.isArray(value) && value.length > 0) ||
            (typeof value === "string" && value !== "") ||
            previewUrls.length > 0
              ? "Add More Image(s)"
              : "Select Image(s)"}
          </Button>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          accept="image/*"
          multiple={multiple}
          className="hidden"
        />
        {selectedFiles.length > 0 && (
          <Button onClick={handleUpload} className="ml-2" type="button">
            Upload Image(s)
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
