"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@material-tailwind/react';

const ChooseDatabase = () => {
  const Router = useRouter()
  const handlePlanetScaleClick = () => {
    Router.push('/database/planetscale');
  };

  const handleMongoDBClick = () => {
    Router.push('/mongoDBUpload');
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="gradient"
        className="rounded-full"
        onClick={handlePlanetScaleClick}
      >
        PlanetScale
      </Button>
      <Button
        variant="gradient"
        className="rounded-full"
        onClick={handleMongoDBClick}
      >
        MongoDB
      </Button>
    </div>
  );
};

export default ChooseDatabase;