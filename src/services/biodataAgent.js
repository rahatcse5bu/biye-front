import axios from 'axios';

const OPENROUTER_API_KEY =
  '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';
const MODEL = 'anthropic/claude-haiku-4-5';

const API_BASE =
  import.meta.env.VITE_REACT_APP_NODE_ENV === 'development'
    ? 'http://localhost:5000/api/v1'
    : 'https://server.pncnikah.com/api/v1';

const USER_STATUS =
  import.meta.env.VITE_REACT_APP_NODE_ENV === 'development' ? 'in review' : 'active';

// ── Tool definitions ──────────────────────────────────────────────────────────

const FILTER_PROPS = {
  // ── English-only params (no Bengali in query string) ──────────────────────
  bio_gender: {
    type: 'string',
    enum: ['male', 'female'],
    description: 'Groom/পাত্র → "male", Bride/পাত্রী → "female"',
  },
  marital_status_en: {
    type: 'string',
    enum: ['unmarried', 'married', 'divorced', 'widow', 'widower'],
    description:
      'অবিবাহিত→unmarried, বিবাহিত→married, ডিভোর্সড→divorced, বিধবা→widow, বিপত্নীক→widower',
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
2. Call search_biodatas with ONLY filters the user mentioned. Never carry over filters from previous turns unless user confirms.
3. If the user says "যেকোনো" / "any" for a field, omit that field entirely from the tool call.
4. For a total site count ("মোট কয়টা", "total"), call search_biodatas with {}.
5. ALWAYS report the EXACT count from the tool result. NEVER say "no results" if the tool returned count > 0.
6. If the tool returns { error: ... }, tell the user "সার্ভারে সমস্যা হচ্ছে" — do NOT say "no results found".
7. Ask only ONE clarifying question at a time.
8. When count is reasonable (3–60), confirm with user then call apply_filters.
9. The site has thousands of biodatas. If you get count=0 with many filters, suggest removing some filters.

FILTER MAPPINGS (use ONLY these exact values):
- পাত্র/ছেলে/বর/groom → bio_gender: "male"
- পাত্রী/মেয়ে/কনে/bride → bio_gender: "female"
- অবিবাহিত/single → marital_status_en: "unmarried"
- বিবাহিত/married → marital_status_en: "married"
- ডিভোর্সড/divorced → marital_status_en: "divorced"
- বিধবা/widow → marital_status_en: "widow"
- বিপত্নীক/widower → marital_status_en: "widower"
- ইসলাম/মুসলিম → religion: "islam"
- হিন্দু → religion: "hinduism"
- খ্রিস্টান → religion: "christianity"
- প্র্যাকটিসিং মুসলিম → religious_type: "practicing_muslim"
- "২৫-৩০ বছর" → minAge:25, maxAge:30
- "৫ ফুট ৬" → 5.5

Keep responses brief and conversational.`;

// ── Normalise LLM-generated values ────────────────────────────────────────────
// bio_gender and marital_status_en are English — no Unicode issues.
// division is still Bengali; NFC-normalize it against the canonical list.

const DIVISION_NORM = {
  'ঢাকা': 'ঢাকা',
  'চট্টগ্রাম': 'চট্টগ্রাম',
  'খুলনা': 'খুলনা',
  'রাজশাহী': 'রাজশাহী',
  'বরিশাল': 'বরিশাল',
  'সিলেট': 'সিলেট',
  'রংপুর': 'রংপুর',
  'ময়মনসিংহ': 'ময়মনসিংহ',
};

const normaliseFilters = (filters) => {
  const out = { ...filters };
  if (out.division) {
    out.division = out.division
      .split(',')
      .map((v) => {
        const key = v.trim().normalize('NFC');
        return DIVISION_NORM[key] ?? key;
      })
      .join(',');
  }
  return out;
};

// ── Search tool execution ─────────────────────────────────────────────────────

const searchBiodatas = async (rawFilters) => {
  try {
    const filters = normaliseFilters(rawFilters);
    const params = { ...filters, limit: 1, page: 1, user_status: USER_STATUS };
    // Remove null/undefined/empty so axios doesn't serialize them
    Object.keys(params).forEach((k) => {
      if (params[k] === null || params[k] === undefined || params[k] === '') delete params[k];
    });
    console.log('[Agent] search params:', params);
    const response = await axios.get(`${API_BASE}/general-info`, { params });
    console.log('[Agent] response data:', response.data);
    const count = response.data?.size ?? response.data?.total ?? 0;
    return { count };
  } catch (err) {
    const status = err?.response?.status;
    const detail = err?.response?.data?.message || err?.message || 'unknown error';
    console.error('[Agent] search error:', err?.response?.data || err?.message);
    return {
      error: `Search failed (HTTP ${status ?? '?'}): ${detail}. Tell the user the search is temporarily unavailable.`,
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

// ── Strip function-call leakage from LLM text content ────────────────────────
// Some models (Gemini) sometimes include raw tool-call syntax in the content
// field alongside tool_calls. Remove those lines before showing to the user.
const TOOL_CALL_LINE_RE = /^\s*`?\s*(search_biodatas|apply_filters)\s*\(/;

const cleanContent = (text) => {
  if (!text) return '';
  return text
    .split('\n')
    .filter((line) => !TOOL_CALL_LINE_RE.test(line))
    .join('\n')
    .trim();
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
      // Some models (Gemini) return content: null on tool-call turns.
      // Normalize to '' so re-sending the history doesn't cause a 400 error.
      if (assistantMsg.content === null || assistantMsg.content === undefined) {
        assistantMsg.content = '';
      }
      this.history.push(assistantMsg);

      const hasCalls = assistantMsg.tool_calls && assistantMsg.tool_calls.length > 0;

      // No tool calls → final text response
      if (!hasCalls) {
        return { text: cleanContent(assistantMsg.content || ''), appliedFilters };
      }

      // If the message also has content alongside tool_calls, ignore it —
      // we only show text from the final (non-tool-call) response.

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
