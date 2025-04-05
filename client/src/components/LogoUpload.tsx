
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export function LogoUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("/moracat-logo.png");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('logo', file);

      const response = await fetch('/api/upload/logo', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const { url } = await response.json();
      onUpload(url);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <img src={preview} alt="Logo" className="w-32 h-32 object-contain mb-4" />
      <Input 
        type="file" 
        accept="image/*"
        onChange={handleFileChange}
        disabled={loading}
      />
      {loading && <span>Uploading...</span>}
    </div>
  );
}
