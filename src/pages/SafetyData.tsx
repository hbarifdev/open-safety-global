import { useState } from 'react';
import { FileText, Database, Clipboard, AlertTriangle, Activity, Presentation, FileSpreadsheet } from 'lucide-react';

interface DocumentItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  fileSize?: string;
}

const SafetyData = () => {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  
  const documentItems: DocumentItem[] = [
    {
      id: "safety-integrity",
      title: "Safety Integrity Level Assignment for Dive Systems",
      description: "The EN61508 Safety Integrity Level assessment and assignment for the different subsystems and applications for rebreathers. The SIL assignment for eSCR and eCCR is SIL 3 to 4, the communications has a SIL assignment of SIL 2, independent PPO2 monitor is assigned SIL 2, Topside monitoring software is assigned SIL 1.",
      icon: <FileText size={24} />,
      fileSize: "(325KB)"
    },
    {
      id: "formal-models",
      title: "Formal (maths) models",
      description: "Maths models for the rebreather, its environment, and decompression algorithms. These are in Matlab and Simulink for ease of use, and for Monte Carlo testing of independently written code.",
      icon: <Database size={24} />
    },
    {
      id: "accident-database",
      title: "Accident Database and Reviews",
      description: "The Comprehensive Database of Rebreather Fatal Accidents, and incident analysis: a data-mine that can improve safety in the design and training processes.",
      icon: <Database size={24} />
    },
    {
      id: "design-validation",
      title: "Design Validation Reports",
      description: "These are the detailed test and validation reports that identify the limits of each subassembly.",
      icon: <Clipboard size={24} />
    },
    {
      id: "hazops",
      title: "HAZOPS",
      description: "A selection from the Formal HAZOP and safety review reports. The HAZID reviews also contribute to Volume 6 of the FMECA.",
      icon: <AlertTriangle size={24} />
    },
    {
      id: "fmeca",
      title: "FMECA",
      description: "There are 10 volumes in total covering the whole design, from top down and from bottom up, for the electronics, software and mechanics, including a Fault Tree Analysis.",
      icon: <Activity size={24} />
    },
    {
      id: "open-safety",
      title: "Open Safety Rebreathers",
      description: "Presentations on Open Safety's family of rebreathers.",
      icon: <Presentation size={24} />
    },
    {
      id: "exploded-drawings",
      title: "Exploded Drawings",
      description: "Full set of exploded drawings for the Open Revolution family of rebreathers.",
      icon: <FileSpreadsheet size={24} />
    }
  ];

  const handleDocumentClick = (id: string) => {
    setSelectedDocument(id === selectedDocument ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Right to Know: Full Safety Data on our Rebreathers</h1>
      
      <div className="mb-8 text-gray-700">
        <p className="mb-4">
          Deep Life Group's safety design process was certified to meet IEC EN 61508, the Gold Standard in Functional Safety and High Integrity - this is regarded as the "Gold Standard" from which many industries have produced more manageable subsets in safety standards covering nuclear, rail, air, medicine and chemistry. All Open Safety products designed and managed in accord with that process can be certified to EN 61508, up to SIL 3.
        </p>
        
        <p className="mb-4">
          In IEC EN 61508, a lot of emphasis is put on the safety of electronics and software but the standard is end-to-end, covering all mechanics and even the user's training, the user manuals, and our follow up - including our life guarantee. It has been applied to every aspect of our rebreathers.
        </p>
        
        <p className="mb-4">
          Our products also meet CE EN 14143, EN144, EN250, NORSOK U101 and a host of other standards. The reports below are the safety data used as evidence used to support the Technical Files for each of those standards.
        </p>
        
        <p className="mb-6">
          This project was so technologically revolutionary, the project name prior to product release in Deep Life Group, was "Open Revolution": the Open referring to the open disclosure of the safety data, and the Revolution referring to the first time any dive system has been designed and built to meet Functional Safety standards.
        </p>
        
        <p className="font-semibold mb-4">The main safety data is contained in the following document sets:</p>
      </div>
      
      <div className="space-y-4">
        {documentItems.map((item) => (
          <div 
            key={item.id}
            className={`flex border rounded-lg p-4 cursor-pointer transition-colors ${selectedDocument === item.id ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50 border-gray-200'}`}
            onClick={() => handleDocumentClick(item.id)}
          >
            <div className="flex-shrink-0 mr-4 text-blue-600">
              {item.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-blue-700">
                {item.title} {item.fileSize && <span className="text-sm text-gray-500">{item.fileSize}</span>}
              </h3>
              <p className="text-gray-600 mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafetyData;