interface Video {
  title: string;
  description: string;
  videoUrl?: string;
  featured?: string;
  loginRequired?: boolean;
}

const videos: Video[] = [
  {
    title: 'Full Rebreather Service',
    description:
      'Video refresher available for each of our rebreather models, covering full strip down, inspection, the service items, reassembly, and checks for readiness to dive.',
    loginRequired: true,
    featured:'/assets/images/Rb-serv-video-200px.png'
  },
  {
    title: 'Servicing the Apollo A320 First Stage Regulator',
    description:
      'A 30-minute refresher on servicing the Incursion A320 regulator developed by Apollo.',
    videoUrl: 'https://www.youtube.com/embed/sample-video-1',
    featured:'/assets/images/A320-Service.png'

  },
  {
    title: 'Servicing the Incursion CMR Auto Loop Volume Valve (ALV)',
    description:
      'A 5-minute refresher on how to fault find and service the Incursion ALV.',
    loginRequired: true,
    featured:'/assets/images/ALV-Service.png'
  },
  {
    title: 'LP Hose Testing',
    description:
      'Quality control of LP hoses in Open Safety, showing how we test hoses to 40 bar in production and a proof test to 100 bar.',
    loginRequired: true,
    featured:'/assets/images/LPHose-Test.png'
  },
];

const ServicingPage: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Rebreather Servicing & Technician Support
      </h1>

      {/* Servicing Options */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Servicing Options</h2>
        <p className="text-gray-600 mb-4">
          We offer factory servicing with 24-hour turnaround on military rebreathers and 14 days on other models. A service costs 4% of the purchase price—the lowest in the industry. Despite the fast response and low cost, we receive less than 1% of the rebreathers we sell back at the factory for servicing.
        </p>
        <p className="text-gray-600 mb-4">
          Most customers prefer to service the rebreathers on their own sites. To support that, we provide comprehensive documentation, technician training courses, service procedures and manuals, technician refresher videos, and 24/7 hotlines via digital media.
        </p>
        <p className="text-gray-600">
          Our rebreathers are reliable and simple to fault find and rectify. All users are trained to do a full disassembly and reassembly—which takes just minutes. This ease and familiarity make fault finding and rectification a swift and painless process in the field. We support that with a full field spares kit shipped with every unit.
        </p>
      </div>

      {/* Technician Training */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Rebreather Technician Training and Certification</h2>
        <p className="text-gray-600 mb-4">
          We can train any diver or technician to service and maintain the Incursion rebreather in one week. Following assessment, the technician is certified. We provide all manuals in both English and your language. The training gives you access to our service refresher videos and lifetime access to our service hotlines.
        </p>
      </div>

      {/* Video Refreshers */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Video Refreshers</h2>
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
                    className="h-full object-contain rounded"
                    /> 
                </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2 mt-6">{video.title}</h3>
              <p className="text-gray-600 mb-4">{video.description}</p>
              {/* {video.loginRequired ? (
                <p className="text-sm text-red-500">Login required to access this video.</p>
              ) : (
                video.videoUrl && (
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={video.videoUrl}
                      title={video.title}
                      frameBorder="0"
                      allowFullScreen
                      className="w-full h-64"
                    ></iframe>
                  </div>
                )
              )} */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicingPage;
