const GridQuestionAnswerCard = ({ question, answer }) => {
  return (
    <>
      <div className="px-4 py-2 text-base font-bold md:text-left border-[0.2px] text-left border-gray-200 bg-white">
        {question}
      </div>
      <div className="px-4 py-2  md:text-left text-left border-[0.2px] border-gray-200 bg-white">
        {answer}
      </div>
    </>
  );
};

export default GridQuestionAnswerCard;
