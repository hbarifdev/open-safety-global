import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

interface DocumentItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  isExternal?: boolean;
}

const HazopPage = () => {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const documentItems: DocumentItem[] = [
    {
      id: "hazop-hoses",
      title: "HAZOP report Hoses 100816.pdf (177KB)",
      description:
        "HAZOP resulted in formulation of thicker hoses that withstand 100kg pull, are Thiram free and have spiral convolution to avoid water acting as a bacterial pool for units in storage.",
      icon: <FileText size={24} />,
      link: "/assets/pdf/hazops/HAZOP_report_Hoses_100816.pdf",
      isExternal: true,
    },
    {
      id: "hazop-o-rings",
      title: "HAZOP report O Rings (86KB)",
      description:
        "Considers all seals and O-rings in the O.R. rebreathers.",
      icon: <FileText size={24} />,
      link: "/assets/pdf/hazops/HAZOP_report_O_rings_100816.pdf",
      isExternal: true,
    },
    {
      id: "hazop-algorithm",
      title: "HAZOP report on on-off algorithm (80KB)",
      description:
        "As a result of HAZOP, wet contacts were removed and PPO2 activated on-off algorithm adopted universally.",
      icon: <FileText size={24} />,
      link: "/assets/pdf/hazops/HAZOP_report_on-off_alg_100816.pdf",
      isExternal: true,
    },
    {
      id: "hazop-display",
      title: "HAZOP report on iCCR Diver Interface (80KB)",
      description:
        "As a result of HAZOP, display provided to buddy diver.",
      icon: <FileText size={24} />,
      link: "/assets/pdf/hazops/HAZOP_report_Diver_Interface_080528.pdf",
      isExternal: true,
    },
    {
      id: "hazop-tank-pressure",
      title: "HAZOP report on tank pressure sender device (81KB)",
      description:
        "HAZOP process applied to a contents gauge using a pressure sensor with an RF link.",
      icon: <FileText size={24} />,
      link: "/assets/pdf/hazops/HAZOP_report_Tank_Sender_080528.pdf",
      isExternal: true,
    },
  ];

  const handleDocumentClick = (id: string) => {
    setSelectedDocument(id === selectedDocument ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
            IEC 61508 Safety Case: Sample HAZOPS
      </h1>

      <div className="mb-8 text-gray-700">
        <p className="mb-4">
            Examples of design decisions developed using a HAZOP process during the design of the Open Safety's Family of Rebreathers
        </p>
      </div>

      <div className="space-y-4">
        {documentItems.map((item) => {
          const cardContent = (
            <div
              className={`flex border rounded-lg p-4 mt-4 transition-colors ${
                selectedDocument === item.id
                  ? 'bg-blue-50 border-blue-300'
                  : 'hover:bg-gray-50 border-gray-200'
              }`}
              onClick={() => handleDocumentClick(item.id)}
            >
              <div className="flex-shrink-0 mr-4 text-blue-600">{item.icon}</div>
              <div className="flex-1">
                <h3 className="font-medium text-blue-700">{item.title}</h3>
                <p className="text-gray-600 mt-1">{item.description}</p>
              </div>
            </div>
          );

          return item.isExternal ? (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cardContent}
            </a>
          ) : (
            <Link key={item.id} to={item.link}>
              {cardContent}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HazopPage;