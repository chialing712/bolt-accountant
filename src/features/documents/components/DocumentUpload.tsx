import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import Button from '../../../components/common/Button';

interface DocumentUploadProps {
  projectId: string;
  onUploadComplete: () => void;
}

export default function DocumentUpload({ projectId, onUploadComplete }: DocumentUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const filePath = `${projectId}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      await supabase.from('documents').insert({
        project_id: projectId,
        name: file.name,
        file_path: filePath,
        file_type: file.type,
        file_size: file.size,
      });

      onUploadComplete();
    } catch (error) {
      console.error('Error uploading document:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <label className="block">
        <Button
          as="span"
          variant="secondary"
          className="inline-flex items-center"
          disabled={uploading}
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Uploading...' : 'Upload Document'}
          <input
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            disabled={uploading}
          />
        </Button>
      </label>
    </div>
  );
}