const AboutGoal = () => {
  return (
    <section className="bg-gray-50 py-20 px-6 sm:px-10 lg:px-32">
      <div className="text-center mb-16">
        <h3 className="text-4xl font-bold text-gray-800">Our Goal & Mission</h3>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Empowering cleaner spaces and clearer communication through professional services tailored for modern businesses and communities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Vision */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
          <img
            src="/assets/images/goal.jpg"
            alt="Our Vision"
            className="w-full h-64 object-cover"
          />
          <div className="p-6 text-center">
            <h4 className="text-2xl font-semibold text-gray-800 mb-2">Our Vision</h4>
            <p className="text-gray-600">
              To deliver exceptional commercial cleaning and translation services that enhance the well-being, safety, and communication of our clients, while fostering a cleaner, more connected world.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
          <img
            src="/assets/images/vision.jpg"
            alt="Our Mission"
            className="w-full h-64 object-cover"
          />
          <div className="p-6 text-center">
            <h4 className="text-2xl font-semibold text-gray-800 mb-2">Our Mission</h4>
            <p className="text-gray-600">
              To be a trusted partner for businesses and communities, known for excellence in cleaning and seamless multilingual communication, helping organizations thrive in a clean, inclusive environment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutGoal;
