const OPENROUTER_API_KEY =
  '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';
const MODEL = 'openai/gpt-4o-mini';

const SYSTEM_PROMPT = `You are a biodata filter assistant for PNC Nikah, a Bangladeshi matrimonial website.

Extract filter parameters from the user's natural language query (Bengali or English) and return ONLY a valid JSON object with no explanation and no markdown.

Available filter parameters and their valid values:

bio_type: "পাত্রের বায়োডাটা" (groom/boy) or "পাত্রীর বায়োডাটা" (bride/girl)
religion: "islam" | "hinduism" | "christianity"
religious_type: "practicing_muslim" | "general_muslim" | "practicing_hindu" | "general_hindu" | "practicing_christian" | "general_christian"
marital_status: "অবিবাহিত" | "বিবাহিত" | "ডিভোর্সড" | "বিধবা" | "বিপত্নীক"
minAge: number (18–60)
maxAge: number (18–60)
minHeight: number in feet (e.g. 5.0 means 5 feet, 5.5 means 5 feet 6 inches)
maxHeight: number in feet
division: comma-separated Bangladesh division names in Bengali (ঢাকা,চট্টগ্রাম,খুলনা,রাজশাহী,বরিশাল,সিলেট,রংপুর,ময়মনসিংহ)
zilla: comma-separated district names in Bengali
occupation: comma-separated from: ইমাম,মাদ্রাসা শিক্ষক,শিক্ষক,ডাক্তার,ইঞ্জিনিয়ার,ব্যবসায়ী,সরকারি চাকুরি,বেসরকারি চাকুরি,ফ্রিল্যান্সার,শিক্ষার্থী,প্রবাসী,অন্যান্য,পেশা নেই
education_medium: comma-separated from: জেনারেল,কওমী,আলিয়া
complexion: comma-separated from: কালো,শ্যামলা,উজ্জ্বল শ্যামলা,ফর্সা,উজ্জ্বল ফর্সা
economic_status: comma-separated from: উচ্চবিত্ত,উচ্চ মধ্যবিত্ত,মধ্যবিত্ত,নিম্ন মধ্যবিত্ত,নিম্নবিত্ত

Mapping rules:
- পাত্র / ছেলে / বর / boy / groom → bio_type: "পাত্রের বায়োডাটা"
- পাত্রী / মেয়ে / কনে / girl / bride → bio_type: "পাত্রীর বায়োডাটা"
- ইসলাম / মুসলিম / Muslim → religion: "islam"
- হিন্দু / Hindu → religion: "hinduism"
- খ্রিস্টান / Christian → religion: "christianity"
- প্র্যাকটিসিং / practicing → religious_type uses "practicing_" prefix
- Age like "২৫-৩০" or "25 to 30" → minAge:25, maxAge:30; "২৫ বছর" → minAge:25, maxAge:25
- Height "৫ ফুট" or "5 feet" → 5.0; "৫ ফুট ৬ ইঞ্চি" → 5.5
- Only include fields the user explicitly mentioned or clearly implied
- Return {} if nothing specific was mentioned`;

export const parseBiodataQuery = async (userQuery) => {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userQuery },
      ],
      temperature: 0,
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'LLM request failed');
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('Empty response from LLM');
  return JSON.parse(content);
};
