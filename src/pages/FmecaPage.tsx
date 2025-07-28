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

const FmecaPage = () => {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const documentItems: DocumentItem[] = [
    {
      id: "fmeca-study",
      title: "Fault Study Effect of Flooding on Breathing Resistance in Granular Scrubbers (180KB)",
      description:
        "Republished 2006 report, Effect of water ingress on granular scrubbers. As little as 50g of water causes considerable increases in work of breathing.",
      icon: <FileText size={24} />,
      link: "/assets/pdf/fmeca/Effect_of_flooding_with_granules_061027.pdf",
      isExternal: true,
    },
    {
      id: "fmeca-volume-1",
      title: "FMECA Volume 1: Top Level (308KB)",
      description:
        "Last updated 29th May 2009, covering the Open Safety (OSEL) Umbilical, Incursion and OR_Apocalypse rebreather models.",
      icon: <FileText size={24} />,
      link: "/assets/pdf/fmeca/FMECA_OR_V1_Top_090529.pdf",
      isExternal: true,
    },
    {
      id: "fmeca-volume-2",
      title: "FMECA Volume 2: MTBF and MTBCF of Electronics (52k)",
      description:
        "Last updated 29th May 2009.",
      icon: <FileText size={24} />,
      link: "/assets/pdf/fmeca/FMECA_OR_V2_Elec_MTBCF_090529.pdf",
      isExternal: true,
    },
    {
      id: "fmeca-volume-3",
      title: "FMECA Volume 3: Electronics (201KB)",
      description:
        "Last updated 29th May 2009.",
      icon: <FileText size={24} />,
      link: "/assets/pdf/fmeca/FMECA_OR_V3_Elec_FMA_090529.pdf",
      isExternal: true,
    },
    {
      id: "fmeca-volume-4",
      title: "FMECA Volume 4: Mechanical Components (4.5MB)",
      description:
        "The FMECA of the mechanical component of Open Safety's family of rebreathers. Last updated 21st Au August 2018.",
      icon: <FileText size={24} />,
      link: "/assets/pdf/fmeca/FMECA_OR_V4_180821.pdf",
      isExternal: true,
    },
    {
      id: "fmeca-volume-5",
      title: "FMECA Volume 5: Software and Firmware (568KB)",
      description:
        "FMECA covering firmware and software in the Open Revolution rebreathers and rebreather monitors. This covers both primary FMECA and also correct by construction features to avoid failures from design or programming errors.",
      icon: <FileText size={24} />,
      link: "/assets/pdf/fmeca/FMECA_OR_V5_080812.pdf",
      isExternal: true,
    }, 
    {
      id: "fmeca-volume-6",
      title: "FMECA Volume 6: Top Down Rebreather Faults (1.6MB)",
      description:
        "The top down failure modes, including all failures that could create a safety issue during a dive. This document covers all types of rebreathers, and faults on any rebreather type. Last updated 10th September 2019.",
      icon: <FileText size={24} />,
      link: "/assets/pdf/fmeca/FMECA_OR_V6_190910.pdf",
      isExternal: true,
    },
  ];

  const handleDocumentClick = (id: string) => {
    setSelectedDocument(id === selectedDocument ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        IEC 61508 Safety Case: Rebreather FMECAs
      </h1>

      <div className="mb-8 text-gray-700">
        <p className="mb-4">
The FMECA files supporting the Open Safety family of rebreathers: all variants of the Incursion Multi-Mode Rebreather, Umbilical Supplied Rebreather, and its two sports rebreathers.
        </p>
        <p className="mb-4">
The FMECAs below comprising nine volumes in total: V1 to V9, with V9 being the compliance check. FMECA V6 in particular is a key industry resource created by the project, that is applicable to all rebreather developments by all manufacturers. FMECA 4, 6 and 7 form an essential checklist before releasing any rebreather into manned trials or into the market.
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

export default FmecaPage;