import React from 'react'

const Clients = () => {
    const clients = [
        { name: "Global Tech", icon: "fab fa-apple" },
        { name: "Legal Partners", icon: "fas fa-landmark" },
        { name: "Sunshine Properties", icon: "fas fa-building" },
        { name: "Creative Studios", icon: "fas fa-paint-brush" },
        { name: "EduSystems", icon: "fas fa-graduation-cap" },
        { name: "HealthPlus", icon: "fas fa-hospital" },
      ];
  return (
    <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">
                      Trusted by Leading Companies
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Join our growing list of satisfied clients who trust our
                      professional services.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-5xl mx-auto">
                    {clients.map((client, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center justify-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                          <i
                            className={`${client.icon} text-blue-600 text-2xl`}
                          ></i>
                        </div>
                        <p className="font-medium text-gray-700">{client.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
  )
}

export default Clients