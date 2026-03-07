const GridQuestionAnswerCard = ({ question, answer }) => {
  if (!answer && answer !== 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] border-b border-gray-200 text-left">
      <div className="px-4 pt-3 pb-1 md:py-3 text-[16px] font-bold text-[#8A8A8A]">
        {question}
      </div>
      <div className="px-4 pb-3 pt-0 md:py-3 text-[16px] text-[#8A8E91] md:border-l md:border-gray-200">
        {answer}
      </div>
    </div>
  );
};

export default GridQuestionAnswerCard;
