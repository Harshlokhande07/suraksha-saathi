import { LearnTopic } from '../types';

export const LEARN_TOPICS: LearnTopic[] = [
  {
    id: 'kyc',
    category: 'KYC & SIM Scams',
    title: {
      hi: '1. KYC एक्सपायरी और सिम ब्लॉक फ्रॉड',
      mr: '1. KYC मुदत संपणे व सिम ब्लॉक फसवणूक',
      en: '1. KYC Expiry & SIM Deactivation Scams'
    },
    summary: {
      hi: 'धोखेबाज आपको डराते हैं कि आपका बैंक खाता या मोबाइल सिम आज रात बंद हो जाएगा और फर्जी लिंक पर क्लिक करने को कहते हैं।',
      mr: 'भामटे तुम्हाला घाबरवतात की तुमचे बँक खाते किंवा सिम आज रात्री बंद होईल आणि बनावट लिंकवर क्लिक करण्यास सांगतात.',
      en: 'Scammers threaten that your bank account or SIM card will be deactivated tonight unless you click their link.'
    },
    fullGuide: {
      hi: 'धोखेबाज अक्सर ऐसा SMS भेजते हैं: "Dear Customer, your bank KYC is expired. Your account will be blocked tonight. Click here to update." जब आप उस लिंक पर क्लिक करते हैं, तो एक नकली बैंक वेबसाइट खुलती है जिसमें आपका यूजरनेम, पासवर्ड और OTP चुरा लिया जाता है। याद रखें: कोई भी बैंक कभी भी SMS में लिंक भेजकर KYC अपडेट करने को नहीं कहता। KYC हमेशा बैंक शाखा में जाकर या आधिकारिक ऐप से ही होता है।',
      mr: 'भामटे असा SMS पाठवतात की तुमचे KYC संपले आहे आणि खाते ब्लॉक होईल. त्या लिंकवर क्लिक केल्यावर बनावट बँक वेबसाईट उघडते आणि तुमचा पासवर्ड व OTP चोरला जातो. कोणतीही बँक SMS मधील लिंकवरून KYC करण्यास सांगत नाही.',
      en: 'Fraudsters send SMS claiming your KYC has expired and your account or SIM card will be blocked within hours. Clicking the link takes you to a fake phishing website that captures your banking passwords and OTP. Banks never ask for KYC updates via SMS links.'
    },
    audioScript: {
      hi: 'नमस्ते। यदि आपको ऐसा संदेश मिले जिसमें कहा गया हो कि आपका बैंक खाता या सिम कार्ड आज रात बंद हो जाएगा, तो बिल्कुल न घबराएं। यह एक आम धोखा है। किसी भी लिंक पर क्लिक न करें। बैंक कभी भी SMS में लिंक भेजकर KYC करने को नहीं कहता।',
      mr: 'नमस्कार. जर तुम्हाला असा संदेश आला की तुमचे बँक खाते किंवा सिम आज बंद होईल, तर अजिबात घाबरू नका. हा खोटा मेसेज आहे. कोणत्याही लिंकवर क्लिक करू नका. बँक कधीही SMS द्वारे KYC लिंक पाठवत नाही.',
      en: 'Hello. If you receive a message saying your bank account or SIM card will be suspended tonight, do not panic. This is a common scam. Never click any link in such SMS messages.'
    },
    redFlags: {
      hi: ['संदेश में "तुरंत", "आज रात बंद होगा", या "24 घंटे" जैसी जल्दबाजी।', 'अजीब लिंक जैसे sbi-kyc.cc या bit.ly का होना।', 'अज्ञात 10-अंकों के मोबाइल नंबर से आया संदेश।'],
      mr: ['मेसेजमध्ये "लगेच", "आज रात्री बंद होईल" अशी घाई करणे.', 'संशयास्पद लिंक जसे sbi-kyc.cc किंवा bit.ly असणे.', 'अनोळखी मोबाईल क्रमांकावरून आलेला मेसेज.'],
      en: ['Extreme urgency: "within 24 hours", "tonight at 9:30 PM".', 'Suspicious URL such as bit.ly or sbi-kyc.cc.', 'Sent from a personal 10-digit mobile number instead of official bank sender ID.']
    },
    goldenRules: {
      hi: ['SMS में आए किसी भी लिंक पर कभी क्लिक न करें।', 'संदेह होने पर अपनी बैंक शाखा में जाकर या पासबुक पर लिखे नंबर पर बात करें।'],
      mr: ['SMS मधील कोणत्याही लिंकवर कधीही क्लिक करू नका.', 'शंका असल्यास थेट आपल्या बँकेच्या शाखेत जाऊन चौकशी करा.'],
      en: ['Never click verification links sent in SMS messages.', 'Always visit your physical bank branch or dial the number printed on your passbook.']
    },
    quiz: {
      question: {
        hi: 'यदि आपको SMS आए कि "तुरंत KYC अपडेट करें वरना आपका खाता बंद हो जाएगा", तो आपको क्या करना चाहिए?',
        mr: 'जर तुम्हाला मेसेज आला की "लगेच KYC करा अन्यथा खाते बंद होईल", तर तुम्ही काय कराल?',
        en: 'If you receive an SMS saying "Update KYC immediately or account will be blocked", what should you do?'
      },
      options: {
        hi: ['SMS में दिए गए लिंक पर तुरंत क्लिक करेंगे', 'घबराकर अपना OTP और आधार नंबर डालेंगे', 'लिंक पर क्लिक नहीं करेंगे और सीधे अपने बैंक जाकर पूछेंगे'],
        mr: ['मेसेजमधील लिंकवर लगेच क्लिक करेन', 'घाबरून माझा OTP व आधार नंबर देईन', 'लिंकवर क्लिक करणार नाही आणि थेट बँकेत जाऊन खात्री करेन'],
        en: ['Click the link immediately in the SMS', 'Enter my OTP and Aadhaar card number', 'Ignore the link and verify directly with my official bank branch']
      },
      correctIndex: 2,
      explanation: {
        hi: 'शाबाश! बिल्कुल सही उत्तर। बैंक कभी SMS में लिंक भेजकर KYC नहीं कराता।',
        mr: 'छान! अगदी योग्य उत्तर. बँक कधीही SMS मधील लिंकवरून KYC करण्यास सांगत नाही.',
        en: 'Excellent! Exactly right. Banks never ask you to update KYC through SMS links.'
      }
    }
  },
  {
    id: 'otp',
    category: 'OTP & Password Security',
    title: {
      hi: '2. OTP और बैंक अधिकारी बनकर फर्जी कॉल',
      mr: '2. OTP आणि बँक अधिकारी बनून खोटे कॉल्स',
      en: '2. OTP Theft & Fake Bank Manager Calls'
    },
    summary: {
      hi: 'धोखेबाज बैंक मैनेजर बनकर फोन करता है और कहता है कि आपके खाते में समस्या है, समाधान के लिए फोन पर आया 6-अंकों का OTP बताएं।',
      mr: 'भामटा बँक मॅनेजर बनून कॉल करतो आणि खात्यात बिघाड असल्याचे सांगून फोनवर आलेला ६-अंकी OTP मागतो.',
      en: 'Scammers pretend to be your bank manager claiming your account has an error and demand your 6-digit OTP.'
    },
    fullGuide: {
      hi: 'OTP (One Time Password) आपके डिजिटल लॉकर की चाबी है। धोखेबाज बहुत आदरपूर्वक बात करते हैं और कहते हैं: "सर, आपके क्रेडिट कार्ड के रिवॉर्ड पॉइंट एक्सपायर हो रहे हैं" या "आपके खाते में संदिग्ध गतिविधि हुई है, हम इसे सुरक्षित कर रहे हैं, बस फोन पर आया कोड बता दीजिए।" जैसे ही आप OTP बताते हैं, वे आपके खाते से पैसे निकाल लेते हैं। याद रखें: असली बैंक कर्मचारी आपकी स्क्रीन पर आया OTP कभी नहीं मांगते!',
      mr: 'OTP ही तुमच्या तिजोरीची चावी आहे. भामटे अतिशय नम्रतेने बोलून स्वतःला बँक अधिकारी सांगतात आणि OTP मागतात. तुम्ही OTP सांगताच तुमच्या खात्यातून पैसे कट होतात. बँकेचे खरे कर्मचारी कधीही OTP मागत नाहीत!',
      en: 'An OTP is the final authorization key to your bank funds. Scammers speak very politely or create panic, asking for the code to "prevent an unauthorized transaction" or "credit reward points". Once you tell them the OTP, money is debited immediately. Banks never ask for OTP.'
    },
    audioScript: {
      hi: 'कृपया ध्यान दें: OTP यानी वन टाइम पासवर्ड आपकी तिजोरी की चाबी है। कोई भी व्यक्ति, चाहे वह खुद को बैंक का बड़ा अधिकारी ही क्यों न कहे, उसे कभी भी अपना OTP न बताएं। OTP बताने का मतलब है अपने हाथों से पैसे दे देना।',
      mr: 'कृपया लक्ष द्या: OTP हा तुमच्या तिजोरीची चावी आहे. कोणतीही व्यक्ती स्वतःला बँक मॅनेजर म्हणत असली तरी तिला कधीही OTP सांगू नका. OTP देणे म्हणजे स्वतःच्या हाताने पैसे देणे होय.',
      en: 'Please listen carefully: An OTP is the key to your bank safe. Never share your OTP with anyone over the phone, even if they claim to be a high-ranking bank manager.'
    },
    redFlags: {
      hi: ['फोन पर कॉलर का OTP या पासवर्ड मांगना।', 'कॉल पर बैकग्राउंड में बैंक जैसी आवाजें निकालना ताकि आपको सच लगे।', '"अगर अभी OTP नहीं दिया तो भारी पेनल्टी लगेगी" जैसी धमकी।'],
      mr: ['फोनवर OTP किंवा पासवर्ड मागणे.', 'कॉल दरम्यान भीती दाखवणे किंवा दंडाची धमकी देणे.', '"आत्ताच कोड सांगा नाहीतर पैसे कापले जातील" असे म्हणणे.'],
      en: ['Caller demanding your 6-digit SMS OTP.', 'Threatening that penalties will be levied if OTP is not provided instantly.', 'Caller asking for your ATM card CVV or expiry date.']
    },
    goldenRules: {
      hi: ['अपना OTP अपने जीवनसाथी या बच्चों के अलावा किसी को न बताएं।', 'यदि कोई फोन पर OTP मांगे, तो तुरंत कॉल काट दें।'],
      mr: ['आपला OTP कोणाशीही शेअर करू नका.', 'फोनवर कोणी OTP मागितल्यास तात्काळ फोन कट करा.'],
      en: ['Never share your OTP with any caller under any circumstance.', 'If anyone asks for your OTP on call, disconnect immediately.']
    },
    quiz: {
      question: {
        hi: 'यदि किसी फोन कॉल पर व्यक्ति कहे कि वह बैंक का मुख्य अधिकारी है और आपका खाता बचाने के लिए OTP मांग रहा है, तो आप क्या करेंगे?',
        mr: 'जर कोणी कॉलवर बँक अधिकारी असल्याचे सांगून खात्याच्या सुरक्षेसाठी OTP मागितला, तर तुम्ही काय कराल?',
        en: 'If a caller claims to be your bank manager and asks for your OTP to protect your account, what will you do?'
      },
      options: {
        hi: ['तुरंत OTP बता देंगे क्योंकि वह बैंक अधिकारी है', 'कॉल काट देंगे और किसी को भी OTP नहीं बताएंगे', 'अपने दोस्तों से पूछकर बताएंगे'],
        mr: ['लगेच OTP सांगेन कारण तो बँक अधिकारी आहे', 'फोन कट करेन आणि कोणालाही OTP सांगणार नाही', 'मित्रांना विचारून सांगेन'],
        en: ['Share the OTP immediately because he is the manager', 'Disconnect the call and never share the OTP with anyone', 'Wait on call and consult friends']
      },
      correctIndex: 1,
      explanation: {
        hi: 'अति उत्तम! असली बैंक कर्मचारी कभी भी फोन पर OTP नहीं मांगते। कॉल तुरंत काटना ही सबसे सुरक्षित कदम है।',
        mr: 'फार छान! बँकेचे खरे कर्मचारी कधीही OTP मागत नाहीत. फोन कापणे हाच सर्वोत्तम निर्णय आहे.',
        en: 'Spot on! Real bank employees NEVER ask for OTP over the phone. Disconnecting is the safest response.'
      }
    }
  },
  {
    id: 'lottery',
    category: 'Lottery & Prize Scams',
    title: {
      hi: '3. लॉटरी, KBC और 25 लाख के ईनाम का लालच',
      mr: '3. लॉटरी, KBC आणि २५ लाखांच्या बक्षिसाचे आमिष',
      en: '3. Lottery, KBC & Prize Money Fraud'
    },
    summary: {
      hi: 'WhatsApp पर अमिताभ बच्चन या KBC की फोटो लगाकर संदेश आता है कि आपने 25 लाख जीते हैं, लेकिन ईनाम पाने के लिए पहले 15,000 रु. टैक्स जमा करें।',
      mr: 'WhatsApp वर KBC किंवा अमिताभ बच्चन यांचा फोटो लावून २५ लाख जिंकल्याचा खोटा संदेश येतो आणि बक्षीस मिळवण्यासाठी कर भरण्यास सांगतात.',
      en: 'WhatsApp messages promising Rs. 25 Lakh KBC lottery winnings, asking for an upfront processing fee or GST tax.'
    },
    fullGuide: {
      hi: 'यह सबसे पुराना और खतरनाक ऑनलाइन जाल है। आपको एक ऑडियो संदेश या पोस्टर भेजा जाता है जिसमें कहा जाता है: "बधाई हो! आपके सिम कार्ड नंबर ने कौन बनेगा करोड़पति में 25 लाख जीते हैं।" जब आप उस नंबर पर कॉल करते हैं, तो वे कहते हैं कि 25 लाख आपके खाते में भेजने के लिए आपको 15,000 या 25,000 रुपये का सरकारी टैक्स या फाइल चार्ज पहले जमा करना होगा। जैसे ही आप पैसे भेजते हैं, वे फोन बंद कर लेते हैं। याद रखें: जब आपने कोई लॉटरी टिकट खरीदा ही नहीं, तो आप जीत कैसे सकते हैं?',
      mr: 'हा एक अत्यंत जुना सापळा आहे. तुम्हाला संदेश येतो की तुम्ही २५ लाखांची लॉटरी जिंकली आहे, पण पैसे खात्यात येण्यासाठी १५,००० रुपये प्रक्रिया शुल्क भरावे लागेल. तुम्ही पैसे पाठवताच ते फोन बंद करतात. जेव्हा तुम्ही कोणतीही लॉटरी खरेदी केलीच नाही, तर जिंकणार कशी?',
      en: 'Fraudsters send fake letters or WhatsApp audio recordings bearing official-looking logos of Kaun Banega Crorepati (KBC) or government bodies claiming you won Rs 25 Lakhs. They ask you to deposit a "clearance tax" or "file processing fee". No genuine prize requires advance payment. If you did not enter a contest, you cannot win!'
    },
    audioScript: {
      hi: 'सुनिए: यदि आपको WhatsApp पर कोई कहे कि आपने 25 लाख की लॉटरी जीती है और ईनाम पाने के लिए पहले कुछ पैसे जमा करने होंगे, तो समझ जाइए कि यह 100% धोखा है। बिना कोई लॉटरी खरीदे कभी कोई ईनाम नहीं मिलता। कभी किसी अनजान व्यक्ति को पैसे न भेजें।',
      mr: 'ऐका: जर तुम्हाला WhatsApp वर संदेश आला की तुम्ही २५ लाखांची लॉटरी जिंकली आहे आणि पैसे मिळवण्यासाठी आधी काही रक्कम भरावी लागेल, तर समजून जा हा १००% घोटाळा आहे. अनोळखी व्यक्तीला पैसे पाठवू नका.',
      en: 'Listen closely: If anyone messages you that you have won a 25 Lakh lottery and asks for an advance fee to release it, it is a 100% scam. You cannot win a lottery you never bought.'
    },
    redFlags: {
      hi: ['अमिताभ बच्चन या प्रधानमंत्री की फोटो वाले अनधिकृत पोस्टर।', 'ईनाम देने से पहले "टैक्स", "GST" या "फाइल चार्ज" की मांग।', 'संदेश में कई व्याकरण और स्पेलिंग की गलतियां।'],
      mr: ['अमिताभ बच्चन किंवा पंतप्रधानांचे खोटे फोटो असलेले पोस्टर्स.', 'बक्षीस देण्यापूर्वी "टॅक्स" किंवा "फाइल फी" ची मागणी.', 'मेसेजमध्ये व्याकरणाच्या अनेक चुका.'],
      en: ['Unofficial flyers featuring celebrities or national emblems.', 'Demands for upfront "GST", "processing fee", or "customs duty".', 'Poor grammar and urgent instructions to contact a personal mobile number.']
    },
    goldenRules: {
      hi: ['बिना टिकट खरीदे कोई लॉटरी नहीं जीती जा सकती।', 'ईनाम पाने के लिए कभी कोई अग्रिम पैसा न भेजें।'],
      mr: ['तिकीट खरेदी केल्याशिवाय कोणतीही लॉटरी जिंकता येत नाही.', 'बक्षीस मिळवण्यासाठी कधीही आधी पैसे पाठवू नका.'],
      en: ['No genuine lottery asks for money to give you prize money.', 'Never send advance money to claim gifts, cars, or cash.']
    },
    quiz: {
      question: {
        hi: 'एक WhatsApp संदेश में लिखा है कि आपने 25 लाख जीते हैं, ईनाम पाने के लिए 5,000 रु. रजिस्ट्रेशन फीस भेजें। सही निर्णय क्या है?',
        mr: 'WhatsApp मेसेजमध्ये लिहिले आहे की तुम्ही २५ लाख जिंकले आहेत, बक्षीसासाठी ५,००० रुपये नोंदणी फी पाठवा. योग्य निर्णय कोणता?',
        en: 'A WhatsApp message claims you won Rs. 25 Lakhs and asks for Rs. 5,000 registration fee. What is the right decision?'
      },
      options: {
        hi: ['तुरंत 5,000 रुपये भेज देंगे ताकि 25 लाख मिल जाएं', 'यह धोखाधड़ी है, पैसे नहीं भेजेंगे और नंबर ब्लॉक करेंगे', 'परिवार से पैसे उधार लेकर भेजेंगे'],
        mr: ['लगेच ५,००० रुपये पाठवेन जेणेकरून २५ लाख मिळतील', 'हा निव्वळ घोटाळा आहे, पैसे पाठवणार नाही व नंबर ब्लॉक करेन', 'मित्रांकडून पैसे उसने घेऊन पाठवेन'],
        en: ['Send Rs. 5,000 immediately to receive the 25 Lakhs', 'It is a scam: send zero money and block the contact', 'Borrow money and transfer it']
      },
      correctIndex: 1,
      explanation: {
        hi: 'बहुत बढ़िया! असली ईनामों में कभी पहले पैसे नहीं मांगे जाते। यह शत-प्रतिशत धोखाधड़ी है।',
        mr: 'फार छान! खऱ्या बक्षिसांसाठी आधी पैसे मागत नाहीत. हा निव्वळ खोटेपणा आहे.',
        en: 'Correct! Real lotteries never ask for advance payments. Blocking and reporting is the right step.'
      }
    }
  },
  {
    id: 'digital-arrest',
    category: 'Fake Police & Digital Arrest',
    title: {
      hi: '4. फर्जी पुलिस कॉल और "डिजिटल अरेस्ट" का डर',
      mr: '4. बनावट पोलीस कॉल आणि "डिजिटल अरेस्ट" ची भीती',
      en: '4. Fake Police / CBI & "Digital Arrest" Scams'
    },
    summary: {
      hi: 'धोखेबाज पुलिस या CBI की वर्दी पहनकर वीडियो कॉल करते हैं और कहते हैं कि आपके नाम पर ड्रग्स का पार्सल पकड़ा गया है, आपको डिजिटल अरेस्ट किया जाता है।',
      mr: 'भामटे पोलीस किंवा सीबीआयच्या गणवेशात व्हिडिओ कॉल करतात आणि बेकायदेशीर पार्सल सापडल्याचे सांगून डिजिटल अरेस्टची धमकी देतात.',
      en: 'Fraudsters impersonating police or CBI officers via video call claiming an illegal parcel in your name and threatening "digital arrest".'
    },
    fullGuide: {
      hi: 'हाल के महीनों में वरिष्ठ नागरिकों को सबसे ज्यादा इस चाल से लूटा गया है। एक कॉल आती है: "हम फेडेक्स/कस्टम्स विभाग से बोल रहे हैं, ताइवान जा रहे आपके पार्सल में 5 पासपोर्ट और ड्रग्स मिले हैं।" फिर वे कॉल को एक फर्जी पुलिस स्टेशन या CBI अफसर को ट्रांसफर करते हैं। वे वीडियो कॉल पर पुलिस की वर्दी पहनकर बैठते हैं और कहते हैं: "सुप्रीम कोर्ट का वारंट है, आपको डिजिटल अरेस्ट किया गया है। अपनी बेगुनाही साबित करने के लिए अपने सारे बैंक पैसे RBI के इस सुरक्षा खाते में ट्रांसफर कीजिए, जांच के बाद लौटा दिए जाएंगे।" याद रखें: भारतीय कानून में "डिजिटल अरेस्ट" नाम की कोई चीज नहीं होती! पुलिस कभी वीडियो कॉल पर पैसे नहीं मांगती।',
      mr: 'अलिकडे ज्येष्ठांना घाबरवण्यासाठी ही नवी युक्ती वापरली जाते. भामटे व्हिडिओ कॉलवर पोलिसांच्या वेशात बसतात आणि म्हणतात की तुमच्या नावावर अमली पदार्थांचे पार्सल सापडले आहे. ते डिजिटल अरेस्टची धमकी देऊन सर्व पैसे सरकारी खात्यात भरण्यास सांगतात. लक्षात ठेवा: भारतीय कायद्यात "डिजिटल अरेस्ट" नावाची कोणतीही कायदेशीर तरतूद नाही!',
      en: 'This is one of the most psychological scams targeting elders. Scammers call alleging an illegal parcel containing contraband was booked in your name. They transfer the call to fake officers wearing police uniforms on Skype or WhatsApp. They claim you are under "Digital Arrest" and order you to transfer your lifetime savings to a "verification account" for clearing your name. In Indian law, THERE IS NO SUCH THING AS DIGITAL ARREST. Law enforcement never asks you to transfer money.'
    },
    audioScript: {
      hi: 'ध्यान से सुनिए: यदि कोई फोन पर कहे कि वह पुलिस या CBI से है और आपके खिलाफ वारंट निकला है या आपको डिजिटल अरेस्ट किया गया है, तो बिल्कुल मत डरिए। कानून में डिजिटल अरेस्ट जैसी कोई चीज नहीं होती। पुलिस कभी वीडियो कॉल पर जांच नहीं करती और न ही पैसे ट्रांसफर करने को कहती है। तुरंत फोन काटें और अपने परिवार को बताएं।',
      mr: 'काळजीपूर्वक ऐका: जर कोणी स्वतःला पोलीस किंवा सीबीआय अधिकारी सांगून डिजिटल अरेस्टची धमकी दिली, तर अजिबात घाबरू नका. कायद्यात डिजिटल अरेस्ट अस्तित्वातच नाही. पोलीस कधीही पैसे मागत नाहीत. त्वरित कॉल बंद करा.',
      en: 'Important advice: If anyone calls claiming to be from the Police or CBI threatening "digital arrest", do not panic. Digital arrest does not exist under Indian law. Real police never demand bank transfers over video calls.'
    },
    redFlags: {
      hi: ['WhatsApp या Skype पर वर्दी पहनकर वीडियो कॉल करना।', '"डिजिटल अरेस्ट", "सुप्रीम कोर्ट सीक्रेट वेरिफिकेशन" जैसे भारी शब्दों का इस्तेमाल।', 'जांच के नाम पर बैंक बैलेंस को किसी दूसरे खाते में ट्रांसफर करने का आदेश।'],
      mr: ['WhatsApp किंवा Skype वर गणवेश घालून व्हिडिओ कॉल करणे.', '"डिजिटल अरेस्ट" किंवा "गुप्त तपास" अशा शब्दांचा वापर.', 'तपासाच्या नावाखाली पैसे दुसऱ्या खात्यात ट्रान्सफर करण्याचे फर्मान.'],
      en: ['Video calls on WhatsApp or Skype showing an official-looking police desk.', 'Use of terms like "Digital Arrest" or "Confidential National Investigation".', 'Demand to liquidate fixed deposits and transfer funds to a "secure RBI account".']
    },
    goldenRules: {
      hi: ['भारतीय कानून में "डिजिटल अरेस्ट" का कोई अस्तित्व नहीं है।', 'पुलिस कभी भी पैसे ट्रांसफर करने को नहीं कहती। तुरंत 1930 पर शिकायत करें।'],
      mr: ['भारतीय कायद्यात "डिजिटल अरेस्ट" अस्तित्वात नाही.', 'पोलीस कधीही पैसे ट्रान्सफर करण्यास सांगत नाहीत. लगेच १९३० वर तक्रार करा.'],
      en: ['Digital arrest is completely fictitious.', 'Law enforcement never demands money transfers. Hang up and dial 1930 immediately.']
    },
    quiz: {
      question: {
        hi: 'एक व्यक्ति पुलिस की वर्दी में वीडियो कॉल करके कहता है कि आपका बैंक बैलेंस जांच के लिए ट्रांसफर करना होगा, वरना अरेस्ट हो जाएंगे। क्या करेंगे?',
        mr: 'एका व्यक्तीने पोलिसांच्या वेशात कॉल करून तपासणीसाठी पैसे ट्रान्सफर करण्यास सांगितले, अन्यथा अटक करण्याची धमकी दिली. काय कराल?',
        en: 'A caller in police uniform demands you transfer your bank balance for "verification" to avoid arrest. What should you do?'
      },
      options: {
        hi: ['डरकर सारे पैसे ट्रांसफर कर देंगे', 'तुरंत कॉल काटेंगे, यह फर्जी डिजिटल अरेस्ट फ्रॉड है, और 1930 पर सूचना देंगे', 'उन्हें घर आने का निमंत्रण देंगे'],
        mr: ['घाबरून सर्व पैसे ट्रान्सफर करेन', 'लगेच फोन कट करेन, हा खोटा डिजिटल अरेस्ट घोटाळा आहे आणि १९३० वर कळवेन', 'त्यांना घरी बोलावून चहा देईन'],
        en: ['Transfer the money out of fear', 'Hang up immediately, recognize it as a Digital Arrest scam, and report to 1930', 'Give them home address']
      },
      correctIndex: 1,
      explanation: {
        hi: 'सटीक उत्तर! पुलिस कभी फोन पर पैसे ट्रांसफर नहीं करवाती। किसी भी धमकी से डरकर पैसे न भेजें।',
        mr: 'अगदी बरोबर! पोलीस कधीही फोनवर पैसे मागत नाहीत. घाबरून पैसे पाठवू नका.',
        en: 'Perfect! Real police officers never ask citizens to transfer funds over the phone or internet.'
      }
    }
  },
  {
    id: 'upi',
    category: 'UPI & QR Code Frauds',
    title: {
      hi: '5. UPI और QR कोड से पैसे हड़पने की चाल',
      mr: '5. UPI आणि QR कोडद्वारे पैसे लाटण्याची युक्ती',
      en: '5. UPI QR Code & Payment Collect Frauds'
    },
    summary: {
      hi: 'सामान खरीदने वाला धोखेबाज कहता है कि "पैसे प्राप्त करने के लिए यह QR कोड स्कैन करें और अपना UPI PIN डालें।"',
      mr: 'खरेदीदार बनलेला भामटा सांगतो की "पैसे मिळवण्यासाठी हा QR कोड स्कॅन करा आणि आपला UPI PIN टाका."',
      en: 'A buyer asks you to scan a QR code or approve a collect request claiming it will credit money into your account.'
    },
    fullGuide: {
      hi: 'यह धोखाधड़ी अक्सर OLX पर पुराना सामान बेचते समय या किरायेदार ढूंढते समय होती है। धोखेबाज कहता है: "मैं आपके खाते में 5000 रुपये भेज रहा हूं, आप बस यह QR कोड स्कैन करके अपना UPI PIN डाल दीजिए।" जैसे ही आप PIN डालते हैं, आपके खाते से 5000 रुपये कट जाते हैं! हमेशा याद रखें: दुनिया का सबसे बड़ा नियम यह है कि पैसे प्राप्त करने (Receive) के लिए कभी भी PIN डालने की जरूरत नहीं होती। PIN केवल पैसे भेजने (Send) के लिए ही डाला जाता है।',
      mr: 'हा प्रकार जुने सामान विकताना किंवा भाडेकरू शोधताना होतो. भामटा म्हणतो की मी पैसे पाठवत आहे, तुम्ही फक्त QR स्कॅन करून UPI PIN टाका. तुम्ही PIN टाकताच खात्यातून पैसे जातात! एक सुवर्णनियम लक्षात ठेवा: पैसे मिळवण्यासाठी कधीही PIN टाकावा लागत नाही. PIN फक्त पैसे पाठवण्यासाठीच लागतो.',
      en: 'Common in online marketplaces like OLX or rental listings. The fraudster claims to send you money or an advance token, asking you to "scan this QR code and enter your UPI PIN to receive the cash". Entering your PIN instantly debits your bank account. Remember the universal golden rule: UPI PIN is ONLY entered to SEND money, NEVER to receive money!'
    },
    audioScript: {
      hi: 'डिजिटल बैंकिंग का सबसे महत्वपूर्ण नियम हमेशा याद रखें: पैसे प्राप्त करने के लिए कभी भी UPI PIN डालने की आवश्यकता नहीं होती। PIN केवल तभी डाला जाता है जब आप किसी को पैसे भेज रहे हों। यदि कोई पैसे देने के लिए PIN डालने को कहे, तो वह सीधा धोखा है।',
      mr: 'डिजिटल बँकिंगचा सर्वात महत्त्वाचा नियम लक्षात ठेवा: पैसे मिळवण्यासाठी कधीही UPI PIN टाकण्याची गरज नसते. PIN फक्त पैसे पाठवतानाच लागतो.',
      en: 'Remember the golden rule of digital payments: You NEVER enter your UPI PIN to receive money. PIN is entered strictly to debit and send money.'
    },
    redFlags: {
      hi: ['पैसे प्राप्त करने के लिए QR कोड स्कैन करने का दबाव।', 'UPI ऐप में "Collect Request" या "Pay" का बटन आना।', '"पैसे पाने के लिए अपना गुप्त PIN दर्ज करें" कहना।'],
      mr: ['पैसे मिळवण्यासाठी QR कोड स्कॅन करण्याचा आग्रह.', 'UPI ॲपमध्ये "Collect Request" किंवा "Pay" चे बटण दिसणे.', '"पैसे मिळवण्यासाठी गुप्त PIN टाका" असे सांगणे.'],
      en: ['Being told to scan a QR code to receive money.', 'Receiving a "Collect Request" notification instead of a credit alert.', 'Instructions to enter your secret PIN to receive cashback or payment.']
    },
    goldenRules: {
      hi: ['पैसे पाने के लिए कभी PIN न डालें।', 'अज्ञात लोगों से आए पेमेंट रिक्वेस्ट को हमेशा Decline (अस्वीकार) करें।'],
      mr: ['पैसे मिळवण्यासाठी कधीही PIN टाकू नका.', 'अनोळखी व्यक्तींकडून आलेली पेमेंट विनंती नेहमी Decline (नाकारा).'],
      en: ['UPI PIN is strictly for sending money.', 'Always decline unknown payment collect requests.']
    },
    quiz: {
      question: {
        hi: 'एक व्यक्ति कहता है: "मैंने आपको 2,000 रु. भेजे हैं, पैसे प्राप्त करने के लिए अपना 4-अंकों का UPI PIN डालें।" क्या आप PIN डालेंगे?',
        mr: 'एक व्यक्ती म्हणते: "मी तुम्हाला २,००० रुपये पाठवले आहेत, पैसे जमा होण्यासाठी तुमचा ४-अंकी UPI PIN टाका." तुम्ही PIN टाकाल का?',
        en: 'A person says: "I sent you Rs. 2,000. Enter your 4-digit UPI PIN to receive it into your bank." Will you enter your PIN?'
      },
      options: {
        hi: ['हां, PIN डालने से ही पैसे आते हैं', 'बिल्कुल नहीं! पैसे पाने के लिए कभी PIN नहीं डाला जाता, यह फ्रॉड है', 'पहले आधा PIN डालेंगे'],
        mr: ['होय, PIN टाकल्याशिवाय पैसे येत नाहीत', 'मुळीच नाही! पैसे मिळवण्यासाठी कधीही PIN लागत नाही, ही फसवणूक आहे', 'अगोदर २ अंक टाकेन'],
        en: ['Yes, entering PIN is necessary to receive payment', 'ABSOLUTELY NOT! PIN is never required to receive money, this is fraud', 'Enter half the PIN']
      },
      correctIndex: 1,
      explanation: {
        hi: 'अद्भुत! यह डिजिटल सुरक्षा का सबसे बड़ा नियम है। पैसे पाने के लिए कभी PIN नहीं लगता।',
        mr: 'उत्तम! हा डिजिटल सुरक्षेचा सर्वात मोठा नियम आहे. पैसे मिळवण्यासाठी कधीही PIN लागत नाही.',
        en: 'Outstanding! Never forget this golden rule: PIN is strictly for sending money.'
      }
    }
  },
  {
    id: 'electricity',
    category: 'Utility & Electricity Scams',
    title: {
      hi: '6. बिजली बिल काटने की धमकी वाला फर्जी SMS',
      mr: '6. वीज बिल कापण्याची धमकी देणारा खोटा SMS',
      en: '6. Electricity Bill Disconnection Threats'
    },
    summary: {
      hi: 'शाम के समय संदेश आता है कि आपका पिछला बिल जमा नहीं हुआ है, आज रात 9:30 बजे बिजली काट दी जाएगी, तुरंत दिए गए नंबर पर संपर्क करें।',
      mr: 'संध्याकाळी मेसेज येतो की मागील बिल भरले नाही, आज रात्री ९:३० वाजता वीज खंडित केली जाईल, दिलेल्या नंबरवर संपर्क करा.',
      en: 'Evening SMS warning that your power will be disconnected at 9:30 PM tonight due to unpaid bill unless you call a personal number.'
    },
    fullGuide: {
      hi: 'बिजली कंपनियां कभी भी व्यक्तिगत 10-अंकों के मोबाइल नंबर से ऐसा SMS नहीं भेजतीं जिसमें रात में बिजली काटने की धमकी हो। जब आप डरकर उस नंबर पर कॉल करते हैं, तो वे कहते हैं: "सर, सिस्टम में आपका बिल अटका है, बस 10 रुपये का अपडेट चार्ज भेजिए या हमारे बताए अनुसार AnyDesk ऐप डाउनलोड कीजिए।" जैसे ही आप ऐप डालते हैं या उनके फर्जी लिंक पर कार्ड डालते हैं, आपका खाता खाली हो जाता है। हमेशा अपने बिजली बिल की रसीद या आधिकारिक डिस्कॉम ऐप/वेबसाइट पर ही जांच करें।',
      mr: 'वीज वितरण कंपन्या कधीही वैयक्तिक मोबाईल क्रमांकावरून रात्री वीज कापण्याची धमकी देत नाहीत. फोन केल्यावर ते १० रुपये भरण्यास किंवा AnyDesk ॲप डाऊनलोड करण्यास सांगतात आणि बँक खाते रिकामे करतात. नेहमी अधिकृत बिलावर किंवा वीज कंपनीच्या केंद्रात जाऊन खात्री करा.',
      en: 'Power distribution utilities never send disconnection threats from personal 10-digit phone numbers demanding urgent calls to a "Power Officer". Scammers ask you to pay a nominal Rs 10 fee via a malicious link or install remote access apps like AnyDesk, draining your bank balance. Always verify utility bills via official counters or your consumer portal.'
    },
    audioScript: {
      hi: 'सावधान रहें: यदि आपको बिजली का बिल जमा न होने और आज रात बिजली कटने का संदेश मिले, तो दिए गए किसी भी मोबाइल नंबर पर कॉल न करें। यह एक जाना-माना घोटाला है। अपने पुराने बिल की रसीद देखें या अगले दिन सुबह बिजली विभाग के कार्यालय जाकर पता करें।',
      mr: 'सावधान राहा: जर तुम्हाला वीज बिल थकल्याने आज रात्री वीज कापण्याचा संदेश आला, तर त्या नंबरवर कॉल करू नका. हा जुना घोटाळा आहे. वीज कार्यालयात प्रत्यक्ष जाऊन खात्री करा.',
      en: 'Stay alert: Messages threatening immediate power disconnection at 9:30 PM are fake utility scams. Never call numbers provided in such SMS.'
    },
    redFlags: {
      hi: ['व्यक्तिगत 10-अंकों के नंबर से आया संदेश (जैसे 98xxxxxxxx)।', '"आज रात 9:30 बजे बिजली कट जाएगी" जैसी समय सीमा।', 'किसी अधिकारी (जैसे "Electricity Officer Sharma") का नाम और नंबर।'],
      mr: ['वैयक्तिक १०-अंकी मोबाईल नंबरवरून आलेला मेसेज.', '"आज रात्री ९:३० वाजता वीज बंद होईल" अशी धमकी.', 'अनोळखी अधिकाऱ्याचा नंबर देऊन कॉल करण्याचा आग्रह.'],
      en: ['Sent from a standard 10-digit mobile number instead of an official utility SMS header.', 'Urgent deadline like "tonight at 9:30 PM".', 'Instructions to call a personal "Power Officer" number.']
    },
    goldenRules: {
      hi: ['SMS में दिए नंबर पर कभी कॉल न करें।', 'बिजली बिल हमेशा आधिकारिक काउंटर या आधिकारिक सरकारी ऐप पर ही भरें।'],
      mr: ['मेसेजमधील नंबरवर कधीही कॉल करू नका.', 'वीज बिल नेहमी अधिकृत केंद्र किंवा अधिकृत ॲपवरूनच भरा.'],
      en: ['Never dial telephone numbers mentioned in threatening utility SMS.', 'Always verify and pay electricity bills through official distribution portals.']
    },
    quiz: {
      question: {
        hi: 'शाम को 8 बजे SMS आया: "पिछला बिल न भरने के कारण आज रात 9:30 बजे बिजली काट दी जाएगी, तुरंत 9876543210 पर कॉल करें।" आप क्या करेंगे?',
        mr: 'संध्याकाळी ८ वाजता मेसेज आला: "बिल न भरल्याने आज रात्री ९:३० वाजता वीज खंडित होईल, ९८७६५४३२१० वर त्वरित कॉल करा." काय कराल?',
        en: 'At 8 PM you get an SMS: "Power will be cut at 9:30 PM tonight for unpaid bill, call 9876543210 immediately." What will you do?'
      },
      options: {
        hi: ['तुरंत उस नंबर पर फोन करके 10 रुपये भेज देंगे', 'उस नंबर पर बिल्कुल कॉल नहीं करेंगे, क्योंकि यह फर्जी बिजली बिल फ्रॉड है', 'घर के सारे बल्ब बंद कर देंगे'],
        mr: ['लगेच त्या नंबरवर फोन करून पैसे पाठवेन', 'त्या नंबरवर अजिबात कॉल करणार नाही, कारण हा खोटा घोटाळा आहे', 'घरातील सर्व दिवे बंद करेन'],
        en: ['Call that number immediately and pay Rs. 10', 'Do not call that number; recognize it as a fake utility scam', 'Turn off all lights']
      },
      correctIndex: 1,
      explanation: {
        hi: 'बिल्कुल सही! बिजली विभाग कभी व्यक्तिगत नंबर से रात में लाइन काटने की धमकी नहीं देता।',
        mr: 'अगदी योग्य! वीज कंपनी वैयक्तिक नंबरवरून अशी धमकी कधीही देत नाही.',
        en: 'Correct! Power companies never threaten disconnection via personal cell numbers.'
      }
    }
  }
];
