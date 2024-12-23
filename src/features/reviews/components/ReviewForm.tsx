import React, { useState } from 'react';
import { Star } from 'lucide-react';
import Button from '../../../components/common/Button';
import { supabase } from '../../../lib/supabase';

interface ReviewFormProps {
  projectId: string;
  revieweeId: string;
  onSubmit: () => void;
}

export default function ReviewForm({ projectId, revieweeId, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.from('reviews').insert({
        project_id: projectId,
        reviewee_id: revieweeId,
        rating,
        comment,
      });

      if (error) throw error;
      onSubmit();
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rating
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className="focus:outline-none"
            >
              <Star
                className={`w-6 h-6 ${
                  value <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Comment
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={4}
          required
        />
      </div>

      <Button type="submit" disabled={submitting || rating === 0}>
        {submitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
}