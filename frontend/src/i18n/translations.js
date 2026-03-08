/**
 * Chalo Kisaan — UI Translations
 * Keys are English identifiers; values are per-language strings.
 * Languages: hindi, english, marathi, punjabi, gujarati
 */

const t = {
  // ── My Land / Plan Page ───────────────────────────────────────────────
  myl_add_photo:        { hindi: 'खेत की फोटो जोड़ें', english: 'Add Farm Photo', marathi: 'शेताचा फोटो जोडा', punjabi: 'ਖੇਤ ਦੀ ਫੋਟੋ ਜੋੜੋ', gujarati: 'ખેતરનો ફોટો ઉમેરો' },
  myl_change_photo:     { hindi: 'फोटो बदलें', english: 'Change Photo', marathi: 'फोटो बदला', punjabi: 'ਫੋਟੋ ਬਦਲੋ', gujarati: 'ફોટો બદલો' },
  myl_photo_label:      { hindi: 'खेत की फोटो', english: 'Farm Photo', marathi: 'शेताचा फोटो', punjabi: 'ਖੇਤ ਦੀ ਫੋਟੋ', gujarati: 'ખેતરનો ફોટો' },
  myl_photo_optional:   { hindi: 'वैकल्पिक', english: 'optional', marathi: 'पर्यायी', punjabi: 'ਵਿਕਲਪਿਕ', gujarati: 'વૈકલ્પિક' },
  myl_photo_ph:         { hindi: 'फोटो अपलोड करें', english: 'Tap to upload a photo of your land', marathi: 'तुमच्या जमिनीचा फोटो अपलोड करा', punjabi: 'ਆਪਣੀ ਜ਼ਮੀਨ ਦੀ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ', gujarati: 'તમારી જમીનનો ફોટો અપલોડ કરો' },
  myl_photo_ai_sub:     { hindi: 'AI कृषि पर्यटन संभावनाओं का विश्लेषण करेगा', english: 'AI will analyse agritourism potential', marathi: 'AI कृषी पर्यटन क्षमतेचे विश्लेषण करेल', punjabi: 'AI ਖੇਤੀ ਸੈਰ-ਸਪਾਟੇ ਦੀ ਸੰਭਾਵਨਾ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੇਗਾ', gujarati: 'AI એગ્રીટૂરિઝ્મ ક્ષમતાનું વિશ્લેષણ કરશે' },
  myl_ai_analysis:      { hindi: 'AI भूमि विश्लेषण', english: 'AI Land Analysis', marathi: 'AI जमीन विश्लेषण', punjabi: 'AI ਜ਼ਮੀਨ ਵਿਸ਼ਲੇਸ਼ਣ', gujarati: 'AI જમીન વિશ્લેષણ' },
  myl_not_farm:         { hindi: 'खेत की छवि नहीं', english: 'Not a farm image', marathi: 'शेताची छवी नाही', punjabi: 'ਖੇਤ ਦੀ ਤਸਵੀਰ ਨਹੀਂ', gujarati: 'ખેતરની છबी નથी' },
  myl_potential_sfx:    { hindi: 'संभावना', english: 'potential', marathi: 'क्षमता', punjabi: 'ਸੰਭਾਵਨਾ', gujarati: 'ક્ષમતા' },
  myl_farm_photo_label: { hindi: 'खेत की फोटो', english: 'Farm Photo', marathi: 'शेताचा फोटो', punjabi: 'ਖੇਤ ਦੀ ਫੋਟੋ', gujarati: 'ખેतरનો ફોટો' },
  myl_current_crops:    { hindi: 'वर्तमान फसलें / भूमि प्रकार', english: 'Current Crops / Land Type', marathi: 'सध्याची पिके / जमीन प्रकार', punjabi: 'ਮੌਜੂਦਾ ਫਸਲਾਂ / ਜ਼ਮੀਨ ਦੀ ਕਿਸਮ', gujarati: 'વર્તમાન પาك / જмीन પ્rkar' },
  myl_avail_budget:     { hindi: 'उपलब्ध बजट (₹)', english: 'Available Budget (₹)', marathi: 'उपलब्ध बजेट (₹)', punjabi: 'ਉਪਲਬਧ ਬਜਟ (₹)', gujarati: 'ઉπلబ્ধ бजेट (₹)' },
  myl_analysing_ai:     { hindi: 'AI से विश्लेषण हो रहा है…', english: 'Analysing with AI…', marathi: 'AI ने विश्लेषण होत आहे…', punjabi: 'AI ਨਾਲ ਵਿਸ਼ਲੇਸ਼ਣ ਹੋ ਰਿਹਾ ਹੈ…', gujarati: 'AI સাthe વিशлेशण' },
  myl_gen_label:        { hindi: 'AI आपकी व्यक्तिगत योजना बना रहा है…', english: 'AI is crafting your personalised plan…', marathi: 'AI तुमची वैयक्तिक योजना तयार करत आहे…', punjabi: 'AI ਤੁਹਾਡੀ ਵਿਅਕਤੀਗਤ ਯੋਜਨਾ ਬਣਾ ਰਿਹਾ ਹੈ…', gujarati: 'AI yojana' },
  myl_gen_sub:          { hindi: 'भूमि, जलवायु, बाजार डेटा का विश्लेषण', english: 'Analysing land, climate, market data', marathi: 'जमीन, हवामान, बाजार डेटाचे विश्लेषण', punjabi: 'ਜ਼ਮੀਨ, ਮੌਸਮ, ਮਾਰਕੀਟ ਡੇਟਾ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ', gujarati: 'land climate data' },
  myl_gen_plan_title:   { hindi: 'योजना बन रही है', english: 'Generating Plan', marathi: 'योजना तयार होत आहे', punjabi: 'ਯੋਜਨਾ ਬਣਾਈ ਜਾ ਰਹੀ ਹੈ', gujarati: 'Generating Plan' },
  myl_plan_title:       { hindi: 'मेरी भूमि योजना', english: 'My Land Plan', marathi: 'माझी जमीन योजना', punjabi: 'ਮੇਰੀ ਜ਼ਮੀਨ ਯੋਜਨਾ', gujarati: 'મારી જмীन योजना' },
  myl_monthly_income:   { hindi: 'मासिक आय', english: 'Monthly Income', marathi: 'मासिक उत्पन्न', punjabi: 'ਮਾਸਿਕ ਆਮਦਨ', gujarati: 'માсिक आवक' },
  myl_setup_cost:       { hindi: 'स्थापना लागत', english: 'Setup Cost', marathi: 'स्थापना खर्च', punjabi: 'ਸੈੱਟਅੱਪ ਲਾਗਤ', gujarati: 'sthapna kharach' },
  myl_break_even:       { hindi: 'ब्रेक-ईवन', english: 'Break-Even', marathi: 'ब्रेक-ईव्हन', punjabi: 'ਬ੍ਰੇਕ-ਈਵਨ', gujarati: 'Break-Even' },
  myl_ai_vision:        { hindi: 'AI विज़न', english: 'AI Vision', marathi: 'AI दृष्टी', punjabi: 'AI ਦ੍ਰਿਸ਼ਟੀ', gujarati: 'AI Vision' },
  myl_unique_exp:       { hindi: 'अनोखे अनुभव', english: 'Unique Experiences', marathi: 'अनोखे अनुभव', punjabi: 'ਵਿਲੱਖਣ ਅਨੁਭਵ', gujarati: 'Unique Experiences' },
  myl_rev_streams:      { hindi: 'राजस्व स्रोत', english: 'Revenue Streams', marathi: 'महसूल स्रोत', punjabi: 'ਆਮਦਨੀ ਸਰੋਤ', gujarati: 'Revenue Streams' },
  myl_proj_monthly:     { hindi: 'अनुमानित मासिक', english: 'Projected Monthly', marathi: 'अनुमानित मासिक', punjabi: 'ਅਨੁਮਾਨਿਤ ਮਾਸਿਕ', gujarati: 'Projected Monthly' },
  myl_setup_roadmap:    { hindi: 'सेटअप रोडमैप', english: 'Setup Roadmap', marathi: 'सेटअप रोडमॅप', punjabi: 'ਸੈੱਟਅੱਪ ਰੋਡਮੈਪ', gujarati: 'Setup Roadmap' },
  myl_original_land:    { hindi: 'असली जमीन', english: 'Original Land', marathi: 'मूळ जमीन', punjabi: 'ਅਸਲੀ ਜ਼ਮੀਨ', gujarati: 'Original Land' },
  myl_ai_verified:      { hindi: 'AI विश्लेषण सत्यापित', english: 'AI Analysis Verified', marathi: 'AI विश्लेषण सत्यापित', punjabi: 'AI ਵਿਸ਼ਲੇਸ਼ਣ ਪ੍ਰਮਾਣਿਤ', gujarati: 'AI Analysis Verified' },
  myl_score_label:      { hindi: 'संभावना', english: 'potential', marathi: 'क्षमता', punjabi: 'ਸੰਭਾਵਨਾ', gujarati: 'potential' },
  myl_original_label:   { hindi: 'मूल दृश्य', english: 'Original View', marathi: 'मूळ दृश्य', punjabi: 'ਅਸਲੀ ਦ੍ਰਿਸ਼', gujarati: 'Original View' },
  myl_setup_cost_label: { hindi: 'अनुमानित स्थापना लागत', english: 'Estimated Setup Cost', marathi: 'अनुमानित स्थापना खर्च', punjabi: 'ਅਨੁਮਾਨਿਤ ਸੈੱਟਅੱਪ ਲਾਗਤ', gujarati: 'Estimated Setup Cost' },
  myl_steps:            { hindi: 'चरण', english: 'Steps', marathi: 'टप्पे', punjabi: 'ਕਦਮ', gujarati: 'Steps' },
  myl_verified:         { hindi: 'AI योजना कृषि-विशेषज्ञों द्वारा सत्यापित', english: 'AI Plan Verified by Agri-Experts', marathi: 'AI योजना कृषी तज्ञांनी सत्यापित', punjabi: 'AI ਯੋਜਨਾ ਖੇਤੀ ਮਾਹਰਾਂ ਦੁਆਰਾ ਪ੍ਰਮਾਣਿਤ', gujarati: 'AI Plan Verified' },
  myl_download:         { hindi: 'योजना डाउनलोड करें', english: 'Download Plan', marathi: 'योजना डाउनलोड करा', punjabi: 'ਯੋਜਨਾ ਡਾਊਨਲੋਡ ਕਰੋ', gujarati: 'Download Plan' },
  myl_connect_vendors:  { hindi: 'विक्रेताओं से जुड़ें', english: 'Connect to Vendors', marathi: 'विक्रेत्यांशी संपर्क करा', punjabi: 'ਵੇਚਣ ਵਾਲਿਆਂ ਨਾਲ ਜੁੜੋ', gujarati: 'Connect to Vendors' },
  myl_fill_required:    { hindi: 'कृपया स्थान, जमीन का आकार और बजट भरें।', english: 'Please fill in Land Size, Location, and Budget.', marathi: 'कृपया स्थान, जमिनीचा आकार आणि बजेट भरा.', punjabi: 'ਕਿਰਪਾ ਕਰਕੇ ਜ਼ਮੀਨ ਦਾ ਆਕਾਰ, ਸਥਾਨ ਅਤੇ ਬਜਟ ਭਰੋ।', gujarati: 'Please fill in all fields.' },

  // ── App-wide / Navigation ──────────────────────────────────────────────
  nav_home:       { hindi: 'होम', english: 'Home',    marathi: 'होम',   punjabi: 'ਹੋਮ',    gujarati: 'હોમ'    },
  nav_my_land:    { hindi: 'मेरी जमीन', english: 'My Land', marathi: 'माझी जमीन', punjabi: 'ਮੇਰੀ ਜ਼ਮੀਨ', gujarati: 'મારી જмीन' },
  nav_assistant:  { hindi: 'सहायक', english: 'Assistant', marathi: 'सहाय्यक', punjabi: 'ਸਹਾਇਕ', gujarati: 'સहायक' },
  nav_requests:   { hindi: 'अलर्ट', english: 'Alerts', marathi: 'अलर्ट', punjabi: 'ਅਲਰਟ', gujarati: 'Alerts' },
  nav_profile:    { hindi: 'प्रोफ़ाइल', english: 'Profile', marathi: 'प्रोफाइल', punjabi: 'ਪ੍ਰੋਫਾਈਲ', gujarati: 'Profile' },

  // ── HomePage ──────────────────────────────────────────────────────────
  home_greeting:        { hindi: 'नमस्ते', english: 'Hello', marathi: 'नमस्कार', punjabi: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', gujarati: 'નмсте' },
  home_today:           { hindi: 'आज', english: 'Today', marathi: 'आज', punjabi: 'ਅੱਜ', gujarati: 'Today' },
  home_farm_score:      { hindi: 'खेत स्कोर', english: 'Farm Score', marathi: 'शेत स्कोर', punjabi: 'ਖੇਤ ਸਕੋਰ', gujarati: 'Farm Score' },
  home_no_plan_title:   { hindi: 'अभी कोई योजना नहीं', english: 'No Plan Yet', marathi: 'अजून कोणतीही योजना नाही', punjabi: 'ਅਜੇ ਕੋਈ ਯੋਜਨਾ ਨਹੀਂ', gujarati: 'No Plan Yet' },
  home_no_plan_sub:     { hindi: 'AI से अपनी खेती की योजना बनाएं', english: 'Let AI create a farm plan for you', marathi: 'AI कडून तुमची शेती योजना तयार करा', punjabi: 'AI ਨਾਲ ਆਪਣੀ ਖੇਤੀ ਯੋਜਨਾ ਬਣਾਓ', gujarati: 'Let AI create a farm plan' },
  home_create_plan:     { hindi: 'योजना बनाएं', english: 'Create Plan', marathi: 'योजना तयार करा', punjabi: 'ਯੋਜਨਾ ਬਣਾਓ', gujarati: 'Create Plan' },
  home_speak_ai:        { hindi: 'AI से बात करें', english: 'Speak to AI', marathi: 'AI शी बोला', punjabi: 'AI ਨਾਲ ਗੱਲ ਕਰੋ', gujarati: 'Speak to AI' },
  home_monthly_income:  { hindi: 'मासिक आय', english: 'Monthly Income', marathi: 'मासिक उत्पन्न', punjabi: 'ਮਾਸਿਕ ਆਮਦਨ', gujarati: 'Monthly Income' },
  home_annual_income:   { hindi: 'वार्षिक आय', english: 'Annual Income', marathi: 'वार्षिक उत्पन्न', punjabi: 'ਸਾਲਾਨਾ ਆਮਦਨ', gujarati: 'Annual Income' },
  home_setup_cost:      { hindi: 'शुरुआती लागत', english: 'Setup Cost', marathi: 'स्थापना खर्च', punjabi: 'ਸੈੱਟਅੱਪ ਲਾਗਤ', gujarati: 'Setup Cost' },
  home_recommended:     { hindi: 'अनुशंसित', english: 'Recommended', marathi: 'शिफारस केलेले', punjabi: 'ਸਿਫਾਰਸ਼ ਕੀਤਾ', gujarati: 'Recommended' },
  home_expert_tip:      { hindi: 'विशेषज्ञ सुझाव', english: 'Expert Tip', marathi: 'तज्ञ सल्ला', punjabi: 'ਮਾਹਰ ਸੁਝਾਅ', gujarati: 'Expert Tip' },
  home_view_plan:       { hindi: 'पूरी योजना देखें', english: 'View Full Plan', marathi: 'संपूर्ण योजना पहा', punjabi: 'ਪੂਰੀ ਯੋਜਨਾ ਦੇਖੋ', gujarati: 'View Full Plan' },
  home_add_photo:       { hindi: 'फोटो जोड़ें', english: 'Add Photo', marathi: 'फोटो जोडा', punjabi: 'ਫੋਟੋ ਜੋੜੋ', gujarati: 'Add Photo' },
  home_plan_subtitle:   { hindi: 'आपकी AI योजना', english: 'Your AI Plan', marathi: 'तुमची AI योजना', punjabi: 'ਤੁਹਾਡੀ AI ਯੋਜਨਾ', gujarati: 'Your AI Plan' },
  home_action_land:     { hindi: 'मेरी जमीन', english: 'My Land', marathi: 'माझी जमीन', punjabi: 'ਮੇਰੀ ਜ਼ਮੀਨ', gujarati: 'My Land' },
  home_action_land_sub: { hindi: 'विवरण व फोटो', english: 'Details & Photos', marathi: 'तपशील आणि फोटो', punjabi: 'ਵੇਰਵੇ ਅਤੇ ਫੋਟੋ', gujarati: 'Details & Photos' },
  home_action_ai:       { hindi: 'AI सहायक', english: 'AI Assistant', marathi: 'AI सहाय्यक', punjabi: 'AI ਸਹਾਇਕ', gujarati: 'AI Assistant' },
  home_action_ai_sub:   { hindi: 'सवाल पूछें', english: 'Ask questions', marathi: 'प्रश्न विचारा', punjabi: 'ਸਵਾਲ ਪੁੱਛੋ', gujarati: 'Ask questions' },
  home_score_excellent: { hindi: 'उत्कृष्ट', english: 'EXCELLENT', marathi: 'उत्कृष्ट', punjabi: 'ਉੱਤਮ', gujarati: 'EXCELLENT' },
  home_score_very_good: { hindi: 'बहुत अच्छा', english: 'VERY GOOD', marathi: 'खूप चांगले', punjabi: 'ਬਹੁਤ ਵਧੀਆ', gujarati: 'VERY GOOD' },
  home_score_good:      { hindi: 'अच्छा', english: 'GOOD', marathi: 'चांगले', punjabi: 'ਵਧੀਆ', gujarati: 'GOOD' },
  home_score_fair:      { hindi: 'ठीक', english: 'FAIR', marathi: 'ठीक', punjabi: 'ਠੀਕ', gujarati: 'FAIR' },

  // ── ProfilePage ──────────────────────────────────────────────────────
  profile_title:          { hindi: 'प्रोफ़ाइल', english: 'Profile', marathi: 'प्रोफाइल', punjabi: 'ਪ੍ਰੋਫਾਈਲ', gujarati: 'Profile' },
  profile_active:         { hindi: 'सक्रिय प्रोफ़ाइल', english: 'Profile Active', marathi: 'प्रोफाइल सक्रिय', punjabi: 'ਪ੍ਰੋਫਾਈਲ ਸਕਿਰਿਆ', gujarati: 'Profile Active' },
  profile_edit:           { hindi: 'प्रोफ़ाइल संपादित करें', english: 'Edit Profile', marathi: 'प्रोफाइल संपादित करा', punjabi: 'ਪ੍ਰੋਫਾਈਲ ਸੰਪਾਦਿਤ ਕਰੋ', gujarati: 'Edit Profile' },
  profile_settings:       { hindi: 'सेटिंग्स और विवरण', english: 'Settings & Details', marathi: 'सेटिंग्ज आणि तपशील', punjabi: 'ਸੈਟਿੰਗਜ਼ ਅਤੇ ਵੇਰਵੇ', gujarati: 'Settings & Details' },
  profile_saved_plans:    { hindi: 'सहेजी गई योजनाएं', english: 'Saved Plans', marathi: 'जतन केलेल्या योजना', punjabi: 'ਸੁਰੱਖਿਅਤ ਯੋਜਨਾਵਾਂ', gujarati: 'Saved Plans' },
  profile_saved_plans_sub:{ hindi: 'AI जनित सभी योजनाएं देखें', english: 'View all AI-generated plans', marathi: 'सर्व AI-निर्मित योजना पहा', punjabi: 'ਸਾਰੀਆਂ AI ਯੋਜਨਾਵਾਂ ਦੇਖੋ', gujarati: 'View all AI plans' },
  profile_my_land:        { hindi: 'मेरी जमीन', english: 'My Land', marathi: 'माझी जमीन', punjabi: 'ਮੇਰੀ ਜ਼ਮੀਨ', gujarati: 'My Land' },
  profile_my_land_sub:    { hindi: 'फोटो, फसल और क्षेत्र अपडेट करें', english: 'Update photos, crops & area', marathi: 'फोटो, पिके आणि क्षेत्र अपडेट करा', punjabi: 'ਫੋਟੋ, ਫਸਲ ਅਤੇ ਖੇਤਰ ਅਪਡੇਟ ਕਰੋ', gujarati: 'Update photos, crops & area' },
  profile_bank:           { hindi: 'बैंक खाता', english: 'Bank Account', marathi: 'बँक खाते', punjabi: 'ਬੈਂਕ ਖਾਤਾ', gujarati: 'Bank Account' },
  profile_bank_sub:       { hindi: 'भुगतान और आय प्रबंधित करें', english: 'Manage payments & earnings', marathi: 'पेमेंट आणि कमाई व्यवस्थापित करा', punjabi: 'ਭੁਗਤਾਨ ਅਤੇ ਕਮਾਈ ਪ੍ਰਬੰਧਿਤ ਕਰੋ', gujarati: 'Manage payments & earnings' },
  profile_language:       { hindi: 'भाषा', english: 'Language', marathi: 'भाषा', punjabi: 'ਭਾਸ਼ਾ', gujarati: 'Language' },
  profile_help:           { hindi: 'मदद चाहिए?', english: 'Need Help?', marathi: 'मदत हवी आहे का?', punjabi: 'ਮਦਦ ਚਾਹੀਦੀ ਹੈ?', gujarati: 'Need Help?' },
  profile_help_sub:       { hindi: 'हमारी सहायता टीम से बात करें', english: 'Call our support team', marathi: 'आमच्या सपोर्ट टीमला कॉल करा', punjabi: 'ਸਾਡੀ ਸਹਾਇਤਾ ਟੀਮ ਨੂੰ ਕਾਲ ਕਰੋ', gujarati: 'Call our support team' },
  profile_logout:         { hindi: 'लॉग आउट', english: 'Log Out', marathi: 'लॉग आउट', punjabi: 'ਲੌਗ ਆਊਟ', gujarati: 'Log Out' },
  profile_edit_title:     { hindi: 'प्रोफ़ाइल संपादित करें', english: 'Edit Profile', marathi: 'प्रोफाइल संपादित करा', punjabi: 'ਪ੍ਰੋਫਾਈਲ ਸੰਪਾਦਿਤ ਕਰੋ', gujarati: 'Edit Profile' },
  profile_first_name:     { hindi: 'पहला नाम', english: 'First Name', marathi: 'पहिले नाव', punjabi: 'ਪਹਿਲਾ ਨਾਮ', gujarati: 'First Name' },
  profile_last_name:      { hindi: 'अंतिम नाम', english: 'Last Name', marathi: 'आडनाव', punjabi: 'ਆਖਰੀ ਨਾਮ', gujarati: 'Last Name' },
  profile_address:        { hindi: 'गांव / शहर / जिला', english: 'Village / City / District', marathi: 'गाव / शहर / जिल्हा', punjabi: 'ਪਿੰਡ / ਸ਼ਹਿਰ / ਜ਼ਿਲ੍ਹਾ', gujarati: 'Village / City / District' },
  profile_address_hint:   { hindi: 'AI सहायक मंडियों की जानकारी देने में उपयोग करता है', english: 'Used by AI to suggest nearby mandis & markets', marathi: 'AI जवळच्या बाजारपेठा सुचवण्यासाठी वापरते', punjabi: 'AI ਨੇੜੇ ਦੀਆਂ ਮੰਡੀਆਂ ਸੁਝਾਉਣ ਲਈ ਵਰਤਦਾ ਹੈ', gujarati: 'Used by AI for nearby mandis' },
  profile_dob:            { hindi: 'जन्म तिथि', english: 'Date of Birth', marathi: 'जन्मतारीख', punjabi: 'ਜਨਮ ਮਿਤੀ', gujarati: 'Date of Birth' },
  profile_cancel:         { hindi: 'रद्द करें', english: 'Cancel', marathi: 'रद्द करा', punjabi: 'ਰੱਦ ਕਰੋ', gujarati: 'Cancel' },
  profile_save:           { hindi: 'बदलाव सहेजें', english: 'Save Changes', marathi: 'बदल जतन करा', punjabi: 'ਬਦਲਾਅ ਸੁਰੱਖਿਅਤ ਕਰੋ', gujarati: 'Save Changes' },
  profile_saving:         { hindi: 'सहेज रहे हैं…', english: 'Saving…', marathi: 'जतन करत आहे…', punjabi: 'ਸੁਰੱਖਿਅਤ ਕਰ ਰਹੇ ਹਾਂ…', gujarati: 'Saving...' },
  profile_saved_ok:       { hindi: 'प्रोफ़ाइल अपडेट हो गई!', english: 'Profile updated!', marathi: 'प्रोफाइल अपडेट झाली!', punjabi: 'ਪ੍ਰੋਫਾਈਲ ਅਪਡੇਟ ਹੋ ਗਈ!', gujarati: 'Profile updated!' },
  profile_5_actions:      { hindi: '5 क्रियाएं', english: '5 Actions', marathi: '5 क्रिया', punjabi: '5 ਕਿਰਿਆਵਾਂ', gujarati: '5 Actions' },

  // ── MyLandPage / Planner ──────────────────────────────────────────────
  myl_title:            { hindi: 'मेरी जमीन', english: 'My Land', marathi: 'माझी जमीन', punjabi: 'ਮੇਰੀ ਜ਼ਮੀਨ', gujarati: 'My Land' },
  myl_location:         { hindi: 'स्थान', english: 'Location', marathi: 'स्थान', punjabi: 'ਸਥਾਨ', gujarati: 'Location' },
  myl_location_ph:      { hindi: 'जैसे: नासिक, महाराष्ट्र', english: 'e.g. Nashik, Maharashtra', marathi: 'उदा. नासिक, महाराष्ट्र', punjabi: 'ਜਿਵੇਂ: ਅੰਮ੍ਰਿਤਸਰ, ਪੰਜਾਬ', gujarati: 'e.g. Vadodara, Gujarat' },
  myl_land_size:        { hindi: 'जमीन का आकार (एकड़)', english: 'Land Size (acres)', marathi: 'जमिनीचा आकार (एकर)', punjabi: 'ਜ਼ਮੀਨ ਦਾ ਆਕਾਰ (ਏਕੜ)', gujarati: 'Land Size (acres)' },
  myl_land_size_ph:     { hindi: 'जैसे: 5', english: 'e.g. 5', marathi: 'उदा. 5', punjabi: 'ਜਿਵੇਂ: 5', gujarati: 'e.g. 5' },
  myl_soil:             { hindi: 'मिट्टी का प्रकार', english: 'Soil Type', marathi: 'मातीचा प्रकार', punjabi: 'ਮਿੱਟੀ ਦੀ ਕਿਸਮ', gujarati: 'Soil Type' },
  myl_water:            { hindi: 'जल स्रोत', english: 'Water Source', marathi: 'पाण्याचा स्रोत', punjabi: 'ਪਾਣੀ ਦਾ ਸਰੋਤ', gujarati: 'Water Source' },
  myl_crops:            { hindi: 'फसलें / जैव विविधता', english: 'Crops / Biodiversity', marathi: 'पिके / जैवविविधता', punjabi: 'ਫਸਲਾਂ / ਜੈਵ ਵਿਭਿੰਨਤਾ', gujarati: 'Crops / Biodiversity' },
  myl_infra:            { hindi: 'मौजूदा बुनियादी ढांचा', english: 'Existing Infrastructure', marathi: 'विद्यमान पायाभूत सुविधा', punjabi: 'ਮੌਜੂਦਾ ਬੁਨਿਆਦੀ ਢਾਂਚਾ', gujarati: 'Existing Infrastructure' },
  myl_budget:           { hindi: 'निवेश बजट (₹)', english: 'Investment Budget (₹)', marathi: 'गुंतवणूक बजेट (₹)', punjabi: 'ਨਿਵੇਸ਼ ਬਜਟ (₹)', gujarati: 'Investment Budget (₹)' },
  myl_budget_ph:        { hindi: 'जैसे: 200000', english: 'e.g. 200000', marathi: 'उदा. 200000', punjabi: 'ਜਿਵੇਂ: 200000', gujarati: 'e.g. 200000' },
  myl_language:         { hindi: 'योजना की भाषा', english: 'Plan Language', marathi: 'योजनेची भाषा', punjabi: 'ਯੋਜਨਾ ਦੀ ਭਾਸ਼ਾ', gujarati: 'Plan Language' },
  myl_generate:         { hindi: 'AI योजना बनाएं', english: 'Generate AI Plan', marathi: 'AI योजना तयार करा', punjabi: 'AI ਯੋਜਨਾ ਬਣਾਓ', gujarati: 'Generate AI Plan' },
  myl_generating:       { hindi: 'योजना बन रही है…', english: 'Generating plan…', marathi: 'योजना तयार होत आहे…', punjabi: 'ਯੋਜਨਾ ਬਣਾਈ ਜਾ ਰਹੀ ਹੈ…', gujarati: 'Generating plan...' },
  myl_analyzing:        { hindi: 'AI तस्वीर विश्लेषण कर रहा है…', english: 'AI is analysing your photo…', marathi: 'AI तुमचा फोटो विश्लेषण करत आहे…', punjabi: 'AI ਤੁਹਾਡੀ ਫੋਟੋ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰ ਰਿਹਾ ਹੈ…', gujarati: 'AI analysing photo...' },
  myl_save_plan:        { hindi: 'योजना सहेजें', english: 'Save Plan', marathi: 'योजना जतन करा', punjabi: 'ਯੋਜਨਾ ਸੁਰੱਖਿਅਤ ਕਰੋ', gujarati: 'Save Plan' },
  myl_plan_saved:       { hindi: 'योजना सहेजी गई!', english: 'Plan Saved!', marathi: 'योजना जतन झाली!', punjabi: 'ਯੋਜਨਾ ਸੁਰੱਖਿਅਤ ਕੀਤੀ ਗਈ!', gujarati: 'Plan Saved!' },
  myl_new_plan:         { hindi: 'नई योजना', english: 'New Plan', marathi: 'नवीन योजना', punjabi: 'ਨਵੀਂ ਯੋਜਨਾ', gujarati: 'New Plan' },
  myl_your_plan:        { hindi: 'आपकी AI योजना', english: 'Your AI Plan', marathi: 'तुमची AI योजना', punjabi: 'ਤੁਹਾਡੀ AI ਯੋਜਨਾ', gujarati: 'Your AI Plan' },
  myl_setup_steps:      { hindi: 'सेटअप चरण', english: 'Setup Steps', marathi: 'सेटअप चरण', punjabi: 'ਸੈੱਟਅੱਪ ਕਦਮ', gujarati: 'Setup Steps' },
  myl_activities:       { hindi: 'गतिविधियाँ', english: 'Activities', marathi: 'उपक्रम', punjabi: 'ਗਤੀਵਿਧੀਆਂ', gujarati: 'Activities' },
  myl_income:           { hindi: 'आय अनुमान', english: 'Income Estimate', marathi: 'उत्पन्न अंदाज', punjabi: 'ਆਮਦਨ ਅਨੁਮਾਨ', gujarati: 'Income Estimate' },
  myl_costs:            { hindi: 'लागत विवरण', english: 'Cost Breakdown', marathi: 'खर्च तपशील', punjabi: 'ਲਾਗਤ ਵੇਰਵਾ', gujarati: 'Cost Breakdown' },
  myl_schemes:          { hindi: 'सरकारी योजनाएं', english: 'Govt Schemes', marathi: 'सरकारी योजना', punjabi: 'ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ', gujarati: 'Govt Schemes' },
  myl_risks:            { hindi: 'जोखिम और समाधान', english: 'Risks & Solutions', marathi: 'जोखीम आणि उपाय', punjabi: 'ਜੋਖਮ ਅਤੇ ਹੱਲ', gujarati: 'Risks & Solutions' },
  myl_monthly:          { hindi: 'प्रति माह', english: 'per month', marathi: 'प्रति महिना', punjabi: 'ਪ੍ਰਤੀ ਮਹੀਨਾ', gujarati: 'per month' },
  myl_per_year:         { hindi: 'प्रति वर्ष', english: 'per year', marathi: 'प्रति वर्ष', punjabi: 'ਪ੍ਰਤੀ ਸਾਲ', gujarati: 'per year' },
  myl_score:            { hindi: 'स्कोर', english: 'Score', marathi: 'स्कोर', punjabi: 'ਸਕੋਰ', gujarati: 'Score' },
  myl_location_req:     { hindi: 'स्थान आवश्यक है', english: 'Location is required', marathi: 'स्थान आवश्यक आहे', punjabi: 'ਸਥਾਨ ਲੋੜੀਂਦਾ ਹੈ', gujarati: 'Location is required' },
  myl_land_req:         { hindi: 'जमीन का आकार आवश्यक है', english: 'Land size is required', marathi: 'जमिनीचा आकार आवश्यक आहे', punjabi: 'ਜ਼ਮੀਨ ਦਾ ਆਕਾਰ ਲੋੜੀਂਦਾ ਹੈ', gujarati: 'Land size is required' },
  myl_visualize:        { hindi: 'AI विज़ुअलाइज़ेशन', english: 'AI Visualization', marathi: 'AI व्हिज्युअलायझेशन', punjabi: 'AI ਵਿਜ਼ੁਅਲਾਈਜ਼ੇਸ਼ਨ', gujarati: 'AI Visualization' },

  // ── VoiceAssistantPage ────────────────────────────────────────────────
  assistant_title:      { hindi: 'AI सहायक', english: 'AI Assistant', marathi: 'AI सहाय्यक', punjabi: 'AI ਸਹਾਇਕ', gujarati: 'AI Assistant' },
  assistant_listening:  { hindi: 'सुन रहा हूँ…', english: 'Listening…', marathi: 'ऐकत आहे…', punjabi: 'ਸੁਣ ਰਿਹਾ ਹਾਂ…', gujarati: 'Listening...' },
  assistant_tap_mic:    { hindi: 'माइक दबाएं', english: 'Tap mic to speak', marathi: 'मायक्रोफोन दाबा', punjabi: 'ਮਾਈਕ ਦਬਾਓ', gujarati: 'Tap mic to speak' },
  assistant_send:       { hindi: 'भेजें', english: 'Send', marathi: 'पाठवा', punjabi: 'ਭੇਜੋ', gujarati: 'Send' },
  assistant_thinking:   { hindi: 'सोच रहा हूँ…', english: 'Thinking…', marathi: 'विचार करत आहे…', punjabi: 'ਸੋਚ ਰਿਹਾ ਹਾਂ…', gujarati: 'Thinking...' },
  assistant_ask_ph:     { hindi: 'अपना सवाल लिखें…', english: 'Type your question…', marathi: 'तुमचा प्रश्न लिहा…', punjabi: 'ਆਪਣਾ ਸਵਾਲ ਲਿਖੋ…', gujarati: 'Type your question...' },

  // ── SavedPlansPage ────────────────────────────────────────────────────
  sp_title:           { hindi: 'सहेजी गई योजनाएं', english: 'Saved Plans', marathi: 'जतन केलेल्या योजना', punjabi: 'ਸੁਰੱਖਿਅਤ ਯੋਜਨਾਵਾਂ', gujarati: 'Saved Plans' },
  sp_empty:           { hindi: 'कोई सहेजी गई योजना नहीं', english: 'No saved plans yet', marathi: 'अजून कोणतीही योजना जतन केलेली नाही', punjabi: 'ਅਜੇ ਕੋਈ ਯੋਜਨਾ ਨਹੀਂ', gujarati: 'No saved plans yet' },
  sp_view:            { hindi: 'योजना देखें', english: 'View Plan', marathi: 'योजना पहा', punjabi: 'ਯੋਜਨਾ ਦੇਖੋ', gujarati: 'View Plan' },
  sp_loading:         { hindi: 'योजनाएं लोड हो रही हैं…', english: 'Loading plans…', marathi: 'योजना लोड होत आहेत…', punjabi: 'ਯੋਜਨਾਵਾਂ ਲੋਡ ਹੋ ਰਹੀਆਂ ਹਨ…', gujarati: 'Loading plans...' },
  sp_activities:      { hindi: 'गतिविधियाँ', english: 'activities', marathi: 'उपक्रम', punjabi: 'ਗਤੀਵਿਧੀਆਂ', gujarati: 'activities' },
  sp_per_month:       { hindi: 'प्र.माह', english: '/mo', marathi: '/महिना', punjabi: '/ਮਹੀਨਾ', gujarati: '/mo' },

  // ── OnboardingPage ────────────────────────────────────────────────────
  onb_welcome:        { hindi: 'आपका स्वागत है 🙏', english: 'Welcome 🙏', marathi: 'स्वागत आहे 🙏', punjabi: 'ਜੀ ਆਇਆਂ ਨੂੰ 🙏', gujarati: 'Welcome 🙏' },
  onb_your_name:      { hindi: 'आपका नाम', english: 'Your Name', marathi: 'तुमचे नाव', punjabi: 'ਤੁਹਾਡਾ ਨਾਮ', gujarati: 'Your Name' },
  onb_details:        { hindi: 'विवरण', english: 'Details', marathi: 'तपशील', punjabi: 'ਵੇਰਵੇ', gujarati: 'Details' },
  onb_address:        { hindi: 'पता', english: 'Address', marathi: 'पत्ता', punjabi: 'ਪਤਾ', gujarati: 'Address' },
  onb_next:           { hindi: 'अगला', english: 'Next', marathi: 'पुढे', punjabi: 'ਅਗਲਾ', gujarati: 'Next' },
  onb_back:           { hindi: 'पीछे', english: 'Back', marathi: 'मागे', punjabi: 'ਵਾਪਸ', gujarati: 'Back' },
  onb_submit:         { hindi: 'शुरू करें', english: 'Get Started', marathi: 'सुरुवात करा', punjabi: 'ਸ਼ੁਰੂ ਕਰੋ', gujarati: 'Get Started' },
  onb_saving:         { hindi: 'सहेज रहे हैं…', english: 'Saving…', marathi: 'जतन करत आहे…', punjabi: 'ਸੁਰੱਖਿਅਤ ਕਰ ਰਹੇ ਹਾਂ…', gujarati: 'Saving...' },

  // ── LandingPage ──────────────────────────────────────────────────────
  landing_tagline:    { hindi: 'अपने खेत को व्यवसाय बनाएं', english: 'Transform Your Farm Into a Business', marathi: 'तुमच्या शेताला व्यवसायात रूपांतरित करा', punjabi: 'ਆਪਣੇ ਖੇਤ ਨੂੰ ਕਾਰੋਬਾਰ ਬਣਾਓ', gujarati: 'Transform Your Farm Into a Business' },
  landing_sub:        { hindi: 'AI-संचालित कृषि पर्यटन योजना', english: 'AI-powered agritourism planning', marathi: 'AI-संचालित कृषी पर्यटन नियोजन', punjabi: 'AI-संचालित ਖੇਤੀ ਸੈਰ-ਸਪਾਟਾ ਯੋਜਨਾਬੰਦੀ', gujarati: 'AI-powered agritourism planning' },
  landing_start:      { hindi: 'शुरू करें', english: 'Get Started', marathi: 'सुरुवात करा', punjabi: 'ਸ਼ੁਰੂ ਕਰੋ', gujarati: 'Get Started' },

  // ── LoginPage ─────────────────────────────────────────────────────────
  login_title:        { hindi: 'लॉगिन', english: 'Login', marathi: 'लॉगिन', punjabi: 'ਲੌਗਿਨ', gujarati: 'Login' },
  login_phone:        { hindi: 'मोबाइल नंबर', english: 'Mobile Number', marathi: 'मोबाइल नंबर', punjabi: 'ਮੋਬਾਈਲ ਨੰਬਰ', gujarati: 'Mobile Number' },
  login_password:     { hindi: 'पासवर्ड', english: 'Password', marathi: 'पासवर्ड', punjabi: 'ਪਾਸਵਰਡ', gujarati: 'Password' },
  login_submit:       { hindi: 'लॉगिन करें', english: 'Login', marathi: 'लॉगिन करा', punjabi: 'ਲੌਗਿਨ ਕਰੋ', gujarati: 'Login' },
  login_no_account:   { hindi: 'खाता नहीं है?', english: "Don't have an account?", marathi: 'खाते नाही?', punjabi: 'ਖਾਤਾ ਨਹੀਂ ਹੈ?', gujarati: "Don't have an account?" },
  login_register:     { hindi: 'रजिस्टर करें', english: 'Register', marathi: 'नोंदणी करा', punjabi: 'ਰਜਿਸਟਰ ਕਰੋ', gujarati: 'Register' },
  login_signing_in:   { hindi: 'लॉगिन हो रहा है…', english: 'Signing in…', marathi: 'लॉगिन होत आहे…', punjabi: 'ਲੌਗਿਨ ਹੋ ਰਿਹਾ ਹੈ…', gujarati: 'Signing in...' },

  // ── Common ────────────────────────────────────────────────────────────
  common_back:        { hindi: 'वापस', english: 'Back', marathi: 'मागे', punjabi: 'ਵਾਪਸ', gujarati: 'Back' },
  common_loading:     { hindi: 'लोड हो रहा है…', english: 'Loading…', marathi: 'लोड होत आहे…', punjabi: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ…', gujarati: 'Loading...' },
  common_error:       { hindi: 'कुछ गलत हो गया', english: 'Something went wrong', marathi: 'काहीतरी चुकीचे झाले', punjabi: 'ਕੁਝ ਗਲਤ ਹੋ ਗਿਆ', gujarati: 'Something went wrong' },
  common_retry:       { hindi: 'पुनः प्रयास करें', english: 'Retry', marathi: 'पुन्हा प्रयत्न करा', punjabi: 'ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ', gujarati: 'Retry' },
  common_kisan:       { hindi: 'किसान', english: 'Farmer', marathi: 'शेतकरी', punjabi: 'ਕਿਸਾਨ', gujarati: 'Farmer' },
  common_month:       { hindi: 'प्रति माह', english: 'per month', marathi: 'प्रति महिना', punjabi: 'ਪ੍ਰਤੀ ਮਹੀਨਾ', gujarati: 'per month' },
  common_year:        { hindi: 'प्रति वर्ष', english: 'per year', marathi: 'प्रति वर्ष', punjabi: 'ਪ੍ਰਤੀ ਸਾਲ', gujarati: 'per year' },
  common_close:       { hindi: 'बंद करें', english: 'Close', marathi: 'बंद करा', punjabi: 'ਬੰਦ ਕਰੋ', gujarati: 'Close' },
  common_alerts_soon: { hindi: 'बुकिंग अनुरोध और अलर्ट जल्द आ रहे हैं।', english: 'Booking requests and alerts coming soon.', marathi: 'बुकिंग विनंत्या आणि अलर्ट लवकरच येत आहेत.', punjabi: 'ਬੁਕਿੰਗ ਬੇਨਤੀਆਂ ਅਤੇ ਅਲਰਟ ਜਲਦੀ ਆ ਰਹੇ ਹਨ।', gujarati: 'Booking requests coming soon.' },
  common_alerts:      { hindi: 'अलर्ट', english: 'Alerts', marathi: 'अलर्ट', punjabi: 'ਅਲਰਟ', gujarati: 'Alerts' },
  
  // ── Cost Breakdown ────────────────────────────────────────────────────
  myl_cost_breakdown:  { hindi: 'लागत विवरण', english: 'Cost Breakdown', marathi: 'खर्च तपशील', punjabi: 'ਲਾਗਤ ਵੇਰਵਾ', gujarati: 'Cost Breakdown' },
  myl_total_cost:      { hindi: 'कुल लागत', english: 'Total Cost', marathi: 'एकूण खर्च', punjabi: 'ਕੁੱਲ ਲਾਗਤ', gujarati: 'Total Cost' },
  myl_materials:       { hindi: 'सामग्री', english: 'Materials', marathi: 'सामग्री', punjabi: 'ਸਮੱਗਰੀ', gujarati: 'Materials' },
  myl_labor:           { hindi: 'श्रम', english: 'Labor', marathi: 'श्रम', punjabi: 'ਮਜ਼ਦੂਰੀ', gujarati: 'Labor' },
  
  // ── Plan Actions ──────────────────────────────────────────────────────
  myl_edit_regen:      { hindi: 'पुनः उत्पन्न करें', english: 'Regenerate', marathi: 'पुन्हा तयार करा', punjabi: 'ਮੁੜ ਬਣਾਓ', gujarati: 'Regenerate' },
  myl_saved_ok:        { hindi: 'AI सत्यापित', english: 'AI Verified', marathi: 'AI सत्यापित', punjabi: 'AI ਪ੍ਰਮਾਣਿਤ', gujarati: 'AI Verified' },
};

/**
 * Get a translated string.
 * @param {string} key - Translation key
 * @param {string} lang - Language code: hindi|english|marathi|punjabi|gujarati
 * @returns {string}
 */
export function tr(key, lang = 'english') {
  const entry = t[key];
  if (!entry) return key;
  return entry[lang] || entry['english'] || key;
}

export default t;
