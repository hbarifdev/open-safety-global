import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  FileArchive,
} from 'lucide-react';

interface DocumentItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string; 
  isExternal?: boolean;
 }

const ModelPage = () => {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const documentItems: DocumentItem[] = [
    {
      id: "user-model",
      title: "User manual for the Comprehensive Rebreather Model",
      description:
        "This is the user manual for the Verification model below. A quick start guide is also available, from the Rebreather-World library, written by one of its users: available from https://www.rebreatherworld.com/closed-circuit-rebreather-articles/7106-or-rebreather-model-sim.html in 2014 - use the WebArchive on https://archive.org/web/access to access.",
      icon: <FileText size={24} />,
      link: "/assets/pdf/model/RB_Test_Bench_OR_051106.pdf",
      isExternal: true,
    },
    {
      id: "formal-models",
      title: "Deep Life's Comprehensive Rebreather Verification Model",
      description:
        "This rebreather model is believed to be the most detailed and exact rebreather verification model in existence, modelling the environment, the rebreather, sensors and actuators. The model is used to validate each part of the design and its implementation: that is every part of the design is formally verified. The model is also used in in accident investigation to reduce the list of plausible causes left from filtering the FMECA Vol 6 list faults with the evidence available. See the Readme file for revision history, and examples of use.",
      icon: <FileArchive size={24} />,
      link: "/assets/others/model/Re_BR_3e.zip", 
      isExternal: true,
    },
    {
      id: "accident-database",
      title: "Reference Verification Model for Buhlmann ZH-16A Decompression Algorithm with GUI",
      description:
        "MatLAB R14 and Simulink code, with documentation and a GUI, for the Reference Model for the ZH-16A Decompression Algorithm, with extra compartment for He (Compartment 1b). These are reference models and should be used for that purpose only (that is, independent code verification). To use: Unzip, Start MatLab R14, click on main_RB_TB.m and run it (F5). You should now see a dive computer like GUI. Enter a profile using Manual mode or reading a profile (under Depth), then RUN, PAUSE, change to Deco (under Depth), RUN to get deco profile. See graphs under Profile Figure.",
      icon: <FileArchive size={24} />,
      link: "/assets/others/model/GUI_Sim2a_060325_He_updated_sounds.zip", 
      isExternal: true,
    },
  ];

  const handleDocumentClick = (id: string) => {
    setSelectedDocument(id === selectedDocument ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        IEC 61508 Safety Case: Formal Models
      </h1>

      <div className="mb-8 text-gray-700">
        <p className="mb-4">
          Deep Life Group, including Open Safety Equipment Ltd, use both Matlab for formal specification and modelling, fitting well with the use of SPARK Ada and other coding tools. Matlab operates with unbounded systems, such as those with analogue sensors, and is easy to follow. For those reasons, we have chosen Matlab for the specification modelling for the rebreather development, resulting in the six rebreather models produced by Open Safety Equipment Ltd (OSEL). All rebreather code used by OSEL is written in SPARK Ada, a language used for the most onerous safety applications, including nuclear reactor control, Heathrow's air traffic control, the European Fighter Project and others.
        </p>
        <p className="mb-4">
          The models published below are believed to be the most detailed available for a rebreather. If there is a material feature not represented, or a phenomenon not captured, please let us know.
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

export default ModelPage;
