import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [wDetails, setWdetails] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getData = (event) => {
    event.preventDefault();
    if (!city.trim()) return;

    setIsLoading(true);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`
    )
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod === "404") {
          setWdetails(undefined);
        } else {
          setWdetails(finalRes);
        }
      })
      .catch(() => setWdetails(undefined))
      .finally(() => {
        setIsLoading(false);
        setCity("");
      });
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#4aacb1]">
      {/* Heading */}
      <h1 className="text-white text-4xl font-bold mb-6">Simple Weather App</h1>

      {/* Input Form */}
      <form onSubmit={getData} className="flex items-center gap-3">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-[250px] p-2 text-lg border border-gray-300 rounded-md focus:outline-none"
          placeholder="City Name"
        />
        <button
          type="submit"
          className="bg-[#1d4a6b] text-white font-bold px-5 py-2 rounded-md hover:bg-[#163a52] transition"
        >
          Submit
        </button>
      </form>

      {/* Weather Card */}
      <div className="w-[320px] bg-white shadow-lg mt-6 p-5 rounded-md text-center">
        {/* Loading Indicator */}
        {isLoading && (
          <img
            src="https://media.tenor.com/JBgYqrobdxasAAAAi/loading.gif"
            width={50}
            className="mx-auto"
            alt="Loading..."
          />
        )}

        {!isLoading && wDetails ? (
          <>
            <h3 className="font-bold text-[25px]">
              {wDetails.name}{" "}
              <span className="bg-yellow-300 px-2 py-1 rounded text-black">
                {wDetails.sys.country}
              </span>
            </h3>
            <h2 className="font-bold text-[40px] text-[#1d4a6b]">
              {wDetails.main.temp}°C
            </h2>
            <img
              src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`}
              alt={wDetails.weather[0].description}
              className="mx-auto"
            />
            <p className="text-gray-600 text-lg capitalize">
              {wDetails.weather[0].description}
            </p>
          </>
        ) : (
          !isLoading && <p className="text-gray-500">❌ No data available</p>
        )}
      </div>
    </div>
  );
}

export default App;
