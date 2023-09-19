"use client"
import { useRouter } from 'next/navigation';
import { Button } from '@material-tailwind/react';

const ChooseDatabase = () => {
  const Router = useRouter()

  const handlePlanetScaleClick = () => {
    Router.push('/database/planetscale');
  };

  const handleMongoDBClick = () => {
    Router.push('/mongoDBUpload');
  };

  const handleSyncClick = () => {
    fetch('/api/sync', {method: 'POST'});
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
      <Button
        variant="gradient"
        className="rounded-full"
        onClick={handleSyncClick}
      >
        Sync
      </Button>
    </div>
  );
};

export default ChooseDatabase;