import React from 'react';

const WarrantySection: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          The only rebreathers with a safety warranty
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 text-gray-700">
            <p className="mb-4">
              Open Safety are dedicated to providing the safest possible diving equipment. 
              This is the reason we exist: to keep you safe underwater.
            </p>
            
            <p className="mb-4">
              As part of that mission, we guarantee that our rebreathers deliver the highest degree of 
              safety that is achievable. No other guarantee comes close. It "future proofs" our customers 
              and ensures they always have the best tool for the job. Our warranties are part of the 
              evidence that we deliver that promise.
            </p>
            
            <p className="mb-4">
              The first warranty we offer is a lifetime, transferable warranty on all Open Safety products on 
              parts and materials. This itself is unique in the industry.
            </p>
            
            <p className="mb-4">
              The second warranty is truly exceptional: our lifetime safety warranty within our Functional 
              Safety system. What this means is that if at any time, we become aware of a viable safety 
              enhancement, we are obliged to implement it and deliver the improvement to all customers 
              that have our older product, free of charge.
            </p>
            
            <p className="mb-4">
              For that guarantee to be sustained within our business, we run the industry's most 
              extensive test and validation programme, in advance of sales. We don't mislead customers 
              claiming "lowest work of Breathing" for example, we do the research, development to realise 
              that and thorough testing, publish the independently audited test reports in full and deliver. 
              We HAVE to do this degree of analysis and testing, otherwise if a competitor were to achieve 
              a lower work of breathing in a comparable product, our safety guarantee would require us to 
              investigate how, better it, and deliver that benefit to our customers without charge - even if 
              that means giving customers from a decade ago, new rebreathers. This guarantee applies 
              to every subsystem and for the entire rebreather for the whole of its rated service life. This 
              safety guarantee is truly exceptional in any industry.  We have been honouring it on our 
              rebreathers around the world since 2008.
            </p>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-gray-100 p-6 rounded-lg h-full">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Follow us on Facebook
              </h3>
              
              <div className="border border-gray-300 bg-white rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 mr-3 rounded-full overflow-hidden bg-gray-200">
                    <img 
                      src="https://images.pexels.com/photos/3760323/pexels-photo-3760323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                      alt="Open Safety Equipment Ltd" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Open Safety Equipment Ltd</h4>
                    <p className="text-sm text-gray-600">Equipment Manufacturer</p>
                  </div>
                </div>
                
                <button className="w-full py-2 mb-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium">
                  Follow Page
                </button>
                
                <button className="w-full py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded font-medium">
                  Share
                </button>
              </div>
              
              <div className="mt-6">
                <img 
                  src="/assets/images/psl1.png" 
                  alt="Diving Equipment" 
                  className="w-full h-auto rounded-md"
                />
                <img 
                  src="/assets/images/psl2.png" 
                  alt="Diving Equipment" 
                  className="w-full h-auto rounded-md mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarrantySection;