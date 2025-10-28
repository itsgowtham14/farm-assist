import express from 'express';
import Issue from '../models/issue.js';
import Selection from '../models/selection.js';

const router = express.Router();

// Generate AI solution for an issue
router.post('/', async (req, res) => {
  try {
    const { issueId, issueType, details, week, selectionId, cropName, season, state, location } = req.body;

    // Use location or state for context
    const farmLocation = location || state || 'India';

    // Build context-aware prompt
    const prompt = `You are an expert agricultural advisor. A farmer is growing ${cropName || 'a crop'} in ${farmLocation} during the ${season || ''} season. 

They are currently in Week ${week || 'unknown'} of their crop timeline and have reported the following issue:

Issue Type: ${issueType}
Details: ${details || 'No additional details provided'}

Please provide a specific, actionable solution considering the local conditions in ${farmLocation}. Include:
1. Immediate steps to take (consider local climate and soil conditions)
2. Recommended products or treatments available locally
3. Prevention tips for the future specific to this region
4. Expected timeline for resolution

Keep the response concise (3-4 sentences) and practical for farmers in ${farmLocation}.`;

    // Call AI API - Using free Hugging Face Inference API
    const apiKey = process.env.OPENAI_API_KEY;
    console.log('AI Solution - API Key check:', apiKey ? 'Key found (length: ' + apiKey.length + ')' : 'KEY NOT FOUND');
    
    // Use Hugging Face's free inference API instead of OpenAI
    try {
      const hfResponse = await fetch('https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.7,
            return_full_text: false
          }
        })
      });

      if (!hfResponse.ok) {
        const errorData = await hfResponse.json().catch(() => ({}));
        console.error('Hugging Face API error:', errorData);
        
        // Fallback to simple rule-based solution
        const simpleSolution = generateSimpleSolution(issueType, cropName, season, farmLocation);
        if (issueId) {
          await Issue.findByIdAndUpdate(issueId, { aiSolution: simpleSolution });
        }
        return res.json({ aiSolution: simpleSolution });
      }

      const data = await hfResponse.json();
      let aiSolution;
      
      if (Array.isArray(data) && data[0]?.generated_text) {
        aiSolution = data[0].generated_text.trim();
      } else if (data.generated_text) {
        aiSolution = data.generated_text.trim();
      } else {
        // Fallback to simple solution
        aiSolution = generateSimpleSolution(issueType, cropName, season, farmLocation);
      }

      // If issueId provided, update the issue with AI solution
      if (issueId) {
        await Issue.findByIdAndUpdate(issueId, { aiSolution });
      }

      res.json({ aiSolution });
    } catch (fetchError) {
      console.error('AI API fetch error:', fetchError);
      // Fallback to simple rule-based solution
      const simpleSolution = generateSimpleSolution(issueType, cropName, season, farmLocation);
      if (issueId) {
        await Issue.findByIdAndUpdate(issueId, { aiSolution: simpleSolution });
      }
      res.json({ aiSolution: simpleSolution });
    }
  } catch (err) {
    console.error('AI solution error:', err);
    res.status(500).json({ 
      error: 'Failed to generate AI solution',
      fallback: 'AI solution generation failed. Please refer to the recommended solution above or consult with local agricultural experts.'
    });
  }
});

// Simple rule-based solution generator as fallback
function generateSimpleSolution(issueType, cropName, season, location) {
  const issueTypeLower = (issueType || '').toLowerCase();
  const crop = cropName || 'your crop';
  const locationInfo = location ? ` in ${location}` : '';
  const locationAdvice = location ? ` Consult local agricultural extension officers${locationInfo} for region-specific guidance.` : ' Consult local agricultural extension officers for specific guidance.';
  
  if (issueTypeLower.includes('rain') || issueTypeLower.includes('flood')) {
    return `For heavy rainfall affecting ${crop}${locationInfo}: 1) Ensure proper drainage channels to prevent waterlogging - critical for your local soil type. 2) Postpone fertilizer application by 1-2 weeks until soil moisture normalizes. 3) Check for fungal diseases common in your region and apply preventive fungicides if needed. 4) Avoid walking on waterlogged fields to prevent soil compaction. Expected recovery: 5-7 days after water drains.${locationAdvice}`;
  } else if (issueTypeLower.includes('pest')) {
    return `For pest infestation in ${crop}${locationInfo}: 1) Identify the specific pest - common pests vary by region and climate. 2) Use neem-based organic pesticides as first line of defense (effective in most climates). 3) For severe infestations, apply recommended chemical pesticides following local regulations and label instructions. 4) Implement integrated pest management practices including crop rotation suitable for your area. Recovery timeline: 7-10 days with proper treatment.${locationAdvice}`;
  } else if (issueTypeLower.includes('drought') || issueTypeLower.includes('water')) {
    return `For drought conditions affecting ${crop}${locationInfo}: 1) Increase irrigation frequency during early morning or late evening to minimize evaporation (adjust timing based on local temperature patterns). 2) Apply mulch around plants to retain soil moisture - use locally available materials. 3) Consider drip irrigation if available for water efficiency in your climate. 4) Monitor plants for stress symptoms specific to your region's weather patterns. Plants should recover within 3-5 days of adequate watering.${locationAdvice}`;
  } else if (issueTypeLower.includes('nutrient') || issueTypeLower.includes('deficiency')) {
    return `For nutrient deficiency in ${crop}${locationInfo}: 1) Conduct soil testing to identify specific nutrient deficiencies - soil composition varies significantly by region. 2) Apply balanced NPK fertilizer based on crop requirements and local soil characteristics. 3) For quick results, use foliar spray of micronutrients appropriate for your climate. 4) Improve soil health with organic matter like compost or vermicompost using locally available resources. Visible improvement expected in 7-14 days.${locationAdvice}`;
  } else if (issueTypeLower.includes('disease') || issueTypeLower.includes('fungal')) {
    return `For disease management in ${crop}${locationInfo}: 1) Remove and destroy infected plant parts immediately - disease spread varies with local humidity and temperature. 2) Apply appropriate fungicide or bactericide based on disease type and local climate conditions. 3) Improve air circulation by proper spacing and pruning suitable for your growing conditions. 4) Avoid overhead irrigation to reduce leaf wetness, especially during humid periods in your area. Treatment response: 5-10 days depending on disease severity and local weather.${locationAdvice}`;
  } else {
    return `General recommendation for ${crop}${locationInfo} in ${season || ''} season: 1) Monitor crop health daily for early detection of issues specific to your region. 2) Maintain optimal soil moisture through regular but controlled irrigation based on local rainfall patterns. 3) Follow recommended fertilization schedule adapted to your area's soil type and crop stage. 4) Practice good field hygiene and crop rotation suitable for your local conditions.${locationAdvice}`;
  }
}

export default router;
