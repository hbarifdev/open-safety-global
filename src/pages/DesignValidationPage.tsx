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

const DesignValidationPage = () => {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const documentItems: DocumentItem[] = [
    {
      id: "alvbov",
      title: "Respiratory performance of ALVBOV in Open Circuit mode (0.5 MB)",
      description:
        "EN 250 respiratory performance measurements of the ALVBOV...",
      icon: <FileText size={24} />,
      link: "/assets/pdf/design-validation/DV_DL_ALVBOV_Breathing_Params_A3_100318.pdf",
      isExternal: true,
    },
    {
      id: "breathable-volume",
      title: "Breathable Volume of O.R. Umbilical... (1.1MB)",
      description:
        "Reports key test results to ensure the breathing volume...",
      icon: <FileText size={24} />,
      link: "/assets/pdf/design-validation/DV_OR_Tidalvolume_090911.pdf",
      isExternal: true,
    },
    {
      id: "wob-resistance",
      title: "Work of Breathing and Breathing Resistance... (5.4 MB)",
      description:
        "Updated November 2010: This is a comprehensive treatise...",
      icon: <FileText size={24} />,
      link: "/assets/pdf/design-validation/DV_OR_WOB_Respiratory_C1_101111.pdf",
      isExternal: true,
    },
    {
      id: "hydrostatic-imbalance",
      title: "Hydrostatic imbalance of Deep Life Open Revolution Rebreathers... (3.9MB)",
      description:
        "Updated 16th Nov 2010. Full test using production samples...",
      icon: <FileText size={24} />,
      link: "/assets/pdf/design-validation/DV_DLOR_HydroImbal_101116.pdf",
      isExternal: true,
    },
    {
      id: "oxygen-cells",
      title: "Oxygen Cells for Dive Applications... (4MB)",
      description:
        "Last updated 15th April 2016. Characterisation of galvanic oxygen cells...",
      icon: <FileText size={24} />,
      link: "/assets/pdf/design-validation/DV_O2_cell_study_E4_160415.pdf",
      isExternal: true,
    },
    {
      id: "sensor-fusion-cases",
      title: "Oxygen Cell Failure Test Cases... (362KB)",
      description:
        "Last updated 25th March 2013. Test cases for use in validating...",
      icon: <FileText size={24} />,
      link: "/assets/pdf/design-validation/Test_Data_for_Sensor_Fusion_Algorithms_RV_130325.pdf",
      isExternal: true,
    },
    {
      id: "cns-toxicity",
      title: "CNS Oxygen Toxicity Algorithm and Verification (385KB)",
      description:
        "Last updated 15th November 2013. CNS O2 Toxicity computation...",
      icon: <FileText size={24} />,
      link: "/assets/pdf/design-validation/DV_AdaModule_CNS_RevE_131115.pdf",
      isExternal: true,
    },
    {
      id: "co2-exposure",
      title: "Tolerance of Deep Life Oxygen Cells to CO2 Exposure (528KB)",
      description:
        "An assessment of the effect of CO2 exposure on oxygen cell performance...",
      icon: <FileText size={24} />,
      link: "/assets/pdf/design-validation/DV_CO2_exposure_of_oxygen_cells_110415.pdf",
      isExternal: true,
    },
    {
      id: "ppo2-accuracy",
      title: "PPO2 Accuracy (1.5M)",
      description:
        "Updated 5th Jan 2011. Verification Report on the accuracy...",
      icon: <FileText size={24} />,
      link: "/assets/pdf/design-validation/DV_PPO2_Device_Accuracy_110105.pdf",
      isExternal: true,
    },
    {
      id: "sfa3-algorithm",
      title: "SFA3 Oxygen Sensor Fusion Algorithm (1.3MB)",
      description:
        "Failure analysis shows that voting algorithms are unsafe...",
      icon: <FileText size={24} />,
      link: "/assets/pdf/design-validation/DV_O2_sensor_fusion_120625R.pdf",
      isExternal: true,
    },
    {
      id: "safe-dosing",
      title: "Verification of Fail Safe Oxygen Dosing System (1.6MB)",
      description:
        "Updated 16th Aug 2010. Verification of the fail safety of PPO2...",
      icon: <FileText size={24} />,
      link: "/assets/pdf/design-validation/DV_Safe_O2_dosing_100816.pdf",
      isExternal: true,
    },
    {
      id: "injector-verification",
      title: "Verification of Variable Orifice Gas Injector (1.68MB)",
      description:
        "Updated 2nd Mar 2007. This is the test and verification report...",
      icon: <FileText size={24} />,
      link: "/assets/pdf/design-validation/DV_O2_injector_100302.pdf",
      isExternal: true,
    },
    {
      id: "scrubber-endurance",
      title: "Open Revolution single scrubber endurance (1.6MB)",
      description:
        "Scrubber performance of the single scrubber Open Revolution...",
      icon: <FileText size={24} />,
      link: "/assets/pdf/design-validation/DV_OR_ScrubberEndurance_Retest_SRB_101215.pdf",
      isExternal: true,
    },
    {
      id: "resp-rate",
      title: "Respiratory Rate Sensing (840KB)",
      description:
        "Disclosure and verification of the respiratory rate sensor...",
      icon: <FileText size={24} />,
      link: "/assets/pdf/design-validation/DV_Respiratory_Sensor_101130.pdf",
      isExternal: true,
    },
    {
      id: "saphion-cells",
      title: "Power Systems 1: Saphion IFR18650e Li-Ion Cell (1024KB)",
      description:
        "Verification of the suitability of Valence Saphion IFR 18650e...",
      icon: <FileText size={24} />,
      link: "/assets/pdf/design-validation/DV_OR_SaphionCells_080415.pdf",
      isExternal: true,
    },
    {
      id: "power-supplies",
      title: "Power Systems 2: Rebreather Power Supplies (312KB)",
      description:
        "Verification and review of the power supplies in the Deep Life O.R....",
      icon: <FileText size={24} />,
      link: "/assets/pdf/design-validation/DV_OR_Power_080319.pdf",
      isExternal: true,
    },
    {
      id: "terminator-psu",
      title: "Commercial Diving Rebreather: Terminator PSU Safety (482KB)",
      description:
        "Review and validation of power supplies in the Umbilical Terminator...",
      icon: <FileText size={24} />,
      link: "/assets/pdf/design-validation/DV_Umbilical_Terminator_PSUs_A3r_080422.pdf",
      isExternal: true,
    },
    {
      id: "depth-gauge",
      title: "Pressure Gauge Maximum Depth Test (0.2 MB)",
      description:
        "EN 250 approval of pressure gauges covers their use only to depths of 50m...",
      icon: <FileText size={24} />,
      link: "/assets/pdf/design-validation/DV_Megasport_Mini_Index_MaxAmbient_091214.pdf",
      isExternal: true,
    },
    {
      id: "helium-accuracy",
      title: "Accuracy of rebreather helium sensor (470KB)",
      description:
        "Accuracy assessment of helium sensor, as a function of ageing, pressure...",
      icon: <FileText size={24} />,
      link: "/assets/pdf/design-validation/DV_OR_HeSensor_accuracy_analysis_090911.pdf",
      isExternal: true,
    },
    {
      id: "helium-susceptibility",
      title: "Helium Susceptibility of Components (686KB)",
      description:
        "Updated 16th Aug 2010. A screen of different generic types of electronic components...",
      icon: <FileText size={24} />,
      link: "/assets/pdf/design-validation/DV_Helium_Susceptibility_100816.pdf",
      isExternal: true,
    }
  ];

  const handleDocumentClick = (id: string) => {
    setSelectedDocument(id === selectedDocument ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        IEC 61508 Safety Case: Design Validation
      </h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Design Validation (DV) and Verification Reports on Open Safety Equipment Ltd's Rebreathers.
      </h2>

      <div className="mb-8 text-gray-700">
        <p className="mb-4">
Open Safety produce and support its range of rebreathers, within Deep Life Group's certified Functional Safety processes. Design and validation is performed by other companies within Deep Life Group to avoid conflicts of interest - the principle that the designer does not test, and the testing is not performed by the same team that manufacturers or sells the product.        </p>
        <p className="mb-4">
All reports reported here has been subject to completely independent audit (by SGS as the Notified Body, Qinetiq, or SIRA), and by an industry panel assembled from outside Deep Life Group. Our advanced technologies such as end-of-tidal CO2 sensing, twin scrubbers, and umbilical rebreather were subject to a Devils Advocate review by a lead competitor contracted for that purpose. Our publication here implements the Functional Safety "Right to Know" for all safety data. Additionally it extends that level of critical review to include the public and all other interested parties.
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

export default DesignValidationPage;