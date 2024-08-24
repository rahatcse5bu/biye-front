import { useState } from "react";
import { Colors } from "../../constants/colors";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
const Instructions = () => {
  // Initialize state to keep track of the open/closed status of each Instructions item
  const [instructionItems, setInstructionItems] = useState([
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      question: "How do I install React?",
      answer: "You can install React using npm or yarn.",
    },
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      question: "How do I install React?",
      answer: "You can install React using npm or yarn.",
    },
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      question: "How do I install React?",
      answer: "You can install React using npm or yarn.",
    },
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      question: "How do I install React?",
      answer: "You can install React using npm or yarn.",
    },
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      question: "How do I install React?",
      answer: "You can install React using npm or yarn.",
    },
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      question: "How do I install React?",
      answer: "You can install React using npm or yarn.",
    },
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      question: "How do I install React?",
      answer: "You can install React using npm or yarn.",
    },
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      question: "How do I install React?",
      answer: "You can install React using npm or yarn.",
    },
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      question: "How do I install React?",
      answer: "You can install React using npm or yarn.",
    },
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      question: "How do I install React?",
      answer: "You can install React using npm or yarn.",
    },
    // Add more Instruction items as needed
  ]);

  // Function to toggle the open/closed state of an Instructions item
  const toggleItem = (index) => {
    const updatedInstructionItems = [...instructionItems];
    updatedInstructionItems[index].isOpen =
      !updatedInstructionItems[index].isOpen;
    setInstructionItems(updatedInstructionItems);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 mb-8">
      <h1
        className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4"
        style={{ color: Colors.titleText }}
      >
        নির্দেশনা সমুহ
      </h1>
      <div>
        <h4   className="text-md md:text-lg lg:text-xl font-semibold mb-4"
        style={{ color: Colors.titleText }}>PNC নিকাহ তে কিভাবে পাত্রের বায়োডাটা দিতে হয়? How to create bridegroom's biodata on PNC NIkah  for free || PNC Nikah</h4>
    <LiteYouTubeEmbed 
        id="26Kj5LuD2DY"
        title="PNC নিকাহ তে কিভাবে পাত্রের বায়োডাটা দিতে হয়? How to create bridegroom's biodata on PNC NIkah  for free || PNC Nikah"
    />
  </div>
      {/* <ul>
        {instructionItems.map((item, index) => (
          <li key={index}  onClick={() => toggleItem(index)} className="border-b py-4 bg-gray-300 px-8 py-4 mb-4 rounded cursor-pointer" style={{borderBottomColor:`rgba(${Colors.titleText}, 0.7)`}}  >
            <div className="flex justify-between items-center">
              <h2 onClick={() => toggleItem(index)} className="text-lg font-medium">{item.question}</h2>
              <button
                onClick={() => toggleItem(index)}
                className="text-gray-900 hover:text-gray-900 text-xl"
              >
                {item.isOpen ? '-' : '+'}
              </button>
            </div>
            {item.isOpen && <p className="mt-2">{item.answer}</p>}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Instructions;
