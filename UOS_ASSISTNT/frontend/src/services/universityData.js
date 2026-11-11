/**
 * University of Swat (UOS) Comprehensive Knowledge Base
 * Used for Gemini System Instruction and Instant Mock Responses
 */

export const UOS_SYSTEM_PROMPT = `
You are the official AI Assistant for the University of Swat (UOS), Khyber Pakhtunkhwa, Pakistan.
Your goal is to provide accurate, courteous, and well-structured information to students, applicants, faculty, and visitors.

Information about University of Swat (UOS):
- Established: 2010 by Government of Khyber Pakhtunkhwa.
- Main Campus: Charbagh, Swat, KP, Pakistan.
- Sub-campuses / Centers: Shangla Campus, Women Campus, Kanju Township, Odigram.
- Vice Chancellor: Prof. Dr. Hassan Sher (renowned botanist and researcher).
- Motto: "Seeking Knowledge is an Obligation" (Talab-ul-Ilm Farizatun).
- Official Website: https://www.uswat.edu.pk

Faculties and Departments:
1. Faculty of Chemical Sciences: Chemistry, Environmental Sciences.
2. Faculty of Life Sciences: Botany, Zoology, Biotechnology, Microbiology.
3. Faculty of Physical & Numerical Sciences: Computer Science, Software Engineering, Mathematics, Physics, Statistics.
4. Faculty of Management & Social Sciences: Business Administration (BBA/MBA), Economics, Commerce, Tourism & Hospitality Management.
5. Faculty of Arts & Humanities: English, Urdu, Law, Islamic Studies, Media & Communication Studies, Archaeology & Cultural Heritage.
6. Faculty of Education: Institute of Education & Research (IER).

Admissions:
- Programs offered: BS (4 years), MS/M.Phil (2 years), Ph.D.
- Intake: Fall (August-September) and Spring (January-February).
- Eligibility: Minimum 45% to 50% in Intermediate (HSSC) for BS; 2.5/4.0 CGPA or 50% for MS/M.Phil with departmental or GAT test.
- Required Documents: Matric & F.Sc DMCs/Certificates, CNIC/B-Form, Father's CNIC, Domicile Certificate, 4 passport photos.

Examination & Grading System:
- Semester System (16-18 weeks per semester).
- GPA / CGPA scale out of 4.00.
- Distribution: Midterm (30%), Final Exam (50%), Sessional (Quizzes, Assignments, Presentations 20%).
- Minimum passing marks in individual courses: 50% (Grade D or C depending on program).

Response Guidelines:
1. Always format responses with a clear bold topic heading (e.g. "### Admission Process").
2. Use clean markdown bullet points for readability.
3. Provide concise, helpful, and polite answers.
4. End with relevant official sources like "[University of Swat Official Prospectus]" or "[UOS Admissions Office]".
`;

export function getSystemPrompt(language = "auto") {
  let langInstruction = "";

  if (language === "roman_urdu" || language === "ur") {
    langInstruction = `
LANGUAGE REQUIREMENT (STRICT):
The user has chosen Roman Urdu.
- You MUST respond strictly in Roman Urdu (Urdu written in the English/Latin alphabet, e.g.: "University of Swat mein admission saal mein do dafa open hotay hain...").
- Keep technical terms (e.g., Computer Science, Intermediate, Merit List, CGPA, Voucher) in standard English words.
- Maintain a friendly, polite, and helpful tone.
`;
  } else if (language === "urdu") {
    langInstruction = `
LANGUAGE REQUIREMENT (STRICT):
The user has chosen Urdu (اردو).
- You MUST respond strictly in proper Urdu script (خالص اردو تحریر اور نستعلیق انداز میں).
- Use respectful, formal, and grammatically accurate Urdu (e.g. "سوات یونیورسٹی میں داخلے سال میں دو مرتبہ منعقد کیے جاتے ہیں...").
- Technical program names (BS Computer Science, BBA) can be kept with transliteration or English names.
`;
  } else if (language === "en") {
    langInstruction = `
LANGUAGE REQUIREMENT (STRICT):
The user has chosen English.
- You MUST respond in clear, formal, and helpful English.
`;
  } else {
    langInstruction = `
LANGUAGE REQUIREMENT (AUTO-DETECT):
- Automatically detect the language of the user's message.
- If the user writes in Roman Urdu (e.g., "dakhila kab shuru hoga?"), respond in clear Roman Urdu.
- If the user writes in Urdu script (اردو), respond in proper Urdu script.
- If the user writes in English, respond in English.
`;
  }

  return `${UOS_SYSTEM_PROMPT}\n${langInstruction}`;
}

export const MOCK_RESPONSES_UR = {
  admission: {
    title: "Admission ka Tareeqa (Admissions Process)",
    content: `University of Swat mein saal mein do martaba (Fall aur Spring) undergraduate (BS) aur postgraduate (MS/M.Phil, Ph.D) admissions open hotay hain.

* **Online Application:** University ke official portal admissions.uswat.edu.pk par account banayein.
* **Program Select Karein:** Apna pasandeeda department (maslan Computer Science, Software Engineering, BBA, Botany, English) muntakhab karein.
* **Documents Upload:** Matric aur F.Sc ke DMCs, CNIC/B-Form, aur Domicile ki attested copies upload karein.
* **Fee Challan:** Bank fee voucher download karke designated Allied Bank ya HBL branch mein jama karwayein.
* **Merit List & Interview:** Website par merit list check karein aur original documents ke sath interview ke liye hazir hon.`,
    sources: ["University of Swat Official Prospectus", "UOS Directorate of Admissions"]
  },
  departments: {
    title: "Academic Departments aur Faculties",
    content: `University of Swat mein mutaddid faculties 4-sala BS, MS aur Ph.D programs offer karti hain:

* **Computer Science & IT:** BS Computer Science, BS Software Engineering, BS Artificial Intelligence, MS CS.
* **Management & Social Sciences:** BBA (Hons), BS Economics, BS Tourism & Hospitality, BS Commerce.
* **Biological Sciences:** BS Botany, BS Zoology, BS Microbiology, BS Biotechnology.
* **Physical & Chemical Sciences:** BS Physics, BS Chemistry, BS Mathematics, BS Environmental Science.
* **Arts & Humanities:** BS English Literature, BS Law (LL.B 5-Year), BS Media Studies, BS Psychology.
* **Institutes:** Centre for Plant Sciences, Institute of Cultural Heritage & Archaeology.`,
    sources: ["UOS Academic Calendar", "Directorate of Academics"]
  },
  about: {
    title: "University of Swat ke Baray Mein",
    content: `**University of Swat (UOS)** ka qayam 2010 mein Swat aur Malakand Division ke talba ko aala tareen taleem faraham karne ke liye amal mein aya.

* **Main Campus:** Charbagh, Swat, Khyber Pakhtunkhwa mein waqia hai.
* **Sahuliyat:** Central Library, High-tech Computer Labs, Science Labs, Transport Network, Hostels aur Sports grounds.
* **Vice Chancellor:** Prof. Dr. Hassan Sher (Ma'roof Botanist aur Academician).
* **Official Website:** uswat.edu.pk`,
    sources: ["UOS Official Overview", "KP Higher Education Department"]
  },
  examination: {
    title: "Examination aur Grading System",
    content: `University of Swat HEC ke standard **Semester System** par amal paira hai:

* **Semester ki Muddat:** 16-18 haftay taleemi sargarmian aur 2 haftay imtehanat.
* **Marks Distribution:**
  * **Sessional (20%):** Quizzes, assignments, class presentations.
  * **Midterm Exam (30%):** 8vein ya 9vein haftay mein liya jata hai.
  * **Final Exam (50%):** Semester ke aakhir par comprehensive imtehan.
* **Grading Scale:** 4.00 CGPA scale. Graduation ke liye kam az kam 2.00 CGPA zaroori hai.`,
    sources: ["UOS Examination Regulations", "Controller of Examinations"]
  },
  documents: {
    title: "Admission ke Liye Zaroori Asnad (Documents)",
    content: `University of Swat mein dakhilay ke liye darj zail certified documents darkar hotay hain:

* **Taleemi Sanadaat:** SSC / Matric Certificate aur DMC.
* **Intermediate:** HSSC / F.Sc / FA / ICS Certificate aur DMC.
* **Shanakht:** Applicant ka CNIC ya B-Form aur Walid ka CNIC.
* **Domicile Certificate:** Swat / Malakand ya muta'alliqa quota.
* **Tasweerein:** 4 adad passport size photographs (blue/white background).
* **Character Certificate:** Pichlay idaray ke sarbarah ki janib se.`,
    sources: ["UOS Admissions Guideline", "Student Affairs Division"]
  }
};

export const MOCK_RESPONSES_URDU = {
  admission: {
    title: "داخلے کا طریقہ کار (Admission Process)",
    content: `سوات یونیورسٹی میں سال میں دو مرتبہ (خزاں اور بہار) انڈرگریجویٹ (BS) اور پوسٹ گریجویٹ (MS/M.Phil, Ph.D) پروگرامز کے داخلے منعقد ہوتے ہیں۔

* **آن لائن درخواست:** یونیورسٹی کے آفیشل پورٹل admissions.uswat.edu.pk پر جا کر اپنا اکاؤنٹ بنائیں۔
* **پروگرام کا انتخاب:** اپنے پسندیدہ شعبے (جیسے کمپیوٹر سائنس، سافٹ ویئر انجینئرنگ، بی بی اے، باٹنی وغیرہ) کا انتخاب کریں۔
* **دستاویزات اپلوڈ کریں:** میٹرک اور ایف ایس سی کے ڈی ایم سیز، شناختی کارڈ/ب-فارم، اور ڈومیسائل کی تصدیق شدہ کاپیاں اپلوڈ کریں۔
* **بینک فیس واؤچر:** فیس چالان ڈاؤن لوڈ کر کے الائیڈ بینک یا حبیب بینک کی مقررہ برانچ میں جمع کروائیں۔
* **میرٹ لسٹ اور انٹرویو:** ویب سائٹ پر میرٹ لسٹ چیک کریں اور اصل اسناد کے ساتھ انٹرویو کے لیے حاضر ہوں۔`,
    sources: ["سوات یونیورسٹی آفیشل پراسپیکٹس", "ڈائریکٹوریٹ آف ایڈمشنز"]
  },
  departments: {
    title: "تعلیمی شعبہ جات اور فیکلٹیز",
    content: `سوات یونیورسٹی متعدد فیکلٹیز کے تحت 4 سالہ بی ایس، ایم ایس اور پی ایچ ڈی پروگرامز پیش کرتی ہے:

* **کمپیوٹر سائنس اور آئی ٹی:** BS کمپیوٹر سائنس، BS سافٹ ویئر انجینئرنگ، BS مصنوعی ذہانت (AI)۔
* **مینجمنٹ اور سوشل سائنسز:** BBA (آنرز)، BS اکنامکس، BS ٹورازم اینڈ ہاسپیٹلٹی، BS کامرس۔
* **حیاتیاتی علوم:** BS باٹنی، BS زولوجی، BS مائیکرو بائیولوجی، BS بائیو ٹیکنالوجی۔
* **طبیعی و کیمیائی علوم:** BS فزکس، BS کیمسٹری، BS ریاضی، BS ماحولیاتی سائنس۔
* **آرٹس اور ہیومینٹیز:** BS انگلش، BS لاء (5 سالہ)، BS میڈیا اسٹڈیز، BS سائیکالوجی۔`,
    sources: ["سوات یونیورسٹی اکیڈمک کیلنڈر", "ڈائریکٹوریٹ آف اکیڈمکس"]
  },
  about: {
    title: "سوات یونیورسٹی کے بارے میں",
    content: `**یونیورسٹی آف سوات (UOS)** کا قیام 2010 میں وادی سوات اور ملاکنڈ ڈویژن کے نوجوانوں کو اعلیٰ معیار کی تعلیم فراہم کرنے کے لیے عمل میں لایا گیا۔

* **مرکزی کیمپس:** چارباغ، سوات، خیبر پختونخوا میں واقع ہے۔
* **سہولیات:** مرکزی لائبریری، جدید کمپیوٹر لیبز، سائنس ریسرچ لیبز، ٹرانسپورٹ نیٹ ورک، اور ہاسٹلز۔
* **وائس چانسلر:** پروفیسر ڈاکٹر حسن شیر (معروف باٹنسٹ اور محقق)۔
* **سرکاری ویب سائٹ:** uswat.edu.pk`,
    sources: ["سوات یونیورسٹی جائزہ", "محکمہ ہائر ایجوکیشن خیبر پختونخوا"]
  },
  examination: {
    title: "امتحانی اور گریڈنگ نظام",
    content: `سوات یونیورسٹی ہائر ایجوکیشن کمیشن (HEC) کے معیاری **سمسٹر سسٹم** پر عمل پیرا ہے:

* **سمسٹر کا دورانیہ:** 16 سے 18 ہفتے تدریسی سرگرمیاں اور 2 ہفتے امتحانات۔
* **نمبروں کی تقسیم:**
  * **سیشنل (20%):** کوئز، اسائنمنٹس، اور کلاس پریزنٹیشنز۔
  * **مڈٹرم امتحان (30%):** آٹھویں یا نویں ہفتے میں منعقد ہوتا ہے۔
  * **فائنل امتحان (50%):** سمسٹر کے اختتام پر جامع تحریری امتحان۔
* **گریجویشن کے لیے کم از کم 2.00 CGPA درکار ہے۔**`,
    sources: ["سوات یونیورسٹی امتحانی قواعد", "کنٹرولر آف ایگزامینیشنز"]
  },
  documents: {
    title: "داخلے کے لیے ضروری دستاویزات",
    content: `سوات یونیورسٹی میں داخلہ فارم کے ساتھ درج ذیل تصدیق شدہ دستاویزات درکار ہوتی ہیں:

* **تعلیمی اسناد:** میٹرک اور ایف ایس سی کی اسناد اور تفصیلی مارکس شیٹس (DMC)۔
* **شناخت:** طالب علم کا شناختی کارڈ یا ب-فارم اور والد کا شناختی کارڈ۔
* **ڈومیسائل:** سوات یا ملاکنڈ ڈومیسائل سرٹیفکیٹ۔
* **تصاویر:** 4 عدد پاسپورٹ سائز تصاویر (نیلے یا سفید پس منظر کے ساتھ)۔
* **کریکٹر سرٹیفکیٹ:** آخری تعلیمی ادارے کے سربراہ کی جانب سے جاری کردہ۔`,
    sources: ["داخلہ گائیڈ لائن", "ڈائریکٹوریٹ آف اسٹوڈنٹ افیئرز"]
  }
};

export const MOCK_RESPONSES = {
  admission: {
    title: "Admission Process",
    content: `University of Swat offers admissions twice a year for Fall and Spring semesters across various undergraduate (BS) and postgraduate (MS/M.Phil, Ph.D) disciplines.

* **Online Application:** Visit the official portal at admissions.uswat.edu.pk and register your account.
* **Select Program:** Choose your preferred department (e.g., Computer Science, Software Engineering, BBA, Botany, English).
* **Document Upload:** Upload scanned copies of your Matric & F.Sc DMCs, CNIC/B-Form, and Domicile.
* **Bank Fee Voucher:** Download and deposit the application processing fee at any designated Allied Bank / HBL branch.
* **Merit List & Interview:** Check merit lists on the website and appear for interview and verification of original documents.`,
    sources: ["University of Swat Official Prospectus", "UOS Directorate of Admissions"]
  },
  departments: {
    title: "Academic Departments & Faculties",
    content: `University of Swat comprises multiple faculties offering cutting-edge 4-year BS, MS, and Ph.D. degree programs:

* **Computer Science & IT:** BS Computer Science, BS Software Engineering, BS Artificial Intelligence, MS CS.
* **Management & Social Sciences:** BBA (Hons), BS Economics, BS Tourism & Hospitality, BS Commerce.
* **Biological Sciences:** BS Botany, BS Zoology, BS Microbiology, BS Biotechnology.
* **Physical & Chemical Sciences:** BS Physics, BS Chemistry, BS Mathematics, BS Environmental Science.
* **Arts & Humanities:** BS English Literature & Linguistics, BS Law (LL.B 5-Year), BS Media Studies, BS Psychology.
* **Institutes:** Centre for Plant Sciences and Biodiversity, Institute of Cultural Heritage & Archaeology.`,
    sources: ["UOS Academic Calendar", "Directorate of Academics"]
  },
  about: {
    title: "About University of Swat",
    content: `The **University of Swat (UOS)** was established in 2010 to provide quality higher education to the youth of the historic Swat valley and Malakand Division.

* **Vision:** To emerge as a premier seat of learning promoting research, cultural preservation, and socio-economic development.
* **Main Campus:** Situated at the scenic Charbagh, Swat, Khyber Pakhtunkhwa.
* **Facilities:** Central Library, High-tech Computer Labs, Science Research Labs, Transport Network across Swat, Hostels, and Sports grounds.
* **Chancellor:** Governor of Khyber Pakhtunkhwa.
* **Vice Chancellor:** Prof. Dr. Hassan Sher (Renowned Botanist and Academician).`,
    sources: ["UOS Official Overview", "KP Higher Education Department"]
  },
  examination: {
    title: "Examination & Grading System",
    content: `University of Swat follows the standard Higher Education Commission (HEC) **Semester System**:

* **Semester Duration:** 16-18 weeks of teaching plus 2 weeks for exams.
* **Evaluation Breakdown:**
  * **Sessional (20%):** Quizzes, assignments, class participation, and presentations.
  * **Midterm Exam (30%):** Conducted at the 8th or 9th week.
  * **Final Exam (50%):** Comprehensive examination at semester end.
* **Grading Scale:** 4.00 CGPA grading scale. Minimum CGPA required for graduation is 2.00 for BS and 2.50 for MS/M.Phil.`,
    sources: ["UOS Examination Regulations", "Controller of Examinations"]
  },
  documents: {
    title: "Required Documents for Admission",
    content: `To apply for admission at University of Swat, applicants must provide attested copies of the following documents:

* **Educational Certificates:** SSC / Matric Certificate & Detailed Marks Sheet (DMC).
* **Intermediate:** HSSC / F.Sc / FA / ICS Certificate & DMC.
* **Identification:** CNIC or Computerized B-Form of applicant and Father/Guardian CNIC.
* **Domicile:** Domicile Certificate (KP / Malakand / Swat or respective quota).
* **Photographs:** 4 recent passport-size photographs with blue/white background.
* **Character Certificate:** From the head of the last attended institution.
* **Equivalence Certificate:** For A-Level / O-Level / foreign qualifications from IBCC.`,
    sources: ["UOS Admissions Guideline", "Student Affairs Division"]
  }
};

export function getMockResponseByTopic(topic, language = "en") {
  if (language === "urdu") {
    return MOCK_RESPONSES_URDU[topic] || MOCK_RESPONSES[topic];
  }
  if (language === "roman_urdu" || language === "ur") {
    return MOCK_RESPONSES_UR[topic] || MOCK_RESPONSES[topic];
  }
  return MOCK_RESPONSES[topic];
}
