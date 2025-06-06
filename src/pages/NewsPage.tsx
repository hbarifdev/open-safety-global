import {Link} from 'react-router-dom';

interface NewsItem {
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  link?: string;
}

const newsItems: NewsItem[] = [
  {
    title: 'UDT London Exhibition',
    date: 'April 2024',
    location: 'London, UK',
    description:
      'The Incursion rebreathers and our diver head-up displays are being exhibited around the globe in 2024, starting with UDT London. Contact our sales team to find the nearest exhibition to you.',
    imageUrl: '/assets/images/Exhibitions-200px.png',
  },
  {
    title: 'Commercial Diving Rebreather at Bergen Conference',
    date: 'November 2021',
    location: 'Bergen, Norway',
    description:
      'Open Safety exhibited its commercial diving rebreather at the Bergen biennial dive conference. This is the only rebreather to achieve CE approval for primary use in commercial diving and the only commercial dive system to achieve a functional safety certification to SIL 3.',
    imageUrl: '/assets/images/Bergen-2021.png',
  },
  {
    title: 'Commando Incursion Rebreather Instructor Training',
    date: 'January 2020',
    location: 'Jakarta, Indonesia',
    description:
      'Commando instructors completed training at the deep pool facility in Jakarta, followed by a week of advanced training on Indonesian islands. The course was led by Open Safety\'s former Chief Clearance Diver instructor.',
    imageUrl: '/assets/images/IndTraining-2020.png',
  },
  {
    title: 'United Kingdom Special Forces Incursion Rebreather Instructor Training',
    date: 'December 2019',
    location: 'United Kingdom',
    description:
      'Chief Instructors from Special Forces were trained on the Incursion CMR rebreather, followed by training courses in their home country for 20 divers.',
    imageUrl: '/assets/images/Clearing_a_flood.png',
    link: '/exhibitions/',
  },
  {
    title: 'Dr. Alex Deas on Functional Safety in Diving at UDT Stockholm',
    date: 'May 2019',
    location: 'Stockholm, Sweden',
    description:
      'Dr. Alex Deas presented on Functional Safety in Diving, highlighting improvements to military diving in Asia and advocating for European adoption.',
    imageUrl: '/assets/images/Exhibitions-200px.png',
  },
  {
    title: 'Sports Customers Newsletter',
    date: 'December 2017',
    location: '',
    description:
      'Our occasional newsletter covers the activities of some of our customers on our sports range of products and general information.',
    imageUrl: '/assets/images/Newsletter-200px.png',
    link: 'https://www.opensafetyglobal.com/assets/newsletters/OSEL-Rebreather-Newsletter-Number22-20171201.pdf',
  },
];

const NewsPage: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">News</h1>
      <h4 className="text-xl font-semibold text-gray-700 mb-2">Current:</h4>
        <p className="text-gray-600 mb-6">
          Open Safety is opening its world-class dive equipment test laboratory, offering services for customers purchasing Open Safety chambers or breathing machines. Facilities include humidity-controlled environmental conditioning (-70°C to +130°C), a temperature-controlled pressure chamber rated to 700m depth, a bank of iBreathe MkIV breathing machines, hydrostatic test chamber, magnetic ranging facility, chemical laboratory, and metrology laboratory.
        </p>
    <h4 className="text-xl font-semibold text-gray-700 mb-4">News Feed:</h4>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 overflow-hidden rounded-t-lg">
                
             { item.link ? (   
              <Link to={item.link} target={item.link.endsWith('.pdf') ? '_blank' : ''}>
                <div className="aspect-w-16 aspect-h-8">
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </Link>
                ) : (
                    <div className="aspect-w-16 aspect-h-8">
                        <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
        
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h2>
              <p className="text-sm text-gray-500 mb-1">
                {item.date} {item.location && `| ${item.location}`}
              </p>
              <p className="text-gray-600 mb-4">{item.description}</p>
              
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsPage;
