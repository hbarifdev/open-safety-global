const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Open Safety Equipment Ltd: Who we are and what we do</h1>
      
      <div className="prose max-w-none">
        <p className="text-gray-600 mb-6">
          Open Safety Equipment Ltd specialise in designing and manufacturing diving rebreathers that meet Functional Safety and CE standards.
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Heritage</h2>
          <p className="text-gray-600 mb-4">
            Open Safety Equipment Ltd is part of Deep Life Group who have been designing, manufacturing, and testing rebreathers since 2002. We have been selling rebreathers globally since 2008. We maintain ISO 9001:2015 as well as a host of other standards.
          </p>
          <p className="text-gray-600 mb-4">
            Our management team is British, though as an equal opportunity employer, our staff hail from all corners of the world.
          </p>
          <p className="text-gray-600">
            As part of the Deep Life Group, Open Safety benefits from their strong technical resources, engineering qualifications and procurement channels. We deliver our rebreathers worldwide and maintain a robust spares and support infrastructure through our commercial sales channels, military product distributors and direct supply of our sports products.
          </p>
        </div>

        <div className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Functional Safety: Our Distinguishing Feature</h2>
          <p className="text-gray-600 mb-4">
            Open Safety is the only dive equipment company ever to achieve a Functional Safety certification for its processes and products: in our case, this is to IEC EN 61508 at SIL 3 - the most onerous and exacting standard from which all other industry safety standards are derived.
          </p>
          <p className="text-gray-600 mb-4 font-medium">
            Two aspects that flow from this for our customers are:
          </p>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>
              <strong>Our lifetime safety warranty</strong> is exceptional, providing the best technology and products to "future proof" our customers - the only rebreathers they ever need to buy.
            </li>
            <li>
              <strong>Open publication of all safety data</strong> - we are the only dive equipment company to do so. Instead of false claims of "we have the lowest ABC" or the best "XYZ", we deliver that and publish the full audited test data for the world to examine and verify. If we can't achieve the best performance for any reason, then we don't manufacture it.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Innovations</h2>
          <p className="text-gray-600 mb-4">
            Our products lead by innovation. Open Safety's team invented and shipped the:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>First rebreather designed for EAC scrubber cartridges (2005)</li>
              <li>First twin scrubber rebreather (2008)</li>
              <li>First rebreather with 3D counterlungs for the lowest work of breathing (2008)</li>
              <li>First rebreather with snorkel tubes enabling it to be breathed when flooded (2009)</li>
              <li>First and only automatic bail out valve (2009)</li>
              <li>First and only rebreather with automatically closing mouthpiece (2009)</li>
              <li>First and only rebreather with respiratory rate monitoring (2009)</li>
              <li>First and only rebreathers with end of tidal CO2 monitoring (2009)</li>
              <li>First and only military rebreathers that can be fully flooded and recovered underwater (2010)</li>
              <li>First and only umbilical rebreathers that are CE and NORSOK certified for commercial diving (2011)</li>
            </ul>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>First all-mode military rebreathers (2011)</li>
              <li>First rebreathers with progressively opening oxygen valves (2015 to 2019)</li>
              <li>First and only rebreather gas switch meeting functional safety standards (2016)</li>
              <li>First safe triple gas military rebreathers (first shipment scheduled for September 2020)</li>
              <li>First UW switchable triple gas military MCM rebreather (2020)</li>
              <li>First military MCM rebreather with solid state PPO2 sensing (2021)</li>
              <li>First military MCM rebreather with data display HUD as standard: Incursion ER (2021)</li>
            </ul>
          </div>
          <p className="text-gray-600 mt-4 text-sm">
            All dates indicated are dates of first customer shipment.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Experience Our Innovations</h3>
          <p className="text-gray-600">
            Find out more about how our dedication to safety, with these innovations, can serve you by browsing our product pages, or experience it first hand in a production demonstration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;