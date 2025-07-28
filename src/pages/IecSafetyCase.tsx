import { Link } from "react-router-dom";
const IecSafetyCase: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-sm leading-relaxed text-black">
      <h1 className="text-2xl font-bold mb-6">
        IEC 61508 Safety Case: Learning from accident data
      </h1>

      <p className="mb-4">
        Data on rebreather accidents is needed by all involved with rebreathers, for developing safety cases and for business assessment.
        <br />
        The database published here is maintained by Deep Life Group as part of our Group Functional Safety management. It comprises 4 categories of information:
      </p>

      <ol className="list-decimal pl-6 mb-4">
        <li>Comprehensive database of fatal rebreather accidents.</li>
        <li>Tools and academic data for the significance of accidents to be assessed statistically.</li>
        <li>Training Material for rebreather accident investigation and associated data.</li>
        <li>Analysis of known incidents or actions for training purposes.</li>
      </ol>

      <p className="mb-6">
        Please report any new incidents or serious incidents to the Coordinator at Deep Life
      </p>

      <a href="/assets/pdf/safety-case/Rebreather_Marketing_vs_Engineering.pdf" target="_blank"><p className="mb-4 font-semibold text-red-600">
        Paper ignoring the decision within the sports rebreather industry, where linked budgets result in decisions seeking to maximize marketing at the cost of engineering, and the actual consequences of those decisions.
      </p></a>

      <a
        href="/assets/others/safety-case/RB_Fatal_Accident_Database_100725.xls"
        className="text-blue-600 underline block mb-4"
        download>
        Rebreather Fatal Accident Database (XLS)
      </a>

      <h2 className="text-xl font-bold mt-8 mb-4">BEFORE YOU SET OUT TO GO DIVING:</h2>

      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>
          Choose your rebreather with care. Different rebreathers and the same dive may bring an entirely different risk. Product designs (if non-reputable the brand) harm lives. Unused rebreathers stored on shelves for years also carry risks. Only CE marked or otherwise tested by reputable agencies should be used.
        </li>
        <li>
          Always pre-dive your rebreather with a full off-checklist; and look where that checklist came from.
        </li>
        <li>
          Change your sorbent within the manufacturer's stated endurance for the dive profile you plan.
        </li>
        <li>
          Always replace your CO2 cells after a year of service or within 9 months after manufacture – whichever comes first.
        </li>
        <li>
          Do pre-breathe checks and remove the rebreather that fails any check or that you have any doubt about.
        </li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-4">WHEN YOU PRE-BREATHE WITH ELECTRONIC CCR</h2>

      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Look at your PPO2 at entry minute on initial descent.</li>
        <li>Look at your PPO2 every 5 minutes on bottom time.</li>
        <li>If manual mCCR, add O2 to match setpoint PPO2s.</li>
        <li>If you feel sleepy or confused, or concerned, immediately inject a burst of O2.</li>
        <li>Immediately abort the dive for any CO2 problem.</li>
        <li>If one diver aborts a dive, for any reason, the buddy MUST stay with them.</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-4">IF REBREATHER SHOWS AN ALARM OR MALFUNCTIONS:</h2>

      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Inject some gas (O2 if manual). Then think.</li>
        <li>Process with logic. If warning is faulty: bailout. If you suspect hypercapnia: bailout and flush air.</li>
        <li>Do NOT inhale.</li>
        <li>Do NOT continue dive without injecting gas manually.</li>
        <li>If time elapsed is bad, or if you do not know your PPO2, then you must bail out immediately.</li>
      </ul>

      <a
        href="/assets/others/safety-case/combined_rebreather_risk_analysis_080509.xls"
        className="text-blue-600 underline block mb-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        Risk Analysis Toolkit with Sports Rebreather Database (PDF)
      </a>

      <a
        href="/assets/pdf/safety-case/Rebreather_Accident_Analysis_Method_071219.pdf"
        className="text-blue-600 underline block mb-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        Safety Note on short residual cycle risk (PDF)
      </a>

      <a
        href="/assets/pdf/safety-case/How_Rebreathers_Kill_People.pdf"
        className="text-blue-600 underline block mb-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        Checklist for full loop tests (PDF)
      </a>

      <a
        href="/assets/pdf/safety-case/Effect_of_flooding_with_granules_061027.pdf"
        className="text-blue-600 underline block mb-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sorbent testing on breakage resistance of granulated CO2 absorber (PDF)
      </a>
    </div>
  );
};

export default IecSafetyCase;
