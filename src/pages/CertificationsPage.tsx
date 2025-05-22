const CertificationsPage = () => {
  const certifications = [
    {
      title: "ISO9001:2015",
      issuer: "TUV Nord, IAF Accredited",
      description: "Covers Open Safety Equipment Ltd and all other Deep Life Group operating sites.",
      status: "Current, Due for renewal in 2023."
    },
    {
      title: "CE PPE Directive Type Approval",
      issuer: "SGS UK, UKAS Accredited",
      description: "Covers Inexcision BMI rebreather in all modes including eCCR with end of total CO2 monitoring.",
      status: "Current, was issued for life. Open Safety have scheduled recertified in 2021 to new standards."
    },
    {
      title: "CE PPE Directive Type Approval",
      issuer: "SGS UK, UKAS Accredited",
      description: "Covers Deep-Worker Umbilical Rebreather in all modes including eCCR with end of total CO2 monitoring.",
      status: "Current, was issued for life. Open Safety have scheduled recertified in 2021 to new standards."
    },
    {
      title: "CE PPE Directive Type Approval",
      issuer: "SGS UK, UKAS Accredited",
      description: "Covers Apocalypse mCCR Sports Rebreather in all modes.",
      status: "Current, was issued for life. Open Safety have scheduled recertified in 2021 to new standards."
    },
    {
      title: "Valves O2 Compatibility ISO10297:2006",
      issuer: "BAM Germany, German Federal Institute for Testing",
      description: "Covers Open Safety valves on its rebreathers.",
      status: "Current, was issued for life."
    },
    {
      title: "Valves O2 Compatibility ISO10297:2006",
      issuer: "BAM Germany, German Federal Institute for Testing",
      description: "Covers Nautics valves shipped on Open Safety's Inexcision CNM rebreathers.",
      status: "Current, was issued for life."
    },
    {
      title: "ISO14001:2015",
      issuer: "TUV Rheinland, IAF Accredited",
      description: "Covers Open Safety Equipment Ltd and all other Deep Life Group operating sites.",
      status: "Routine 3 yearly recertification underway."
    },
    {
      title: "Functional Safety IEC EN 61508 SIL3",
      issuer: "SIRA UK, UKAS Accredited",
      description: "Certification of Deep Life Group's process for diving equipment covering all lifecycle stages from concept to disposal. Certificate authorizes Deep Life to certify the Open Safety Rebreathers to IEC EN 61508; the process certification audits can no need of negligible activities than product certifications.",
      status: "All consolidation (monitoring in 2013, maintained as unchanged ISO/001) processes. Deep Life Group are recertifying to EN61508 in 2021 for Open Safety's new product releases."
    },
    {
      title: "CE PPE Directive Type Approval",
      issuer: "SGS UK, UKAS Accredited",
      description: "Covers SIRA lift buoyancy device fitted to Open Safety's backmount rebreather as standard.",
      status: "Current, was issued for life. Open Safety have scheduled recertified in 2021 to new standards."
    },
    {
      title: "CE PPE Directive Type Approval",
      issuer: "SGS UK, UKAS Accredited",
      description: "Covers Apocalypse ICCR Sports Rebreather in all modes.",
      status: "Current, was issued for life. Open Safety have scheduled recertified in 2021 to new standards."
    },
    {
      title: "EMC Directive",
      issuer: "York EMC UK, UKAS Accredited",
      description: "All electronics on all rebreathers assembled and operating together at one time including C-Cross combined rebreather Inexcision-CCRs, all associated telemetry and topside server.",
      status: "Current, was issued for life."
    },
    {
      title: "Valves O2 Compatibility ISO10297:2006",
      issuer: "BAM Germany, German Federal Institute for Testing",
      description: "Covers Nautics valves shipped on Open Safety's Inexcision BN rebreathers.",
      status: "Current, was issued for life."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Open Safety Equipment Ltd</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Product & Process Certifications</h2>
        <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
          To see the full pdf of any certificate, click on its image. For variation certificates issued from these documents, contact Open Safety.
          Declarations of Conformity to the relevant certificates are shipped with every product.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{cert.title}</h3>
              <p className="text-sm font-medium text-blue-600 mb-3">{cert.issuer}</p>
              <p className="text-gray-600 mb-4">{cert.description}</p>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-700"><span className="font-semibold">Status:</span> {cert.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsPage;