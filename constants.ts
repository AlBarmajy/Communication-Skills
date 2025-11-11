import type { ChapterQuiz, LectureFile } from './types';

export const lectureFiles: LectureFile[] = [
  { title: 'Chapter 1: Intro to Communication', filePath: '/path/to/chapter1.pdf' },
  { title: 'Chapter 2: Elements of Communication', filePath: '/path/to/chapter2.pdf' },
  { title: 'Chapter 3: Communication Process', filePath: '/path/to/chapter3.pdf' },
  { title: 'Chapter 4: Types of Communication', filePath: '/path/to/chapter4.pdf' },
  { title: 'Chapter 5: Advanced Concepts', filePath: '/path/to/chapter5.pdf' },
  { title: 'Chapter 6: Non-Verbal Communication', filePath: '/path/to/chapter6.pdf' },
];

export const chapterQuizzes: ChapterQuiz = {
  "Chapter 1": [
    {
      questionText: "What is the primary process of exchanging information, ideas, and feelings between individuals called?",
      options: ["Interaction", "Communication", "Discussion", "Notification"],
      correctAnswer: "Communication",
      explanation: "Correct Answer: Communication. Reason: This is the fundamental definition of communication as the exchange of information and ideas to achieve a goal, كما في ملفات المحاضرات."
    }
  ],
  "Chapter 2": [
    {
      questionText: "Which of these is NOT a core element of communication?",
      options: ["Sender", "Receiver", "Message", "Time"],
      correctAnswer: "Time",
      explanation: "Correct Answer: Time. Reason: While time can be a contextual factor, the core elements are the Sender, Receiver, Message, and the Channel, كما في ملفات المحاضرات."
    }
  ],
  "Chapter 3": [
    {
      questionText: "The process of converting thoughts into symbols (like words or gestures) is called:",
      options: ["Decoding", "Feedback", "Encoding", "Receiving"],
      correctAnswer: "Encoding",
      explanation: "Correct Answer: Encoding. Reason: Encoding is the process the sender uses to translate their thoughts into a communicable message, كما في ملفات المحاضرات."
    }
  ],
  "Chapter 4": [
    {
      questionText: "Communication that happens through body language and gestures is known as:",
      options: ["Verbal Communication", "Written Communication", "Non-Verbal Communication", "Formal Communication"],
      correctAnswer: "Non-Verbal Communication",
      explanation: "Correct Answer: Non-Verbal Communication. Reason: This type of communication relies on physical cues rather than spoken or written words, كما في ملفات المحاضرات."
    }
  ],
  "Chapter 5": [
     {
      questionText: "Understanding the mental and emotional state of another person is called:",
      options: ["Sympathy", "Apathy", "Empathy", "Intellectualism"],
      correctAnswer: "Empathy",
      explanation: "Correct Answer: Empathy. Reason: Empathy is a key communication skill that involves understanding and sharing the feelings of others, كما في ملفات المحاضرات."
    }
  ],
  "Chapter 6": [
    {
      questionText: "What percentage of communication is estimated to be non-verbal?",
      options: ["10%", "25%", "55%", "75%"],
      correctAnswer: "55%",
      explanation: "Correct Answer: 55%. Reason: Research indicates that a majority of our communication is conveyed through non-verbal cues like body language and facial expressions, كما في ملفات المحاضرات."
    }
  ]
};

export const lectureContent = `
Lecture Summary 1&2:
Definition of Communication: It is the process of exchanging information, opinions, ideas, and feelings between individuals to achieve a specific goal. Elements: Sender, Message, Channel, Receiver.

Lecture Summary 3&4:
Communication Process: Includes Encoding (creating the message), Channel (the medium), Decoding (interpreting the message), and Feedback. Models can be Linear (one-way) or Interactive (two-way). Types of Communication: Self, Interpersonal, Group, Mass, and Intercultural.

Lecture Summary 5:
Effective communication requires clarity, empathy (understanding others' feelings), and avoiding gaps. There are five levels of communication from casual to peak. Negotiation is a key skill.

Lecture Summary 6:
Non-verbal communication accounts for 55% of interaction. It includes facial expressions, hand gestures, and body posture. It's often involuntary and reveals true feelings.
`;
