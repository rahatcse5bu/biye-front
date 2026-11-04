// TODO: blank, "null"/"undefined", comma-only joins (", ") and empty arrays count as no answer.
export const isEmptyAnswer = (value) => {
  if (value === null || value === undefined || value === false) return true;
  if (Array.isArray(value)) return value.every(isEmptyAnswer);
  if (typeof value === 'string') {
    const text = value.trim();
    return /^[\s,]*$/.test(text) || text === 'null' || text === 'undefined';
  }
  return false;
};

const GridQuestionAnswerCard = ({ question, answer }) => {
  if (isEmptyAnswer(answer)) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] border-b border-gray-200 text-left">
      <div className="px-4 pt-3 pb-1 md:py-3 text-[16px] font-bold text-[#8A8A8A]">
        {question}
      </div>
      <div className="px-4 pb-3 pt-0 md:py-3 text-[16px] text-[#8A8E91] md:border-l md:border-gray-200">
        {Array.isArray(answer) ? answer.filter((item) => !isEmptyAnswer(item)).join(', ') : answer}
      </div>
    </div>
  );
};

export default GridQuestionAnswerCard;
