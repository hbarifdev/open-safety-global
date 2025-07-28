const CertificationsPage = () => {
  const certifications = [
    {
      title: "ISO9001:2015 & ISO 13485:2016",
      issuer: "Lloyds Register QA,UKAS Accredited",
      description: "Covers Open Safety Equipment Ltd and all  other Deep Life Group operating sites.",
      status: "Current.  Due for renewal in 2027.",
      image: "/assets/images/certifications/ISO9001+13485-200px.png",
      pdf: "",
    },
    {
      title: "ISO14001:2015",
      issuer: "TUV Rheinland, IAF Accredited",
      description: "Covers Open Safety Equipment Ltd and all  other Deep Life Group operating sites.",
      status: "Routine 3 yearly recertification.",
      image: "/assets/images/certifications/DLG-ISO14001-TUVRH-Nov2019.png",
      pdf: "/assets/pdf/certifications/DLG-ISO14001-TUVRH-Nov2019.pdf",
    },
    {
      title: "CE PPE Directive Type Approval",
      issuer: "SGS UK, UKAS Accredited",
      description: "Covers Incursion BM rebreather all modes including eCCR with end of tidal CO2 monitoring.",
      status: "Current, was issued for life. Open Safety have scheduled recertifion in 2021 to new standards.",
      image: "/assets/images/certifications/SGSIncursionTACert.jpg",
      pdf: "",
    },
    {
      title: "Functional Safety IEC EN 61508 SIL3",
      issuer: "SIRA UK, UKAS Accredited",
      description: "Open Safety are the only company producing rebreathers certified to IEC 61508. This is the original certification of Deep Life Group's process for diving equipment covering all lifecycle stages from concept to disposal.  Certificate authorises Deep Life to certify the Open Safety rebreathers to IEC EN 61508: the process certification audits are an order of magnitude stricter than product certifications.",
      status: "At conclusion of monitoring in 2013, maintained as unchanged ISO9001 processes. Deep Life Group are recertifying to IEC EN61508:2010 for Open Safety's new product releases.",
      image: "/assets/images/certifications/EN61508_cert_SIRA_DL_040310.png",
      pdf: "/assets/pdf/certifications/EN61508_cert_SIRA_DL_040310.pdf",
    },
    {
      title: "CE PPE Directive Type Approval",
      issuer: "SGS UK, UKAS Accredited",
      description: "Covers Deep-Worker Umbilical Rebreather in all modes including eCCR with end of tidal CO2 monitoring.",
      status: "Current, was issued for life. Open Safety have scheduled recertifion in 2021 to new standards.",
      image: "/assets/images/certifications/DLGSGS-200px.png",
      pdf: "",
    },
    {
      title: "CE PPE Directive Type Approval",
      issuer: "SGS UK, UKAS Accredited",
      description: "Covers 22kg lift buoyancy device fitted to Open Safety's backmount rebreathers as standard.",
      status: "Current, was issued for life. Open Safety have scheduled recertifion in 2021 to new standards.",
      image: "/assets/images/certifications/DLGSGS-200px.png",
      pdf: "",
    },
    {
      title: "CE PPE Directive Type Approval",
      issuer: "SGS UK, UKAS Accredited",
      description: "Covers Apocalypse mCCR Sports Rebreather",
      status: "Current, was issued for life. Open Safety have scheduled recertifion in 2021 to new standards.",
      image: "/assets/images/certifications/DLGSGS-200px.png",
      pdf: "",
    },
    {
      title: "CE PPE Directive Type Approval",
      issuer: "SGS UK, UKAS Accredited",
      description: "Covers Apocalypse iCCR Sports Rebreather in all modes.",
      status: "Current, was issued for life. Open Safety have scheduled recertifion in 2021 to new standards.",
      image: "/assets/images/certifications/DLGSGS-200px.png",
      pdf: "",
    },
    {
      title: "Valves O2 Compatibility ISO10297:2006",
      issuer: "BAM Germany, German Federal Institute for Testing",
      description: "Covers Open Safety valves on its rebreathers.",
      status: "Current, was issued for life.",
      image: "/assets/images/certifications/DLGBAM-200px.png",
      pdf: "",
    },
    {
      title: "EMC Directive",
      issuer: "York EMC UK, UKAS Accredited",
      description: "All electronics on all rebreathers assembled and operating together at one time including Cyclops umbilical rebreather, Incursion eCCR, all associated telemetry and topside server.",
      status: "Current, was issued for life.",
      image: "/assets/images/certifications/York_EMC_Allrebreather_2946TC2.png",
      pdf: "/assets/pdf/certifications/York_EMC_Allrebreather_2946TC2.pdf",
    },
    {
      title: "Valves O2 Compatibility ISO10297:2006",
      issuer: "BAM Germany, German Federal Institute for Testing",
      description: "Covers Nautec valves shipped on Open Safety's Incursion CMR rebreathers.",
      status: "Current, was issued for life.",
      image: "/assets/images/certifications/DLGBAM-200px.png",
      pdf: "",
    },{
      title: "Valves O2 Compatibility ISO10297:2006",
      issuer: "BAM Germany, German Federal Institute for Testing",
      description: "Covers Nautics valves shipped on Open Safety's Inexcision BN rebreathers.",
      status: "Current, was issued for life.",
      image: "/assets/images/certifications/DLGBAM-200px.png",
      pdf: "",
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Product & Process Certifications</h1>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              To see the full pdf of any certificate, click on its image. For variation certificates issued from these documents, contact Open Safety.
              Declarations of Conformity to the relevant certificates are shipped with every product.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              {cert.pdf ? (
                  <a href={cert.pdf} target="_blank" rel="noopener noreferrer">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-64 object-contain p-4"
                    />
                  </a>
                ) : (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-64 object-contain p-4"
                  />
                )}

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{cert.title}</h3>
                <p className="text-sm font-medium text-blue-600 mb-3">{cert.issuer}</p>
                <p className="text-gray-600 mb-4">{cert.description}</p>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Status:</span> {cert.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CertificationsPage;