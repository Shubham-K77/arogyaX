export const selectPeopleList = [
  {
    id: 1,
    title: "Just Me",
    desc: "Focus on your health and wellness — embark on a personal journey to well-being.",
    icon: "🧘‍♂️",
    people: "1 Person",
  },
  {
    id: 2,
    title: "Couples",
    desc: "Wellness for two — experience healing and relaxation together.",
    icon: "💆‍♀️",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "Family health and wellness — everyone’s well-being matters.",
    icon: "👨‍👩‍👧‍👦",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "Group wellness — a perfect plan for friends seeking relaxation and rejuvenation.",
    icon: "👯‍♀️",
    people: "5 to 10 People",
  },
];

export const selectBudgetList = [
  {
    id: 1,
    title: "Affordable",
    desc: "A wellness journey that fits your budget without compromising on care.",
    icon: "💸",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "A balance of comfort, quality, and wellness services — the right value for your health.",
    icon: "🩺",
  },
  {
    id: 3,
    title: "Premium",
    desc: "Indulge in top-tier wellness treatments and luxury health services for ultimate rejuvenation.",
    icon: "💰",
  },
];

export const healthConcernsOptions = [
  { value: "stress", label: "Stress" },
  { value: "anxiety", label: "Anxiety" },
  { value: "depression", label: "Depression" },
  { value: "insomnia", label: "Insomnia" },
  { value: "fatigue", label: "Fatigue" },
  { value: "back-pain", label: "Back Pain" },
  { value: "neck-pain", label: "Neck Pain" },
  { value: "joint-pain", label: "Joint Pain" },
  { value: "muscle-soreness", label: "Muscle Soreness" },
  { value: "headache", label: "Headache" },
  { value: "migraine", label: "Migraine" },
  { value: "common-cold", label: "Common Cold" },
  { value: "allergies", label: "Allergies" },
  { value: "asthma", label: "Asthma" },
  { value: "skin-irritation", label: "Skin Irritation" },
  { value: "acne", label: "Acne" },
  { value: "weight-management", label: "Weight Management" },
  { value: "obesity", label: "Obesity" },
  { value: "digestive-issues", label: "Digestive Issues" },
  { value: "constipation", label: "Constipation" },
  { value: "diarrhea", label: "Diarrhea" },
  { value: "heartburn", label: "Heartburn" },
  { value: "high-blood-pressure", label: "High Blood Pressure" },
  { value: "low-blood-pressure", label: "Low Blood Pressure" },
  { value: "diabetes-management", label: "Diabetes Management" },
  { value: "cholesterol-management", label: "Cholesterol Management" },
  { value: "thyroid-issues", label: "Thyroid Issues" },
  { value: "menstrual-cramps", label: "Menstrual Cramps" },
  { value: "menopause-symptoms", label: "Menopause Symptoms" },
  { value: "prenatal-care", label: "Prenatal Care" },
  { value: "postpartum-recovery", label: "Postpartum Recovery" },
  { value: "hair-loss", label: "Hair Loss" },
  { value: "eye-strain", label: "Eye Strain (from screens)" },
  { value: "poor-posture", label: "Poor Posture" },
  { value: "arthritis", label: "Arthritis" },
  { value: "osteoporosis", label: "Osteoporosis" },
  { value: "chronic-fatigue-syndrome", label: "Chronic Fatigue Syndrome" },
  { value: "immune-system-support", label: "Immune System Support" },
  {
    value: "seasonal-affective-disorder",
    label: "Seasonal Affective Disorder",
  },
  { value: "adhd-focus-issues", label: "ADHD/Focus Issues" },
  { value: "smoking-cessation", label: "Smoking Cessation Support" },
  { value: "addiction-recovery", label: "Addiction Recovery Support" },
  { value: "sleep-apnea", label: "Sleep Apnea" },
  { value: "tinnitus", label: "Tinnitus (Ringing in the Ears)" },
  { value: "sinus-issues", label: "Sinus Issues" },
  { value: "low-energy", label: "Low Energy Levels" },
  { value: "dehydration", label: "Dehydration" },
  { value: "healthy-aging", label: "Healthy Aging Support" },
  { value: "fitness-recovery", label: "Fitness Recovery" },
  { value: "mental-clarity", label: "Mental Clarity and Mindfulness" },
];

export const generativeAIPrompt = `
Generate a personalized Health and Wellness Plan for the following details:

- **Location**: {location}
- **Duration**: {noOfDays} days
- **Number of People**: {noOfPeople}
- **Budget**: {budget} (Currency relative to {location})
- **Health Concern**: {healthConcern}

Provide the following details in your response:

1. **Healthcare Options**:
   Always structure healthcare options consistently, using the following format:
   - **name**: Name of the hospital, clinic, or wellness center (default: "N/A" if unavailable)
   - **address**: Address (default: "N/A" if unavailable)
   - **priceRange**: Object with:
     - **consultation**: Cost for consultation (in local currency, default: 0)
     - **services**: Cost for other services (in local currency, default: 0)
   - **facilityImage**: Image URL of the building or facility (default: an empty string)
   - **geoCoordinates**: Object with:
     - **latitude**: Default 0 if unavailable
     - **longitude**: Default 0 if unavailable
   - **rating**: Numeric rating (default: 0 if unavailable)
   - **description**: Brief description of services and specializations (default: "No description available")

2. **Personalized Wellness Plans**:
   Curate personalized activities for the specified health concern. Follow this format:
   - **activityName**: Name of the activity (e.g., yoga, therapy, meditation)
   - **activityImage**: Image URL of the activity (default: an empty string if unavailable)
   - **description**: Detailed description of the activity (default: "No description available")
   - **placeName**: Name of the place where the activity is conducted (default: "N/A")
   - **placeDetails**: Brief details about the place (default: "No details available")
   - **placeImage**: Image URL of the place (default: an empty string if unavailable)
   - **geoCoordinates**: Object with:
     - **latitude**: Default 0 if unavailable
     - **longitude**: Default 0 if unavailable
   - **activityPricing**: Cost of the activity per session (default: 0 in local currency)
   - **rating**: Numeric rating (default: 0 if unavailable)
   - **suggestedTimeSchedule**: Best time of day to perform the activity for optimal health benefits (default: "Any time")

3. **Day-by-Day Itinerary**:
   - Provide a day-by-day itinerary, ensuring that all activities or healthcare visits are structured as per the wellness activities format described above.
   - If data for any day is unavailable, leave it empty for that day while maintaining the JSON structure.

### Important Notes:
- Always access healthcare options data from: \`wellnessData?.wellnessPlan?.healthcareOptions || []\`.
- If any key data (e.g., healthcareOptions or activities) is missing or incomplete, use the defaults outlined above.
- Maintain a consistent JSON structure for all health concerns (e.g., stress, anxiety, etc.).
- Validate and handle edge cases like missing fields, defaulting to specified placeholders or values.

Output the response in **JSON format**.
`;
