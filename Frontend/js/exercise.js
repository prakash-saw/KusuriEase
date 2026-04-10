// ===== KusuriEase - Exercise Page JS =====

// ===== EXERCISE =====
// ===== AI EXERCISE ADVISOR =====
const exerciseResponses = {
  knee: `Here's a gentle routine for knee pain:\n\n🦵 **Low-Impact Exercises:**\n• Straight Leg Raises – 3×15 reps\n• Seated Hamstring Stretch – 30 sec hold\n• Wall Squats – 3×10 reps\n• Cycling (stationary) – 15 min\n\n⚠️ Avoid: Running, jumping, deep squats\n\nStart slow and consult a physiotherapist if pain persists.`,
  diabetes: `Exercise plan for Type 2 Diabetes management:\n\n🏃 **Cardio (5 days/week):**\n• Brisk Walking – 30 min post meals\n• Swimming – 20 min\n\n💪 **Strength (3 days/week):**\n• Resistance bands – 2×15 reps\n• Bodyweight squats – 3×12\n\n📊 Monitor blood sugar before/after exercise. Keep glucose tablets handy.`,
  weight: `Weight loss exercise plan:\n\n🔥 **HIIT (3 days/week):**\n• Jumping Jacks – 30 sec\n• Burpees – 20 sec rest\n• Mountain Climbers – 30 sec\n• 4 rounds with 1 min rest\n\n🚶 **Cardio (5 days/week):**\n• 10,000 steps daily goal\n• 20-min bike ride\n\n⚡ Target: 300-400 cal/session`,
  back: `Lower back pain relief exercises:\n\n🧘 **Daily Routine (20 min):**\n• Cat-Cow Stretch – 10 reps\n• Child's Pose – 30 sec\n• Pelvic Tilts – 3×15\n• Bird-Dog – 3×10 each side\n• Supine Twist – 30 sec each side\n\n❌ Avoid: Sit-ups, heavy deadlifts, running on hard surfaces`,
  default: `I'll suggest a personalized exercise plan! 🏋️\n\nPlease tell me:\n• Your health condition or goal\n• Any physical limitations\n• Available time per day\n• Equipment access\n\nFor example, try asking:\n"I have knee pain" or "I want to lose weight" or "I have diabetes"`
};

function getAIResponse(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('knee') || lower.includes('joint')) return exerciseResponses.knee;
  if (lower.includes('diabetes') || lower.includes('sugar') || lower.includes('metformin')) return exerciseResponses.diabetes;
  if (lower.includes('weight') || lower.includes('fat') || lower.includes('lose')) return exerciseResponses.weight;
  if (lower.includes('back') || lower.includes('spine')) return exerciseResponses.back;
  return exerciseResponses.default;
}

function sendExerciseMsg() {
  const input = document.getElementById('exerciseInput');
  const msg = input.value.trim();
  if (!msg) return;

  addChatMsg(msg, 'user');
  input.value = '';

  // Typing indicator
  const typingId = 'typing-' + Date.now();
  const chat = document.getElementById('chatMessages');
  const typing = document.createElement('div');
  typing.id = typingId;
  typing.className = 'msg msg-ai';
  typing.innerHTML = '<span style="letter-spacing:3px">•••</span>';
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;

  setTimeout(() => {
    document.getElementById(typingId)?.remove();
    const response = getAIResponse(msg);
    addChatMsg(response, 'ai');
  }, 1000 + Math.random() * 800);
}

function addChatMsg(text, type) {
  const chat = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `msg msg-${type}`;
  div.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}


