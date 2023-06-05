const Home = () => (
    <section className="w-full h-screen relative flex">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-30"
        style={{
          backgroundImage: `url('/images/marble.jpeg')`,
        }}
      />
      <div className="flex flex-col justify-center items-center w-1/2 relative z-6 mt-[-80px]">
        <div className="relative">
          <div className="rounded-full w-96 h-96 overflow-hidden">
            <img
              src="/images/beige.jpeg"
              alt="Beige Picture"
              className="w-full h-full object-cover rounded-full"
              style={{ objectPosition: 'center top' }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full w-80 h-80 overflow-hidden border-4 border-dark-brown">
              <img
                src="/images/profile.jpg"
                alt="Profile Picture"
                className="w-full h-full object-cover rounded-full"
                style={{ objectPosition: 'center top' }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-start w-1/2 pr-10 pl-0 -ml-20 relative z-6 mt-[-80px]">
        <h1 className="text-dark-brown font-title text-6xl mt-8">Sip, Read, Repeat</h1>
        <p className="text-dark-brown text-lg mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor sem id urna mattis,
          vitae consequat leo vestibulum. Fusce interdum enim sit amet nunc condimentum, id blandit
          urna volutpat. In nec ullamcorper orci. Fusce interdum enim sit amet nunc condimentum, id
          blandit urna volutpat. In nec ullamcorper orci.
        </p>
      </div>
    </section>
  );
  
  export default Home;
  