import axios from 'axios';
import { convertToQuery } from '../utils/query';

const OPENROUTER_API_KEY =
  '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';
const MODEL = 'openai/gpt-4o-mini';

const API_BASE =
  import.meta.env.VITE_REACT_APP_NODE_ENV === 'development'
    ? 'http://localhost:5000/api/v1'
    : 'https://server.pncnikah.com/api/v1';

const USER_STATUS =
  import.meta.env.VITE_REACT_APP_NODE_ENV === 'development' ? 'in review' : 'active';

// ── Tool definitions ──────────────────────────────────────────────────────────

const FILTER_PROPS = {
  bio_type: {
    type: 'string',
    enum: ['পাত্রের বায়োডাটা', 'পাত্রীর বায়োডাটা'],
    description: 'Groom (পাত্রের বায়োডাটা) or bride (পাত্রীর বায়োডাটা)',
  },
  religion: {
    type: 'string',
    enum: ['islam', 'hinduism', 'christianity'],
  },
  religious_type: {
    type: 'string',
    enum: [
      'practicing_muslim',
      'general_muslim',
      'practicing_hindu',
      'general_hindu',
      'practicing_christian',
      'general_christian',
    ],
  },
  marital_status: {
    type: 'string',
    enum: ['অবিবাহিত', 'বিবাহিত', 'ডিভোর্সড', 'বিধবা', 'বিপত্নীক'],
  },
  minAge: { type: 'number', description: 'Minimum age (18–60)' },
  maxAge: { type: 'number', description: 'Maximum age (18–60)' },
  minHeight: {
    type: 'number',
    description: 'Minimum height in feet (e.g. 5.0 = 5ft, 5.5 = 5ft 6in)',
  },
  maxHeight: { type: 'number', description: 'Maximum height in feet' },
  division: {
    type: 'string',
    description:
      'Comma-separated division names in Bengali: ঢাকা,চট্টগ্রাম,খুলনা,রাজশাহী,বরিশাল,সিলেট,রংপুর,ময়মনসিংহ',
  },
  zilla: {
    type: 'string',
    description: 'Comma-separated Bengali district names',
  },
  occupation: {
    type: 'string',
    description:
      'Comma-separated from: ইমাম,মাদ্রাসা শিক্ষক,শিক্ষক,ডাক্তার,ইঞ্জিনিয়ার,ব্যবসায়ী,সরকারি চাকুরি,বেসরকারি চাকুরি,ফ্রিল্যান্সার,শিক্ষার্থী,প্রবাসী,অন্যান্য,পেশা নেই',
  },
  education_medium: {
    type: 'string',
    description: 'Comma-separated from: জেনারেল,কওমী,আলিয়া',
  },
  complexion: {
    type: 'string',
    description:
      'Comma-separated from: কালো,শ্যামলা,উজ্জ্বল শ্যামলা,ফর্সা,উজ্জ্বল ফর্সা',
  },
  economic_status: {
    type: 'string',
    description:
      'Comma-separated from: উচ্চবিত্ত,উচ্চ মধ্যবিত্ত,মধ্যবিত্ত,নিম্ন মধ্যবিত্ত,নিম্নবিত্ত',
  },
};

const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'search_biodatas',
      description:
        'Search biodatas with given filters and return the REAL count from the database. Only include filters the user explicitly mentioned — omit all others. Pass an empty object {} to get the total count of all biodatas on the site.',
      parameters: {
        type: 'object',
        properties: FILTER_PROPS,
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'apply_filters',
      description:
        'Apply the chosen filters to the biodata list and show results to the user. Call this when the user confirms or when a good result count (3–50) is found and the user seems satisfied.',
      parameters: {
        type: 'object',
        properties: FILTER_PROPS,
        additionalProperties: false,
      },
    },
  },
];

// ── System prompt ─────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a friendly biodata search assistant for PNC Nikah, a Bangladeshi matrimonial website. Help users find the right biodata through conversation.

CRITICAL RULES:
1. Always respond in Bengali (বাংলা).
2. Call search_biodatas with ONLY filters the user mentioned. Never carry over filters from previous turns unless user confirms them.
3. If the user says "যেকোনো" (any) for something, do NOT include that field in the filter — omit it entirely.
4. If the user asks for a total count (e.g. "site এ মোট কয়টা"), call search_biodatas with {} (no filters) or only bio_type if specified.
5. Always report the EXACT count returned by search_biodatas. Do not say "0" if the tool returned a different number.
6. If search fails, say so honestly — do not assume zero results.
7. Ask only ONE clarifying question at a time.
8. When count is good (5–50), confirm with user and then call apply_filters.

FILTER MAPPINGS:
- পাত্র/ছেলে/বর → bio_type: "পাত্রের বায়োডাটা"
- পাত্রী/মেয়ে/কনে → bio_type: "পাত্রীর বায়োডাটা"
- ইসলাম/মুসলিম → religion: "islam"
- হিন্দু → religion: "hinduism"
- খ্রিস্টান → religion: "christianity"
- প্র্যাকটিসিং → religious_type uses "practicing_" prefix
- "২৫-৩০ বছর" → minAge:25, maxAge:30
- "৫ ফুট ৬" → 5.5

Keep responses brief and conversational.`;

// ── Search tool execution ─────────────────────────────────────────────────────

const searchBiodatas = async (filters) => {
  try {
    const query = { ...filters, limit: 1, page: 1, user_status: USER_STATUS };
    const queryString = convertToQuery(query);
    const response = await axios.get(`${API_BASE}/general-info?${queryString}`);
    const count = response.data?.size ?? response.data?.total ?? 0;
    return { count };
  } catch (err) {
    const status = err?.response?.status;
    return {
      error: `API call failed (status ${status || 'unknown'}). Cannot determine count.`,
    };
  }
};

// ── OpenRouter call ───────────────────────────────────────────────────────────

const callLLM = async (messages) => {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      tools: TOOLS,
      tool_choice: 'auto',
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `LLM call failed (${res.status})`);
  }

  const data = await res.json();
  return data.choices[0].message;
};

// ── Agent class ───────────────────────────────────────────────────────────────

export class BiodataAgent {
  constructor() {
    this.history = [{ role: 'system', content: SYSTEM_PROMPT }];
  }

  /**
   * Send a user message. Returns { text, appliedFilters }.
   * appliedFilters is non-null when the agent calls apply_filters.
   */
  async sendMessage(userMessage) {
    this.history.push({ role: 'user', content: userMessage });

    let appliedFilters = null;

    for (let i = 0; i < 8; i++) {
      const assistantMsg = await callLLM(this.history);
      this.history.push(assistantMsg);

      // No tool calls → final text response
      if (!assistantMsg.tool_calls || assistantMsg.tool_calls.length === 0) {
        return { text: assistantMsg.content || '', appliedFilters };
      }

      // Execute each tool call
      for (const toolCall of assistantMsg.tool_calls) {
        let args = {};
        let result;

        try {
          args = JSON.parse(toolCall.function.arguments);
        } catch {
          result = { error: 'Invalid tool arguments' };
        }

        if (!result) {
          if (toolCall.function.name === 'search_biodatas') {
            result = await searchBiodatas(args);
          } else if (toolCall.function.name === 'apply_filters') {
            appliedFilters = args;
            result = { success: true };
          } else {
            result = { error: 'Unknown tool' };
          }
        }

        this.history.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: JSON.stringify(result),
        });
      }
    }

    return { text: 'দুঃখিত, আবার চেষ্টা করুন।', appliedFilters };
  }

  reset() {
    this.history = [{ role: 'system', content: SYSTEM_PROMPT }];
  }
}
