import Link from 'next/link';

const ChooseDatabase = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Link href="upload/planetscale">
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600">
          PlanetScale
        </button>
      </Link>
    </div>
  );
};

export default ChooseDatabase;
