const ReturnPolicy = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Warranty, Service & Returns</h1>
      
      <div className="prose max-w-none">
        <div className="mb-10 bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Future-Proof: Free Lifetime Safety Upgrades</h2>
          <p className="text-gray-600 mb-4">
            Open Safety Equipment Ltd, ("OSEL") strives to achieve the highest levels of safety across all its products 
            and maintains a programme of research and engineering development with that purpose. When improvements in 
            materials, design or technology are found, that improve the safety of the product, an upgrade free of charge 
            will be issued to the buyer of this equipment.
          </p>
          <p className="text-gray-600 mb-4">
            This guarantee is valid for the lifetime of the equipment, and may be transferred with the equipment if it is sold.
          </p>
          <p className="text-gray-600">
            This upgrade policy does not include upgrades that are not primarily of a safety nature, such as upgrades to add 
            features, or to improve features for reasons other than safety.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Limited Lifetime Warranty on our Rebreathers</h2>
          <p className="text-gray-600 mb-4">
            OSEL warrants that its products are free from defects in material and workmanship under use in accord with the 
            User Manual. OSEL shall, at its sole discretion, repair or replace any parts free of charge in the event of any 
            part being found defective for the rated service life of the product for rebreathers and for one year for other products.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Warranty Limitations</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>This warranty constitutes the sole and exclusive remedy available to the purchaser</li>
              <li>Does not cover losses incurred as a result of damage to property or persons</li>
              <li>User waives all right to damages, consequential, liquidated or otherwise</li>
              <li>Excludes damage from transportation, negligence, or failure to follow instructions</li>
              <li>Excludes normal wear and tear, theft, fire, accidents, vandalism, or war</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Warranty Claim Process</h3>
          <p className="text-gray-600 mb-2">
            The purchaser shall inform OSEL of the defect by email without delay, and in any event, within three months of 
            discovering the defect. The notice must include:
          </p>
          <ol className="list-decimal pl-5 text-gray-600 space-y-1 mb-4">
            <li>The product in question (model, serial number)</li>
            <li>Specification of the defect as accurately as possible</li>
            <li>The circumstances in which the defect was detected</li>
          </ol>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Important Safety Notice</h3>
            <p className="text-gray-600">
              Diving is a highly hazardous activity. The user is responsible for performing risk assessment of all operations 
              and taking all necessary risk mitigation measures. See our{" "}
              <a href="/TermsConditions" className="text-blue-600 hover:underline">
                Terms and Conditions of Sale
              </a>{" "}
              for further information on the user's obligations to manage dive risks.
            </p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Service</h2>
          <p className="text-gray-600">
            OSEL offers factory service of any of its products at 4% of the current list price of that product plus shipping.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Returns</h2>
          <p className="text-gray-600 mb-4">
            Contact OSEL before returning any product for a returns number, and instructions on packing and customs declaration.
          </p>
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <p className="text-gray-600">
              <strong>Important:</strong> The customer is responsible for all taxes, duties or demurrage costs that arise 
              from a failure to follow the customs declaration process advised by OSEL.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Contact for Warranty & Returns</h3>
          <p className="text-gray-600 mb-2">
            For all warranty claims, service requests, or return authorizations:
          </p>
          <a 
            href="mailto:support@opensafetyglobal.com" 
            className="text-blue-600 hover:underline font-medium"
          >
            support@opensafetyglobal.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;