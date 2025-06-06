interface Exhibition {
  title: string;
  date: string;
  location: string;
  description: string;
  isCancelled?: boolean;
  featured?:string;
}

const forthcomingExhibitions: Exhibition[] = [
  {
    title: 'Bergen International Diving Conference',
    date: '11–14 Nov 2021',
    location: 'Bergen, Norway',
    description:
      'Featuring Open Safety’s umbilical diving rebreathers for commercial diving. The only rebreather certified for primary use in commercial diving, offering major advantages in safety, reduced costs, and simplified logistics for deep surface-supplied and saturation diving. It remains the only commercial dive system meeting recognized Functional Safety certifications, setting a new standard in compliance and safety.',
    featured:'/assets/images/Exhib-Bergen2021.png'
  },
  {
    title: 'DSEI, UK',
    date: '14–17 Sept 2021',
    location: 'London, UK',
    description:
      'Open Safety’s Incursion range of military rebreathers will be exhibited by Northern Diver.',
    featured:'/assets/images/Exhib-DSEIUK.png'
  },
];

const pastExhibitions: Exhibition[] = [
  {
    title: 'UDT Stockholm Specialist Session',
    date: '2019',
    location: 'Stockholm, Sweden',
    description:
      'Dr. Alex Deas presented on Functional Safety in Diving, highlighting the contributions Functional Safety has made to military diving in Asia and advocating for its adoption in Europe to improve dive safety.',
    featured:'/assets/images/Exhibitions-200px.png'
  },
  {
    title: 'IMDEX Singapore',
    date: '2013',
    location: 'Singapore',
    description:
      'Launch of Open Safety’s Compact Multimode Rebreather, the Incursion CMR, and the Celibri dive computer rated for 350m.',
    featured:'/assets/images/Exhib-IMDEX2013.png'
  },
  {
    title: 'Bergen Dive Conference',
    date: '2011',
    location: 'Bergen, Norway',
    description:
      'Launch of Open Safety’s Cyclops Commercial Diving Rebreather, endorsed by Technip, featuring CE, NORSOK, and IEC 61508 Functional Safety certifications to SIL 3. Demonstrations included real-time end-of-exhale CO₂ monitoring.',
    featured:'/assets/images/Exhib-Bergen2009.png'
  },
  {
    title: 'DEMA 2009 Orlando',
    date: '2009',
    location: 'Orlando, USA',
    description:
      'Launch of Open Safety’s sports rebreather range with fully functional mCCR and iCCR rebreathers. Also showcased the Cyclops commercial diving rebreather with telemetry to topside for rebreather status, video feeds, and voice communication to the supervisor.',
    featured:'/assets/images/DEMA2009.jpg'
  },
];

const ExhibitionsPage: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Open Safety's Exhibitions</h1>

      {/* Forthcoming Exhibitions */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Forthcoming Exhibitions</h2>
        <p className="text-gray-600 mb-6">
          On 20th January 2020, Open Safety cancelled all exhibition slots to minimize risk to clients and staff until the coronavirus pandemic is under control or a safe vaccine is available. All slots to the end of 2021 are cancelled.
        </p>
        <div className="space-y-6">
          {forthcomingExhibitions.map((exhibition, index) => (
            <div key={index} className="bg-white rounded shadow p-6">
                {exhibition.featured && (
                    <img
                    src={exhibition.featured}
                    alt={exhibition.title}
                    className="h-48 object-contain rounded mb-4"
                    />
                )}
              <h3 className="text-xl font-semibold text-gray-800">{exhibition.title}</h3>
              <p className="text-gray-600">
                <span className="font-medium">Date:</span> {exhibition.date}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Location:</span> {exhibition.location}
              </p>
              <p className="text-gray-600 mt-2">{exhibition.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Past Exhibitions */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Past Exhibitions</h2>
        <div className="space-y-6 grid md:grid-cols-2 gap-8">
          {pastExhibitions.map((exhibition, index) => (
            <div key={index} className="bg-white rounded shadow p-6">
                {exhibition.featured && (
                    <img
                    src={exhibition.featured}
                    alt={exhibition.title}
                    className="h-48 object-contain rounded mb-4"
                    />
                )}
              <h3 className="text-xl font-semibold text-gray-800">{exhibition.title}</h3>
              <p className="text-gray-600">
                <span className="font-medium">Date:</span> {exhibition.date}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Location:</span> {exhibition.location}
              </p>
              <p className="text-gray-600 mt-2">{exhibition.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExhibitionsPage;
