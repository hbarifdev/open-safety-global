interface Video {
  title: string;
  description: string;
  videoUrl: string;
  featured?: string;
  loginRequired?: boolean;
}

const videos: Video[] = [
  {
    title: 'Clearing a Rebreather Flood Underwater',
    description:
      'Demonstration on clearing a flood completely underwater while maintaining good buoyancy control.',
    videoUrl: 'https://www.youtube.com/embed/sample-video-1', 
    featured:'/assets/images/Clearing_a_flood.png'
  },
  {
    title: 'Servicing the Apollo A320 First Stage Regulator',
    description:
      'A 30-minute refresher on servicing the Incursion A320 regulator developed by Apollo.',
    videoUrl: 'https://www.youtube.com/embed/sample-video-2', 
    featured:'/assets/images/A320-Service.png'
  },
  {
    title: 'Servicing the Incursion CMR Auto Loop Volume Valve (ALV)',
    description:
      'A 5-minute refresher on how to fault find and service the Incursion ALV.',
    videoUrl: '', 
    featured:'/assets/images/ALV-Service.png',
    loginRequired: true,
  },
  {
    title: 'LP Hose Testing',
    description:
      'Quality control of LP hoses in Open Safety, showing how we test hoses to 40 bar in production and a proof test to 100 bar.',
    videoUrl: '', 
    featured:'/assets/images/LPHose-Test.png',
    loginRequired: true,
  },
];

const TrainingPage: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Rebreather Training: Onsite, Remote, and Video Refreshers
      </h1>

      {/* Onsite Training */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">On Your Sites</h2>
        <p className="text-gray-600">
          Open Safety offers onsite training for all its products, using instructors that have done your job so they understand your needs. Our instructors include former Chief Clearance Divers, Naval Divers, Commercial Divers, and some of the most renowned Technical Diver Instructors.
        </p>
      </div>

      {/* Remote Training */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">On Our Sites</h2>
        <p className="text-gray-600 mb-2">
          For Naval, Commando, and Special Forces, we offer training in the UK, Australia, and in Jakarta where the 17m deep full-length pool provides training facilities for helicopter entry, ship boarding, and other tactical capabilities. We provide over 30 different courses to Special Forces, with some of the best instructors in the sector.
        </p>
        <p className="text-gray-600 mb-2">
          For Commercial Diving, we offer classes with leading commercial diving schools.
        </p>
        <p className="text-gray-600">
          For recreational diving, our instructors offer courses to 100m depth.
        </p>
      </div>

      {/* Video Refreshers */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Remote Video Refreshers</h2>
        <p className="text-gray-600 mb-8">
          Remote training includes our refresher courses which operate with video support, to assist you after you have been using our equipment for some time, and would like a refresher course on the key technician processes or on some of the advanced dive techniques.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <div key={index} className="bg-white rounded shadow p-4">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={video.featured}
                  alt={video.title}
                  className="w-full h-full object-cover rounded"
                /> 
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2 mt-6">{video.title}</h3>
              <p className="text-gray-600 mb-4">{video.description}</p>
              {/* {video.loginRequired ? (
                <p className="text-sm text-red-500">Login required to access this video.</p>
              ) : (
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-64"
                  ></iframe>
                </div>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingPage;
