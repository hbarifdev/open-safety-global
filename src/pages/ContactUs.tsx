const ContactUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
      
      <p className="text-gray-600 mb-8 text-lg">
        Design, Production and Test in Europe, with customer support globally
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Scotland Office */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Open Safety Equipment Ltd (Scotland)</h2>
            <address className="not-italic text-gray-600 space-y-2">
              <p>6 Newhailes Industrial Estate</p>
              <p>Musselburgh, Scotland, EH21 6SY</p>
              <p>United Kingdom</p>
              <p>Drive to GPS: 55.938258, -3.078224</p>
              <p>VAT: GB 942 6650 13</p>
              <p className="mt-4"><strong>Tel:</strong> +44 131 618 6999</p>
              <p><strong>Skype:</strong> "deeplifeltd" (chat & voice)</p>
              <p><strong>Zoom:</strong> Email for Zoom session</p>
              <p>
                <strong>FB:</strong>{" "}
                <a 
                  href="https://www.facebook.com/pages/Open-Safety-Equipment-Ltd/151298954899613" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  www.facebook.com/pages/Open-Safety-Equipment-Ltd/151298954899613
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Portugal Office */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Deep Life Group: Open Safety Equipment (Portugal)</h2>
            <address className="not-italic text-gray-600 space-y-2">
              <p>Edificio Forno da Cal</p>
              <p>Estrada Nacional 378, Santana</p>
              <p>Sesimbra 2970-868, Portugal</p>
              <p>VAT & NIPC 514263644</p>
              <p>Drive to GPS: 38.4595243,-9.1046022</p>
              <p className="mt-4"><strong>Tel:</strong> +351 917 383 224</p>
              <p><strong>Skype:</strong> "deeplifeltd" (chat & voice)</p>
              <p><strong>Zoom:</strong> Email for Zoom session</p>
              <p>
                <strong>FB:</strong>{" "}
                <a 
                  href="https://www.facebook.com/pages/Open-Safety-Equipment-Ltd/151298954899613" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  www.facebook.com/pages/Open-Safety-Equipment-Ltd/151298954899613
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">By Email</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Sales</h3>
            <a 
              href="mailto:sales@opensafetyglobal.com" 
              className="text-blue-600 hover:underline text-lg"
            >
              sales@opensafetyglobal.com
            </a>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Technical Support</h3>
            <a 
              href="mailto:support@opensafetyglobal.com" 
              className="text-blue-600 hover:underline text-lg"
            >
              support@opensafetyglobal.com
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Need Immediate Assistance?</h2>
        <p className="text-gray-600 mb-4">
          For urgent matters during business hours (GMT 9:00-17:00), please call our Scotland office.
        </p>
        <p className="text-gray-600">
          Outside business hours, email will be responded to on the next working day.
        </p>
      </div>
    </div>
  );
};

export default ContactUs;