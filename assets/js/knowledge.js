/* Knowledge base for the UoS Assistant (Easypaisa-style smart chatbot)
   All answers are verified against official University of Swat data. */
window.UOS_KB = [
  {
    id: 'admissions',
    keys: ['admission', 'admissions', 'apply', 'applying', 'dakhla', 'dakhly', 'fall 2026', 'last date', 'eligibility', 'form', 'how to apply', 'open', 'phase'],
    a: 'Undergraduate Admissions Fall 2026 (Phase-II) was officially announced on 20 October 2026. The Final Merit List (Self Finance) is currently available. You can apply directly through the Admissions Portal or submit forms at the Academics Section.',
    src: ['Admissions Portal & Guidelines', 'admissions.html'],
    chips: ['Merit Lists', 'Fee Structure', 'DCST Programs']
  },
  {
    id: 'merit',
    keys: ['merit', 'merit list', 'self finance', 'selection', 'quota', 'merit formula', 'aggregate', 'result list'],
    a: 'The Final Merit List Fall 2026 (Self Finance & Regular) is posted on the university announcements board. Merit is determined based on SSC (40%) and HSSC / F.Sc (60%) academic marks.',
    src: ['Official Announcements', 'news.html#announcements'],
    chips: ['Admissions Fall 2026', 'Fee Structure', 'Downloads']
  },
  {
    id: 'dcst',
    keys: ['dcst', 'computer science', 'software', 'cs', 'ai', 'artificial intelligence', 'data science', 'it', 'computing', 'bs ai', 'bs ds', 'bs cs', 'where is dcst'],
    a: 'The Department of Computer & Software Technology (DCST) is located in Academic Block A, Main Campus Charbagh. DCST offers BS Artificial Intelligence and BS Data Science with state-of-the-art computer labs, high-speed networking, and HEC-qualified PhD faculty.',
    src: ['DCST Department Page', 'dcst.html'],
    chips: ['Admissions Fall 2026', 'Departments List', 'Contact Office']
  },
  {
    id: 'fee',
    keys: ['fee', 'fees', 'tuition', 'expenses', 'charges', 'cost', 'dues', 'per semester', 'kitni fee', 'challan'],
    a: 'Tuition and semester fees vary by program (typically Rs. 28,000 – 42,000 per semester for computing and sciences). Complete fee breakdown, installment policies, and bank challan details are in the official Prospectus.',
    src: ['Downloads & Policies', 'downloads.html'],
    chips: ['Student Loans & Aid', 'Admissions Fall 2026', 'Contact Office']
  },
  {
    id: 'loan',
    keys: ['loan', 'loans', 'scholarship', 'scholarships', 'financial aid', 'nbp', 'meezan', 'peef', 'endowment', 'hec need based', 'wazifa', 'free education'],
    a: 'University of Swat offers generous financial assistance, including: 1) NBP Student Loan Scheme, 2) Meezan Bank Qarz-e-Hasna, 3) PEEF Scholarships, and 4) HEC Need-Based Scholarships. Students can apply through the Financial Aid Office.',
    src: ['Scholarships & Announcements', 'news.html#announcements'],
    chips: ['Fee Structure', 'Admissions Fall 2026', 'Downloads']
  },
  {
    id: 'departments',
    keys: ['department', 'departments', 'shobay', 'faculty list', 'blocks', 'academic block', 'which departments', 'programs offered', 'courses'],
    a: 'Teaching departments are organized across Academic Block A, B and C, Allied Health Sciences Building, and Hunerkada (Center of Excellence for Art and Culture). In total, UoS offers 58 undergraduate, 19 MS/MPhil, and 13 PhD programs.',
    src: ['Explore Departments', 'departments.html'],
    chips: ['DCST Computing', 'Campuses', 'Admissions Fall 2026']
  },
  {
    id: 'campuses',
    keys: ['campus', 'campuses', 'women campus', 'shangla', 'sub campus', 'main campus', 'branches'],
    a: 'The university has two active campuses: 1) The Main Campus at Charbagh, Swat (housing Academic Blocks and Administration), and 2) The Women Campus. A sub-campus in Shangla has also been part of the regional network.',
    src: ['About & Campuses', 'about.html#campuses'],
    chips: ['Main Campus Location', 'Departments List', 'Contact']
  },
  {
    id: 'location',
    keys: ['where', 'location', 'address', 'charbagh', 'main campus', 'how to reach', 'directions', 'map', 'kahan', 'swat valley'],
    a: 'The Main Academic Campus and the Central Administration Block are located on the main road at Charbagh, Swat, Khyber Pakhtunkhwa. It is easily reachable by public transport and dedicated university shuttle buses.',
    src: ['Campus Location & Map', 'contact.html'],
    chips: ['Transport Facilities', 'Hostels', 'Contact Office']
  },
  {
    id: 'hostel',
    keys: ['hostel', 'accommodation', 'stay', 'rooms', 'boarding', 'residence', 'rehaish'],
    a: 'Dedicated hostel accommodation is provided for both male and female out-of-district students at the Main Campus Charbagh. Hostels feature 24/7 security, dining, internet, and study halls. Apply via the Provost Office.',
    src: ['Campus Administration', 'contact.html#offices'],
    chips: ['Transport Facilities', 'Main Campus Location', 'Contact']
  },
  {
    id: 'transport',
    keys: ['transport', 'bus', 'point', 'route', 'routes', 'shuttle', 'van', 'points'],
    a: 'UoS operates student shuttle and point buses covering major routes across the Swat Valley: Mingora, Saidu Sharif, Barikot, Kabal, and Matta directly to the Main Campus Charbagh.',
    src: ['Contact & Facilities', 'contact.html'],
    chips: ['Main Campus Location', 'Hostels', 'Contact']
  },
  {
    id: 'vc',
    keys: ['vice chancellor', 'vc', 'who is the vc', 'husnul', 'amin', 'head of university', 'dean'],
    a: 'Prof. Dr. Husnul Amin is the Vice Chancellor of the University of Swat. Under his leadership, the university is expanding academic rigor, modern research centers, and digital campus infrastructure.',
    src: ['VC Message & Profile', 'index.html#vc'],
    chips: ['About University', 'Our History', 'DCST Programs']
  },
  {
    id: 'history',
    keys: ['history', 'established', 'founded', '2010', 'first vice chancellor', 'started', 'kab bani'],
    a: 'University of Swat was officially announced on 29 May 2010 and formally established in July 2010. Dr. Muhammad Farooq Khan (Shaheed) served as the founding Vice Chancellor. It began with 7 departments and has grown to over 9,200 students.',
    src: ['University History', 'about.html#history'],
    chips: ['About University', 'Departments List', 'Admissions Fall 2026']
  },
  {
    id: 'numbers',
    keys: ['how many', 'students', 'faculty members', 'programs', 'program', 'phd', 'ms', 'mphil', 'statistics', 'numbers', 'kitne'],
    a: 'Key Statistics: 2 Campuses • 58 Undergraduate Programs • 19 MS/MPhil Programs • 13 PhD Programs • 152 Faculty Members • 9,230+ Enrolled Students.',
    src: ['Home Statistics', 'index.html#stats'],
    chips: ['Departments List', 'Admissions Fall 2026', 'Research']
  },
  {
    id: 'portal',
    keys: ['cms', 'portal', 'login', 'student portal', 'sujris', 'e office', 'online services', 'lms', 'results'],
    a: 'Students and faculty can log in to the official UoS CMS Portal, SUJRIS, and e-Office via the "CMS Portal" button in the top navigation bar or through the Online Services menu.',
    src: ['CMS Portal Access', 'https://uswat.edu.pk/'],
    chips: ['Admissions Fall 2026', 'Examination', 'Contact']
  },
  {
    id: 'exam',
    keys: ['exam', 'exams', 'examination', 'controller', 'datesheet', 'date sheet', 'result', 'roll number', 'marksheet'],
    a: 'Examinations, date sheets, roll number slips, and transcripts are administered by the Office of the Controller of Examinations, located in the Administration Block, Main Campus Charbagh.',
    src: ['Offices & Administration', 'contact.html#offices'],
    chips: ['CMS Portal', 'Downloads & Policies', 'Contact']
  },
  {
    id: 'policy',
    keys: ['policy', 'policies', 'prospectus', 'rules', 'regulation', 'regulations', 'statutes', 'credit transfer', 'act', 'downloads'],
    a: 'Official downloads include the Admission Policy, Prospectus 2020-26, Credit Transfer Regulations, MS/PhD Guidelines 2022, and University of Swat Statutes 2025. All PDFs are free to download.',
    src: ['Downloads Repository', 'downloads.html'],
    chips: ['Admissions Fall 2026', 'Fee Structure', 'Merit Lists']
  },
  {
    id: 'contact',
    keys: ['contact', 'phone', 'email', 'mail', 'call', 'office hours', 'rabta', 'registrar', 'timing', 'timing kya hai', 'number'],
    a: 'Academics Office: academics@uswat.edu.pk • Main Campus: Charbagh, Swat, KP • Office Hours: 08:30 AM to 04:30 PM (Monday to Friday). You can also submit an inquiry directly via the Contact page form.',
    src: ['Contact & Inquiry Form', 'contact.html'],
    chips: ['Main Campus Location', 'Admissions Fall 2026', 'DCST Computing']
  },
  {
    id: 'hello',
    keys: ['hi', 'hello', 'salam', 'assalam', 'assalam-o-alaikum', 'aoa', 'hey', 'help', 'kese ho', 'kya hal hy'],
    a: 'Assalam-o-Alaikum! Welcome to University of Swat. I am your instant virtual campus assistant. Ask me about Admissions Fall 2026, DCST (BS AI/DS), Merit Lists, Fees, or Campus Locations.',
    src: null,
    chips: ['Admissions Fall 2026', 'Where is DCST?', 'Merit Lists', 'Fee Structure']
  }
];

window.UOS_FALLBACK = 'I could not locate exact information for your query in the official records. For personalized assistance, please contact the Academics Section at academics@uswat.edu.pk or visit the Administration Block, Main Campus Charbagh.';
window.UOS_SUGGEST = [
  '🎓 Admissions Fall 2026',
  '💻 Where is DCST?',
  '📊 Merit Lists',
  '💰 Fee Structure',
  '🏛️ Departments & Blocks',
  '📍 Main Campus Location',
  '📞 Contact & Offices'
];
