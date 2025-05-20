interface Distributor {
  name: string;
  description: string;
  website: string;
  logo: string;
}

const distributors: Distributor[] = [
  {
    name: 'Northern Diver International',
    description:
      'Northern Diver International: based in the UK, our "one stop shop" to Special Forces, Commandos and Navy users.',
    website: 'https://www.ndiver-military.com',
    logo: '/assets/images/northern-diver.png',
  },
  {
    name: 'Apollo Military',
    description:
      'Apollo Military: based in Australia, our Tier 1 to Special Forces, Land, Air and Sea worldwide. Apollo are the oldest privately held dive equipment company with over 50 years of experience and innovation.',
    website: 'https://www.apollomilitary.com',
    logo: '/assets/images/Apollo-logo.png',
  },
  {
    name: 'Open Safety Direct',
    description:
      'Open Safety, direct sales shipping our rebreathers in volume around the world for 15 years.',
    website: 'https://www.opensafetyglobal.com',
    logo: '/assets/images/anim.png',
  },
];

const SalesSupport: React.FC = () => {
  return (
    <div className="px-6 py-12 max-w-7xl mx-auto text-center">
      <h1 className="text-3xl font-semibold mb-4">Sales and Support</h1>
      <p className="text-lg mb-12">
        For product, support and further information, contact your nearest distributor:
      </p>
      <div className="grid md:grid-cols-3 gap-12">
        {distributors.map((distributor, idx) => (
          <div key={idx} className="space-y-4">
            <img
              src={distributor.logo}
              alt={distributor.name}
              className="h-16 mx-auto object-contain"
            />
            <h2 className="text-xl font-semibold">{distributor.name}</h2>
            <p className="text-sm text-gray-600 px-4">{distributor.description}</p>
            <a
              href={distributor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              Web: {distributor.website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesSupport;
