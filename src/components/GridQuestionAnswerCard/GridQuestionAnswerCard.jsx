const GridQuestionAnswerCard = ({ question, answer }) => {
  if (!answer && answer !== 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] border-b border-gray-100 hover:bg-gray-50/60 transition-colors duration-150">
      <div className="px-4 pt-3 pb-1 md:py-3 text-[14px] font-bold text-gray-800 text-left">
        {question}
      </div>
      <div className="px-4 pb-3 pt-0 md:py-3 text-[14px] text-gray-500 md:border-l md:border-gray-100 text-left">
        {answer}
      </div>
    </div>
  );
};

export default GridQuestionAnswerCard;
