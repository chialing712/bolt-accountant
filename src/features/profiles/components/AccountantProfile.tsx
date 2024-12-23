import React from 'react';
import { Star, Award, CheckCircle } from 'lucide-react';
import { Profile } from '../../../types/database';
import Button from '../../../components/common/Button';

interface AccountantProfileProps {
  profile: Profile;
  onContact?: () => void;
}

export default function AccountantProfile({ profile, onContact }: AccountantProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">{profile.full_name}</h2>
            {profile.is_verified && (
              <CheckCircle className="w-5 h-5 text-blue-500" />
            )}
          </div>

          {profile.company_name && (
            <p className="text-gray-600">{profile.company_name}</p>
          )}

          <div className="flex items-center mt-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="ml-1">{profile.rating.toFixed(1)}</span>
            <span className="text-gray-500 ml-1">
              ({profile.total_reviews} reviews)
            </span>
          </div>

          {profile.hourly_rate && (
            <p className="mt-2 text-lg font-medium">
              ${profile.hourly_rate}/hour
            </p>
          )}

          <div className="mt-4">
            <h3 className="font-medium mb-2">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {profile.specializations?.map((spec) => (
                <span
                  key={spec}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {profile.certifications && profile.certifications.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {profile.certifications.map((cert) => (
                  <div
                    key={cert}
                    className="flex items-center gap-1 text-gray-600"
                  >
                    <Award className="w-4 h-4" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {profile.bio && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">About</h3>
              <p className="text-gray-600">{profile.bio}</p>
            </div>
          )}

          {onContact && (
            <Button onClick={onContact} className="mt-6 w-full">
              Contact
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}