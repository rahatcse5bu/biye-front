import axiosInstance from "../utils/axios";

const MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

const SYSTEM_PROMPT = `You are a biodata filter assistant for PNC Nikah, a Bangladeshi matrimonial website.

Extract filter parameters from the user's natural language query (Bengali or English) and return ONLY a valid JSON object with no explanation and no markdown.

Available filter parameters and their valid values:

bio_type: "পাত্রের বায়োডাটা" (groom/boy) or "পাত্রীর বায়োডাটা" (bride/girl)
religion: "islam" | "hinduism" | "christianity"
religious_type: "practicing_muslim" | "general_muslim" | "practicing_hindu" | "general_hindu" | "practicing_christian" | "general_christian"
marital_status: "অবিবাহিত" | "বিবাহিত" | "ডিভোর্সড" | "বিধবা" | "বিপত্নীক"
minAge: number (18–60)
maxAge: number (18–60)
minHeight: number in feet (e.g. 5.0 means 5 feet, 5.5 means 5 feet 6 inches)
maxHeight: number in feet
division: comma-separated Bangladesh division names in Bengali (ঢাকা,চট্টগ্রাম,খুলনা,রাজশাহী,বরিশাল,সিলেট,রংপুর,ময়মনসিংহ)
zilla: comma-separated district names in Bengali
occupation: comma-separated from: ইমাম,মাদ্রাসা শিক্ষক,শিক্ষক,ডাক্তার,ইঞ্জিনিয়ার,ব্যবসায়ী,সরকারী চাকুরী,বেসরকারী চাকুরী,ফ্রিল্যান্সার,শিক্ষার্থী,প্রবাসী,অন্যান্য,পেশা নেই
education_medium: comma-separated from: জেনারেল,কওমি,আলিয়া
deeni_edu: comma-separated from: হাফেজ,মাওলানা,মুফতি,মুফাসসির,আদিব
exp_occupation: comma-separated from: ডাক্তার,ইঞ্জিনিয়ার,শিক্ষক,ব্যবসায়ী,সরকারী চাকুরী,বেসরকারী চাকুরী,ফ্রিল্যান্সার,প্রবাসী,শিক্ষার্থী,ইমাম,মাদ্রাসা শিক্ষক,হাফেজ,পেশা নেই,অন্যান্য
complexion: comma-separated from: কালো,শ্যমলা,উজ্জ্বল শ্যামলা,ফর্সা,উজ্জ্বল ফর্সা
economic_status: comma-separated from: উচ্চবিত্ত,উচ্চ মধ্যবিত্ত,মধ্যবিত্ত,নিম্ন মধ্যবিত্ত,নিম্নবিত্ত

Mapping rules:
- পাত্র / ছেলে / বর / boy / groom → bio_type: "পাত্রের বায়োডাটা"
- পাত্রী / মেয়ে / কনে / girl / bride → bio_type: "পাত্রীর বায়োডাটা"
- ইসলাম / মুসলিম / Muslim → religion: "islam"
- হিন্দু / Hindu → religion: "hinduism"
- খ্রিস্টান / Christian → religion: "christianity"
- প্র্যাকটিসিং / practicing → religious_type uses "practicing_" prefix
- Age like "২৫-৩০" or "25 to 30" → minAge:25, maxAge:30; "২৫ বছর" → minAge:25, maxAge:25
- Height "৫ ফুট" or "5 feet" → 5.0; "৫ ফুট ৬ ইঞ্চি" → 5.5
- Only include fields the user explicitly mentioned or clearly implied
- Return {} if nothing specific was mentioned`;

export const parseBiodataQuery = async (userQuery) => {
  let data;

  try {
    const response = await axiosInstance.post("/llm/chat", {
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userQuery },
      ],
      temperature: 0,
    });
    data = response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "LLM request failed");
  }
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty response from LLM");

  try {
    return JSON.parse(content);
  } catch {
    // If response is not JSON, return empty object
    return {};
  }
};
