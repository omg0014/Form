export const templates = {
  contact: [
    { type: "Text", label: "Name", placeholder: "Enter your name", required: true },
    { type: "Text", label: "Email", placeholder: "Enter your email", required: true },
    { type: "Textarea", label: "Message", placeholder: "Your message", required: true }
  ],
  feedback: [
    { type: "Text", label: "Full Name", placeholder: "", required: true },
    { type: "Textarea", label: "Feedback", placeholder: "", required: true }
  ],
  registration: [
    { type: "Text", label: "First Name", required: true },
    { type: "Text", label: "Last Name", required: true },
    { type: "Date", label: "DOB", required: true }
  ],
  survey: [
    { type: "Text", label: "Age", required: true },
    { type: "Textarea", label: "Opinion", required: false }
  ]
};
