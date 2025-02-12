import { useState } from "react";

const LostFoundTips = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const tips = [
    {
      question: "What should I do if I lose something?",
      answer: "Immediately check the last places you visited. Report the lost item on the platform and provide clear details."
    },
    {
      question: "How can I increase the chances of finding my lost item?",
      answer: "Provide a clear description, add a photo, and mention any unique identifiers. Also, check the 'Found Items' section regularly."
    },
    {
      question: "What to do if I find someone’s lost item?",
      answer: "Report it on the platform with details and location. Try to contact the owner if possible."
    },
    {
      question: "How can I protect my belongings from getting lost?",
      answer: "Use smart trackers (like AirTags), label important items with your contact info, and be mindful of your surroundings."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-light_bg dark:bg-dark_bg py-12 px-6 md:px-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 dark:text-white">Lost & Found Tips</h2>
        <p className="text-gray-600 mb-8 dark:text-gray-100">Follow these steps to increase your chances of finding lost items or helping others recover theirs.</p>
      </div>

      <div className="max-w-2xl mx-auto">
        {tips.map((tip, index) => (
          <div key={index} className="bg-white dark:bg-dark_bg dark:text-white shadow-md rounded-lg mb-4">
            <button
              className="w-full flex dark:text-white justify-between items-center px-6 py-4 text-left text-gray-800 font-medium focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              {tip.question}
              <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">{tip.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default LostFoundTips;
