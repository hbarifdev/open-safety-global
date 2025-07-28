import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Database,
  Clipboard,
  AlertTriangle,
  Activity,
  Presentation,
  FileSpreadsheet,
} from 'lucide-react';

interface DocumentItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string; 
  isExternal?: boolean;
 }

const SafetyData = () => {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const documentItems: DocumentItem[] = [
    {
      id: "safety-integrity",
      title: "Safety Integrity Level Assignment for Dive Systems",
      description:
        "The EN61508 Safety Integrity Level assessment and assignment for the different subsystems and applications for rebreathers...",
      icon: <FileText size={24} />,
      link: "/assets/pdf/safety-data/SA_SIL_Assessment.pdf",
      isExternal: true,
    },
    {
      id: "formal-models",
      title: "Formal (maths) models",
      description:
        "Maths models for the rebreather, its environment, and decompression algorithms. These are in Matlab and Simulink...",
      icon: <Database size={24} />,
      link: "/model", 
    },
    {
      id: "accident-database",
      title: "Accident Database and Reviews",
      description:
        "The Comprehensive Database of Rebreather Fatal Accidents, and incident analysis...",
      icon: <Database size={24} />,
      link: "/accident",
    },
    {
      id: "design-validation",
      title: "Design Validation Reports",
      description:
        "Detailed test and validation reports that identify the limits of each subassembly.",
      icon: <Clipboard size={24} />,
      link: "/design-validation",
    },
    {
      id: "hazops",
      title: "HAZOPS",
      description:
        "Formal HAZOP and HAZID reviews contributing to Volume 6 of the FMECA.",
      icon: <AlertTriangle size={24} />,
      link: "/hazops",
    },
    {
      id: "fmeca",
      title: "FMECA",
      description:
        "10 volumes covering electronics, software, mechanics including Fault Tree Analysis.",
      icon: <Activity size={24} />,
      link: "/fmeca",
    },
    {
      id: "exploded-drawings",
      title: "Exploded Drawings",
      description:
        "Full set of exploded drawings for the Open Revolution family of rebreathers.",
      icon: <FileSpreadsheet size={24} />,
      link: "/exploded-drawings",
    },
  ];

  const handleDocumentClick = (id: string) => {
    setSelectedDocument(id === selectedDocument ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Your Right to Know: Full Safety Data on our Rebreathers
      </h1>

      <div className="mb-8 text-gray-700">
        <p className="mb-4">
          Deep Life Group's safety design process was certified to meet IEC EN 61508, the Gold Standard in Functional Safety...
        </p>
        <p className="mb-4">
          Our products also meet CE EN 14143, EN144, EN250, NORSOK U101 and more. The reports below are the safety data used to support the Technical Files.
        </p>
        <p className="font-semibold mb-4">
          The main safety data is contained in the following document sets:
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

export default SafetyData;
