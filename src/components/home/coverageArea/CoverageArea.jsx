import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Swal from "sweetalert2";

const CoverageArea = () => {
  const [serviceArea, setServiceArea] = useState([]);
  const mapRef = useRef(null);
  const position = [23.685, 90.3563];

  //   search function;

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.trim();
   
    const district = serviceArea.find((center) =>
      center.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district) {
      const coordinate = [district.latitude, district.longitude];
      mapRef?.current.flyTo(coordinate, 12);
    }
    if (!district) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Location not found",
      });
    }
  };

  useEffect(() => {
    fetch("/coverageArea.json")
      .then((res) => res.json())
      .then((data) => {
        setServiceArea(data);
      });
  }, []);

  return (
    <div className=" mt-10">
      <div className="my-10  flex flex-col md:flex-row space-y-3 md:space-y-0  justify-between items-center">
        <h2 className="font-bold text-3xl text-slate-800 ">
          Our Service Areas
        </h2>
        <form
          onSubmit={handleSearch}
          className="flex items-stretch shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl overflow-hidden"
        >
          {/* Input Field */}
          <input
            type="search"
            name="location"
            className="flex-1 md:w-96 px-6 py-3 border-2 border-r-0 border-gray-200 focus:outline-none focus:border-primary focus:ring-0 transition-colors duration-300 text-gray-700 placeholder:text-gray-400"
            placeholder="Search your location"
            required
          />

          {/* Search Button with Icon */}
          <button
            type="submit"
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold border-2 border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 active:scale-95 flex items-center gap-2"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <span>Search</span>
          </button>
        </form>
      </div>

      <MapContainer
        center={position}
        zoom={8}
        scrollWheelZoom={false}
        className="h-[800px]"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {serviceArea.map((center, index) => {
          return (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong> <br />{" "}
                {center.covered_area.join(",")}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default CoverageArea;
