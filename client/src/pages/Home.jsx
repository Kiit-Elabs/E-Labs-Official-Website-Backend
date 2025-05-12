import React from "react";
import { Link } from "react-router-dom";

const Home   = () => {
  const cards = [
    {
      title: "Add Member",
      image: "/Member-Icon.png",
      link: "/addmember",
    },
    {
      title: "Add Event",
      image: "/Event-Icon.png",
      link: "/addevent",
    },
    {
      title: "Add Photos",
      image: "/Photo-Icon.png",
      link: "/addphotos",
    },
    {
      title: "Add Projects",
      image: "/Project-Icon.png",
      link: "/addprojects",
    },
  ];

  return (
    <div className="w-full h-screen mx-auto text-white flex items-center justify-center px-20 py-10 container ">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-5xl w-full">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-4 border-4 border-[#F7941D] rounded-xl p-6 bg-[#0B1215]"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-20 h-20 object-contain"
            />
            <h2 className="text-xl font-bold">{card.title}</h2>
            <Link to={card.link}>
              <button className="mt-2 px-6 py-2 border-2 border-[#F7941D] rounded-md bg-[#0B1215] text-white hover:bg-[#F7941D] transition-colors">
                {card.title}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
